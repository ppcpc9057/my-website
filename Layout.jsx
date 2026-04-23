import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogOut, User as UserIcon, Building2 } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/schools');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/schools';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold text-slate-800">
                  منصة إدراك
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-5">
              {user ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <UserIcon className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">{user.name}</span>
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs font-bold">
                      {user.role === 'ADMIN' ? 'إدارة' : user.role === 'TEACHER' ? 'معلم' : 'طالب'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    تسجيل خروج
                  </button>
                </>
              ) : (
                !isAuthPage && (
                  <Link to="/schools" className="btn-primary text-sm py-2">
                    <Building2 className="w-4 h-4" />
                    ابحث عن مدرسة
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
