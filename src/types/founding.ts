export type RoastLevel = "Light" | "Medium" | "Dark";

export interface TransferHistoryEntry {
  from: string;
  to: string;
  transferredAt: string;
}

export interface FoundingMember {
  number: string; // "001".."100"
  blendName: string;
  roastLevel: RoastLevel;
  flavorNotes: string[];
  emotionalDescription?: string;
  instagram: string;
  pointsEarned: number;
  ordersCount: number;
  owner?: string; // @handle or email or "Anonymous"
  createdAt?: string;
  transferHistory?: TransferHistoryEntry[];
}
