export interface Contact {
  email: string;
  phone?: string;
  twitter?: string;
  github?: string;
}

export interface TeamData {
  id: number | string;
  name: string;
  imageUrl: string;
  role?: string; // e.g. Founder, CEO
  position?: string; // e.g. Ai expert, UI/UX designer, etc
  note?: string;
  contact?: Contact;
}