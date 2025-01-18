// Lookup tables for environment form descriptions based on slider positions

export const environmentDescriptions = {
  workplaceSocialization: {
    1: "I work best independently with minimal team interaction.",
    2: "I prefer working alone but enjoy occasional collaboration.",
    3: "I am comfortable with both independent work and collaboration.",
    4: "I thrive in a collaborative environment but also value some independent tasks.",
    5: "I flourish in a strong community with frequent social engagement and teamwork."
  },
  workPaceStructure: {
    1: "I excel in a steady and predictable workflow.",
    2: "I prefer structured work but can adapt to occasional dynamic tasks.",
    3: "I am fine with both structure and dynamic tasks.",
    4: "I thrive in dynamic tasks but appreciate some structure.",
    5: "I perform best in a highly dynamic and adaptive environment."
  },
  learningDevelopment: {
    1: "I prefer roles that require minimal upskilling and allow me to rely on my existing expertise.",
    2: "I enjoy stability in my skill set with occasional opportunities to learn.",
    3: "I am fine with both stability and opportunities for growth.",
    4: "I actively seek growth and training while maintaining some stability.",
    5: "I am passionate about continuous learning and professional development opportunities."
  },
  autonomySupport: {
    1: "I prefer high independence in decision-making and minimal oversight.",
    2: "I enjoy independence but value occasional guidance when needed.",
    3: "I am fine with both autonomy and structured guidance.",
    4: "I appreciate structured mentorship but also enjoy some autonomy.",
    5: "I value a supportive environment with structured mentorship and clear guidance."
  },
  compensationIncentives: {
    1: "I prefer fixed and predictable salary arrangements.",
    2: "I am comfortable with fixed pay but appreciate occasional performance-based rewards.",
    3: "I am fine with both fixed pay and performance-based rewards.",
    4: "I prefer performance-based rewards with some stability in fixed pay.",
    5: "I thrive in roles that prioritize performance-based rewards and incentives."
  },
  workLifeIntegration: {
    1: "I value a clear separation between work and personal life.",
    2: "I prefer work-life boundaries but can occasionally integrate work into my personal life.",
    3: "I am fine with both boundaries and integration between work and personal life.",
    4: "I enjoy flexible work-life integration but value occasional boundaries.",
    5: "I thrive in environments that allow complete integration of work and personal life."
  },
  culturalEngagement: {
    1: "I focus on completing tasks efficiently with minimal involvement in cultural activities.",
    2: "I prefer task-focused work but appreciate occasional cultural engagement.",
    3: "I am fine with both task-focused work and cultural engagement.",
    4: "I enjoy cultural engagement while maintaining a focus on tasks.",
    5: "I thrive in a rich cultural environment where I can actively participate in social activities."
  },
  qualificationsCredentials: {
    1: "I rely on my practical, hands-on experience to excel in my work.",
    2: "I prefer roles that value practical skills while appreciating some formal credentials.",
    3: "I am fine with both hands-on skills and formal credentials.",
    4: "I value formal credentials while recognizing the importance of practical skills.",
    5: "I strongly value formal degrees and certifications as a foundation for my career."
  },
  adaptabilityChange: {
    1: "I prefer established routines and stability in my work.",
    2: "I am comfortable with stable routines but can adapt to occasional changes.",
    3: "I am fine with both stability and adaptability to change.",
    4: "I thrive in environments that require adaptability while maintaining some routines.",
    5: "I excel in roles that require rapid adaptation and innovative thinking."
  }
} as const;