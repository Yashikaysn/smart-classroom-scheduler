
import React, { useState } from 'react';
import { Schedule, Course, Classroom } from '../types';

interface TimetableViewProps {
  schedules: Schedule[];
  courses: Course[];
  classrooms: Classroom[];
  onAdd: (schedule: Omit<Schedule, 'id'>) => void;
}

const TimetableView: React.FC<TimetableViewProps> = ({ schedules, courses, classrooms, onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    courseId: '',
    classroomId: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courseId || !formData.classroomId) return;
    onAdd(formData);
    setIsAdding(false);
    setFormData({ courseId: '', classroomId: '', day: 'Monday', startTime: '09:00', endTime: '10:00' });
  };

  const getCourseName = (id: string) => courses.find(c => c.id === id)?.name || 'Unknown Course';
  const getRoomName = (id: string) => classrooms.find(r => r.id === id)?.name || 'Unknown Room';

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Timetable</h1>
          <p className="text-slate-500 mt-1">View and manage class schedules</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Schedule
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-800 mb-2">New Schedule Entry</h2>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select Course</label>
                <select 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.courseId}
                  onChange={e => setFormData({...formData, courseId: e.target.value})}
                >
                  <option value="">Choose a course...</option>
                  {courses.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select Classroom</label>
                <select 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.classroomId}
                  onChange={e => setFormData({...formData, classroomId: e.target.value})}
                >
                  <option value="">Choose a room...</option>
                  {classrooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Day of Week</label>
                <select 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.day}
                  onChange={e => setFormData({...formData, day: e.target.value})}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Time</label>
                  <input 
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.startTime}
                    onChange={e => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">End Time</label>
                  <input 
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.endTime}
                    onChange={e => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {schedules.length === 0 ? (
          <div className="p-8 text-center space-y-4">
            <div className="flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 space-x-3 max-w-lg mx-auto">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-center">No schedules found. Start by adding a new schedule entry.</span>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Course</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Room</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Day</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {schedules.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">{getCourseName(s.courseId)}</td>
                    <td className="px-6 py-4 text-slate-600">{getRoomName(s.classroomId)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                        {s.day}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                      {s.startTime} - {s.endTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableView;
