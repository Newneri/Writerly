import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Posts from '../components/Posts';
import axios from 'axios';
import { formatDate } from '../utils/formatDate';
import type { Comment } from '../types';


export default function Dashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            if (activeTab === 'comments') {
                try {
                    setIsLoading(true);
                    const response = await axios.get('/api/user/comments', {
                        withCredentials: true
                    });
                    setComments(response.data);
                } catch (error) {
                    console.error('Error fetching comments:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchComments();
    }, [activeTab]);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-text-primary">
                    {user?.firstName}'s Dashboard
                </h1>
            </div>

            <div className="flex gap-4 mb-6 border-b border-border">
                <button
                    onClick={() => setActiveTab('posts')}
                    className={`px-4 py-2 cursor-pointer transition-colors ${activeTab === 'posts'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                >
                    My Posts
                </button>
                <button
                    onClick={() => setActiveTab('comments')}
                    className={`px-4 py-2 cursor-pointer transition-colors ${activeTab === 'comments'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                >
                    My Comments
                </button>
            </div>

            {activeTab === 'posts' ? (
                <Posts refreshTrigger userId={user?.id} />
            ) : (
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center text-text-secondary">Loading comments...</div>
                    ) : comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="bg-surface rounded-xl border border-border p-4">
                                <div className="flex items-start gap-3">
                                    <img
                                        src={comment.user.avatar}
                                        alt={`${comment.user.username}'s avatar`}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-text-primary">
                                                {comment.user.firstName} {comment.user.lastName}
                                            </span>
                                            <span className="text-text-secondary">@{comment.user.username}</span>
                                            <span className="text-text-secondary text-sm">
                                                • {formatDate(comment.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-text-primary mb-2">{comment.content}</p>
                                        <Link
                                            to={`/post/${comment.post.id}`}
                                            className="text-sm text-text-secondary hover:text-primary transition-colors"
                                        >
                                            on post: {comment.post.content.substring(0, 100)}...
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-text-secondary">
                            You haven't made any comments yet.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}