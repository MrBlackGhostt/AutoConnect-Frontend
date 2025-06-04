import { JWTPayload } from "jose";

export interface FromProps {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  zipCode?: string;
}

export interface SessionPayload extends JWTPayload {
  ownerId: string;
  expiresAt: Date;
}

export interface VehicleInfoType {
  vin: string;
  model: string;
  year: number;
  make: string;
  odometer: number;
  description: string;
  annualMileage: { label: string; value: string };
  batteryCapacity: { label: string; value: string };
  chargeState: { label: string; value: string };
  isPluggedIn: { label: string; value: string };
  chargeLimit: { label: string; value: string };
  stateOfCharge: { label: string; value: string };
  estimatedRangeRemaining: { label: string; value: string };
  remainingUsefulLife: { label: string; value: string };
  stateOfHealth: { label: string; value: string };
  potentialMaxRange: { label: string; value: string };
}

export interface VehicleData {
  vin: string;
  make: string;
  model: string;
  year: number;
  stateOfChargePercent: number;
  stateOfChargeRange: number;
  batteryCapacity: number;
  chargeLimit: number;
  isPluggedIn: boolean;
  chargeState: string;
  odometer: number;
  stateOfHealthCurrent: number;
  potentialRangeMaxCurrent: number;
  stateOfChargeLifeCurrent: number;
  remainingUsefulLifeCurrent: number;
  description?: string;
}
export interface Report {
  model: string;
  batteryCapacity: string;
  vehicleAge: number;
  annualMileage: number;
  batteryDegradation: string;
  rangeEfficiency: string;
  estimatedReplacementCost: string;
  chargingOptimizationScore: string;
  overallVehicleCondition: string;
  nextServiceRecommendations: {
    service: string;
    timeframe: string;
    priority: string;
  }[];
  stateOfHealth: string;
  warrantyStatus: string;
  odometer: string;
  chargeState: string;
  cycleLifeCurrent: number;
  year: number;
  warrantyYearsLeft: number;
  warrantyKmLeft: number;
  cycleLifeTarget: number;
  warnings?: string[];
  recommendations?: string[];
}
export interface StatusCardData {
  id: number;
  title: string;
  details: string;
  status: "Healthy" | "Warning" | "Critical" | string;
  current: string;
  target: string;
  metrics?: { label: string; value: string | number }[];
}

export interface WarningsType {
  type: string;
  message: string;
  level: "Critical" | "Warning" | "";
}
