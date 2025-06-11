
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle,
  BarChart3,
  FileText,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {
  const { allUsers, matches } = useApp();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showMatchDetail, setShowMatchDetail] = useState(false);
  const [reportType, setReportType] = useState('revenue');

  // Mock data for admin features
  const payments = [
    {
      id: 'PAY001',
      matchId: 'M001',
      userId: '1',
      userName: 'Priya Sharma',
      amount: 199,
      gateway: 'Razorpay',
      status: 'completed',
      date: '2024-06-08',
      transactionId: 'TXN123456'
    },
    {
      id: 'PAY002',
      matchId: 'M002',
      userId: '2',
      userName: 'Arjun Reddy',
      amount: 199,
      gateway: 'Stripe',
      status: 'completed',
      date: '2024-06-05',
      transactionId: 'TXN789012'
    }
  ];

  const mediatorCommissions = [
    {
      id: 'COM001',
      mediatorName: 'Mrs. Lakshmi Devi',
      area: 'Bangalore Central',
      matchId: 'M001',
      commission: 59.7, // 30% of 199
      status: 'pending',
      matchStatus: 'finalized',
      date: '2024-06-08'
    },
    {
      id: 'COM002',
      mediatorName: 'Mr. Raman Kumar',
      area: 'Hyderabad East',
      matchId: 'M002',
      commission: 59.7,
      status: 'paid',
      matchStatus: 'under_discussion',
      date: '2024-06-05'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'bg-orange-100 text-orange-800';
      case 'under_discussion':
        return 'bg-blue-100 text-blue-800';
      case 'finalized':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewMatch = (match) => {
    setSelectedMatch(match);
    setShowMatchDetail(true);
  };

  const handleStatusUpdate = (matchId, newStatus) => {
    console.log(`Updating match ${matchId} to status: ${newStatus}`);
    // Update logic would go here
  };

  const generateReport = () => {
    console.log(`Generating ${reportType} report`);
    // Report generation logic would go here
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage matches, payments, and mediator commissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{allUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Matches</p>
                  <p className="text-2xl font-bold">{matches.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{payments.reduce((sum, p) => sum + p.amount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="matches" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="matches">Match Management</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="commissions">Mediator Commissions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Match Management Tab */}
          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Match Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Target User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">M{match.id}</TableCell>
                        <TableCell>Current User</TableCell>
                        <TableCell>{match.user.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(match.status)}>
                            {match.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>₹{match.amount}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewMatch(match)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(match.id, 'finalized')}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Match ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Gateway</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.matchId}</TableCell>
                        <TableCell>{payment.userName}</TableCell>
                        <TableCell>₹{payment.amount}</TableCell>
                        <TableCell>{payment.gateway}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mediator Commissions Tab */}
          <TabsContent value="commissions">
            <Card>
              <CardHeader>
                <CardTitle>Mediator Commission Log</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commission ID</TableHead>
                      <TableHead>Mediator</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Match ID</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Match Status</TableHead>
                      <TableHead>Payout Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mediatorCommissions.map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell className="font-medium">{commission.id}</TableCell>
                        <TableCell>{commission.mediatorName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {commission.area}
                          </div>
                        </TableCell>
                        <TableCell>{commission.matchId}</TableCell>
                        <TableCell>₹{commission.commission}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(commission.matchStatus)}>
                            {commission.matchStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(commission.status)}>
                            {commission.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{commission.date}</TableCell>
                        <TableCell>
                          {commission.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              Mark Paid
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue Report</SelectItem>
                      <SelectItem value="success">Success Rate Report</SelectItem>
                      <SelectItem value="area">Area-wise Trends</SelectItem>
                      <SelectItem value="mediator">Mediator Performance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={generateReport} className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Generate Report
                  </Button>
                </div>

                {/* Sample Report Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold">This Month</h3>
                      </div>
                      <p className="text-2xl font-bold">₹398</p>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold">Success Rate</h3>
                      </div>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">This Quarter</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold">Top Area</h3>
                      </div>
                      <p className="text-lg font-bold">Bangalore</p>
                      <p className="text-sm text-muted-foreground">Most Active</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Match Detail Modal */}
        <Dialog open={showMatchDetail} onOpenChange={setShowMatchDetail}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Match Details</DialogTitle>
            </DialogHeader>
            {selectedMatch && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">User Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedMatch.user.name}</p>
                      <p><strong>Age:</strong> {selectedMatch.user.age}</p>
                      <p><strong>Profession:</strong> {selectedMatch.user.profession}</p>
                      <p><strong>Location:</strong> {selectedMatch.user.location}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Mediator Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedMatch.mediator.name}</p>
                      <p><strong>Area:</strong> {selectedMatch.mediator.area}</p>
                      <p><strong>Contact:</strong> {selectedMatch.mediator.contact || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Match Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Status:</strong> <Badge className={getStatusColor(selectedMatch.status)}>{selectedMatch.status}</Badge></p>
                    <p><strong>Amount Paid:</strong> ₹{selectedMatch.amount}</p>
                    <p><strong>Date:</strong> {selectedMatch.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleStatusUpdate(selectedMatch.id, 'finalized')}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Finalized
                  </Button>
                  <Button variant="outline" onClick={() => handleStatusUpdate(selectedMatch.id, 'rejected')}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Mark as Rejected
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
