export interface Character {
  id: string;
  name: string;
  age: number;
  role: string;
  position: string;
  personality: string;
  mbti: string;
  enneagram: string;
  features: string[];
  bdsm?: string;
  color: string;
  isNoxMember: boolean;
  imageUrl?: string;
  doodle?: string;
}

export interface Relationship {
  source: string;
  target: string;
  type: '연애' | '바람' | '지인';
  duration?: string;
  desc?: string;
}

export interface Location {
  name: string;
  floor: string;
  description: string;
  details: string[];
}

export interface Photo {
  id: string;
  charId: string;
  url: string;
  caption: string;
  likes: number;
  comments: { user: string; text: string; }[];
}
