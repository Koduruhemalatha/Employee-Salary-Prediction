import { EmployeeData, PredictionResult, LocationData, SkillData } from '../types/employee';

// Location multipliers based on cost of living and market rates
const locationData: Record<string, LocationData> = {
  'san francisco': { name: 'San Francisco, CA', multiplier: 1.4, averageSalary: 150000 },
  'new york': { name: 'New York, NY', multiplier: 1.3, averageSalary: 140000 },
  'seattle': { name: 'Seattle, WA', multiplier: 1.25, averageSalary: 135000 },
  'boston': { name: 'Boston, MA', multiplier: 1.2, averageSalary: 125000 },
  'los angeles': { name: 'Los Angeles, CA', multiplier: 1.15, averageSalary: 120000 },
  'chicago': { name: 'Chicago, IL', multiplier: 1.05, averageSalary: 110000 },
  'austin': { name: 'Austin, TX', multiplier: 1.1, averageSalary: 115000 },
  'denver': { name: 'Denver, CO', multiplier: 1.05, averageSalary: 108000 },
  'atlanta': { name: 'Atlanta, GA', multiplier: 0.95, averageSalary: 100000 },
  'dallas': { name: 'Dallas, TX', multiplier: 0.9, averageSalary: 95000 },
  'phoenix': { name: 'Phoenix, AZ', multiplier: 0.85, averageSalary: 90000 },
  'miami': { name: 'Miami, FL', multiplier: 0.9, averageSalary: 92000 },
};

// High-demand skills with premium percentages
const skillPremiums: Record<string, SkillData> = {
  'machine learning': { name: 'Machine Learning', premium: 25, demand: 'high' },
  'ai': { name: 'Artificial Intelligence', premium: 30, demand: 'high' },
  'blockchain': { name: 'Blockchain', premium: 20, demand: 'high' },
  'kubernetes': { name: 'Kubernetes', premium: 18, demand: 'high' },
  'aws': { name: 'AWS', premium: 15, demand: 'high' },
  'react': { name: 'React', premium: 12, demand: 'high' },
  'python': { name: 'Python', premium: 10, demand: 'high' },
  'javascript': { name: 'JavaScript', premium: 8, demand: 'high' },
  'typescript': { name: 'TypeScript', premium: 10, demand: 'high' },
  'docker': { name: 'Docker', premium: 12, demand: 'high' },
  'node.js': { name: 'Node.js', premium: 10, demand: 'high' },
  'data analysis': { name: 'Data Analysis', premium: 15, demand: 'high' },
  'sql': { name: 'SQL', premium: 8, demand: 'medium' },
  'java': { name: 'Java', premium: 8, demand: 'medium' },
  'c++': { name: 'C++', premium: 10, demand: 'medium' },
  'project management': { name: 'Project Management', premium: 12, demand: 'medium' },
};

// Base salaries by job title (simplified categorization)
const baseSalaries: Record<string, number> = {
  // Engineering
  'software engineer': 95000,
  'senior software engineer': 135000,
  'staff software engineer': 175000,
  'principal engineer': 220000,
  'engineering manager': 160000,
  'tech lead': 150000,
  'full stack developer': 90000,
  'frontend developer': 85000,
  'backend developer': 95000,
  'mobile developer': 100000,
  'devops engineer': 110000,
  'security engineer': 115000,
  'machine learning engineer': 130000,
  'data engineer': 120000,
  
  // Data Science
  'data scientist': 115000,
  'senior data scientist': 150000,
  'data analyst': 75000,
  'business analyst': 70000,
  'research scientist': 140000,
  
  // Product & Design
  'product manager': 125000,
  'senior product manager': 160000,
  'ux designer': 85000,
  'ui designer': 80000,
  'product designer': 95000,
  
  // Default fallback
  'default': 85000,
};

