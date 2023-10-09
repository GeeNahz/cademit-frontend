export interface Offer {
  id: number;
  title: string;
  description: string;
}

export interface CourseCategory {
  id: number;
  name: string;
  availableCourses: number;
  logoUrl: string;
}

export interface IconObj {
  id: number;
  icon: React.ReactNode;
}
