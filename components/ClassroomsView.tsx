
import React, { useState } from 'react';
import { Classroom, Booking, User } from '../types';
import ClassroomCard from './ClassroomCard';

interface ClassroomsViewProps {
  classrooms: Classroom[];
  onAdd: (classroom: Omit<Classroom, 'id'>) => void;
  onBook: (booking: Omit<Booking, 'id'>) => void;
  currentUser: User;
}

const ClassroomsView: React.FC<ClassroomsViewProps> = ({ classrooms, onAdd, onBook, currentUser }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    capacity: 30,
    location: '',
    amenities: '',
    status: 'Available' as 'Available' | 'Occupied'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(s => s !== '')
    });
    setIsAdding(false);
    setFormData({ name: '', capacity: 30, location: '', amenities: '', status: 'Available' });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Classrooms</h1>
          <p className="text-slate-500 mt-1">Manage classroom resources and bookings</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Classroom
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-800 mb-2">New Classroom</h2>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Room Name</label>
                <input 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Room 402"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Capacity</label>
                  <input 
                    type="number"
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.capacity}
                    onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</label>
                  <input 
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="Floor, Building"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Amenities (comma-separated)</label>
                <input 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.amenities}
                  onChange={e => setFormData({...formData, amenities: e.target.value})}
                  placeholder="Projector, Whiteboard, Smart TV"
                />
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
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map(room => (
          <ClassroomCard 
            key={room.id} 
            classroom={room} 
            onBook={onBook} 
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassroomsView;
