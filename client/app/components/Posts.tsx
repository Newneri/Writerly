import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

interface Post {
    id: string;
    content: string;
    image_url?: string;
    created_at: string;
    author: {
        username: string;
        avatar: string;
        id: number;
    };
}

interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}

interface PostsProps {
    refreshTrigger: boolean;
}

const Posts: React.FC<PostsProps> = ({ refreshTrigger }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts', { withCredentials: true });
                setPosts(response.data);
            } catch (err) {
                setError('Failed to load posts');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [refreshTrigger]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-EN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    return (
        <section className="w-full mx-auto">
            {posts.length === 0 && (
                <div className="text-center text-text-secondary p-4">
                    No posts available. Create one to get started!
                </div>
            )}

            {posts.map((post) => (
                <article
                    key={post.id}
                    className="bg-surface border-b-1 border-t-1 border-border overflow-hidden"
                >
                    <div className="p-5">
                        <div className="flex items-center mb-4">
                            <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.username + " avatar"}
                                    className="w-10 h-10 rounded-full flex-shrink-0"
                                />
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold text-text-primary">{post.author.username}</p>
                                <p className="text-sm text-text-secondary">{formatDate(post.created_at)}</p>
                            </div>
                        </div>

                        <h3 className="text-text-secondary mb-4">{post.content}</h3>

                        {post.image_url && (
                            <div className="relative h-64 w-auto mx-auto mb-4">
                                <img
                                    src={post.image_url}
                                    alt={post.image_url}
                                    className="absolute inset-0 w-auto h-full object-fill "
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between text-text-secondary border-t pt-4">
                            <button className="flex items-center space-x-2 hover:text-primary transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <span>Like</span>
                            </button>

                            <button className="flex items-center space-x-2 hover:text-primary transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                <span>Comment</span>
                            </button>

                            <button className="flex items-center space-x-2 hover:text-primary transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    />
                                </svg>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </section>

    );
}

export default Posts;