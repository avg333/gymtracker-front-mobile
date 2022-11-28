

export function getMuscleGroupColour(muscleGroup) {
  switch (muscleGroup.id) {
    case 108:
      return chestIco
    case 109:
      return latsIco
    case 110:
      return trapsIco
    case 111:
    case 112:
    case 113:
      return shoulderIco
    case 114:
      return forearmsIco
    case 115:
      return bicepsIco
    case 116:
      return tricepsIco
    case 117:
      return absIco
    case 118://lowerBack
      return null
    case 119:
      return quadricepsIco
    case 120:
      return hamstringsIco
    case 121://glute
      return gluteoIco
    case 122:
      return calvesIco
    default:
      break;
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
