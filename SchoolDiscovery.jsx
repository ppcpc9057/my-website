import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Search, MapPin, Building2, ChevronLeft } from 'lucide-react';

const SchoolDiscovery = () => {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await api.get('/schools');
        setSchools(res.data);
      } catch (err) {
        console.error('Failed to fetch schools', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.address && s.address.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelectSchool = (schoolId) => {
    navigate('/register', { state: { schoolId } });
  };

  return (
    <div className="min-h-[85vh] py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          اكتشف مدرستك
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          ابحث عن مدرستك وانضم إلى المنصة التعليمية للبدء في رحلتك الأكاديمية
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-10 px-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
          <input 
            type="text"
            className="input-field pe-12 py-4 text-lg rounded-2xl shadow-sm bg-white"
            placeholder="ابحث باسم المدرسة أو العنوان..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-slate-500 py-12">جاري تحميل المدارس...</div>
        ) : filteredSchools.length > 0 ? (
          filteredSchools.map((school, i) => (
            <div 
              key={school.id} 
              className="card group cursor-pointer border border-slate-200 hover:border-blue-300 animate-fade-in-up"
              style={{ animationDelay: `${(i % 5) * 0.1}s` }}
              onClick={() => handleSelectSchool(school.id)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{school.name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <span>{school.address || 'العنوان غير متوفر'}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  انضمام <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-500 py-12 glass">
            لم يتم العثور على مدارس مطابقة لبحثك.
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDiscovery;
