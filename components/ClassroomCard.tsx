
import React, { useState } from 'react';
import { Classroom, Booking, User } from '../types';

interface ClassroomCardProps {
  classroom: Classroom;
  onBook?: (booking: Omit<Booking, 'id'>) => void;
  currentUser?: User;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom, onBook, currentUser }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    purpose: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:00'
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onBook && currentUser) {
      onBook({
        classroomId: classroom.id,
        userId: currentUser.username,
        ...bookingData
      });
      setShowBookingModal(false);
      setBookingData({
        purpose: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '10:00',
        endTime: '11:00'
      });
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-slate-800">{classroom.name}</h3>
        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-100 flex items-center">
          {classroom.status}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-slate-500 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Capacity: {classroom.capacity}
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {classroom.location}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {classroom.amenities.map((amenity, idx) => (
          <span key={idx} className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-semibold rounded-md">
            {amenity}
          </span>
        ))}
      </div>

      <button 
        onClick={() => setShowBookingModal(true)}
        className="w-full py-2.5 border border-slate-200 rounded-lg text-slate-700 font-semibold text-sm flex items-center justify-center hover:bg-slate-50 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Book Classroom
      </button>

      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-200">
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-slate-800">Book {classroom.name}</h2>
                <button type="button" onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Purpose</label>
                <input 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={bookingData.purpose}
                  onChange={e => setBookingData({...bookingData, purpose: e.target.value})}
                  placeholder="e.g. Study Group"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</label>
                <input 
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={bookingData.date}
                  onChange={e => setBookingData({...bookingData, date: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Time</label>
                  <input 
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={bookingData.startTime}
                    onChange={e => setBookingData({...bookingData, startTime: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">End Time</label>
                  <input 
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={bookingData.endTime}
                    onChange={e => setBookingData({...bookingData, endTime: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomCard;
