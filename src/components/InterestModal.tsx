
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, User, CreditCard } from 'lucide-react';
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Mediator Information</p>
                  <p className="text-sm text-muted-foreground">Area: {mediator.area}</p>
                  <p className="text-sm text-muted-foreground">Contact will be shared after confirmation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-800">₹199</p>
              <p className="text-sm text-orange-700">Connection Fee</p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button 
              onClick={onPayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              Proceed to Payment
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
