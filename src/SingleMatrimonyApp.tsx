
import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Heart, Search, MapPin, User, Calendar, GraduationCap, Briefcase, Users, Star, ArrowLeft, CreditCard, Shield, CheckCircle, Loader2, X, Eye, Edit, DollarSign, TrendingUp, BarChart3, Filter, Download } from 'lucide-react';

// Types
interface User {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  education: string;
  height: string;
  religion: string;
  caste: string;
  subCaste: string;
  gothram: string;
  familyType: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  income: string;
  photos: string[];
  bio: string;
  hobbies: string[];
  expectations: string;
}

interface Match {
  id: string;
  user: User;
  status: 'sent' | 'received' | 'accepted' | 'rejected';
  mediator: {
    area: string;
    name: string;
  };
  amount: number;
  date: string;
}

interface Payment {
  id: string;
  matchId: string;
  amount: number;
  gateway: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  userName: string;
}

interface Commission {
  id: string;
  mediatorName: string;
  area: string;
  matchId: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  currentUser: User | null;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
  commissions: Commission[];
  setCommissions: (commissions: Commission[]) => void;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    profession: 'Software Engineer',
    location: 'Bangalore',
    education: 'B.Tech in Computer Science',
    height: '5\'4"',
    religion: 'Hindu',
    caste: 'Brahmin',
    subCaste: 'Iyer',
    gothram: 'Bharadwaja',
    familyType: 'Nuclear',
    fatherOccupation: 'Engineer',
    motherOccupation: 'Teacher',
    siblings: '1 Sister',
    income: '₹12-15 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Looking for a caring and understanding life partner who shares similar values.',
    hobbies: ['Reading', 'Cooking', 'Travel'],
    expectations: 'Looking for someone who is family-oriented and has good values.'
  },
  {
    id: '2',
    name: 'Rahul Patel',
    age: 28,
    profession: 'Doctor',
    location: 'Mumbai',
    education: 'MBBS, MD',
    height: '5\'9"',
    religion: 'Hindu',
    caste: 'Patel',
    subCaste: 'Kadva Patel',
    gothram: 'Kashyapa',
    familyType: 'Joint',
    fatherOccupation: 'Business',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother',
    income: '₹20-25 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Dedicated doctor looking for a life partner who understands my profession.',
    hobbies: ['Cricket', 'Music', 'Photography'],
    expectations: 'Seeking a partner who is supportive and understanding.'
  },
  // ... adding 18 more profiles for a total of 20
  {
    id: '3',
    name: 'Anita Reddy',
    age: 24,
    profession: 'Chartered Accountant',
    location: 'Hyderabad',
    education: 'B.Com, CA',
    height: '5\'3"',
    religion: 'Hindu',
    caste: 'Reddy',
    subCaste: 'Kapu',
    gothram: 'Vasishta',
    familyType: 'Nuclear',
    fatherOccupation: 'Government Officer',
    motherOccupation: 'Bank Manager',
    siblings: 'No Siblings',
    income: '₹8-12 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Ambitious and career-focused, looking for an equally driven partner.',
    hobbies: ['Dancing', 'Painting', 'Yoga'],
    expectations: 'Someone who respects my career aspirations and supports my goals.'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    age: 30,
    profession: 'Business Owner',
    location: 'Delhi',
    education: 'MBA',
    height: '5\'10"',
    religion: 'Sikh',
    caste: 'Jat',
    subCaste: 'Sidhu',
    gothram: 'N/A',
    familyType: 'Joint',
    fatherOccupation: 'Retired Army Officer',
    motherOccupation: 'Social Worker',
    siblings: '2 Sisters',
    income: '₹25-30 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Family-oriented businessman looking for a traditional yet modern partner.',
    hobbies: ['Gym', 'Traveling', 'Reading'],
    expectations: 'Looking for someone who can balance tradition with modernity.'
  },
  {
    id: '5',
    name: 'Meera Nair',
    age: 25,
    profession: 'Teacher',
    location: 'Kochi',
    education: 'B.Ed, M.A',
    height: '5\'2"',
    religion: 'Hindu',
    caste: 'Nair',
    subCaste: 'Menon',
    gothram: 'Bharadwaja',
    familyType: 'Nuclear',
    fatherOccupation: 'Doctor',
    motherOccupation: 'Nurse',
    siblings: '1 Brother',
    income: '₹5-8 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Passionate about education and nurturing young minds.',
    hobbies: ['Classical Music', 'Gardening', 'Cooking'],
    expectations: 'Seeking a kind and understanding partner who values education.'
  },
  {
    id: '6',
    name: 'Arjun Gupta',
    age: 29,
    profession: 'Marketing Manager',
    location: 'Pune',
    education: 'MBA Marketing',
    height: '5\'8"',
    religion: 'Hindu',
    caste: 'Vaishya',
    subCaste: 'Baniya',
    gothram: 'Kashyapa',
    familyType: 'Nuclear',
    fatherOccupation: 'Businessman',
    motherOccupation: 'Homemaker',
    siblings: '1 Sister',
    income: '₹15-18 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Creative marketing professional with a zest for life.',
    hobbies: ['Football', 'Movies', 'Cooking'],
    expectations: 'Looking for a cheerful and supportive life partner.'
  },
  {
    id: '7',
    name: 'Kavya Iyer',
    age: 27,
    profession: 'Data Scientist',
    location: 'Chennai',
    education: 'M.Tech Data Science',
    height: '5\'5"',
    religion: 'Hindu',
    caste: 'Brahmin',
    subCaste: 'Iyer',
    gothram: 'Bharadwaja',
    familyType: 'Nuclear',
    fatherOccupation: 'Professor',
    motherOccupation: 'Doctor',
    siblings: '1 Brother',
    income: '₹18-22 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Tech enthusiast passionate about solving complex problems.',
    hobbies: ['Coding', 'Chess', 'Classical Dance'],
    expectations: 'Seeking an intellectual partner who shares my passion for technology.'
  },
  {
    id: '8',
    name: 'Rohit Joshi',
    age: 31,
    profession: 'Civil Engineer',
    location: 'Ahmedabad',
    education: 'B.Tech Civil',
    height: '5\'7"',
    religion: 'Hindu',
    caste: 'Brahmin',
    subCaste: 'Joshi',
    gothram: 'Vasishta',
    familyType: 'Joint',
    fatherOccupation: 'Contractor',
    motherOccupation: 'Teacher',
    siblings: '2 Brothers',
    income: '₹12-15 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Dedicated engineer with strong family values.',
    hobbies: ['Cricket', 'Photography', 'Trekking'],
    expectations: 'Looking for a family-oriented partner with traditional values.'
  },
  {
    id: '9',
    name: 'Deepika Rao',
    age: 23,
    profession: 'Fashion Designer',
    location: 'Bangalore',
    education: 'Fashion Design',
    height: '5\'6"',
    religion: 'Hindu',
    caste: 'Rao',
    subCaste: 'Desai',
    gothram: 'Kashyapa',
    familyType: 'Nuclear',
    fatherOccupation: 'Architect',
    motherOccupation: 'Interior Designer',
    siblings: '1 Sister',
    income: '₹6-10 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Creative and artistic with a passion for fashion.',
    hobbies: ['Sketching', 'Fashion Blogging', 'Travel'],
    expectations: 'Seeking a creative and supportive partner.'
  },
  {
    id: '10',
    name: 'Karthik Menon',
    age: 28,
    profession: 'Financial Analyst',
    location: 'Mumbai',
    education: 'CFA, MBA Finance',
    height: '5\'9"',
    religion: 'Hindu',
    caste: 'Menon',
    subCaste: 'Nair',
    gothram: 'Bharadwaja',
    familyType: 'Nuclear',
    fatherOccupation: 'Bank Manager',
    motherOccupation: 'Accountant',
    siblings: 'No Siblings',
    income: '₹20-25 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Finance professional with analytical mindset.',
    hobbies: ['Stock Market', 'Badminton', 'Reading'],
    expectations: 'Looking for an intelligent and ambitious partner.'
  },
  {
    id: '11',
    name: 'Shruti Agarwal',
    age: 25,
    profession: 'Pharmacist',
    location: 'Jaipur',
    education: 'B.Pharm',
    height: '5\'3"',
    religion: 'Hindu',
    caste: 'Agarwal',
    subCaste: 'Baniya',
    gothram: 'Kashyapa',
    familyType: 'Joint',
    fatherOccupation: 'Jeweler',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother, 1 Sister',
    income: '₹4-6 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Healthcare professional with a caring nature.',
    hobbies: ['Cooking', 'Handicrafts', 'Volunteering'],
    expectations: 'Seeking a caring and family-oriented partner.'
  },
  {
    id: '12',
    name: 'Nitin Kumar',
    age: 32,
    profession: 'Government Officer',
    location: 'Lucknow',
    education: 'B.A, Civil Services',
    height: '5\'8"',
    religion: 'Hindu',
    caste: 'Kayastha',
    subCaste: 'Srivastava',
    gothram: 'Vasishta',
    familyType: 'Joint',
    fatherOccupation: 'Retired Teacher',
    motherOccupation: 'Homemaker',
    siblings: '1 Sister',
    income: '₹10-12 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Dedicated public servant committed to social service.',
    hobbies: ['Reading', 'Social Work', 'Chess'],
    expectations: 'Looking for a partner who shares my commitment to social service.'
  },
  {
    id: '13',
    name: 'Pooja Desai',
    age: 26,
    profession: 'Graphic Designer',
    location: 'Surat',
    education: 'B.Des Graphic Design',
    height: '5\'4"',
    religion: 'Hindu',
    caste: 'Patel',
    subCaste: 'Desai',
    gothram: 'Bharadwaja',
    familyType: 'Nuclear',
    fatherOccupation: 'Diamond Merchant',
    motherOccupation: 'Fashion Designer',
    siblings: '1 Brother',
    income: '₹7-10 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Creative designer with an eye for aesthetics.',
    hobbies: ['Digital Art', 'Photography', 'Traveling'],
    expectations: 'Seeking a creative and understanding partner.'
  },
  {
    id: '14',
    name: 'Ajay Yadav',
    age: 29,
    profession: 'Police Officer',
    location: 'Indore',
    education: 'B.A, Police Training',
    height: '5\'10"',
    religion: 'Hindu',
    caste: 'Yadav',
    subCaste: 'Ahir',
    gothram: 'Kashyapa',
    familyType: 'Joint',
    fatherOccupation: 'Farmer',
    motherOccupation: 'Anganwadi Worker',
    siblings: '2 Brothers',
    income: '₹8-10 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Disciplined officer dedicated to serving society.',
    hobbies: ['Martial Arts', 'Fitness', 'Social Service'],
    expectations: 'Looking for a supportive and understanding partner.'
  },
  {
    id: '15',
    name: 'Riya Malhotra',
    age: 24,
    profession: 'Journalist',
    location: 'Delhi',
    education: 'Mass Communication',
    height: '5\'5"',
    religion: 'Hindu',
    caste: 'Khatri',
    subCaste: 'Malhotra',
    gothram: 'Vasishta',
    familyType: 'Nuclear',
    fatherOccupation: 'Media Executive',
    motherOccupation: 'PR Manager',
    siblings: '1 Sister',
    income: '₹6-9 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Passionate journalist with a love for storytelling.',
    hobbies: ['Writing', 'Current Affairs', 'Debates'],
    expectations: 'Seeking an intellectually stimulating partner.'
  },
  {
    id: '16',
    name: 'Sandeep Chouhan',
    age: 33,
    profession: 'Army Officer',
    location: 'Bhopal',
    education: 'B.Tech, NDA',
    height: '6\'0"',
    religion: 'Hindu',
    caste: 'Rajput',
    subCaste: 'Chouhan',
    gothram: 'Bharadwaja',
    familyType: 'Joint',
    fatherOccupation: 'Retired Army',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother',
    income: '₹15-18 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Disciplined army officer with strong moral values.',
    hobbies: ['Adventure Sports', 'Reading', 'Fitness'],
    expectations: 'Looking for a partner who can handle military lifestyle.'
  },
  {
    id: '17',
    name: 'Neha Sinha',
    age: 27,
    profession: 'HR Manager',
    location: 'Kolkata',
    education: 'MBA HR',
    height: '5\'4"',
    religion: 'Hindu',
    caste: 'Kayastha',
    subCaste: 'Sinha',
    gothram: 'Kashyapa',
    familyType: 'Nuclear',
    fatherOccupation: 'Professor',
    motherOccupation: 'School Principal',
    siblings: '1 Brother',
    income: '₹12-15 LPA',
    photos: ['/placeholder.svg'],
    bio: 'People-oriented HR professional with excellent communication skills.',
    hobbies: ['Dancing', 'Event Planning', 'Reading'],
    expectations: 'Seeking a well-educated and cultured partner.'
  },
  {
    id: '18',
    name: 'Manish Sharma',
    age: 30,
    profession: 'Architect',
    location: 'Jaipur',
    education: 'B.Arch',
    height: '5\'9"',
    religion: 'Hindu',
    caste: 'Brahmin',
    subCaste: 'Sharma',
    gothram: 'Vasishta',
    familyType: 'Nuclear',
    fatherOccupation: 'Civil Engineer',
    motherOccupation: 'Interior Designer',
    siblings: '1 Sister',
    income: '₹10-14 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Creative architect passionate about sustainable design.',
    hobbies: ['Sketching', 'Travel', 'Photography'],
    expectations: 'Looking for a creative and environmentally conscious partner.'
  },
  {
    id: '19',
    name: 'Divya Pillai',
    age: 28,
    profession: 'Physiotherapist',
    location: 'Trivandrum',
    education: 'BPT, MPT',
    height: '5\'3"',
    religion: 'Hindu',
    caste: 'Nair',
    subCaste: 'Pillai',
    gothram: 'Bharadwaja',
    familyType: 'Nuclear',
    fatherOccupation: 'Doctor',
    motherOccupation: 'Nurse',
    siblings: '1 Brother',
    income: '₹6-8 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Compassionate healthcare professional dedicated to helping others.',
    hobbies: ['Yoga', 'Classical Music', 'Gardening'],
    expectations: 'Seeking a health-conscious and caring partner.'
  },
  {
    id: '20',
    name: 'Rajesh Pandey',
    age: 31,
    profession: 'Research Scientist',
    location: 'Pune',
    education: 'PhD Chemistry',
    height: '5\'8"',
    religion: 'Hindu',
    caste: 'Brahmin',
    subCaste: 'Pandey',
    gothram: 'Kashyapa',
    familyType: 'Joint',
    fatherOccupation: 'Professor',
    motherOccupation: 'Researcher',
    siblings: '1 Sister',
    income: '₹16-20 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Dedicated researcher contributing to scientific advancement.',
    hobbies: ['Research', 'Reading Scientific Journals', 'Chess'],
    expectations: 'Looking for an intellectually compatible and supportive partner.'
  }
];

