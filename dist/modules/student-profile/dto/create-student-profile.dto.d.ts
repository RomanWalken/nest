export declare class CreateBodyMeasurementsDto {
    date: string;
    weight?: number;
    height?: number;
    bodyFat?: number;
    muscleMass?: number;
    waterPercentage?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thigh?: number;
    neck?: number;
    bmi?: number;
    bmr?: number;
    tdee?: number;
    progressPhotos?: string[];
    notes?: string;
    metadata?: Record<string, any>;
}
export declare class CreateFitnessGoalsDto {
    primaryGoal: string;
    secondaryGoals?: string[];
    targetWeight?: number;
    targetBodyFat?: number;
    targetMuscleMass?: number;
    targetChest?: number;
    targetWaist?: number;
    targetHips?: number;
    targetDate?: string;
    durationWeeks?: number;
    activityLevel: string;
    experienceLevel: string;
    limitations?: string[];
    preferences?: string[];
    availableEquipment?: string[];
    maxWorkoutTime?: number;
    workoutsPerWeek?: number;
    motivation?: string;
    previousExperience?: string;
    currentChallenges?: string;
    status?: string;
    metadata?: Record<string, any>;
}
export declare class CreateStudentProfileDto {
    userId: string;
    dateOfBirth?: string;
    gender?: string;
    phone?: string;
    emergencyContact?: string;
    medicalConditions?: string[];
    medications?: string[];
    allergies?: string[];
    doctorContact?: string;
    fitnessGoals: CreateFitnessGoalsDto;
    currentMeasurements?: CreateBodyMeasurementsDto;
    isPublic?: boolean;
    allowProgressSharing?: boolean;
    receiveMotivationalMessages?: boolean;
    hasCompletedInitialQuiz?: boolean;
    trainerNotes?: string;
    metadata?: Record<string, any>;
}
