export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
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