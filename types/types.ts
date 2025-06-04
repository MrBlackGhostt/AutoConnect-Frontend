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
