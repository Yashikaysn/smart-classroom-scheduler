
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import ClassroomsView from './components/ClassroomsView';
import CoursesView from './components/CoursesView';
import TimetableView from './components/TimetableView';
import Login from './components/Login';
import { ViewType, User, Classroom, Course, Schedule, Booking } from './types';
import { CLASSROOMS as INITIAL_CLASSROOMS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  // App State
  const [classrooms, setClassrooms] = useState<Classroom[]>(INITIAL_CLASSROOMS);
  const [courses, setCourses] = useState<Course[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const addClassroom = (classroom: Omit<Classroom, 'id'>) => {
    const newRoom: Classroom = { ...classroom, id: Date.now().toString() };
    setClassrooms([...classrooms, newRoom]);
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...course, id: Date.now().toString() };
    setCourses([...courses, newCourse]);
  };

  const addSchedule = (schedule: Omit<Schedule, 'id'>) => {
    const newSchedule: Schedule = { ...schedule, id: Date.now().toString() };
    setSchedules([...schedules, newSchedule]);
  };

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = { ...booking, id: Date.now().toString() };
    setBookings([...bookings, newBooking]);
    
    // Optional: Mark classroom as occupied if booking is for right now
    // For this simple demo, we just add the record.
  };

  if (!isLoggedIn || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView 
          user={currentUser} 
          classrooms={classrooms} 
          courses={courses} 
          schedules={schedules} 
          bookings={bookings}
        />;
      case 'classrooms':
        return <ClassroomsView 
          classrooms={classrooms} 
          onAdd={addClassroom} 
          onBook={addBooking}
          currentUser={currentUser}
        />;
      case 'courses':
        return <CoursesView courses={courses} onAdd={addCourse} />;
      case 'timetable':
        return <TimetableView schedules={schedules} classrooms={classrooms} courses={courses} onAdd={addSchedule} />;
      default:
        return <DashboardView 
          user={currentUser} 
          classrooms={classrooms} 
          courses={courses} 
          schedules={schedules} 
          bookings={bookings}
        />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        user={currentUser} 
      />
      
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header currentView={currentView} />
        
        <div className="p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
