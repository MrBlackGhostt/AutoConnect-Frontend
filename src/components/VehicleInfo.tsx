"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import ReportDialog from "./report_dialog";
import { cn } from "@/lib/utils";
import { VehicleInfoType } from "../../types/types";
import { Report } from "../../types/types";
import CircularProgress from "./CircularProgress";

type VehicleInfoProps = {
  vehicleInfo: VehicleInfoType;
  warnings: {
    type: string;
    message: string;
    level: string;
  }[];
  reportData: Report;
  batteryData: {
    batteryStatus: string;
    status: string;
  };
};

const VehicleInfo = ({
  vehicleInfo,
  warnings,
  reportData,
  batteryData,
}: VehicleInfoProps) => {
  const [isReportOpen, setReportOpen] = useState(false);

  return (
    <div className="bg-muted/50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          {/* Left side - Vehicle information */}
          <div className="flex flex-col gap-4 sm:w-1/2">
            {/* Model Name */}
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {vehicleInfo.model} ({vehicleInfo.year})
            </div>
            {/* Battery Capacity */}
            <div className="text-md text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-chart-1 rounded-full"></span>
              {vehicleInfo.batteryCapacity.value} Battery Capacity
            </div>
            {/* Charge State */}
            {/* <div className="text-md text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-chart-1 rounded-full"></span>
              {vehicleInfo.chargeState.value}
            </div> */}
            {/* Battery Degradation */}
            {/* {vehicleInfo.batteryDegradation && (
              <div className="text-md text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-chart-1 rounded-full"></span>
                {vehicleInfo.batteryDegradation.value} Battery Degradation
              </div>
            )} */}
            {/* Range Efficiency */}
            {/* {vehicleInfo.rangeEfficiency && (
              <div className="text-md text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-chart-1 rounded-full"></span>
                {vehicleInfo.rangeEfficiency.value} Range Efficiency
              </div>
            )} */}
            {/* Annual Mileage */}
            {vehicleInfo.annualMileage && (
              <div className="text-md text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-chart-1 rounded-full"></span>
                {vehicleInfo.annualMileage.value} Annual Mileage
              </div>
            )}
            {/* Warning Messages */}
            <div className="space-y-2">
              {warnings.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    item.level === "Critical"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800",
                    "px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center gap-2 animate-pulse"
                  )}>
                  <AlertCircle size={16} className="sm:size-5" />
                  <span className="text-sm sm:text-sm font-medium">
                    {item.level}:
                  </span>
                  <span className="text-xs sm:text-sm">{item.message}</span>
                </div>
              ))}
            </div>
            {/* Year, Make, and Odometer Information */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Year</span>
                <span className="font-medium">{vehicleInfo.year}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Make</span>
                <span className="font-medium">{vehicleInfo.make}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Odometer</span>
                <span className="font-medium">
                  {vehicleInfo.odometer.toLocaleString()} km
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Battery</span>
                <CircularProgress
                  percentage={parseInt(batteryData.batteryStatus)}
                  status={batteryData.status}
                  size={40}
                  strokeWidth={6}
                />
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="sm:w-1/2 flex items-center justify-center">
            <div className="relative w-full h-[200px] sm:h-[180px] md:h-[220px]">
              <Image
                src="/tesla_car_no_background.png"
                alt="Tesla Vehicle"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-border my-5"></div>

        {/* Description and buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="sm:w-2/3">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Description
            </h3>
            {vehicleInfo?.description ? (
              <p className="text-sm">{vehicleInfo?.description}</p>
            ) : (
              <p className="text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem qui ullam unde reiciendis esse assumenda vel aut facere
                sapiente. Quos non nostrum quasi quisquam inventore ipsam porro
                velit iure provident?
              </p>
            )}
          </div>

          <div className="flex gap-3 sm:w-1/3 justify-end">
            <Button
              variant="outline"
              onClick={() => setReportOpen(true)}
              className="bg-[#FEBD1A] hover:bg-[#FEBD1A]/80 text-primary border-none shadow-sm transition-all duration-300">
              REPORTS
            </Button>
          </div>
        </div>
      </div>

      <ReportDialog
        open={isReportOpen}
        onClose={() => setReportOpen(false)}
        report={reportData}
      />
    </div>
  );
};

export default VehicleInfo;
