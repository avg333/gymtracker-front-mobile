import { MuscleGroupEnum, MuscleSupGroupEnum } from "./enums"

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
  if (!muscleSupGroup)
    return

  switch (muscleSupGroup.id) {
    case MuscleSupGroupEnum.CHEST.id:
      return chestIco
    case MuscleSupGroupEnum.BACK.id:
      return latsIco
    case MuscleSupGroupEnum.SHOULDERS.id:
      return shoulderIco
    case MuscleSupGroupEnum.ARMS.id:
      return bicepsIco
    case MuscleSupGroupEnum.CORE.id:
      return absIco
    case MuscleSupGroupEnum.LEGS.id:
      return legsIco
    default:
      break;
  }
}

export function getMuscleGroupIco(muscleGroup) {
  if (!muscleGroup)
    return

  switch (muscleGroup.id) {
    case MuscleGroupEnum.CHEST.id:
      return chestIco
    case MuscleGroupEnum.LATS.id:
      return latsIco
    case MuscleGroupEnum.TRAPEZIOUS.id:
      return trapsIco
    case MuscleGroupEnum.SHOULDER_ANTERIOR.id:
    case MuscleGroupEnum.SHOULDER_LATERAL.id:
    case MuscleGroupEnum.SHOULDER_POSTERIOR.id:
      return shoulderIco
    case MuscleGroupEnum.BICEPS.id:
      return bicepsIco
    case MuscleGroupEnum.TRICEPS.id:
      return tricepsIco
    case MuscleGroupEnum.FOREARMS.id:
      return forearmsIco
    case MuscleGroupEnum.ABS.id:
      return absIco
    case MuscleGroupEnum.LOWER_BACK.id:
      return null
    case MuscleGroupEnum.QUADRICEPS.id:
      return quadricepsIco
    case MuscleGroupEnum.HAMSTRINGS.id:
      return hamstringsIco
    case MuscleGroupEnum.GLUTE.id:
      return gluteoIco
    case MuscleGroupEnum.CALVES.id:
      return calvesIco
    default:
      break;
  }
}
