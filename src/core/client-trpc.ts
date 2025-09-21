"use client"

import { AppRouter } from "@/core/root-router";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>()