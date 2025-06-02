import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("🚀 ----------------------🚀");
  console.log("🚀 ~ POST ~ body:", body);
  console.log("🚀 ----------------------🚀");
  const { firstName, lastName, email, zipCode } = body;
  const url = process.env.AUTOCONNECT_URL;
  try {
    const createUserUrl = `${url}/api/v1/user/create`;

    const createUserResponse = await axios.post(createUserUrl, null, {
      params: {
        email,
        first_name: firstName,
        last_name: lastName,
        zip_code: zipCode,
      },
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const apiData = createUserResponse.data; // Assuming the response contains user data or ID
    console.log("Create User Response (API Data):", apiData);

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        data: apiData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
