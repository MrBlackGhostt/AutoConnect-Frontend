"use client";
import { useEffect, useState } from "react";

// Define TypeScript interfaces for the vehicle data
interface VehicleData {
  fuelLevel: number;
  batteryLevel: number;
  location: {
    lat: number;
    lng: number;
  };
  // Add any other fields that are available in your simulated vehicle state
}

export default function VehiclePage() {
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [vehicleId] = useState<string>("220b79f1-a70b-491e-b10c-fa041377a273"); // Using the provided vehicle ID

  // Load tokens from localStorage
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  // Fetch vehicle data from Smart Car API
  const fetchVehicleData = async () => {
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    try {
      const response = await fetch(
        `https://api.smartcar.com/v2.0/vehicles/${vehicleId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error fetching vehicle data:", errorMessage);
        return;
      }

      const data = await response.json();
      setVehicleData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Refresh access token using refresh token
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      console.error("Refresh token is missing");
      return;
    }

    try {
      const response = await fetch("https://auth.smartcar.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_SMARTCAR_CLIENT_ID || "",
          client_secret: process.env.SMARTCAR_CLIENT_SECRET || "",
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      });

      if (!response.ok) {
        console.error("Error refreshing token:", await response.text());
        return;
      }

      const data = await response.json();
      const newAccessToken = data.access_token;
      const newRefreshToken = data.refresh_token;

      // Store the new tokens in localStorage
      localStorage.setItem("access_token", newAccessToken);
      localStorage.setItem("refresh_token", newRefreshToken);

      // Update state
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  return (
    <div>
      <h1>Smart Car Vehicle Info</h1>
      <div>
        <h2>Tokens</h2>
        <p>
          <strong>Access Token:</strong>{" "}
          {accessToken
            ? accessToken.substring(0, 10) + "..."
            : "No access token found"}
        </p>
        <p>
          <strong>Refresh Token:</strong>{" "}
          {refreshToken
            ? refreshToken.substring(0, 10) + "..."
            : "No refresh token found"}
        </p>
      </div>

      <div>
        <h2>Vehicle Data</h2>
        <button onClick={fetchVehicleData}>Get Vehicle Data</button>
        {vehicleData ? (
          <div>
            <p>
              <strong>Fuel Level:</strong> {vehicleData.fuelLevel}%
            </p>
            <p>
              <strong>Battery Level:</strong> {vehicleData.batteryLevel}%
            </p>
            <p>
              <strong>Vehicle Location:</strong> {vehicleData.location?.lat},{" "}
              {vehicleData.location?.lng}
            </p>
          </div>
        ) : (
          <p>No vehicle data available.</p>
        )}
      </div>

      <div>
        <h2>Refresh Access Token</h2>
        <button onClick={refreshAccessToken}>Refresh Token</button>
      </div>
    </div>
  );
}
