
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Phone, Mail, AlertCircle } from 'lucide-react';

const HelpFAQPage = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Support & FAQ</h1>
          <p className="text-muted-foreground">Everything you need to know about Viya</p>
        </div>

        {/* About Viya */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              What is Viya?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Viya is a traditional matrimonial platform that connects families through verified mediators. 
              We focus on bringing together compatible matches while respecting cultural traditions and values, 
              particularly Gothram compatibility which is essential in traditional Indian marriages.
            </p>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              How does Mediator Matching work?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800">1</Badge>
                <p className="text-sm text-muted-foreground">Browse verified profiles and find potential matches</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800">2</Badge>
                <p className="text-sm text-muted-foreground">Express interest by paying ₹199 connection fee</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800">3</Badge>
                <p className="text-sm text-muted-foreground">Our local mediator facilitates the introduction</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800">4</Badge>
                <p className="text-sm text-muted-foreground">If both parties agree, full contact details are shared</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Accordion */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="gothram">
                <AccordionTrigger>Can I change my Gothram after registration?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    No, Gothram cannot be changed after registration as it's a permanent family lineage identifier. 
                    If you made an error during registration, please contact our support team for assistance.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment">
                <AccordionTrigger>What happens after I pay the ₹199 connection fee?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    After payment, our local mediator will reach out to the interested party's family. 
                    If there's mutual interest, you'll receive the mediator's contact details to proceed with formal introductions.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="refund">
                <AccordionTrigger>Is the connection fee refundable?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    The ₹199 connection fee is non-refundable as it covers the mediator's service charges. 
                    However, if there's a technical error from our side, we'll process a full refund.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy">
                <AccordionTrigger>How is my privacy protected?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Your contact details are only shared after both parties express mutual interest through the mediator. 
                    You can also hide your profile from search results in your settings.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mediator">
                <AccordionTrigger>How are mediators selected?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    All mediators are verified community members with good reputation in their local areas. 
                    They are trained to handle family introductions with cultural sensitivity and discretion.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Community Rules */}
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="w-5 h-5" />
              Community Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-orange-800">
              <p>• Same Gothram marriages are not allowed as per traditional customs</p>
              <p>• All profiles must be genuine with verified information</p>
              <p>• Respectful communication is mandatory</p>
              <p>• Multiple account creation is prohibited</p>
              <p>• Commercial use of the platform is strictly forbidden</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              How to reach support?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@viya.com (Response within 24 hours)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+91 80000 12345 (Mon-Sat, 9 AM - 6 PM)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpFAQPage;
