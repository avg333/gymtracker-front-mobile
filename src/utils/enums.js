export const MuscleGroupEnum = Object.freeze({
  CHEST: { id: 1 },
  LATS: { id: 2 },
  TRAPEZIOUS: { id: 3 },
  SHOULDER_ANTERIOR: { id: 4 },
  SHOULDER_LATERAL: { id: 5 },
  SHOULDER_POSTERIOR: { id: 6 },
  FOREARMS: { id: 7 },
  BICEPS: { id: 8 },
  TRICEPS: { id: 9 },
  ABS: { id: 10 },
  LOWER_BACK: { id: 11 },
  QUADRICEPS: { id: 12 },
  HAMSTRINGS: { id: 13 },
  GLUTE: { id: 14 },
  CALVES: { id: 15 }
})

export const MuscleSupGroupEnum = Object.freeze({
  CHEST: { id: 1 },
  BACK: { id: 2 },
  SHOULDERS: { id: 3 },
  ARMS: { id: 4 },
  CORE: { id: 5 },
  LEGS: { id: 6 }
})

export const MuscleSubGroupEnum = Object.freeze({
  CHEST_UPP: { id: 1 },
  CHEST_LOW: { id: 2 },
  CHEST_MID: { id: 3 },
  TRAPS_UPP: { id: 4 },
  TRAPS_MID: { id: 5 },
  TRAPS_LOW: { id: 6 },
  TRICEPS_LAT: { id: 7 },
  TRICEPS_LONG: { id: 8 },
  TRICEPS_MED: { id: 9 },
  GLUTE_MAX: { id: 10 },
  GLUTE_MED: { id: 11 },
  GLUTE_MIN: { id: 12 },
  CALVES_SOLE: { id: 13 },
  CALVES_GAST: { id: 14 }
})

export const ActivityLevelEnum = Object.freeze({
  SEDENTARY: "SEDENTARY",
  LIGHT: "LIGHT",
  MODERATE: "MODERATE",
  HIGH: "HIGH",
  EXTREME: "EXTREME",
})

export const GenderEnum = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE"
})

export const GoalEnum = Object.freeze({
  LOSE_FAT: "LOSE_FAT",
  MAINTAIN_WEIGHT: "MAINTAIN_WEIGHT",
  BUILD_MUSCLE: "BUILD_MUSCLE"
})

export const LoadTypeEnum = Object.freeze({
  BAR: "BAR",
  DUMBBELL: "DUMBBELL",
  CABLE: "CABLE",
  BODYWEIGHT: "BODYWEIGHT",
  MACHINE: "MACHINE",
  MULTIPOWER: "MULTIPOWER"
})

export const ProgramLevelEnum = Object.freeze({
  ANY: "ANY LEVEL",
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD"
})
