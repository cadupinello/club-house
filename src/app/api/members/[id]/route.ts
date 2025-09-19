import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const member = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        posts: true,
        comments: true,
      },
    });

    if (!member) {
      return NextResponse.json({ error: "Membro não encontrado" }, { status: 404 });
    }

    const response = {
      id: member.id,
      name: member.name,
      avatar: member.image,
      joinDate: member.createdAt.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      bio: member.bio,
      location: member.location,
      stats: {
        posts: member.posts.length,
        comments: member.comments.length,
        likes: 0,
        following: 0,
        followers: 0,
      },
      badges: [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession(req);

    if (!session) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    if (session.user.id !== params.id) {
      return NextResponse.json({ error: "Usuário não autorizado" }, { status: 403 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const file = formData.get("image") as File | null;

    let imagePath = undefined;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/avatars");

      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      imagePath = `/uploads/avatars/${fileName}`;
    }

    const updateUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        name,
        bio,
        location,
        image: imagePath,
      },
    });

    return NextResponse.json({
      message: "Perfil atualizado com sucesso",
      user: updateUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ocorreu um erro, tente novamente" }, { status: 500 });
  }
}
