import { Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Header() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', {}, { withCredentials: true });
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <header className="w-full bg-background shadow-md">
                <nav className="flex flex-row items-center justify-between px-6 md:px-8 py-4">
                    <Link to="/" className="text-2xl font-bold text-[#4F46E5] hover:text-[#4338CA] transition-colors">
                        Writerly
                    </Link>

                    <div className="flex items-center space-x-4 md:space-x-6">
                        <Link to="/create-post" className="text-[#4F46E5] hover:text-[#4338CA] transition-colors">
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-[#EF4444] hover:text-red-700 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
}