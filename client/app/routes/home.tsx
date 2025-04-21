import type { Route } from "./+types/home";
import { Sidebar } from "../components/Sidebar";
import CreatePost from "../components/createPost";
import { useAuth } from "../hooks/useAuth";
import Posts  from "../components/Posts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RightSidebar } from "../components/Rightsidebar";


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
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePostCreated = () => {
    setRefreshPosts(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          {/* Left Column - User Profile & Logout */}
          <Sidebar />

          {/* Middle Column - Create Post & Posts Feed */}
          <div className="col-span-6 border-r-[0.5px] border-l-[0.5px] border-border py-4">
            <CreatePost onPostCreated={handlePostCreated} />
            <Posts refreshTrigger = {refreshPosts}/>
          </div>

          {/* Right Column - Utilities */}
          <RightSidebar/>
        </div>
      </div>
    </div>
  );
}
