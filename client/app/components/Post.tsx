import { useLikes } from '../hooks/useLikes';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
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
  const { likeCount, isLiked, isLoading, toggleLike } = useLikes(
    post.id,
    post.likes_count || 0,
    post.is_liked || false
  );
  


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

      <footer className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
        <button 
          onClick={toggleLike}
          disabled={isLoading || !user}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? 'text-primary' : 'text-text-secondary'
          } hover:text-primary`}
        >
          <svg 
            className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} 
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
          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
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
          <span>{post.comments_count || 0}</span>
        </button>
      </footer>
    </article>
  );
}