// Prize types and interfaces
export type PrizeType = 'text' | 'image' | 'link';

export interface Prize {
  type: PrizeType;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
}

// Form data interface for Pick Me Pool
export interface PickMeFormData {
  title: string;
  description: string;
  entryDuration: number;
  limitParticipants: boolean;
  maxParticipants: number;
  subscribersOnly: boolean;
  numWinners: number;
  numBackupWinners: number;
  prizes: Prize[];
  notificationEnabled: boolean;
  autoPublishResults: boolean;
  requireVerification: boolean;
  privatePool: boolean;
}