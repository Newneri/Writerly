import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../components/Post';
import type { Post as PostType } from '../types';
import React from 'react';

interface PostsProps {  
    refreshTrigger: boolean;
}

const Posts: React.FC<PostsProps> = ({ refreshTrigger }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/posts', { withCredentials: true });
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [refreshTrigger]);

  if (isLoading) {
    return <div className="text-text-secondary">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;