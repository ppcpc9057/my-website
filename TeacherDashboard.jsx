import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FileText, ClipboardList, BookOpen, Users, CalendarDays, Plus, Activity } from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  
  // Modals state
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Form states
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const dummySubjectId = '4ad064c7-3dfa-48f7-8ca1-880cf4247d80'; 

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    try {
      await api.post('/lessons', { subjectId: dummySubjectId, topic, content });
      setTopic(''); setContent(''); setShowLessonModal(false);
      alert('تم نشر الدرس بنجاح!');
    } catch (err) {
      console.error(err);
      alert('فشل في نشر الدرس');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { 
        subjectId: dummySubjectId, 
        title: taskTitle, 
        description: taskDesc, 
        type: 'HOMEWORK', 
        startDate: new Date(), 
        dueDate: new Date(Date.now() + 86400000) 
      });
      setTaskTitle(''); setTaskDesc(''); setShowTaskModal(false);
      alert('تم تعيين المهمة بنجاح!');
    } catch (err) {
      console.error(err);
      alert('فشل في تعيين المهمة');
    }
  };

  if (user?.role !== 'TEACHER') {
    return <div className="text-center mt-12 text-red-500 font-bold">تم رفض الوصول: للمعلمين فقط</div>;
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">بوابة المعلم</h1>
            <p className="text-slate-500 mt-1">إدارة دروسك، مهامك، ومتابعة أداء طلابك</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowLessonModal(true)} className="btn-primary bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-5 h-5" /> إضافة درس
          </button>
          <button onClick={() => setShowTaskModal(true)} className="btn-secondary">
            <ClipboardList className="w-5 h-5 text-indigo-600" /> تعيين مهمة
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="card border-0 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-xl shadow-indigo-900/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-indigo-50">دروس هذا الأسبوع</h3>
            <Activity className="text-indigo-200 w-6 h-6" />
          </div>
          <p className="text-4xl font-extrabold mb-2">12</p>
          <p className="text-sm text-indigo-200">تم نشر 3 دروس اليوم</p>
        </div>
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-500">المهام النشطة</h3>
            <ClipboardList className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-extrabold text-slate-800 mb-2">5</p>
          <p className="text-sm text-slate-500">مهمتان مستحقتان غداً</p>
        </div>
        <div className="card hover:border-indigo-300 cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">عرض الطلاب</h3>
            <Users className="text-emerald-500 w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-4xl font-extrabold text-slate-800 mb-2">45</p>
          <p className="text-sm text-slate-500">إجمالي الطلاب في فصولك</p>
        </div>
      </div>

      <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
          <CalendarDays className="text-indigo-500 h-6 w-6" />
          نظرة عامة على الأسبوع
        </h2>
        <div className="space-y-4">
          {/* Mock Weekly Data */}
          {[
            { day: 'الأحد', lesson: 'مقدمة في الجبر', task: 'حل التمارين ص ١٢' },
            { day: 'الإثنين', lesson: 'المعادلات الخطية', task: 'لا توجد مهام' },
            { day: 'الثلاثاء', lesson: 'المتباينات', task: 'مشروع مصغر' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-100 hover:shadow-md transition-shadow bg-slate-50/50">
              <div className="w-32 font-bold text-indigo-700 flex items-center">
                {item.day}
              </div>
              <div className="flex-1 space-y-1 border-s-4 border-indigo-200 ps-4">
                <p className="font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" /> {item.lesson}
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-slate-400" /> {item.task}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals for Quick Actions */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-lg shadow-2xl animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6">نشر درس جديد</h2>
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">عنوان الدرس</label>
                <input className="input-field" value={topic} onChange={e => setTopic(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">محتوى الدرس</label>
                <textarea className="input-field min-h-[120px] resize-none" value={content} onChange={e => setContent(e.target.value)} required />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="btn-primary flex-1">نشر الآن</button>
                <button type="button" onClick={() => setShowLessonModal(false)} className="btn-secondary flex-1">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-lg shadow-2xl animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6">تعيين مهمة جديدة</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">عنوان المهمة</label>
                <input className="input-field" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">وصف المهمة</label>
                <textarea className="input-field min-h-[120px] resize-none" value={taskDesc} onChange={e => setTaskDesc(e.target.value)} required />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="btn-primary flex-1 bg-indigo-600 hover:bg-indigo-700">تعيين الآن</button>
                <button type="button" onClick={() => setShowTaskModal(false)} className="btn-secondary flex-1">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
