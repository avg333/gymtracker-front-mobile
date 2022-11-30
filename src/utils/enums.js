export const MuscleGroupEnum = Object.freeze({
  CHEST: { id: 109 },
  LATS: { id: 110 },
  TRAPEZIOUS: { id: 111 },
  SHOULDER_ANTERIOR: { id: 112 },
  SHOULDER_LATERAL: { id: 113 },
  SHOULDER_POSTERIOR: { id: 114 },
  FOREARMS: { id: 115 },
  BICEPS: { id: 116 },
  TRICEPS: { id: 117 },
  ABS: { id: 118 },
  LOWER_BACK: { id: 119 },
  QUADRICEPS: { id: 120 },
  HAMSTRINGS: { id: 121 },
  GLUTE: { id: 122 },
  CALVES: { id: 123 }
})

export const MuscleSupGroupEnum = Object.freeze({
  CHEST: { id: 103 },
  BACK: { id: 104 },
  SHOULDERS: { id: 105 },
  ARMS: { id: 106 },
  CORE: { id: 107 },
  LEGS: { id: 108 }
})

export const MuscleSubGroupEnum = Object.freeze({
  CHEST_UPP: { id: 124 },
  CHEST_LOW: { id: 125 },
  CHEST_MID: { id: 126 },
  TRAPS_UPP: { id: 127 },
  TRAPS_MID: { id: 128 },
  TRAPS_LOW: { id: 129 },
  TRICEPS_LAT: { id: 130 },
  TRICEPS_LONG: { id: 131 },
  TRICEPS_MED: { id: 132 },
  GLUTE_MAX: { id: 133 },
  GLUTE_MED: { id: 134 },
  GLUTE_MIN: { id: 135 },
  CALVES_SOLE: { id: 136 },
  CALVES_GAST: { id: 137 }
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
