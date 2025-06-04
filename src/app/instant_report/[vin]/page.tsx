"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VehicleData } from "../../../../types/types";
import StatusCardGrid from "@/components/StatusCardGrid";
import VehicleInfo from "@/components/VehicleInfo";
import {
  generateCardData,
  generateReport,
  generateVehicleInfo,
} from "../../../../utils/vehicle";

export default function ReportPage() {
  const params = useParams();
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    vin: "0SCTESL03489EBBCE",
    make: "TESLA",
    model: "Model X",
    year: 2017,
    stateOfChargePercent: 0.42,
    stateOfChargeRange: 0.92,
    batteryCapacity: 34.08,
    chargeLimit: 0.8,
    isPluggedIn: true,
    chargeState: "Plugged In",

    odometer: 112850.72,
    stateOfHealthCurrent: 4.83,
    potentialRangeMaxCurrent: 1240.92,
    stateOfChargeLifeCurrent: 0.15,
    remainingUsefulLifeCurrent: -28465.0,
  });
  const url =
    process.env.DATA_COLLECTOR_DEV_URL || "http://localhost:3000/api/";

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/datacollector/vehicle/vin?id=${params}`);
      // const res = await fetch(`/api/vin?id=${id}`);
      const data = await res.json();
      setVehicleData(() => {
        if (data) {
          return data;
        }
      });
    })();
  });

  const { vehicleInfo, warnings } = generateVehicleInfo(vehicleData);
  const vehicleCardData = generateCardData(vehicleData);
  const reportData = generateReport(vehicleData);
  const battery = {
    batteryStatus: vehicleCardData[0].current,
    status: vehicleCardData[0].status,
  };
  return (
    <div className=" overflow-hidden">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <VehicleInfo
          vehicleInfo={vehicleInfo}
          warnings={warnings}
          reportData={reportData}
          batteryData={battery}
        />
        <StatusCardGrid vehicleCardData={vehicleCardData} />
      </div>
    </div>
  );
}
