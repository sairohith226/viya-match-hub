
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Shield, CheckCircle, Loader2 } from 'lucide-react';
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
  const [selectedMethod, setSelectedMethod] = useState<'razorpay' | 'stripe' | null>(null);
  const { toast } = useToast();

  const handlePayment = async (method: 'razorpay' | 'stripe') => {
    setIsProcessing(true);
    setSelectedMethod(method);
    
    // Simulate API call to payment gateway
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setIsProcessing(false);
      onClose();
      onSuccess();
      
      toast({
        title: "🎉 Payment Successful!",
        description: `Interest expressed for ${userName}. Mediator will contact you within 24 hours. Check 'My Matches' for updates.`,
        duration: 6000,
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
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
              {isProcessing && selectedMethod === 'razorpay' ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <>
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTJIMjJNMTIgMkwyIDEyTDEyIDIyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" 
                    alt="Razorpay" 
                    className="w-5 h-5 mr-2" 
                  />
                  Pay with Razorpay
                </>
              )}
            </Button>

            <Button 
              onClick={() => handlePayment('stripe')}
              variant="outline"
              className="w-full border-2 border-purple-200 hover:bg-purple-50"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing && selectedMethod === 'stripe' ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
                  Pay with Stripe
                </>
              )}
            </Button>
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-green-700">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure payment with 256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 mt-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Money-back guarantee if not satisfied</span>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-muted-foreground">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </div>

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
