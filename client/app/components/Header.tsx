import { Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Header() {
    const navigate = useNavigate();
    const { user } = useAuth();

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
            <div className="col-span-3 border-r-[0.5px] border-border px-4">
            <div className="sticky top-24 flex flex-col h-screen py-4">
              <button className="flex items-center gap-4 rounded-full border-2 border-border text-text-primary py-2 px-4 hover:bg-surface hover:cursor-pointer transition-colors">
                <img src={user?.avatar} alt={user?.username + ' avatar'} className="h-10 w-auto" />
                <div className="flex flex-col space-y-0">
                  <h2 className="text-md font-semibold m-0">{user?.firstName + " " + user?.lastName}</h2>
                  <p className="text-text-secondary text-sm m-0">{"@" + user?.username}</p>
                </div>
              </button>
              <div className="mt-auto">
                <button
                  onClick={handleLogout}
                  className="w-full bg-danger text-white rounded-full py-2 px-4 hover:bg-red-600 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </>
    );
}