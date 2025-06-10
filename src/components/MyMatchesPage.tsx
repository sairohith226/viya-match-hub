
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Calendar, Heart, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MyMatchesPage = () => {
  const { matches } = useApp();
  const [activeTab, setActiveTab] = useState<'sent' | 'confirmed' | 'rejected'>('sent');

  const getStatusIcon = (status: string) => {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Interest Sent';
      case 'under_discussion':
        return 'Under Discussion';
      case 'finalized':
        return 'Match Confirmed';
      case 'rejected':
        return 'Declined';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'under_discussion':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'finalized':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMatches = matches.filter(match => {
    switch (activeTab) {
      case 'sent':
        return match.status === 'sent' || match.status === 'under_discussion';
      case 'confirmed':
        return match.status === 'finalized';
      case 'rejected':
        return match.status === 'rejected';
      default:
        return false;
    }
  });

  const tabs = [
    { id: 'sent', label: 'My Interests Sent', count: matches.filter(m => m.status === 'sent' || m.status === 'under_discussion').length },
    { id: 'confirmed', label: 'Matches Confirmed', count: matches.filter(m => m.status === 'finalized').length },
    { id: 'rejected', label: 'Rejected / Pending', count: matches.filter(m => m.status === 'rejected').length }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Matches</h1>
          <p className="text-muted-foreground">Track all your match interests and their current status</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

        {/* Matches List */}
        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {activeTab === 'sent' && 'No interests sent yet'}
                  {activeTab === 'confirmed' && 'No confirmed matches yet'}
                  {activeTab === 'rejected' && 'No rejected matches'}
                </h3>
                <p className="text-muted-foreground">
                  {activeTab === 'sent' && 'Start browsing profiles and express your interest!'}
                  {activeTab === 'confirmed' && 'Keep exploring to find your perfect match!'}
                  {activeTab === 'rejected' && 'Don\'t worry, keep trying!'}
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
                          {match.mediator.contact && match.status === 'finalized' && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-medium">{match.mediator.contact}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {match.status === 'sent' && (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-700">
                            ⏳ Your interest has been sent. The mediator will contact both families within 24 hours.
                          </p>
                        </div>
                      )}

                      {match.status === 'under_discussion' && (
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                          <p className="text-sm text-orange-700">
                            💬 Great news! Both families are interested. The mediator is facilitating further discussions.
                          </p>
                        </div>
                      )}

                      {match.status === 'finalized' && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700">
                            🎉 Congratulations! This match has been confirmed. You can now contact the mediator directly.
                          </p>
                        </div>
                      )}

                      {match.status === 'rejected' && match.feedback && (
                        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                          <p className="text-sm text-red-700">
                            <strong>Feedback:</strong> {match.feedback}
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

export default MyMatchesPage;
