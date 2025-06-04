// For Next.js API routes
import { decrypt } from "@/lib/session";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // Step 1: Parse the incoming request body
    const body = await request.json();
    const { code } = body;
    console.log("🚀 ----------------------🚀");
    console.log("🚀 ~ POST ~ code:", code);
    console.log("🚀 ----------------------🚀");

    if (!code) {
      return new Response("The Code is required", { status: 400 });
    }

    const {
      NEXT_PUBLIC_SMARTCAR_CLIENT_ID,
      SMARTCAR_CLIENT_SECRET,
      SMARTCAR_REDIRECT_URI,
      DATA_COLLECTOR_DEV_URL,
      BACKEND_DEV,
    } = process.env;

    const cookie = (await cookies()).get("ownerId")?.value;
    const session = await decrypt(cookie);

    if (!session?.ownerId) {
      return Response.redirect(new URL("/"));
    }
    // Step 2: Get the exchange token from Smartcar
    const tokenResponse = await fetch("https://auth.smartcar.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: NEXT_PUBLIC_SMARTCAR_CLIENT_ID || "",
        client_secret: SMARTCAR_CLIENT_SECRET || "",
        code: code || "",
        redirect_uri: SMARTCAR_REDIRECT_URI || "",
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorMessage = await tokenResponse.text();
      console.error("Error from Smart Car API:", errorMessage);
      return new Response(
        JSON.stringify({
          message: `Error in getting the token: ${errorMessage}`,
        }),
        { status: tokenResponse.status }
      );
    }

    const tokenData = await tokenResponse.json();
    console.log("🚀 --------------------------------🚀");
    console.log("🚀 ~ POST ~ tokenData:", tokenData);
    console.log("🚀 --------------------------------🚀");
    console.log("Access token retrieved successfully:", tokenData);

    // TODO owenr ID comes foe the signup
    // Step 3: Use the ownerId and token data to call the third API (Smartcar Add Vehicle)
    const ownerId = session?.ownerId; // Assuming the response contains an owner ID

    const addVehicleAuthUrl = `${DATA_COLLECTOR_DEV_URL}/smartcar/add-vehicle-auth?ownerId=${encodeURIComponent(
      String(ownerId)
    )}`;
    console.log("Calling Third API:", addVehicleAuthUrl);

    const vehiclePayload = {
      accessToken: tokenData.access_token,
      expiration: tokenData.expires_in,
      refreshToken: tokenData.refresh_token,
    };

    const addVehicleAuthResponse = await axios.post(
      addVehicleAuthUrl,
      vehiclePayload,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Third API Response:", addVehicleAuthResponse.data);

    // Step 4: Use the ownerId to send the welcome email
    const sendWelcomeEmailUrl = `${BACKEND_DEV}/api/v1/user/welcome?id=${encodeURIComponent(
      String(ownerId)
    )}`;
    console.log("Calling Fourth API:", sendWelcomeEmailUrl);

    const sendWelcomeEmailResponse = await axios.post(
      sendWelcomeEmailUrl,
      null,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Fourth API Response:", sendWelcomeEmailResponse.data);

    // Returning success response
    return new Response(
      JSON.stringify({
        message: "User created, Smartcar connected, and welcome email sent.",
        data: "Welcome",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
