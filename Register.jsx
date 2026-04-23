import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowRight } from 'lucide-react';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'STUDENT', schoolId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const schoolId = location.state?.schoolId;
    if (!schoolId) {
      navigate('/schools'); // Redirect to discovery if no school selected
    } else {
      setFormData(prev => ({ ...prev, schoolId }));
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(formData);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error);
    }
  };

  if (!formData.schoolId) return null; // Avoid flashing the form before redirect

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-md animate-fade-in-up border-0 shadow-lg relative">
        <Link to="/schools" className="absolute top-6 start-6 text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
        </Link>
        
        <div className="text-center mb-8 pt-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">إنشاء حساب جديد</h2>
          <p className="text-slate-500 mt-1">انضم إلى المنصة التعليمية</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center border border-red-100">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-6 text-sm text-center border border-green-100">تم التسجيل بنجاح! جاري التوجيه...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">الاسم الكامل</label>
            <input type="text" required className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="أحمد محمد" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
            <input type="email" required className="input-field text-start" dir="ltr" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="you@school.edu" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">كلمة المرور</label>
            <input type="password" required className="input-field text-start" dir="ltr" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">الدور</label>
            <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="STUDENT">طالب</option>
              <option value="TEACHER">معلم</option>
              <option value="ADMIN">إدارة المدرسة</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary w-full py-3.5 mt-6 text-lg" disabled={success}>
            تسجيل حساب
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
