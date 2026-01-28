
import React from 'react';

export type ViewType = 'dashboard' | 'classrooms' | 'courses' | 'timetable';

export interface Classroom {
  id: string;
  name: string;
  status: 'Available' | 'Occupied';
  capacity: number;
  location: string;
  amenities: string[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
}

export interface Schedule {
  id: string;
  courseId: string;
  classroomId: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Booking {
  id: string;
  classroomId: string;
  userId: string;
  purpose: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface User {
  username: string;
  role: 'Student' | 'Teacher' | 'Admin';
}

export interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ReactNode;
}
