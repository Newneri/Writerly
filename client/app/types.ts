export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar: string;
}

export interface Post {
  id: number;
  content: string;
  image_url?: string;
  created_at: string;
  author: User;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  post: {
    id: number;
    content: string;
  };
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}
