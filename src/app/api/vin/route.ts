import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id");

  const baseUrl = process.env.DATA_COLLECTOR_DEV;
  if (!baseUrl) {
    return new Response(
      JSON.stringify({
        error: "DATA_COLLECTOR_DEV is not defined in environment variables",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const url = baseUrl + query;

  try {
    const res = await fetch(`${url}`);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: "Error in Fetching the Data",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
