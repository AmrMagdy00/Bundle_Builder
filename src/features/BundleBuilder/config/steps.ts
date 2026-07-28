import type { FC, SVGProps } from "react"
import CameraIcon from "@/shared/assets/icons/camera.svg?react"
import PlanIcon from "@/shared/assets/icons/plan.svg?react"
import SensorsIcon from "@/shared/assets/icons/sensors.svg?react"
import ExtraProtectionIcon from "@/shared/assets/icons/extra-protection.svg?react"

export type StepIcon = FC<SVGProps<SVGSVGElement>>

export interface StepConfig {
  id: number;
  stepNumber: number;
  categoryKey: string;
  title: string;
  icon: StepIcon;
}

export const STEPS_CONFIG: StepConfig[] = [
  { id: 1, stepNumber: 1, categoryKey: "cameras", title: "Choose your cameras", icon: CameraIcon },
  { id: 2, stepNumber: 2, categoryKey: "plan", title: "Choose your plan", icon: PlanIcon },
  { id: 3, stepNumber: 3, categoryKey: "sensors", title: "Choose your sensors", icon: SensorsIcon },
  { id: 4, stepNumber: 4, categoryKey: "protection", title: "Add extra protection", icon: ExtraProtectionIcon },
]
