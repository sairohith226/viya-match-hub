
import React, { useState, createContext, useContext } from 'react';
import { Heart, MapPin, Briefcase, Search, Filter, ArrowLeft, GraduationCap, Users, AlertCircle, Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Clock, CheckCircle, XCircle, CreditCard, Shield, Loader2, User, Calendar, IndianRupee, TrendingUp, Eye, Edit, BarChart3, FileText } from 'lucide-react';

// Types
interface User {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  education: string;
  family: string;
  gothram: string;
  gender: 'male' | 'female';
  bio: string;
  preferences: string;
  photo: string;
  isHidden?: boolean;
}

interface Match {
  id: string;
  user: User;
  status: 'sent' | 'under_discussion' | 'finalized' | 'rejected';
  mediator: {
    area: string;
    name: string;
    contact?: string;
  };
  amount: number;
  date: string;
  feedback?: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  currentUser: User | null;
  allUsers: User[];
  matches: Match[];
  setMatches: (matches: Match[]) => void;
}

// Mock Data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    profession: 'Software Engineer',
    location: 'Bangalore',
    education: 'B.Tech in Computer Science',
    family: 'Nuclear family, father is a businessman, mother is a teacher',
    gothram: 'Bharadwaj',
    gender: 'female',
    bio: 'I am a passionate software engineer who loves to code and create innovative solutions.',
    preferences: 'Looking for a partner who is understanding, supportive, and shares similar values.',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Arjun Reddy',
    age: 29,
    profession: 'Doctor',
    location: 'Hyderabad',
    education: 'MBBS, MD',
    family: 'Joint family, traditional values',
    gothram: 'Kashyap',
    gender: 'male',
    bio: 'Dedicated doctor with a passion for helping others and making a difference in healthcare.',
    preferences: 'Seeking a life partner who values family and has a caring nature.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Anita Patel',
    age: 24,
    profession: 'Teacher',
    location: 'Mumbai',
    education: 'B.Ed, M.A. in English',
    family: 'Small family, very close-knit',
    gothram: 'Vasishta',
    gender: 'female',
    bio: 'Passionate educator who believes in shaping young minds and creating a better future.',
    preferences: 'Looking for someone who respects education and family values.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    age: 31,
    profession: 'CA',
    location: 'Delhi',
    education: 'CA, B.Com',
    family: 'Traditional Rajput family',
    gothram: 'Bharadwaj',
    gender: 'male',
    bio: 'Chartered Accountant with strong analytical skills and a love for financial planning.',
    preferences: 'Seeking a partner who values honesty and has good family background.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Meera Krishnan',
    age: 27,
    profession: 'Software Developer',
    location: 'Pune',
    education: 'B.Tech in IT',
    family: 'South Indian family, traditional yet modern',
    gothram: 'Atri',
    gender: 'female',
    bio: 'Tech enthusiast who loves solving complex problems and learning new technologies.',
    preferences: 'Looking for someone who is ambitious and supportive of career goals.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
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

