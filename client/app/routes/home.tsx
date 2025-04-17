import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import CreatePost from "../components/createPost";
import { useAuth } from "../hooks/useAuth";
import Posts from "../components/Posts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

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
          <Header />

          {/* Middle Column - Create Post & Posts Feed */}
          <div className="col-span-6 border-r-[0.5px] border-l-[0.5px] border-border py-4">
            <CreatePost onPostCreated={handlePostCreated} />
            <Posts refreshTrigger={refreshPosts} />
          </div>

          {/* Right Column - Utilities */}
          <div className="col-span-3 border-l-[0.5px] border-border px-4">
            <div className="sticky top-24 flex gap-4 flex-col h-screen py-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search posts..."
                  className="w-full px-4 py-2 rounded-full bg-background border border-border text-text-primary focus:outline-none focus:border-primary"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <div className="bg-surface rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Coming Soon</h2>
                <p className="text-text-secondary">
                  This space will be used for additional features and utilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
