
import React, { useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import ProfileDetailPage from '../components/ProfileDetailPage';
import MyMatchesPage from '../components/MyMatchesPage';
import HelpFAQPage from '../components/HelpFAQPage';
import AdminDashboard from '../components/AdminDashboard';
import InterestModal from '../components/InterestModal';
import PaymentModal from '../components/PaymentModal';
import { User } from '../types';
import { useToast } from '@/hooks/use-toast';

const AppContent = () => {
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

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
