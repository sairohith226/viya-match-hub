
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Heart, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { User } from '../types';

interface HomePageProps {
  onProfileClick: (user: User) => void;
}

const HomePage = ({ onProfileClick }: HomePageProps) => {
  const { allUsers, isAuthenticated } = useApp();
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
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Your Perfect Match</h1>
          <p className="text-muted-foreground">Discover meaningful connections through our trusted matrimonial platform</p>
        </div>

        {/* Search and Filters */}
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
            <select
              value={filterProfession}
              onChange={(e) => setFilterProfession(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Professions</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Teacher">Teacher</option>
              <option value="Software">Software</option>
              <option value="CA">CA</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted-foreground">{filteredUsers.length} profiles found</p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={user.photo} 
                  alt={user.name}
                  className="w-full h-32 object-cover object-center"
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

export default HomePage;
