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

export interface ProgressesItems {
  id: number;
  missionId: number;
  progress: number;
  completed: boolean;
}
export interface ParticipantsItems {
  id: number;
  questId: number;
  userId: string;
  hasClaimedReward: boolean;
  progresses: ProgressesItems[];
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
  participants: ParticipantsItems[];
}

export interface MissionCreationItems {
  name: string;
  type: string;
  target: number;
}
export interface RewardCreationItems {
  type: string;
  amount: number;
}
export interface QuestCreationRequest {
  name: string;
  description: string;
  status: number;
  mode: ModeQuest;
  missions: MissionCreationItems[];
  rewards: RewardCreationItems[];
  startTime: string;
  endTime: string;
}

export interface JoinRequest {
  questId: number;
}

export interface QuestState {
  quest: QuestItems[];
  questById: QuestItems;
  isCreate: boolean;
  isJoin: boolean;
  loading: boolean;
  error: string | null;
}
