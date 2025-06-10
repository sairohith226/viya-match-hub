
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Match } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  allUsers: User[];
  setAllUsers: (users: User[]) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    profession: 'Software Engineer',
    location: 'Bangalore',
    gothram: 'Bharadwaj',
    gender: 'female',
    photo: '/placeholder.svg',
    bio: 'Looking for a caring and understanding partner',
    education: 'B.Tech Computer Science',
    family: 'Nuclear family, father is a teacher, mother is a homemaker',
    preferences: 'Age 28-32, preferably in IT field',
    isHidden: false
  },
  {
    id: '2',
    name: 'Arjun Reddy',
    age: 29,
    profession: 'Doctor',
    location: 'Hyderabad',
    gothram: 'Kashyap',
    gender: 'male',
    photo: '/placeholder.svg',
    bio: 'Family-oriented person looking for life partner',
    education: 'MBBS, MD',
    family: 'Joint family, father is a businessman',
    preferences: 'Age 24-28, traditional values',
    isHidden: false
  },
  {
    id: '3',
    name: 'Sneha Patel',
    age: 24,
    profession: 'Teacher',
    location: 'Mumbai',
    gothram: 'Vasishta',
    gender: 'female',
    photo: '/placeholder.svg',
    bio: 'Love teaching and believe in simple living',
    education: 'B.Ed, M.A English',
    family: 'Nuclear family, both parents are teachers',
    preferences: 'Age 26-30, preferably in education field',
    isHidden: false
  }
];

const mockMatches: Match[] = [
  {
    id: '1',
    user: mockUsers[0],
    status: 'sent',
    mediator: { area: 'Bangalore Central', name: 'Mrs. Lakshmi' },
    amount: 199,
    date: '2024-06-08',
  },
  {
    id: '2',
    user: mockUsers[1],
    status: 'under_discussion',
    mediator: { area: 'Hyderabad East', name: 'Mr. Raman', contact: '+91 98765 43210' },
    amount: 199,
    date: '2024-06-05',
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      matches,
      setMatches,
      allUsers,
      setAllUsers,
      isAuthenticated,
      setIsAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
};
