
import chestIco from "assets/mgs/mg-chest.png";
import latsIco from "assets/mgs/mg-lats.png";
import trapsIco from "assets/mgs/mg-traps.png";
import shoulderIco from "assets/mgs/mg-shoulders.png";
import bicepsIco from "assets/mgs/mg-biceps.png";
import tricepsIco from "assets/mgs/mg-triceps.png";
import forearmsIco from "assets/mgs/mg-forearm.png";
import quadricepsIco from "assets/mgs/mg-quadriceps.png";
import hamstringsIco from "assets/mgs/mg-hamstrings.png";
import calvesIco from "assets/mgs/mg-calves.png";
import absIco from "assets/mgs/mg-abs.png";
import legsIco from "assets/mgs/mg-leg.png";
import gluteoIco from "assets/mgs/mg-gluteo.png";

export function getMuscleSupGroupIco(muscleSupGroup) {
  switch (muscleSupGroup.id) {
    case 102:
      return chestIco
    case 103:
      return latsIco
    case 104:
      return shoulderIco
    case 105:
      return bicepsIco
    case 106:
      return absIco
    case 107:
      return legsIco
    default:
      break;
  }
}

export function getMuscleGroupIco(muscleGroup) {
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
