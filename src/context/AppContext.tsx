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

// Mock data with proper placeholder images
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    profession: 'Software Engineer',
    location: 'Bangalore',
    gothram: 'Bharadwaj',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
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
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
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
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Love teaching and believe in simple living',
    education: 'B.Ed, M.A English',
    family: 'Nuclear family, both parents are teachers',
    preferences: 'Age 26-30, preferably in education field',
    isHidden: false
  },
  {
    id: '4',
    name: 'Vikram Singh',
    age: 31,
    profession: 'Engineer',
    location: 'Delhi',
    gothram: 'Bharadwaj',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Simple person with traditional values',
    education: 'B.Tech Mechanical',
    family: 'Joint family, father is retired government officer',
    preferences: 'Age 25-29, homemaker preferred',
    isHidden: false
  },
  {
    id: '5',
    name: 'Anita Kulkarni',
    age: 27,
    profession: 'Chartered Accountant',
    location: 'Pune',
    gothram: 'Atri',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
    bio: 'Independent and career-focused individual',
    education: 'CA, B.Com',
    family: 'Nuclear family, both parents are professionals',
    preferences: 'Age 29-35, well-educated partner',
    isHidden: false
  },
  {
    id: '6',
    name: 'Rahul Gupta',
    age: 28,
    profession: 'Software Developer',
    location: 'Bangalore',
    gothram: 'Jamadagni',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    bio: 'Tech enthusiast who loves coding and traveling',
    education: 'B.Tech IT, M.Tech',
    family: 'Nuclear family, both parents are engineers',
    preferences: 'Age 24-28, working professional',
    isHidden: false
  },
  {
    id: '7',
    name: 'Kavya Menon',
    age: 25,
    profession: 'Nurse',
    location: 'Kochi',
    gothram: 'Viswamitra',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    bio: 'Compassionate healthcare professional',
    education: 'B.Sc Nursing',
    family: 'Joint family, father is a doctor',
    preferences: 'Age 27-32, preferably in medical field',
    isHidden: false
  },
  {
    id: '8',
    name: 'Aditya Joshi',
    age: 30,
    profession: 'Business Analyst',
    location: 'Mumbai',
    gothram: 'Goutama',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face',
    bio: 'Analytical mind with a passion for business',
    education: 'MBA, B.Com',
    family: 'Nuclear family, father owns a business',
    preferences: 'Age 25-28, independent woman',
    isHidden: false
  },
  {
    id: '9',
    name: 'Meera Iyer',
    age: 23,
    profession: 'Graphic Designer',
    location: 'Chennai',
    gothram: 'Bharadwaj',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face',
    bio: 'Creative soul with artistic vision',
    education: 'B.Des Visual Communication',
    family: 'Nuclear family, mother is an artist',
    preferences: 'Age 26-30, creative professional',
    isHidden: false
  },
  {
    id: '10',
    name: 'Karthik Nair',
    age: 32,
    profession: 'Civil Engineer',
    location: 'Kochi',
    gothram: 'Kashyap',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    bio: 'Building dreams one project at a time',
    education: 'B.Tech Civil Engineering',
    family: 'Joint family, traditional values',
    preferences: 'Age 24-29, family-oriented',
    isHidden: false
  },
  {
    id: '11',
    name: 'Divya Reddy',
    age: 26,
    profession: 'Marketing Manager',
    location: 'Hyderabad',
    gothram: 'Atri',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
    bio: 'Dynamic professional with marketing expertise',
    education: 'MBA Marketing, B.Com',
    family: 'Nuclear family, both parents are professionals',
    preferences: 'Age 28-33, well-established career',
    isHidden: false
  },
  {
    id: '12',
    name: 'Rohan Sharma',
    age: 27,
    profession: 'Data Scientist',
    location: 'Pune',
    gothram: 'Vasishta',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=400&h=400&fit=crop&crop=face',
    bio: 'Data-driven professional passionate about AI',
    education: 'M.Tech Data Science, B.Tech CSE',
    family: 'Nuclear family, father is a professor',
    preferences: 'Age 24-28, tech-savvy partner',
    isHidden: false
  },
  {
    id: '13',
    name: 'Pooja Agarwal',
    age: 24,
    profession: 'HR Executive',
    location: 'Delhi',
    gothram: 'Jamadagni',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1488207984102-4fb6e1c0f1ee?w=400&h=400&fit=crop&crop=face',
    bio: 'People person with excellent communication skills',
    education: 'MBA HR, B.A Psychology',
    family: 'Nuclear family, mother is a counselor',
    preferences: 'Age 26-30, good communication skills',
    isHidden: false
  },
  {
    id: '14',
    name: 'Sanjay Kumar',
    age: 33,
    profession: 'Bank Manager',
    location: 'Lucknow',
    gothram: 'Viswamitra',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1556157382-4e063bb51e2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Stable career in banking with leadership skills',
    education: 'MBA Finance, B.Com',
    family: 'Joint family, traditional background',
    preferences: 'Age 25-30, traditional family values',
    isHidden: false
  },
  {
    id: '15',
    name: 'Lakshmi Pillai',
    age: 28,
    profession: 'Pharmacist',
    location: 'Thiruvananthapuram',
    gothram: 'Goutama',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face',
    bio: 'Healthcare professional dedicated to patient care',
    education: 'Pharm.D',
    family: 'Nuclear family, father is a doctor',
    preferences: 'Age 29-34, preferably in healthcare',
    isHidden: false
  },
  {
    id: '16',
    name: 'Amit Bansal',
    age: 29,
    profession: 'Software Architect',
    location: 'Noida',
    gothram: 'Bharadwaj',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
    bio: 'Senior tech professional with architectural expertise',
    education: 'M.Tech Computer Science',
    family: 'Nuclear family, tech background',
    preferences: 'Age 25-29, understanding partner',
    isHidden: false
  },
  {
    id: '17',
    name: 'Shreya Kapoor',
    age: 25,
    profession: 'Interior Designer',
    location: 'Jaipur',
    gothram: 'Kashyap',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1521310192545-4ac7951413f0?w=400&h=400&fit=crop&crop=face',
    bio: 'Creative designer passionate about beautiful spaces',
    education: 'B.Des Interior Design',
    family: 'Nuclear family, artistic background',
    preferences: 'Age 27-32, creative and supportive',
    isHidden: false
  },
  {
    id: '18',
    name: 'Deepak Verma',
    age: 31,
    profession: 'Sales Manager',
    location: 'Indore',
    gothram: 'Atri',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    bio: 'Result-oriented sales professional',
    education: 'MBA Sales & Marketing',
    family: 'Joint family, business background',
    preferences: 'Age 26-30, supportive life partner',
    isHidden: false
  },
  {
    id: '19',
    name: 'Nisha Agrawal',
    age: 26,
    profession: 'Content Writer',
    location: 'Ahmedabad',
    gothram: 'Vasishta',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face',
    bio: 'Wordsmith with a passion for storytelling',
    education: 'M.A English Literature',
    family: 'Nuclear family, academic background',
    preferences: 'Age 28-33, intellectually compatible',
    isHidden: false
  },
  {
    id: '20',
    name: 'Suresh Patil',
    age: 30,
    profession: 'Operations Manager',
    location: 'Nagpur',
    gothram: 'Jamadagni',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=400&h=400&fit=crop&crop=face',
    bio: 'Efficient operations expert with leadership qualities',
    education: 'MBA Operations, B.Tech',
    family: 'Joint family, traditional values',
    preferences: 'Age 25-29, family-oriented partner',
    isHidden: false
  }
];

const mockMatches: Match[] = [
  {
    id: '1',
    user: mockUsers[0],
    status: 'sent',
    mediator: { area: 'Bangalore Central', name: 'Mrs. Lakshmi Devi' },
    amount: 199,
    date: '2024-06-08',
  },
  {
    id: '2',
    user: mockUsers[1],
    status: 'under_discussion',
    mediator: { area: 'Hyderabad East', name: 'Mr. Raman Kumar', contact: '+91 98765 43210' },
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
