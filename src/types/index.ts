
export interface User {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  gothram: string;
  gender: 'male' | 'female';
  photo: string;
  bio: string;
  education: string;
  family: string;
  preferences: string;
  isHidden: boolean;
}

export interface Match {
  id: string;
  user: User;
  status: 'sent' | 'received' | 'under_discussion' | 'finalized' | 'rejected';
  mediator: {
    area: string;
    name: string;
    contact?: string;
  };
  amount: number;
  date: string;
  feedback?: string;
}

export interface MatchRequest {
  id: string;
  targetUser: User;
  mediator: {
    area: string;
    name: string;
  };
  amount: number;
  timestamp: string;
}
