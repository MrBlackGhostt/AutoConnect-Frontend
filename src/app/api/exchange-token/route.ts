export async function POST(request: Request) {
  const body = await request.json();
  const { code } = body;

  if (!code) {
    return new Response("Code is required to get the exchange token");
  }

  const {
    NEXT_PUBLIC_SMARTCAR_CLIENT_ID,
    SMARTCAR_CLIENT_SECRET,
    SMARTCAR_REDIRECT_URI,
  } = process.env;

  try {
    if (!NEXT_PUBLIC_SMARTCAR_CLIENT_ID) {
      return new Response("SmartCar Client ID is missing", { status: 400 });
    }

    const res = await fetch("https://auth.smartcar.com/oauth/token", {
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

    if (!res.ok) {
      // Log the error status and message for debugging
      const errorMessage = await res.text();
      console.error("Error from Smart Car API:", errorMessage);

      return new Response(
        JSON.stringify({
          message: `Error in getting the token: ${errorMessage}`,
        }),
        { status: res.status }
      );
    }

    const data = await res.json();

    // Return tokens to the client
    return new Response(
      JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
