import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-md animate-fade-in-up border-0 shadow-lg">
        <div className="text-center mb-8 pt-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">مرحباً بك مجدداً</h2>
          <p className="text-slate-500 mt-1">سجل الدخول إلى حسابك للمتابعة</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              required
              className="input-field text-start"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">كلمة المرور</label>
            <input
              type="password"
              required
              className="input-field text-start"
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 mt-6 text-lg">
            <LogIn className="w-5 h-5 rtl:rotate-180" />
            تسجيل الدخول
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          ليس لديك حساب؟{' '}
          <Link to="/schools" className="text-blue-600 hover:text-blue-700 font-bold">
            ابحث عن مدرستك للتسجيل
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