// Context
const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      matchId: '1',
      amount: 199,
      gateway: 'Razorpay',
      status: 'completed',
      date: '2024-01-15',
      userName: 'Priya Sharma'
    },
    {
      id: '2',
      matchId: '2',
      amount: 199,
      gateway: 'Stripe',
      status: 'completed',
      date: '2024-01-14',
      userName: 'Rahul Patel'
    }
  ]);
  const [commissions, setCommissions] = useState<Commission[]>([
    {
      id: '1',
      mediatorName: 'Mrs. Lakshmi Devi',
      area: 'Bangalore Central',
      matchId: '1',
      amount: 50,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: '2',
      mediatorName: 'Mr. Rajesh Kumar',
      area: 'Mumbai West',
      matchId: '2',
      amount: 50,
      status: 'paid',
      date: '2024-01-14'
    }
  ]);

  const currentUser = isAuthenticated ? {
    id: 'current-user',
    name: 'John Doe',
    age: 28,
    profession: 'Software Engineer',
    location: 'Bangalore',
    education: 'B.Tech',
    height: '5\'8"',
    religion: 'Hindu',
    caste: 'Brahmin',
    subCaste: 'Iyer',
    gothram: 'Bharadwaja',
    familyType: 'Nuclear',
    fatherOccupation: 'Engineer',
    motherOccupation: 'Teacher',
    siblings: '1 Sister',
    income: '₹15-20 LPA',
    photos: ['/placeholder.svg'],
    bio: 'Looking for a life partner',
    hobbies: ['Reading', 'Travel'],
    expectations: 'Looking for understanding partner'
  } : null;

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      currentUser,
      matches,
      setMatches,
      payments,
      setPayments,
      commissions,
      setCommissions
    }}>
      {children}
    </AppContext.Provider>
  );
};

