export type TMemberProfile = {
  id: string;
  name: string;
  avatar: string | null;
  joinDate: string;
  bio: string | null;
  location: string | null;
  stats: {
    posts: number;
    comments: number;
    likes: number;
    following: number;
    followers: number;
  };
  badges: string[];
  isOwnProfile: boolean;
};