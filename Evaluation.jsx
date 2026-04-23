import { useState } from 'react';
import api from '../services/api';
import { Star, MessageSquare, Send, ThumbsUp } from 'lucide-react';

const Evaluation = () => {
  const [formData, setFormData] = useState({
    clarityScore: 5,
    organizationScore: 5,
    qualityScore: 5,
    comments: '',
    schoolId: '7ef413a0-923c-46a6-a84e-0058368ad317' // Demo School ID
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/evaluations', formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('فشل إرسال التقييم');
    }
  };

  const renderStars = (field) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, [field]: star })}
            className={`transition-all duration-200 ${
              formData[field] >= star ? 'text-amber-400 scale-110 drop-shadow-sm' : 'text-slate-200 hover:text-amber-200'
            }`}
          >
            <Star className="w-9 h-9 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="card text-center max-w-lg p-12 animate-fade-in-up shadow-xl shadow-emerald-900/5">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ThumbsUp className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">شكراً لك!</h2>
          <p className="text-slate-500 text-lg leading-relaxed">تم إرسال تقييمك السري بنجاح. نحن نقدر ملاحظاتك التي تساعدنا على التحسين المستمر.</p>
          <button onClick={() => setSubmitted(false)} className="mt-8 text-blue-600 font-bold hover:underline">
            إرسال استجابة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 pb-12">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">التقييم الأكاديمي</h1>
        <p className="text-slate-500 text-lg">تساعدنا ملاحظاتك في تحسين التجربة الأكاديمية. جميع الردود سرية تماماً.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        
        <div className="card border-t-4 border-t-amber-400 hover:shadow-md transition-shadow">
          <label className="block text-xl font-bold text-slate-900 mb-1">وضوح التدريس</label>
          <p className="text-sm text-slate-500 mb-6">ما مدى وضوح وفهم الدروس المقدمة؟</p>
          {renderStars('clarityScore')}
        </div>

        <div className="card border-t-4 border-t-blue-400 hover:shadow-md transition-shadow">
          <label className="block text-xl font-bold text-slate-900 mb-1">التنظيم والتخطيط</label>
          <p className="text-sm text-slate-500 mb-6">ما مدى جودة تنظيم المناهج والجدول الزمني؟</p>
          {renderStars('organizationScore')}
        </div>

        <div className="card border-t-4 border-t-emerald-400 hover:shadow-md transition-shadow">
          <label className="block text-xl font-bold text-slate-900 mb-1">الجودة الشاملة</label>
          <p className="text-sm text-slate-500 mb-6">كيف تقيم الجودة الشاملة للتعليم؟</p>
          {renderStars('qualityScore')}
        </div>

        <div className="card border-t-4 border-t-indigo-400 hover:shadow-md transition-shadow">
          <label className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-500" />
            ملاحظات إضافية
          </label>
          <p className="text-sm text-slate-500 mb-4">شاركنا أي ملاحظات، اقتراحات، أو مخاوف محددة...</p>
          <textarea
            className="input-field min-h-[140px] resize-none bg-slate-50/50"
            placeholder="اكتب ملاحظاتك هنا بحرية..."
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-primary w-full py-4 text-xl mt-8 shadow-lg shadow-blue-600/30">
          <Send className="w-6 h-6 rtl:rotate-180" />
          إرسال التقييم
        </button>
      </form>
    </div>
  );
};

export default Evaluation;