// UI Components
const Button = ({ children, className = '', variant = 'default', size = 'default', disabled = false, onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  };

  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={() => onOpenChange(false)} />
      <div className="relative bg-background p-6 rounded-lg shadow-lg border max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <XCircle className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

const DialogTitle = ({ children, className = '' }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h2>
);

const DialogContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const Tabs = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = '', activeTab, setActiveTab }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value
        ? 'bg-background text-foreground shadow-sm'
        : 'text-muted-foreground'
    }`}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab }) => {
  if (activeTab !== value) return null;
  
  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      {children}
    </div>
  );
};

const Table = ({ children, className = '' }) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, className = '' }) => (
  <thead className={`[&_tr]:border-b ${className}`}>
    {children}
  </thead>
);

const TableBody = ({ children, className = '' }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
);

const TableRow = ({ children, className = '' }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
    {children}
  </tr>
);

const TableHead = ({ children, className = '' }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);

// Toast Hook
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant = 'default', duration = 5000 }) => {
    const id = Date.now();
    const newToast = { id, title, description, variant };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return { toast, toasts };
};

// Components
const Header = ({ currentPage, onNavigate }) => {
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

const HomePage = ({ onProfileClick }) => {
  const { allUsers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterProfession, setFilterProfession] = useState('');

  const filteredUsers = allUsers.filter(user => {
    if (user.isHidden) return false;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || user.location.includes(filterLocation);
    const matchesProfession = !filterProfession || user.profession.includes(filterProfession);
    return matchesSearch && matchesLocation && matchesProfession;
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Your Perfect Match</h1>
          <p className="text-muted-foreground">Discover meaningful connections through our trusted matrimonial platform</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or profession..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">{filteredUsers.length} profiles found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={user.photo} 
                  alt={user.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-background/80 text-foreground">
                    {user.age} years
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{user.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{user.profession}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">{user.gothram} Gothram</Badge>
                  <Badge variant="outline">{user.gender}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{user.bio}</p>
                <Button 
                  onClick={() => onProfileClick(user)}
                  className="w-full"
                  variant="outline"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No profiles found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileDetailPage = ({ user, onBack, onExpressInterest }) => {
  const currentUserGothram = "Bharadwaj";
  const isGothramCompatible = user.gothram !== currentUserGothram;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profiles
        </Button>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={user.photo} 
                    alt={user.name}
                    className="w-56 h-56 rounded-lg object-cover object-center border-2 border-border mx-auto lg:mx-0"
                  />
                  <div className="mt-4 text-center lg:text-left">
                    <Button 
                      onClick={onExpressInterest}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                      size="lg"
                      disabled={!isGothramCompatible}
                    >
                      {isGothramCompatible ? (
                        <>
                          <Heart className="w-4 h-4 mr-2" />
                          Express Interest - ₹199
                        </>
                      ) : (
                        'Cannot Express Interest'
                      )}
                    </Button>
                    {!isGothramCompatible && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Same Gothram match not allowed
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-lg font-medium">{user.age} years</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          <span>{user.profession}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{user.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm">
                          {user.gender === 'male' ? '👨 Male' : '👩 Female'}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          {user.gothram} Gothram
                        </Badge>
                        {isGothramCompatible ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-sm">
                            ✓ Compatible Gothram
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="text-sm">
                            ✗ Same Gothram
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground text-base leading-relaxed">{user.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isGothramCompatible && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-red-800">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Same Gothram Match Detected</h3>
                    <p className="text-red-700 mb-2">
                      According to traditional customs and community rules, marriages within the same Gothram 
                      ({user.gothram}) are not recommended and therefore not permitted on our platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const InterestModal = ({ isOpen, onClose, user, onPayment }) => {
  if (!user) return null;

  const mediator = {
    area: user.location + " Central",
    name: "Mrs. Lakshmi Devi"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-primary">
            Express Interest
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
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

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-800">₹199</p>
              <p className="text-sm text-orange-700">One-time connection fee</p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button 
              onClick={onPayment}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              size="lg"
            >
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

const PaymentModal = ({ isOpen, onClose, amount, userName, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { toast } = useToast();

  const handlePayment = async (method) => {
    setIsProcessing(true);
    setSelectedMethod(method);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsProcessing(false);
      onClose();
      onSuccess();
      
      toast({
        title: "🎉 Payment Successful!",
        description: `Interest expressed for ${userName}. Mediator will contact you within 24 hours.`,
        duration: 6000,
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-primary">
            Complete Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-800">₹{amount}</p>
              <p className="text-sm text-blue-700">Connection fee for {userName}</p>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={() => handlePayment('razorpay')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing && selectedMethod === 'razorpay' ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                'Pay with Razorpay'
              )}
            </Button>

            <Button 
              onClick={() => handlePayment('stripe')}
              variant="outline"
              className="w-full border-2 border-purple-200 hover:bg-purple-50"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing && selectedMethod === 'stripe' ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
                  Pay with Stripe
                </>
              )}
            </Button>
          </div>

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
  const [activeTab, setActiveTab] = useState('sent');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'under_discussion':
        return <Heart className="w-4 h-4 text-blue-500" />;
      case 'finalized':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'sent': return 'Interest Sent';
      case 'under_discussion': return 'Under Discussion';
      case 'finalized': return 'Match Confirmed';
      case 'rejected': return 'Declined';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'under_discussion': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'finalized': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMatches = matches.filter(match => {
    switch (activeTab) {
      case 'sent': return match.status === 'sent' || match.status === 'under_discussion';
      case 'confirmed': return match.status === 'finalized';
      case 'rejected': return match.status === 'rejected';
      default: return false;
    }
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Matches</h1>
          <p className="text-muted-foreground">Track all your match interests and their current status</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
          {[
            { id: 'sent', label: 'My Interests Sent', count: matches.filter(m => m.status === 'sent' || m.status === 'under_discussion').length },
            { id: 'confirmed', label: 'Matches Confirmed', count: matches.filter(m => m.status === 'finalized').length },
            { id: 'rejected', label: 'Rejected / Pending', count: matches.filter(m => m.status === 'rejected').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No matches found
                </h3>
                <p className="text-muted-foreground">
                  Start browsing profiles and express your interest!
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMatches.map((match) => (
              <Card key={match.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={match.user.photo} 
                        alt={match.user.name}
                        className="w-20 h-20 rounded-lg object-cover border-2 border-border"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{match.user.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span>{match.user.age} years</span>
                            <span>•</span>
                            <span>{match.user.profession}</span>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{match.user.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(match.status)}
                          <Badge className={getStatusColor(match.status)}>
                            {getStatusText(match.status)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Interest sent:</span>
                            <span className="font-medium">{match.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Amount paid:</span>
                            <span className="font-medium">₹{match.amount}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Mediator Area:</span>
                            <span className="font-medium ml-1">{match.mediator.area}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Mediator:</span>
                            <span className="font-medium ml-1">{match.mediator.name}</span>
                          </div>
                        </div>
                      </div>

                      {match.status === 'sent' && (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-700">
                            ⏳ Your interest has been sent. The mediator will contact both families within 24 hours.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const HelpFAQPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "What is Viya?",
      answer: "Viya is a trusted matrimonial platform that connects families through experienced mediators."
    },
    {
      question: "How does Mediator Matching work?",
      answer: "When you express interest in a profile, our local mediator contacts both families within 24 hours."
    },
    {
      question: "Why is there a ₹199 connection fee?",
      answer: "The connection fee covers mediator services, profile verification, and platform maintenance."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
          <p className="text-muted-foreground">Everything you need to know about using Viya</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <Phone className="w-5 h-5 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Mail className="w-5 h-5 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@viya.com</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <MessageCircle className="w-5 h-5 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Available on website</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { allUsers, matches } = useApp();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showMatchDetail, setShowMatchDetail] = useState(false);

  const payments = [
    {
      id: 'PAY001',
      matchId: 'M001',
      userName: 'Priya Sharma',
      amount: 199,
      gateway: 'Razorpay',
      status: 'completed',
      date: '2024-06-08'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-orange-100 text-orange-800';
      case 'finalized': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage matches, payments, and mediator commissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{allUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Matches</p>
                  <p className="text-2xl font-bold">{matches.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{payments.reduce((sum, p) => sum + p.amount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="matches" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="matches">Match Management</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Match Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Target User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">M{match.id}</TableCell>
                        <TableCell>Current User</TableCell>
                        <TableCell>{match.user.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(match.status)}>
                            {match.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>₹{match.amount}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMatch(match);
                                setShowMatchDetail(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Match ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Gateway</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.matchId}</TableCell>
                        <TableCell>{payment.userName}</TableCell>
                        <TableCell>₹{payment.amount}</TableCell>
                        <TableCell>{payment.gateway}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold">This Month</h3>
                      </div>
                      <p className="text-2xl font-bold">₹398</p>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold">Success Rate</h3>
                      </div>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">This Quarter</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold">Top Area</h3>
                      </div>
                      <p className="text-lg font-bold">Bangalore</p>
                      <p className="text-sm text-muted-foreground">Most Active</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showMatchDetail} onOpenChange={setShowMatchDetail}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Match Details</DialogTitle>
            </DialogHeader>
            {selectedMatch && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">User Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedMatch.user.name}</p>
                      <p><strong>Age:</strong> {selectedMatch.user.age}</p>
                      <p><strong>Profession:</strong> {selectedMatch.user.profession}</p>
                      <p><strong>Location:</strong> {selectedMatch.user.location}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Mediator Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedMatch.mediator.name}</p>
                      <p><strong>Area:</strong> {selectedMatch.mediator.area}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Finalized
                  </Button>
                  <Button variant="outline">
                    <XCircle className="w-4 h-4 mr-2" />
                    Mark as Rejected
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Main App Component
const SingleMatrimonyApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const { toast, toasts } = useToast();

  const handleProfileClick = (user) => {
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
        status: 'sent',
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

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    allUsers: mockUsers,
    matches,
    setMatches
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
    <AppContext.Provider value={contextValue}>
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

        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`p-4 rounded-lg shadow-lg border max-w-sm ${
                toast.variant === 'destructive'
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-white border-gray-200 text-gray-800'
              }`}
            >
              <h4 className="font-semibold">{toast.title}</h4>
              <p className="text-sm">{toast.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default SingleMatrimonyApp;
