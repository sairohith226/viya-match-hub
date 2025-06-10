
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  userName: string;
  onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, amount, userName, onSuccess }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async (method: 'razorpay' | 'stripe') => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      onSuccess();
      toast({
        title: "Payment Successful! 🎉",
        description: `Interest expressed for ${userName}. Check 'My Matches' for updates.`,
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
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
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay with Razorpay
                </>
              )}
            </Button>

            <Button 
              onClick={() => handlePayment('stripe')}
              variant="outline"
              className="w-full border-2"
              size="lg"
              disabled={isProcessing}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay with Stripe
            </Button>
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-green-700">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure payment powered by SSL encryption</span>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={onClose}
            variant="ghost"
            className="w-full"
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
