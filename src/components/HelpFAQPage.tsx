
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Heart, Users, Shield, Phone, Mail, MessageCircle } from 'lucide-react';

const HelpFAQPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Viya?",
      answer: "Viya is a trusted matrimonial platform that connects families through experienced mediators. We focus on traditional values while embracing modern technology to help you find your perfect life partner. Our platform ensures genuine profiles and facilitates meaningful connections through verified mediators in your local area."
    },
    {
      question: "How does Mediator Matching work?",
      answer: "When you express interest in a profile, our local mediator contacts both families within 24 hours. The mediator facilitates initial discussions, shares family backgrounds, and helps arrange meetings if both parties are interested. This traditional approach ensures family involvement and cultural compatibility throughout the process."
    },
    {
      question: "Can I change my Gothram?",
      answer: "No, Gothram cannot be changed as it's a hereditary lineage passed down through generations. This information is crucial for ensuring compatibility according to traditional customs. Our platform automatically prevents matches between the same Gothram to respect community guidelines."
    },
    {
      question: "Why is there a ₹199 connection fee?",
      answer: "The connection fee covers mediator services, profile verification, and platform maintenance. This small fee ensures serious intent from both parties and helps maintain the quality of our service. If no response is received within 7 days, we offer a full refund."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take privacy seriously. Your contact information is only shared after mutual interest is confirmed through our mediator. All payments are processed securely, and we never share your data with third parties without your consent."
    },
    {
      question: "How long does the matching process take?",
      answer: "Initial mediator contact happens within 24 hours of expressing interest. The overall process depends on family discussions and mutual interest levels. Most successful matches progress to family meetings within 2-4 weeks."
    }
  ];

  const supportOptions = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+91 98765 43210",
      hours: "Mon-Sat, 9 AM - 7 PM"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      description: "Send us your queries anytime",
      contact: "support@viya.com",
      hours: "Response within 24 hours"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      hours: "Mon-Fri, 10 AM - 6 PM"
    }
  ];

  const communityRules = [
    {
      title: "Same Gothram Marriage Not Allowed",
      description: "According to traditional customs, marriages within the same Gothram are not permitted. Our platform automatically prevents such matches.",
      severity: "high"
    },
    {
      title: "Genuine Profiles Only",
      description: "All profiles are verified. Fake information or misrepresentation will result in immediate account suspension.",
      severity: "high"
    },
    {
      title: "Respectful Communication",
      description: "Maintain dignity and respect in all interactions. Harassment or inappropriate behavior is strictly prohibited.",
      severity: "medium"
    },
    {
      title: "Family Involvement",
      description: "Our platform encourages family participation in the matrimonial process, respecting traditional values.",
      severity: "low"
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
          <p className="text-muted-foreground">Everything you need to know about using Viya</p>
        </div>

        {/* About Viya Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              About Viya Matrimonial Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Viya is more than just a matrimonial website – we're your trusted partner in finding a life companion. 
                Our platform combines traditional matchmaking wisdom with modern technology to create meaningful connections.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Expert Mediators</h3>
                  <p className="text-sm text-muted-foreground">Experienced local mediators facilitate connections</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Verified Profiles</h3>
                  <p className="text-sm text-muted-foreground">All profiles are thoroughly verified for authenticity</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Traditional Values</h3>
                  <p className="text-sm text-muted-foreground">Respecting customs and family involvement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Rules */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Community Rules & Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={rule.severity === 'high' ? 'destructive' : rule.severity === 'medium' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {rule.severity === 'high' ? 'Important' : rule.severity === 'medium' ? 'Required' : 'Guideline'}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{rule.title}</h3>
                    <p className="text-muted-foreground text-sm">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>How to reach support?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {supportOptions.map((option, index) => (
                <div key={index} className="text-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {option.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                  <p className="text-sm font-medium text-foreground">{option.contact}</p>
                  <p className="text-xs text-muted-foreground mt-1">{option.hours}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Need immediate help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For urgent matters or technical issues, please call our support hotline. 
                Our team is committed to resolving your concerns promptly.
              </p>
              <Button className="w-full md:w-auto">
                <Phone className="w-4 h-4 mr-2" />
                Call Support Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpFAQPage;
