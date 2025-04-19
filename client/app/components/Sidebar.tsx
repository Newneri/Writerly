import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="col-span-3 ">
        <nav className="sticky top-0 h-screen p-4 w-fit mx-auto">
          <div className="flex flex-col h-full">
            <button className="flex items-center gap-4 rounded-full border-2 border-border text-text-primary py-2 px-4 
              hover:cursor-pointer text-left relative group overflow-hidden">
              <span className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-primary rounded-tl-full transition-all duration-350 group-hover:w-[51%] group-hover:h-[51%]"></span>
              <span className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-primary rounded-tr-full transition-all duration-350 group-hover:w-[51%] group-hover:h-[51%]"></span>
              <span className="absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 border-primary rounded-bl-full transition-all duration-350 group-hover:w-[51%] group-hover:h-[51%]"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-primary rounded-br-full transition-all duration-350 group-hover:w-[51%] group-hover:h-[51%]"></span>
              <img
                src={user?.avatar}
                alt={`${user?.username}'s avatar`}
                className="h-8 w-8 relative z-10 rounded-full object-cover"
              />
              <div className="flex flex-col space-y-0 relative z-10">
                <h2 className="text-sm font-semibold m-0">
                  {`${user?.firstName} ${user?.lastName}`}
                </h2>
                <p className="text-text-secondary text-xs m-0">
                  @{user?.username}
                </p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="mt-auto w-full bg-danger text-white rounded-full py-2 px-4 hover:bg-red-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}