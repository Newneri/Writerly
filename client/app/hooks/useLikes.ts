import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLikes = (postId: number, initialLikeCount: number, initialIsLiked: boolean) => {
    const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
    const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setLikeCount(initialLikeCount);
        setIsLiked(initialIsLiked);
    }, [initialLikeCount, initialIsLiked]);

    const toggleLike = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/posts/${postId}/like`, {}, {
                withCredentials: true
            });

            // Ensure we're accessing the correct properties from the response
            setLikeCount(response.data.likeCount);
            setIsLiked(response.data.isLiked);

        } catch (error) {
            console.error('Error toggling like:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        likeCount,
        isLiked,
        isLoading,
        toggleLike
    };
};