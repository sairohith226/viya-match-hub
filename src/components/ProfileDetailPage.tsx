
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Users, Heart, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface ProfileDetailPageProps {
  user: User;
  onBack: () => void;
  onExpressInterest: () => void;
}

const ProfileDetailPage = ({ user, onBack, onExpressInterest }: ProfileDetailPageProps) => {
  // Gothram compatibility logic
  const currentUserGothram = "Bharadwaj"; // This would come from logged-in user
  const isGothramCompatible = user.gothram !== currentUserGothram;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profiles
        </Button>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={user.photo} 
                    alt={user.name}
                    className="w-32 h-32 rounded-lg object-cover border-2 border-border"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-foreground mb-2">{user.name}</h1>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{user.profession} • {user.age} years</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">{user.gender}</Badge>
                    <Badge variant="outline">{user.gothram} Gothram</Badge>
                    {isGothramCompatible ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Compatible Gothram ✓
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        Same Gothram ✗
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gothram Compatibility Warning */}
          {!isGothramCompatible && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Same Gothram Match</p>
                    <p className="text-sm">According to traditional customs, same Gothram marriages are not recommended.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{user.education}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Family
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{user.family}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{user.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Partner Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{user.preferences}</p>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="sticky bottom-4">
            <Button 
              onClick={onExpressInterest}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
              size="lg"
              disabled={!isGothramCompatible}
            >
              {isGothramCompatible ? 'Express Interest - ₹199' : 'Cannot Express Interest (Same Gothram)'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
