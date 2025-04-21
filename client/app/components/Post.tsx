import { useLikes } from '../hooks/useLikes';
import { useAuth } from '../hooks/useAuth';
import { useComments } from '../hooks/useComments';
import { useState } from 'react';
import type { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-EN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export function Post({ post }: PostProps) {
  const { user } = useAuth();
  const { likeCount, isLiked, isLoading: likeLoading, toggleLike } = useLikes(
    post.id,
    post.likes_count || 0,
    post.is_liked || false
  );

  const {
    comments,
    commentsCount,
    isLoading: commentsLoading,
    showComments,
    toggleComments,
    addComment
  } = useComments(post.id, post.comments_count || 0);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    await addComment(newComment);
    setNewComment('');
  };

  return (
    <article className="bg-surface rounded-xl border border-border p-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.author.avatar}
            alt={`${post.author.username}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-base text-text-primary">
              {post.author.firstName} {post.author.lastName} 
              <span className='text-text-secondary text-sm'> @{post.author.username} {formatDate(post.created_at)}</span>
            </h3>
          </div>
        </div>
      </header>

      <div className="text-text-primary">
        {post.content}
      </div>

      {post.image_url && (
        <div className="mt-4">
          <img
            src={post.image_url}
            alt="Post content"
            className="rounded-lg w-full h-auto object-cover max-h-[512px]"
          />
        </div>
      )}

      <footer className="flex flex-col gap-4">
        <div className="flex items-center gap-6 pt-4 border-t border-border">
          <button 
            onClick={toggleLike}
            disabled={likeLoading || !user}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              isLiked ? 'text-primary' : 'text-text-secondary'
            } hover:text-primary disabled:cursor-default`}
          >
            <svg 
              className={`w-5 h-5 ${likeLoading ? 'animate-pulse' : ''}`} 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span className='min-w-[1ch]'>{likeCount}</span>
          </button>

          <button 
            onClick={toggleComments}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              showComments ? 'text-primary' : 'text-text-secondary'
            } hover:text-primary`}
          >
            <svg 
              className="w-5 h-5" 
              fill="none"
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <span>{commentsCount}</span>
          </button>
        </div>

        {showComments && (
          <div className="space-y-4">
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 rounded-full bg-background border border-border focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-hover cursor-pointer transition-colors
                disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default"
              >
                Comment
              </button>
            </form>

            {commentsLoading ? (
              <div className="text-text-secondary">Loading comments...</div>
            ) : (
              <div className="space-y-3">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.user.avatar}
                      alt={`${comment.user.username}'s avatar`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-background rounded-lg p-3">
                        <p className="font-semibold text-sm">
                          {comment.user.firstName} {comment.user.lastName}
                          <span className="font-normal text-text-secondary"> @{comment.user.username}</span>
                        </p>
                        <p className="text-text-primary">{comment.content}</p>
                      </div>
                      <span className="text-xs text-text-secondary ml-3">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </footer>
    </article>
  );
}