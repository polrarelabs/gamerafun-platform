/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModeQuest } from "@constant/enum";

export interface QuestProps {
  search?: string;
  status?: string;
}

export interface MisstionItems {
  id: number;
  questId: number;
  name: string;
  type: string;
  url: string | null;
  target: number;
}

export interface RewardItems {
  type: string;
  amount: number;
}

export interface QuestItems {
  id: number;
  name: string;
  description: string;
  status: number;
  mode: ModeQuest;
  missions: MisstionItems[];
  rewards: RewardItems[];
  startTime: string;
  endTime: string;
  participants: any[];
}

export interface QuestState {
  quest: QuestItems[];
  loading: boolean;
  error: string | null;
}
