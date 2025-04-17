import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}

// Define public and protected routes
const PUBLIC_ROUTES = ['/', '/login', '/register'];
const PROTECTED_ROUTES = ['/home'];

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get('/api/auth/check', { withCredentials: true });
                setIsLoggedIn(data.isLoggedIn);
                setUser(data.user || null);

                const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
                const isProtectedRoute = PROTECTED_ROUTES.includes(location.pathname);

                if (data.isLoggedIn && isPublicRoute) {
                    navigate('/home');
                } else if (!data.isLoggedIn && isProtectedRoute) {
                    navigate('/');
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUser(null);
                if (PROTECTED_ROUTES.includes(location.pathname)) {
                    navigate('/');
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate, location.pathname]);

    return { isLoggedIn, user, loading };
}