import React, { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import ImageUploader from "./ImageUploader";

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/createpost",
        { content, image_url: imageUrl },
        { withCredentials: true }
      );
      onPostCreated?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error);
      } else {
        alert('An unexpected error occurred');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full bg-surface border-t-1 border-b-1 border-border">
      <div className="p-4">
        {/* User avatar and textarea container */}
        <div className="flex gap-4">
          <img
            src={user?.avatar}
            alt={user?.username + " avatar"}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          />
          <textarea
            value={content}
            id="content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            required
            className="w-full min-h-[1em] resize-none border-none focus:outline-none focus:ring-0 placeholder-text-secondary text-lg"
          />
        </div>
      </div>

      {/* Action buttons container */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-primary">
        <div className="flex items-center justify-center gap-2">
          <ImageUploader onUpload={setImageUrl} />
        </div>
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-6 py-1 bg-primary text-white rounded-full hover:bg-primary-hover cursor-pointer transition-colors 
          disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default"
        >
          Post
        </button>
      </div>
    </form>

  );
};

export default CreatePost;
