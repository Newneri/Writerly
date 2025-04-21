import { useState, useEffect } from 'react';
import type { Comment } from '../types';
import axios from 'axios';

export const useComments = (postId: number, initialCount: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/posts/${postId}/comments`, {
        withCredentials: true
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (content: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/posts/${postId}/comments`,
        { content },
        { withCredentials: true }
      );

      // Add the new comment to the beginning of the list
      setComments(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
        await fetchComments();
        // Optionally, you can refetch comments to ensure the latest state
      setIsLoading(false);
    }
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
    if (!showComments && comments.length === 0) {
      fetchComments();
    }
  };

  return {
    comments,
    commentsCount: comments.length || initialCount,
    isLoading,
    showComments,
    toggleComments,
    addComment
  };
};