export interface Task {
  _id: string;

  title: string;

  description: string;

  type: string;

  url: string;

  duration: number;

  verifyType: string;

  repeatLimit: number;

  totalCompleted: number;

  remaining: number;

  available: boolean;

  status: string;

  adSettings: {
    adsPerSession: number;
    rewardPerSession: number;
  };
}