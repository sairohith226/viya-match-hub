
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Calendar, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MyMatchesPage = () => {
  const { matches } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_discussion': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'finalized': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'Interest Sent';
      case 'under_discussion': return 'Under Discussion';
      case 'finalized': return 'Match Confirmed';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const sentMatches = matches.filter(m => m.status === 'sent' || m.status === 'under_discussion');
  const confirmedMatches = matches.filter(m => m.status === 'finalized');
  const rejectedMatches = matches.filter(m => m.status === 'rejected');

  const MatchCard = ({ match }: { match: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img 
            src={match.user.photo} 
            alt={match.user.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{match.user.name}</h3>
              <Badge className={getStatusColor(match.status)}>
                {getStatusText(match.status)}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{match.user.location} • {match.user.age} years</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Interest sent on {new Date(match.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Mediator: {match.mediator.area}</span>
              </div>
              {match.mediator.contact && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{match.mediator.contact}</span>
                </div>
              )}
            </div>
            {match.feedback && (
              <div className="mt-2 p-2 bg-muted rounded text-sm">
                <strong>Feedback:</strong> {match.feedback}
              </div>
            )}
            <div className="mt-3 text-sm font-medium">
              Amount Paid: ₹{match.amount}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">My Matches</h1>
        
        <Tabs defaultValue="sent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sent" className="relative">
              My Interests Sent
              {sentMatches.length > 0 && (
                <Badge className="ml-2 bg-blue-500 text-white text-xs">
                  {sentMatches.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="relative">
              Matches Confirmed
              {confirmedMatches.length > 0 && (
                <Badge className="ml-2 bg-green-500 text-white text-xs">
                  {confirmedMatches.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rejected" className="relative">
              Rejected / Pending
              {rejectedMatches.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs">
                  {rejectedMatches.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sent" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Track your sent interests and ongoing discussions
              </p>
              {sentMatches.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No interests sent yet</p>
                  </CardContent>
                </Card>
              ) : (
                sentMatches.map(match => <MatchCard key={match.id} match={match} />)
              )}
            </div>
          </TabsContent>

          <TabsContent value="confirmed" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Your confirmed matches with mediator contact details
              </p>
              {confirmedMatches.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No confirmed matches yet</p>
                  </CardContent>
                </Card>
              ) : (
                confirmedMatches.map(match => <MatchCard key={match.id} match={match} />)
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                View rejected interests with feedback when available
              </p>
              {rejectedMatches.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No rejected matches</p>
                  </CardContent>
                </Card>
              ) : (
                rejectedMatches.map(match => <MatchCard key={match.id} match={match} />)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyMatchesPage;
