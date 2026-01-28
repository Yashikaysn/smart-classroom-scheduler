
import React from 'react';
import { User, Classroom, Course, Schedule, Booking } from '../types';

interface DashboardViewProps {
  user: User;
  classrooms: Classroom[];
  courses: Course[];
  schedules: Schedule[];
  bookings?: Booking[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, classrooms, courses, schedules, bookings = [] }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Institutional overview for {user.username}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active System</p>
          <p className="text-sm font-semibold text-emerald-600">v1.2.0 Connected</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Classrooms</p>
            <p className="text-2xl font-black text-slate-800">{classrooms.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Courses</p>
            <p className="text-2xl font-black text-slate-800">{courses.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Schedule</p>
            <p className="text-2xl font-black text-slate-800">{schedules.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">My Bookings</p>
            <p className="text-2xl font-black text-slate-800">{bookings.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[300px]">
          <h3 className="font-bold text-slate-700 mb-6 flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            My Recent Bookings
          </h3>
          {bookings.length === 0 ? (
            <div className="h-48 flex flex-col justify-center items-center text-slate-400">
              <p className="text-sm">You haven't booked any rooms yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(-5).reverse().map(b => (
                <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-800">{b.purpose}</p>
                      <p className="text-xs text-slate-500">{classrooms.find(r => r.id === b.classroomId)?.name} • {b.date}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 px-2 py-1 rounded text-emerald-700 uppercase">
                      {b.startTime} - {b.endTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[300px]">
          <h3 className="font-bold text-slate-700 mb-6 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Available Resources
          </h3>
          <div className="space-y-3">
             {classrooms.slice(0, 5).map(room => (
               <div key={room.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                 <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-slate-500 text-xs font-bold">
                      {room.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{room.name}</p>
                      <p className="text-[10px] text-slate-400 tracking-tight">{room.location}</p>
                    </div>
                 </div>
                 <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${room.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                   {room.status}
                 </span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
