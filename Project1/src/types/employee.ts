export interface EmployeeData {
  name: string;
  jobTitle: string;
  experience: number;
  education: 'highschool' | 'bachelors' | 'masters' | 'phd';
  location: string;
  company: string;
  skills: string[];
  certifications: string[];
  previousSalary?: number;
  expectedSalary?: number;
}

export interface PredictionResult {
  predictedSalary: number;
  salaryRange: {
    min: number;
    max: number;
  };
  confidence: number;
  factors: {
    experience: number;
    education: number;
    location: number;
    skills: number;
    market: number;
  };
  comparison: {
    industry: number;
    location: number;
    experience: number;
  };
  recommendations: string[];
}

export interface LocationData {
  name: string;
  multiplier: number;
  averageSalary: number;
}

export interface SkillData {
  name: string;
  premium: number;
  demand: 'high' | 'medium' | 'low';
}