// UI Components
const Button = ({ children, onClick, variant = 'default', size = 'default', className = '', disabled = false, ...props }: {
  children: any;
  onClick: any;
  variant?: string;
  size?: string;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  const variantClass = variants[variant as keyof typeof variants] || variants.default;
  const sizeClass = sizes[size as keyof typeof sizes] || sizes.default;

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const Input = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Select = ({ children, value, onValueChange }: { children: ReactNode; value: string; onValueChange: (value: string) => void }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
  </div>
);

const SelectContent = ({ children }: { children: ReactNode }) => <>{children}</>;
const SelectItem = ({ children, value }: { children: ReactNode; value: string }) => (
  <option value={value}>{children}</option>
);
const SelectTrigger = ({ children }: { children: ReactNode }) => <>{children}</>;
const SelectValue = ({ placeholder }: { placeholder: string }) => <option value="">{placeholder}</option>;

const Dialog = ({ children, open, onOpenChange }: { children: ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>{children}</div>
);

const DialogHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const DialogTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

// Custom Tabs component
const Tabs = ({ children, activeTab, setActiveTab, className = '' }: { 
  children: any; 
  activeTab: any; 
  setActiveTab: any; 
  className?: string;
}) => (
  <div className={className}>{children}</div>
);

const TabsList = ({ children, activeTab, setActiveTab }: { 
  children: any; 
  activeTab: any; 
  setActiveTab: any;
}) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ children, value, activeTab, setActiveTab }: { 
  children: any; 
  value: any; 
  activeTab: any; 
  setActiveTab: any;
}) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value ? 'bg-background text-foreground shadow-sm' : ''
    }`}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }: { 
  children: any; 
  value: any; 
  activeTab: any;
}) => {
  if (activeTab !== value) return null;
  return <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">{children}</div>;
};

// Toast hook
const useToast = () => {
  const toast = ({ title, description, variant = 'default', duration = 3000 }: {
    title: string;
    description?: string;
    variant?: string;
    duration?: number;
  }) => {
    // Simple toast implementation
    const toastEl = document.createElement('div');
    toastEl.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
      variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`;
    toastEl.innerHTML = `<div class="font-semibold">${title}</div>${description ? `<div class="text-sm">${description}</div>` : ''}`;
    document.body.appendChild(toastEl);
    
    setTimeout(() => {
      document.body.removeChild(toastEl);
    }, duration);
  };

  return { toast };
};

