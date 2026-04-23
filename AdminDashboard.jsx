import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { PlusCircle, Users, School, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  
  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/classes', { name: className });
      setClasses([...classes, res.data]);
      setClassName('');
    } catch (err) {
      console.error(err);
    }
  };

  if (user?.role !== 'ADMIN') {
    return <div className="text-center mt-12 text-red-500 font-bold">تم رفض الوصول: للإدارة فقط</div>;
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center gap-4 mb-2 animate-fade-in-up">
        <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
          <School className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">لوحة تحكم الإدارة</h1>
          <p className="text-slate-500 mt-1">إدارة الفصول، المواد، والطلاب بسهولة</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <PlusCircle className="text-blue-500 h-6 w-6" />
              إضافة فصل جديد
            </h2>
            <form onSubmit={handleCreateClass} className="flex flex-col sm:flex-row gap-4">
              <input 
                className="input-field flex-1" 
                placeholder="مثال: الصف العاشر - علمي"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
              <button className="btn-primary sm:w-auto px-8">إضافة</button>
            </form>
            
            <div className="mt-8">
              <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-slate-400" /> الفصول الحالية
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {classes.map((c, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center hover:bg-slate-100 transition-colors">
                    <span className="font-bold text-slate-800">{c.name}</span>
                  </div>
                ))}
                {classes.length === 0 && <p className="text-sm text-slate-500 col-span-full">لا توجد فصول مضافة حتى الآن.</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card animate-fade-in-up border-0 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl shadow-blue-900/20" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-50">
              <Users className="text-blue-200 h-6 w-6" />
              إحصائيات المنصة
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-blue-100 mb-1">إجمالي المستخدمين</p>
                <p className="text-4xl font-extrabold">128</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-blue-100 mb-1">الفصول النشطة</p>
                <p className="text-4xl font-extrabold">{classes.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
