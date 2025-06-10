
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Users, Heart, AlertCircle, Phone, Mail } from 'lucide-react';
import { User } from '../types';

interface ProfileDetailPageProps {
  user: User;
  onBack: () => void;
  onExpressInterest: () => void;
}

const ProfileDetailPage = ({ user, onBack, onExpressInterest }: ProfileDetailPageProps) => {
  // Gothram compatibility logic (simulate logged user's gothram)
  const currentUserGothram = "Bharadwaj"; // This would come from logged-in user
  const isGothramCompatible = user.gothram !== currentUserGothram;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
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

          {/* Gothram Compatibility Warning */}
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
                    <p className="text-red-600 text-sm">
                      This restriction helps maintain cultural traditions and community guidelines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Information */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education & Career
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Education</h4>
                  <p className="text-muted-foreground">{user.education}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Profession</h4>
                  <p className="text-muted-foreground">{user.profession}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground">{user.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Family Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Family Details</h4>
                  <p className="text-muted-foreground">{user.family}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Gothram</h4>
                  <p className="text-muted-foreground">{user.gothram}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Partner Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{user.preferences}</p>
              </CardContent>
            </Card>
          </div>

          {/* Interest Express Section */}
          {isGothramCompatible && (
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Interested in {user.name}?
                </h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Express your interest and our experienced mediator will contact both families 
                  within 24 hours to facilitate further discussions.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-muted-foreground">Connection Fee:</span>
                    <span className="text-2xl font-bold text-primary">₹199</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    One-time fee • Full refund if no response within 7 days
                  </p>
                </div>
                <Button 
                  onClick={onExpressInterest}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Express Interest Now
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
