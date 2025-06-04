"use client";
import React from "react";

import { StatusCardData } from "../../types/types";
import StatusCard from "./StatusCard";

const StatusCardGrid = ({
  vehicleCardData,
}: {
  vehicleCardData: StatusCardData[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Remaining status cards */}
      {vehicleCardData.map((card) => (
        <StatusCard key={card.id} data={card} />
      ))}
    </div>
  );
};

export default StatusCardGrid;
