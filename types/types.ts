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
