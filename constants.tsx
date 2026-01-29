
import React from 'react';
import { Classroom, NavItem } from './types';

export const CLASSROOMS: Classroom[] = [
  {
    id: '1',
    name: 'Auditorium',
    status: 'Available',
    capacity: 100,
    location: 'Main Building, Floor 1',
    amenities: ['Projector', 'Sound System', 'Stage']
  },
  {
    id: '2',
    name: 'Lab 301',
    status: 'Available',
    capacity: 20,
    location: 'Science Building, Floor 3',
    amenities: ['Computers', 'Lab Equipment']
  },
  {
    id: '3',
    name: 'Room 101',
    status: 'Available',
    capacity: 30,
    location: 'Main Building, Floor 1',
    amenities: ['Projector', 'Whiteboard', 'Computer']
  },
  {
    id: '4',
    name: 'Room 102',
    status: 'Available',
    capacity: 25,
    location: 'Main Building, Floor 1',
    amenities: ['Projector', 'Whiteboard']
  },
  {
    id: '5',
    name: 'Room 201',
    status: 'Available',
    capacity: 40,
    location: 'Main Building, Floor 2',
    amenities: ['Projector', 'Whiteboard', 'Computer', 'Smart Board']
  }
];

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    id: 'classrooms',
    label: 'Classrooms',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 'courses',
    label: 'Courses',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }
];
