import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "../../types/types";

export async function createSession(ownerId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ ownerId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("ownerId", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    throw new Error(error instanceof Error ? "Failed To verify" : "");
  }
}
