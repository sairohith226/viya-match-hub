
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Briefcase, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { User } from '../types';

interface HomePageProps {
  onProfileClick: (user: User) => void;
}

const HomePage = ({ onProfileClick }: HomePageProps) => {
  const { allUsers, isAuthenticated } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [professionFilter, setProfessionFilter] = useState('all');

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || user.location === locationFilter;
    const matchesProfession = professionFilter === 'all' || user.profession === professionFilter;
    
    return matchesSearch && matchesLocation && matchesProfession && !user.isHidden;
  });

  const locations = [...new Set(allUsers.map(user => user.location))];
  const professions = [...new Set(allUsers.map(user => user.profession))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Find Your Perfect Match
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Traditional matrimony with modern convenience
          </p>
          
          {!isAuthenticated && (
            <Card className="max-w-md mx-auto bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <p className="text-blue-800 font-medium">
                  Login to express interest and connect with potential matches
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by name or profession..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={professionFilter} onValueChange={setProfessionFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Professions</SelectItem>
                    {professions.map(profession => (
                      <SelectItem key={profession} value={profession}>{profession}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredUsers.length} profile{filteredUsers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <Card key={user.id} className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-0">
                <div onClick={() => onProfileClick(user)}>
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img 
                      src={user.photo} 
                      alt={user.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {user.age} years
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{user.profession}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        {user.gothram}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {user.gender}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {user.bio}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    onClick={() => onProfileClick(user)}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card className="text-center p-8">
            <CardContent>
              <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No profiles found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomePage;