// Components
const Header = ({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) => {
  const { isAuthenticated, setIsAuthenticated, currentUser } = useApp();
  const { toast } = useToast();

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Login Successful",
      description: "You are now logged in.",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logout Successful", 
      description: "You have been logged out.",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Viya</span>
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-pink-600 bg-pink-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Browse Profiles
            </button>
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('matches')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'matches' ? 'text-pink-600 bg-pink-50' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Matches
              </button>
            )}
            <button
              onClick={() => onNavigate('help')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'help' ? 'text-pink-600 bg-pink-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Help & FAQ
            </button>
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'admin' ? 'text-pink-600 bg-pink-50' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin Dashboard
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <Button onClick={handleLogin} variant="default">
                Login
              </Button>
            ) : (
              <>
                {currentUser && (
                  <span className="text-gray-700 text-sm">Welcome, {currentUser.name}</span>
                )}
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const HomePage = ({ onProfileClick }: { onProfileClick: (user: User) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [professionFilter, setProfessionFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const filteredUsers = sampleUsers.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === '' || user.location === locationFilter) &&
      (professionFilter === '' || user.profession === professionFilter) &&
      (ageFilter === '' || (
        ageFilter === '20-25' ? user.age >= 20 && user.age <= 25 :
        ageFilter === '26-30' ? user.age >= 26 && user.age <= 30 :
        ageFilter === '31-35' ? user.age >= 31 && user.age <= 35 :
        true
      ))
    );
  });

  const locations = [...new Set(sampleUsers.map(user => user.location))];
  const professions = [...new Set(sampleUsers.map(user => user.profession))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={professionFilter} onValueChange={setProfessionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Profession" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Professions</SelectItem>
              {professions.map(profession => (
                <SelectItem key={profession} value={profession}>{profession}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ageFilter} onValueChange={setAgeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Age Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Ages</SelectItem>
              <SelectItem value="20-25">20-25 years</SelectItem>
              <SelectItem value="26-30">26-30 years</SelectItem>
              <SelectItem value="31-35">31-35 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onProfileClick(user)}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.age} years</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {user.profession}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {user.education}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-sm line-clamp-2">{user.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
          <p className="text-gray-600">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

const ProfileDetailPage = ({ 
  user, 
  onBack, 
  onExpressInterest 
}: { 
  user: User; 
  onBack: () => void; 
  onExpressInterest: () => void;
}) => {
  const { currentUser } = useApp();
  
  // Check Gothram compatibility
  const isGothramCompatible = !currentUser || currentUser.gothram !== user.gothram;
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button onClick={onBack} variant="ghost" className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Profiles
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Image */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="w-full h-80 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                <User className="w-24 h-24 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                {user.age} years old
              </div>
              
              {/* Gothram Compatibility Alert */}
              {!isGothramCompatible && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <div className="flex items-center">
                    <div className="text-red-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Gothram Compatibility Issue</h3>
                      <p className="text-sm text-red-700 mt-1">Same Gothram match not recommended in Hindu tradition</p>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={onExpressInterest} 
                className="w-full"
                disabled={!isGothramCompatible}
              >
                <Heart className="w-4 h-4 mr-2" />
                {isGothramCompatible ? 'Express Interest' : 'Not Compatible'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Profession</label>
                  <p className="text-gray-900">{user.profession}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-gray-900">{user.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Education</label>
                  <p className="text-gray-900">{user.education}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Height</label>
                  <p className="text-gray-900">{user.height}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Income</label>
                  <p className="text-gray-900">{user.income}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Family Type</label>
                  <p className="text-gray-900">{user.familyType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Religious Information */}
          <Card>
            <CardHeader>
              <CardTitle>Religious Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Religion</label>
                  <p className="text-gray-900">{user.religion}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Caste</label>
                  <p className="text-gray-900">{user.caste}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Sub Caste</label>
                  <p className="text-gray-900">{user.subCaste}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Gothram</label>
                  <p className="text-gray-900">{user.gothram}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card>
            <CardHeader>
              <CardTitle>Family Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Father's Occupation</label>
                  <p className="text-gray-900">{user.fatherOccupation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Mother's Occupation</label>
                  <p className="text-gray-900">{user.motherOccupation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Siblings</label>
                  <p className="text-gray-900">{user.siblings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio and Interests */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Bio</label>
                  <p className="text-gray-900 mt-1">{user.bio}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Hobbies</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.hobbies.map((hobby, index) => (
                      <span key={index} className="bg-pink-100 text-pink-800 px-2 py-1 rounded-md text-sm">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Partner Expectations</label>
                  <p className="text-gray-900 mt-1">{user.expectations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const InterestModal = ({ 
  isOpen, 
  onClose, 
  user, 
  onPayment 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  user: User | null; 
  onPayment: () => void;
}) => {
  if (!user) return null;

  const mediator = {
    area: user.location + " Central",
    name: "Mrs. Lakshmi Devi"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-primary">
            Express Interest
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-6">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-lg font-medium text-green-800">
                You're interested in <span className="font-bold">{user.name}</span>
              </p>
              <p className="text-sm text-green-600 mt-1">
                {user.age} years • {user.profession} • {user.location}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Mediator Information</p>
                  <p className="text-sm text-muted-foreground">Area: {mediator.area}</p>
                  <p className="text-sm text-muted-foreground">Name: {mediator.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-800">₹199</p>
              <p className="text-sm text-orange-700">One-time connection fee</p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button onClick={onPayment} className="w-full" size="lg">
              Proceed to Payment - ₹199
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  userName, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  amount: number; 
  userName: string; 
  onSuccess: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onClose();
    onSuccess();
    
    toast({
      title: "🎉 Payment Successful!",
      description: `Interest expressed for ${userName}. Mediator will contact you within 24 hours.`,
      duration: 6000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Complete Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-800">₹{amount}</p>
              <p className="text-sm text-blue-700">Connection fee for {userName}</p>
            </CardContent>
          </Card>

          <Button 
            onClick={handlePayment}
            className="w-full"
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Payment...
              </div>
            ) : (
              'Pay with Razorpay'
            )}
          </Button>

          <Button onClick={onClose} variant="ghost" className="w-full" disabled={isProcessing}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MyMatchesPage = () => {
  const { matches } = useApp();

  if (matches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
          <p className="text-gray-600">Express interest in profiles to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Matches</h1>
      
      <div className="space-y-6">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{match.user.name}</h3>
                    <p className="text-gray-600">{match.user.age} years • {match.user.profession}</p>
                    <p className="text-sm text-gray-500">Mediator: {match.mediator.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    match.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                    match.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">₹{match.amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const { matches, payments, commissions, setCommissions } = useApp();

  const handleCommissionPayout = (commissionId: string) => {
    setCommissions(commissions.map(commission => 
      commission.id === commissionId 
        ? { ...commission, status: 'paid' as const }
        : commission
    ));
  };

  const getRevenueReport = () => {
    const totalRevenue = payments.reduce((sum, payment) => 
      payment.status === 'completed' ? sum + payment.amount : sum, 0
    );
    const totalCommissions = commissions.reduce((sum, commission) => sum + commission.amount, 0);
    const netRevenue = totalRevenue - totalCommissions;
    
    return { totalRevenue, totalCommissions, netRevenue };
  };

  const getSuccessReport = () => {
    const totalMatches = matches.length;
    const successfulMatches = matches.filter(match => match.status === 'accepted').length;
    const successRate = totalMatches > 0 ? (successfulMatches / totalMatches) * 100 : 0;
    
    return { totalMatches, successfulMatches, successRate };
  };

  const getAreaWiseReport = () => {
    const areaStats = matches.reduce((acc, match) => {
      const area = match.mediator.area;
      if (!acc[area]) {
        acc[area] = { total: 0, successful: 0 };
      }
      acc[area].total++;
      if (match.status === 'accepted') {
        acc[area].successful++;
      }
      return acc;
    }, {} as Record<string, { total: number; successful: number }>);
    
    return Object.entries(areaStats).map(([area, stats]) => ({
      area,
      total: stats.total,
      successful: stats.successful,
      successRate: stats.total > 0 ? (stats.successful / stats.total) * 100 : 0
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} className="w-full">
        <TabsList activeTab={activeTab} setActiveTab={setActiveTab}>
          <TabsTrigger value="matches" activeTab={activeTab} setActiveTab={setActiveTab}>Match Management</TabsTrigger>
          <TabsTrigger value="payments" activeTab={activeTab} setActiveTab={setActiveTab}>Payments</TabsTrigger>
          <TabsTrigger value="commissions" activeTab={activeTab} setActiveTab={setActiveTab}>Commissions</TabsTrigger>
          <TabsTrigger value="reports" activeTab={activeTab} setActiveTab={setActiveTab}>Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Match Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Match ID</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Profile</th>
                      <th className="text-left p-4">Mediator</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match) => (
                      <tr key={match.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{match.id}</td>
                        <td className="p-4">Current User</td>
                        <td className="p-4">{match.user.name}</td>
                        <td className="p-4">{match.mediator.name}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            match.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                            match.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {match.status}
                          </span>
                        </td>
                        <td className="p-4">₹{match.amount}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Payment ID</th>
                      <th className="text-left p-4">Match ID</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Gateway</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{payment.id}</td>
                        <td className="p-4">{payment.matchId}</td>
                        <td className="p-4">{payment.userName}</td>
                        <td className="p-4">₹{payment.amount}</td>
                        <td className="p-4">{payment.gateway}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="p-4">{payment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Mediator Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Commission ID</th>
                      <th className="text-left p-4">Mediator</th>
                      <th className="text-left p-4">Area</th>
                      <th className="text-left p-4">Match ID</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((commission) => (
                      <tr key={commission.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{commission.id}</td>
                        <td className="p-4">{commission.mediatorName}</td>
                        <td className="p-4">{commission.area}</td>
                        <td className="p-4">{commission.matchId}</td>
                        <td className="p-4">₹{commission.amount}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            commission.status === 'paid' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {commission.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {commission.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleCommissionPayout(commission.id)}
                            >
                              <DollarSign className="w-4 h-4 mr-1" />
                              Pay
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" activeTab={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Report</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const report = getRevenueReport();
                  return (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-semibold">₹{report.totalRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Commissions:</span>
                        <span className="font-semibold">₹{report.totalCommissions}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Net Revenue:</span>
                        <span className="font-bold text-green-600">₹{report.netRevenue}</span>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Report</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const report = getSuccessReport();
                  return (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Matches:</span>
                        <span className="font-semibold">{report.totalMatches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Successful:</span>
                        <span className="font-semibold text-green-600">{report.successfulMatches}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Success Rate:</span>
                        <span className="font-bold">{report.successRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Area-wise Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getAreaWiseReport().slice(0, 3).map((area, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between">
                        <span className="truncate">{area.area}</span>
                        <span className="font-semibold">{area.successRate.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Area-wise Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Area</th>
                      <th className="text-left p-4">Total Matches</th>
                      <th className="text-left p-4">Successful Matches</th>
                      <th className="text-left p-4">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAreaWiseReport().map((area, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4">{area.area}</td>
                        <td className="p-4">{area.total}</td>
                        <td className="p-4">{area.successful}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className="mr-2">{area.successRate.toFixed(1)}%</span>
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-green-500 rounded-full"
                                style={{ width: `${area.successRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const HelpFAQPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & FAQ</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How does the matrimony service work?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Browse profiles, express interest by paying a small fee, and our mediators will facilitate the connection between families.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What is the connection fee?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              The connection fee is ₹199 per profile. This helps us maintain quality service and compensate our mediators.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How do mediators work?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Our trained mediators contact both families within 24 hours to facilitate introductions and arrange meetings if both parties are interested.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main App Component
const SingleMatrimonyApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { isAuthenticated, matches, setMatches } = useApp();
  const { toast } = useToast();

  const handleProfileClick = (user: User) => {
    setSelectedUser(user);
    setCurrentPage('profile');
  };

  const handleExpressInterest = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to express interest in profiles",
        variant: "destructive",
      });
      return;
    }
    setShowInterestModal(true);
  };

  const handlePayment = () => {
    setShowInterestModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedUser) {
      const newMatch = {
        id: Date.now().toString(),
        user: selectedUser,
        status: 'sent' as const,
        mediator: { 
          area: selectedUser.location + " Central", 
          name: "Mrs. Lakshmi Devi" 
        },
        amount: 199,
        date: new Date().toISOString().split('T')[0],
      };
      setMatches([newMatch, ...matches]);
    }
    setCurrentPage('matches');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onProfileClick={handleProfileClick} />;
      case 'profile':
        return selectedUser ? (
          <ProfileDetailPage 
            user={selectedUser}
            onBack={() => setCurrentPage('home')}
            onExpressInterest={handleExpressInterest}
          />
        ) : null;
      case 'matches':
        return <MyMatchesPage />;
      case 'help':
        return <HelpFAQPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage onProfileClick={handleProfileClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      
      <InterestModal 
        isOpen={showInterestModal}
        onClose={() => setShowInterestModal(false)}
        user={selectedUser}
        onPayment={handlePayment}
      />
      
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={199}
        userName={selectedUser?.name || ''}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

// Root App with Provider
const App = () => {
  return (
    <AppProvider>
      <SingleMatrimonyApp />
    </AppProvider>
  );
};

export default App;