export function predictSalary(data: EmployeeData): PredictionResult {
  // Get base salary for job title
  const jobTitleKey = data.jobTitle.toLowerCase();
  let baseSalary = baseSalaries[jobTitleKey] || baseSalaries['default'];
  
  // Adjust for similar titles if exact match not found
  if (!baseSalaries[jobTitleKey]) {
    if (jobTitleKey.includes('engineer') || jobTitleKey.includes('developer')) {
      baseSalary = baseSalaries['software engineer'];
    } else if (jobTitleKey.includes('data')) {
      baseSalary = baseSalaries['data scientist'];
    } else if (jobTitleKey.includes('manager')) {
      baseSalary = baseSalaries['product manager'];
    } else if (jobTitleKey.includes('designer')) {
      baseSalary = baseSalaries['ux designer'];
    }
  }

  // Experience multiplier (exponential growth with diminishing returns)
  const experienceMultiplier = Math.min(1 + (data.experience * 0.08), 2.5);
  
  // Education multiplier
  const educationMultipliers = {
    'highschool': 0.9,
    'bachelors': 1.0,
    'masters': 1.15,
    'phd': 1.3,
  };
  const educationMultiplier = educationMultipliers[data.education];

  // Location multiplier
  const locationKey = data.location.toLowerCase();
  const location = Object.keys(locationData).find(key => 
    locationKey.includes(key) || key.includes(locationKey.split(',')[0])
  );
  const locationMultiplier = location ? locationData[location].multiplier : 1.0;

  // Skills premium calculation
  let skillsPremium = 0;
  data.skills.forEach(skill => {
    const skillKey = skill.toLowerCase();
    const skillData = skillPremiums[skillKey];
    if (skillData) {
      skillsPremium += skillData.premium;
    }
  });
  
  // Certification bonus (5% per certification, max 25%)
  const certificationBonus = Math.min(data.certifications.length * 5, 25);

  // Calculate predicted salary
  let predictedSalary = baseSalary * experienceMultiplier * educationMultiplier * locationMultiplier;
  predictedSalary *= (1 + (skillsPremium + certificationBonus) / 100);

  // Calculate salary range (±15%)
  const salaryRange = {
    min: Math.round(predictedSalary * 0.85),
    max: Math.round(predictedSalary * 1.15),
  };

  // Calculate confidence based on data completeness and quality
  let confidence = 70; // Base confidence
  if (data.experience > 0) confidence += 5;
  if (data.skills.length > 3) confidence += 10;
  if (data.certifications.length > 0) confidence += 5;
  if (data.previousSalary) confidence += 10;
  confidence = Math.min(confidence, 95);

  // Calculate factor scores
  const factors = {
    experience: Math.min((data.experience / 15) * 100, 100),
    education: (educationMultiplier - 0.9) * 250,
    location: (locationMultiplier - 0.8) * 166.67,
    skills: Math.min(skillsPremium * 2, 100),
    market: 75, // Simulated market factor
  };

  // Generate market comparisons
  const industryAverage = baseSalary * locationMultiplier;
  const locationAverage = location ? locationData[location].averageSalary : 95000;
  const experienceAverage = baseSalary * experienceMultiplier;

  const comparison = {
    industry: Math.round(industryAverage),
    location: Math.round(locationAverage),
    experience: Math.round(experienceAverage),
  };

  // Generate recommendations
  const recommendations = generateRecommendations(data, factors);

  return {
    predictedSalary: Math.round(predictedSalary),
    salaryRange,
    confidence,
    factors,
    comparison,
    recommendations,
  };
}

function generateRecommendations(data: EmployeeData, factors: any): string[] {
  const recommendations: string[] = [];

  // Experience-based recommendations
  if (factors.experience < 60) {
    recommendations.push('Gain more hands-on experience in your field to increase your market value');
  }

  // Education recommendations
  if (data.education === 'highschool' || data.education === 'bachelors') {
    recommendations.push('Consider pursuing additional education or certifications in your field');
  }

  // Skills recommendations
  if (factors.skills < 70) {
    recommendations.push('Learn high-demand skills like cloud computing, AI/ML, or modern frameworks');
  }

  // Certification recommendations
  if (data.certifications.length === 0) {
    recommendations.push('Obtain industry certifications to validate your expertise');
  }

  // Location recommendations
  if (factors.location < 60) {
    recommendations.push('Consider opportunities in higher-paying markets or remote work');
  }

  // Job title optimization
  if (data.jobTitle.toLowerCase().includes('junior') || data.experience > 3) {
    recommendations.push('Seek senior-level positions that match your experience level');
  }

  // Generic high-value recommendations
  recommendations.push('Build a strong professional network and maintain an updated LinkedIn profile');
  recommendations.push('Negotiate your current salary or seek opportunities with compensation reviews');
  recommendations.push('Develop leadership and communication skills to advance to higher roles');

  return recommendations.slice(0, 6); // Limit to 6 recommendations
}