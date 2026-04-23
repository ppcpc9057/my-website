import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Calendar, ListTodo, Clock, CheckCircle2 } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [timeline, setTimeline] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [lessonsRes, tasksRes] = await Promise.all([
        api.get('/lessons/daily'),
        api.get('/tasks')
      ]);
      setTimeline(lessonsRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (user?.role !== 'STUDENT') {
    return <div className="text-center mt-12 text-red-500 font-bold">تم رفض الوصول: للطلاب فقط</div>;
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center gap-4 mb-2 animate-fade-in-up">
        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
          <Calendar className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">جدولي الدراسي</h1>
          <p className="text-slate-500 mt-1">تابع دروسك اليومية ومهامك القادمة</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Clock className="text-emerald-500 h-6 w-6" />
              الدروس اليومية
            </h2>
            
            <div className="space-y-4">
              {timeline.length === 0 ? (
                <div className="p-12 rounded-xl text-center text-slate-500 bg-slate-50 border border-slate-100 border-dashed">
                  لا توجد فصول مجدولة لهذا اليوم. استمتع بيومك!
                </div>
              ) : (
                timeline.map((c, i) => (
                  <div key={i} className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{c.name}</h3>
                    <div className="space-y-4">
                      {c.subjects.map(s => (
                        <div key={s.id} className="p-5 bg-white rounded-xl border-s-4 border-emerald-500 shadow-sm hover:shadow transition-shadow">
                          <span className="font-bold text-emerald-700 text-lg block mb-2">{s.name}</span>
                          {s.lessons.map(l => (
                            <div key={l.id} className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <p className="font-bold text-slate-900 mb-1">{l.topic}</p>
                              <p className="leading-relaxed">{l.content}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card h-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <ListTodo className="text-emerald-500 h-6 w-6" />
              المهام المعلقة
            </h2>
            
            <div className="h-full">
              {tasks.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-medium">أنت على دراية بكل شيء! لا توجد مهام.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {tasks.map((t, i) => (
                    <li key={i} className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors group cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900">{t.title}</span>
                        <span className="text-[10px] uppercase font-bold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                          {t.type === 'HOMEWORK' ? 'واجب' : t.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{t.description}</p>
                      <div className="text-xs font-bold text-rose-500 flex items-center gap-1.5 bg-rose-50 w-fit px-2 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5" /> الاستحقاق: {new Date(t.dueDate).toLocaleDateString('ar-EG')}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
