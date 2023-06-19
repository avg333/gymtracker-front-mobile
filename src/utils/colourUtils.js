import { MuscleGroupEnum } from './enums'

export function getMuscleGroupColour(muscleGroup) {
  switch (muscleGroup.id) {
    case MuscleGroupEnum.CHEST.id:
      return 'red-5'
    case MuscleGroupEnum.LATS.id:
      return 'blue-5'
    case MuscleGroupEnum.TRAPEZIOUS.id:
      return 'blue-7'
    case MuscleGroupEnum.SHOULDER_ANTERIOR.id:
      return 'lime-5'
    case MuscleGroupEnum.SHOULDER_LATERAL.id:
      return 'lime-7'
    case MuscleGroupEnum.SHOULDER_POSTERIOR.id:
      return 'lime-9'
    case MuscleGroupEnum.BICEPS.id:
      return 'brown-5'
    case MuscleGroupEnum.TRICEPS.id:
      return 'brown-7'
    case MuscleGroupEnum.FOREARMS.id:
      return 'brown-9'
    case MuscleGroupEnum.ABS.id:
      return 'deep-orange-6'
    case MuscleGroupEnum.LOWER_BACK.id:
      return 'deep-orange-8'
    case MuscleGroupEnum.QUADRICEPS.id:
      return 'green-5'
    case MuscleGroupEnum.HAMSTRINGS.id:
      return 'green-7'
    case MuscleGroupEnum.GLUTE.id:
      return 'green-9'
    case MuscleGroupEnum.CALVES.id:
      return 'green-11'
    default:
      return 'blue-grey-5'
  }
}

export function getRirColour(rir) {
  if (rir < 0) {
    return -1;
  } else if (rir < 0.5) {
    return 0;
  } else if (rir < 1) {
    return 0.5;
  } else if (rir < 2) {
    return 1;
  } else if (rir < 3) {
    return 2;
  } else if (rir < 4) {
    return 3;
  } else {
    return 4
  }
}
