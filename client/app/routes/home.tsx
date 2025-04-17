import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import CreatePost from "../components/createPost";
import { useAuth } from "../hooks/useAuth";
import Posts from "../components/Posts";
import { useState } from "react";

interface Post {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
  author: {
    username: string;
    avatar?: string;
  };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Writerly | Community Blog" },
    { name: "description", content: "Welcome to Writerly! A friendly developpers blog where you can share your thoughts and see what others are thinking right now." },
  ];
}

export default function Home() {
  const [refreshPosts, setRefreshPosts] = useState(false);

  useAuth();

  const handlePostCreated = () => {
    setRefreshPosts(prev => !prev);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-start  bg-background gap-8 mt-10">
        <div className="w-full max-w-2xl p-4 bg-[#FFFFFF] shadow-md rounded-lg">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>
        <Posts refreshTrigger={refreshPosts} />
      </main>
    </>);
} 
