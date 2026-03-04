export type MoodOption = "Focused" | "Calm" | "Energized" | "Reflective" | "Exhausted";

export type SeasonOption =
  | "Starting over"
  | "In the grind"
  | "Finding balance"
  | "Celebrating"
  | "Figuring it out";

export type CoffeeMomentOption =
  | "Early morning ritual"
  | "Midday reset"
  | "Late-night thinker"
  | "Whenever I need to feel like myself";

export type PriorityOption = "Clarity" | "Creativity" | "Connection" | "Momentum" | "Rest";

export interface BlendInputs {
  feeling: MoodOption | "";
  building: string;
  season: SeasonOption | "";
  moment: CoffeeMomentOption | "";
  priority: PriorityOption | "";
  name?: string;
}

export interface BlendProfile {
  blendName: string;
  roastLevel: "Light" | "Medium" | "Dark";
  flavorNotes: string[];
  emotionalDescription: string;
  batchId: string;
  createdAt: string;
}

