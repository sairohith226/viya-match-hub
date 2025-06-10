
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, User, CreditCard, Clock, Shield } from 'lucide-react';
import { User as UserType } from '../types';

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onPayment: () => void;
}

const InterestModal = ({ isOpen, onClose, user, onPayment }: InterestModalProps) => {
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

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Mediator Information</p>
                  <p className="text-sm text-muted-foreground">Area: {mediator.area}</p>
                  <p className="text-sm text-muted-foreground">Name: {mediator.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-orange-500" />
                    <p className="text-xs text-orange-600">Contact shared after confirmation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-800">₹199</p>
              <p className="text-sm text-orange-700">One-time connection fee</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-orange-500" />
                <p className="text-xs text-orange-600">Secure payment</p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              ✓ Mediator will contact both families within 24 hours<br/>
              ✓ Full refund if no response within 7 days<br/>
              ✓ Professional matchmaking support included
            </p>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={onPayment}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              size="lg"
            >
              Proceed to Payment - ₹199
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterestModal;
