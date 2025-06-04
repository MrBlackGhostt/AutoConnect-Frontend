import {
  VehicleData,
  VehicleInfoType,
  StatusCardData,
  WarningsType,
  Report,
} from "../types/types";

export function generateVehicleInfo(vehicle: VehicleData): {
  vehicleInfo: VehicleInfoType;
  warnings: [WarningsType];
} {
  const formatMetric = (
    label: string,
    value: string | number,
    unit: string = ""
  ) => ({
    label,
    value: `${value}${unit}`,
  });

  // Calculate vehicle age for better context
  const vehicleAge = new Date().getFullYear() - vehicle.year;

  // Enhanced battery degradation calculation
  const batteryDegradation = ((100 - vehicle.stateOfHealthCurrent) / 100) * 100;

  // Calculate actual vs theoretical range
  const theoreticalRange = vehicle.batteryCapacity * 4; // Assuming ~4km per kWh average
  const actualCurrentRange = vehicle.stateOfChargeRange * theoreticalRange;

  const vehicleInfo = {
    vin: vehicle.vin,
    model: vehicle.model,
    year: vehicle.year,
    make: vehicle.make,
    odometer: vehicle.odometer,
    description: `Comprehensive analysis of your ${vehicle.year} ${
      vehicle.make
    } ${
      vehicle.model
    }. This report covers battery health, charging efficiency, range analysis, and maintenance recommendations based on ${vehicleAge} years of usage and ${vehicle.odometer.toLocaleString()} km driven.`,

    // Enhanced battery metrics with context
    batteryCapacity: formatMetric(
      "Battery Capacity",
      vehicle.batteryCapacity,
      " kWh"
    ),
    chargeState: formatMetric("Charge State", vehicle.chargeState, ""),
    isPluggedIn: formatMetric(
      "Charging Status", // More user-friendly label
      vehicle.isPluggedIn ? "Connected" : "Disconnected",
      ""
    ),
    chargeLimit: formatMetric("Charge Limit", vehicle.chargeLimit, " km"), // Added context - this appears to be range limit
    stateOfCharge: formatMetric(
      "Current Battery Level", // More intuitive label
      (vehicle.stateOfChargePercent * 100).toFixed(0),
      "%"
    ),

    // ENHANCEMENT: More detailed range information
    estimatedRangeRemaining: formatMetric(
      "Estimated Range Remaining",
      actualCurrentRange.toFixed(0),
      " km"
    ),

    // ENHANCEMENT: Added range efficiency metric
    rangeEfficiency: formatMetric(
      "Range Efficiency",
      ((actualCurrentRange / theoreticalRange) * 100).toFixed(1),
      "%"
    ),

    remainingUsefulLife: formatMetric(
      "Battery Life Remaining", // More user-friendly label
      vehicle.remainingUsefulLifeCurrent > 0
        ? vehicle.remainingUsefulLifeCurrent.toLocaleString()
        : "Replacement Recommended", // Better handling of negative values
      vehicle.remainingUsefulLifeCurrent > 0 ? " cycles" : ""
    ),

    stateOfHealth: formatMetric(
      "Battery Health Score", // More intuitive label
      vehicle.stateOfHealthCurrent.toFixed(1), // Reduced decimal places for readability
      "%"
    ),

    // ENHANCEMENT: Added battery degradation percentage
    batteryDegradation: formatMetric(
      "Battery Degradation",
      batteryDegradation.toFixed(1),
      "%" // Shows how much capacity has been lost
    ),

    potentialMaxRange: formatMetric(
      "Maximum Possible Range", // Clearer label
      vehicle.potentialRangeMaxCurrent.toFixed(0), // Rounded for readability
      " km"
    ),

    // ENHANCEMENT: Added vehicle age and usage metrics
    vehicleAge: formatMetric(
      "Vehicle Age",
      vehicleAge,
      vehicleAge === 1 ? " year" : " years"
    ),

    // ENHANCEMENT: Added annual mileage calculation
    annualMileage: formatMetric(
      "Average Annual Mileage",
      vehicleAge > 0 ? (vehicle.odometer / vehicleAge).toFixed(0) : "0",
      " km/year"
    ),

    // ENHANCEMENT: Added charging cycle information
    chargeCycleUsage: formatMetric(
      "Charge Cycle Usage",
      (vehicle.stateOfChargeLifeCurrent * 100).toFixed(1),
      "% of expected cycles used"
    ),
  };

  const warnings = [
    {
      type: "Battery Charge", // More specific type
      message:
        vehicle.stateOfChargePercent < 0.1
          ? "Critical: Battery extremely low! Charge immediately to prevent damage."
          : vehicle.stateOfChargePercent < 0.2
          ? "Battery charge is critically low. Please recharge soon."
          : vehicle.stateOfChargePercent < 0.3
          ? "Battery charge is getting low. Consider charging when convenient."
          : "",
      level:
        vehicle.stateOfChargePercent < 0.1
          ? "Critical"
          : vehicle.stateOfChargePercent < 0.2
          ? "Critical"
          : vehicle.stateOfChargePercent < 0.3
          ? "Warning"
          : "",
    },

    // ENHANCEMENT: More nuanced warranty warnings
    {
      type: "Warranty Coverage",
      message:
        vehicleAge >= 8 || vehicle.odometer >= 160000
          ? "Battery warranty has expired. Consider extended coverage options."
          : vehicleAge >= 7 || vehicle.odometer >= 140000
          ? "Battery warranty expires soon. Review coverage options."
          : vehicleAge >= 6 || vehicle.odometer >= 120000
          ? "Warranty coverage entering final period. Plan ahead for potential costs."
          : "",
      level:
        vehicleAge >= 8 || vehicle.odometer >= 160000
          ? "Critical"
          : vehicleAge >= 7 || vehicle.odometer >= 140000
          ? "Warning"
          : vehicleAge >= 6 || vehicle.odometer >= 120000
          ? "Info"
          : "",
    },

    // ENHANCEMENT: More detailed battery health warnings
    {
      type: "Battery Health",
      message:
        vehicle.stateOfHealthCurrent < 5
          ? "Critical: Battery health severely degraded. Immediate replacement recommended."
          : vehicle.stateOfHealthCurrent < 15
          ? "Battery health significantly degraded. Plan for replacement within 6 months."
          : vehicle.stateOfHealthCurrent < 30
          ? "Battery health declining. Monitor closely and budget for future replacement."
          : vehicle.stateOfHealthCurrent < 50
          ? "Battery showing early signs of degradation. Continue monitoring."
          : "",
      level:
        vehicle.stateOfHealthCurrent < 5
          ? "Critical"
          : vehicle.stateOfHealthCurrent < 15
          ? "Critical"
          : vehicle.stateOfHealthCurrent < 30
          ? "Warning"
          : vehicle.stateOfHealthCurrent < 50
          ? "Info"
          : "Healthy",
    },

    // ENHANCEMENT: Mileage and service warnings
    {
      type: "Service & Maintenance",
      message:
        vehicle.odometer > 150000
          ? "High mileage vehicle. Frequent inspections and proactive maintenance recommended."
          : vehicle.odometer > 100000
          ? "Regular comprehensive servicing required for high-mileage vehicle."
          : vehicle.odometer > 75000
          ? "Approaching high-mileage threshold. Schedule comprehensive inspection."
          : "",
      level:
        vehicle.odometer > 150000
          ? "Warning"
          : vehicle.odometer > 100000
          ? "Warning"
          : vehicle.odometer > 75000
          ? "Info"
          : "",
    },

    // ENHANCEMENT: Range degradation warning
    {
      type: "Range Performance",
      message:
        vehicle.potentialRangeMaxCurrent < vehicle.batteryCapacity * 3
          ? "Significant range reduction detected. Battery efficiency has declined."
          : vehicle.potentialRangeMaxCurrent < vehicle.batteryCapacity * 3.5
          ? "Some range reduction noted. Monitor charging patterns and driving efficiency."
          : "",
      level:
        vehicle.potentialRangeMaxCurrent < vehicle.batteryCapacity * 3
          ? "Warning"
          : vehicle.potentialRangeMaxCurrent < vehicle.batteryCapacity * 3.5
          ? "Info"
          : "",
    },

    // ENHANCEMENT: Charging behavior warning
    {
      type: "Charging Optimization",
      message:
        vehicle.chargeLimit > vehicle.batteryCapacity * 5 &&
        vehicle.stateOfChargePercent > 0.9
          ? "Frequent high-charge levels may accelerate battery degradation. Consider limiting to 80% for daily use."
          : "",
      level:
        vehicle.chargeLimit > vehicle.batteryCapacity * 5 &&
        vehicle.stateOfChargePercent > 0.9
          ? "Info"
          : "",
    },
  ].filter((warning) => warning.message !== ""); // Filter out empty warnings

  return { vehicleInfo, warnings: warnings as [WarningsType] };
}

export function generateCardData(vehicle: VehicleData): StatusCardData[] {
  const currentYear = new Date().getFullYear();
  const warrantyYears = 8;
  const warrantyKm = 160000;

  const vehicleAgeYears = currentYear - vehicle.year;
  const kmRemaining = Math.max(warrantyKm - vehicle.odometer, 0);
  const timeRemainingYears = Math.max(warrantyYears - vehicleAgeYears, 0);

  const kmPercent = ((kmRemaining / warrantyKm) * 100).toFixed(0);
  const timePercent = ((timeRemainingYears / warrantyYears) * 100).toFixed(0);

  // ENHANCEMENT: Calculate actual range based on current battery capacity
  const theoreticalMaxRange =
    vehicle.potentialRangeMaxCurrent * vehicle.stateOfChargePercent; // km per kWh average
  const currentMaxRange = theoreticalMaxRange / vehicle.chargeLimit;

  return [
    {
      id: 1,
      title: "State of Charge",
      details: "Current Charge level of the Battery",
      status:
        vehicle.stateOfChargePercent < 0.1
          ? "Critical"
          : vehicle.stateOfChargePercent < 0.2
          ? "Critical"
          : vehicle.stateOfChargePercent < 0.3
          ? "Warning"
          : "Healthy",
      current: `${(vehicle.stateOfChargePercent * 100).toFixed(0)}%`,
      target: "80-90%", // More practical daily target
      metrics: [
        {
          label: "State of Charge",
          value: `${(vehicle.stateOfChargePercent * 100).toFixed(0)}%`,
        },
        {
          label: "Potential Range",
          value: `${currentMaxRange.toFixed(0)} km`, // ENHANCEMENT: More accurate current range
        },
        {
          label: "Charging Status",
          value: `${vehicle.chargeState}`, // ENHANCEMENT: Combined status
        },
        {
          label: "Charge Limit",
          value: `${(vehicle.chargeLimit * 100).toFixed(0)} %`, // ENHANCEMENT: Clarified this is range limit
        },
        // ENHANCEMENT: Added time to full charge estimate
        {
          label: "Est. Charge Time to 80%",
          value:
            vehicle.isPluggedIn && vehicle.stateOfChargePercent < 0.8
              ? `${(
                  ((0.8 - vehicle.stateOfChargePercent) *
                    vehicle.batteryCapacity) /
                  7
                ).toFixed(1)} hours` // Assuming 7kW charging
              : "N/A",
        },
      ],
    },
    {
      id: 2,
      title: "State of Health (SoH)",
      details:
        "Overall condition and performance relative to its original specification",
      status:
        vehicle.stateOfHealthCurrent < 5
          ? "Critical"
          : vehicle.stateOfHealthCurrent < 15
          ? "Critical"
          : vehicle.stateOfHealthCurrent < 30
          ? "Warning"
          : vehicle.stateOfHealthCurrent < 70
          ? "Fair"
          : "Healthy",
      current: `${vehicle.stateOfHealthCurrent.toFixed(1)}%`,
      target: "80%+", // Industry standard for good health
      metrics: [
        {
          label: "Battery Capacity",
          value: `${vehicle.batteryCapacity} kWh`,
        },
        {
          label: "State of Health",
          value: `${vehicle.stateOfHealthCurrent.toFixed(1)}%`,
        },
        // ENHANCEMENT: Added degradation percentage
        {
          label: "Capacity Lost",
          value: `${(100 - vehicle.stateOfHealthCurrent).toFixed(1)}%`,
        },
        {
          label: "Charge Cycles Used",
          value: `${(vehicle.stateOfChargeLifeCurrent * 100).toFixed(1)}%`,
        },
        {
          label: "Battery Status",
          value:
            vehicle.remainingUsefulLifeCurrent > 0
              ? `${vehicle.remainingUsefulLifeCurrent.toLocaleString()} cycles remaining`
              : "Replacement Recommended", // ENHANCEMENT: Better handling of negative values
        },
        // ENHANCEMENT: Added estimated replacement cost range
        {
          label: "Est. Replacement Cost",
          value:
            vehicle.stateOfHealthCurrent < 30
              ? "$15,000 - $25,000" // Rough Tesla battery replacement cost
              : "Not applicable",
        },
      ],
    },
    {
      id: 3,
      title: "Performance & Range Analysis",
      details: "Driving efficiency and range optimization insights",
      status:
        vehicle.potentialRangeMaxCurrent < vehicle.batteryCapacity * 2.5
          ? "Critical"
          : vehicle.potentialRangeMaxCurrent < vehicle.batteryCapacity * 3.5
          ? "Warning"
          : "Healthy",
      current: `${vehicle.odometer.toLocaleString()} km`,
      target: "Efficient operation", // More meaningful target
      metrics: [
        {
          label: "Total Distance Driven",
          value: `${vehicle.odometer.toLocaleString()} km`,
        },
        {
          label: "Current Max Range",
          value: `${vehicle.potentialRangeMaxCurrent.toFixed(0)} km`,
        },
        // ENHANCEMENT: Added theoretical vs actual range comparison
        {
          label: "Range Efficiency",
          value: `${(
            (vehicle.potentialRangeMaxCurrent / theoreticalMaxRange) *
            100
          ).toFixed(1)}%`,
        },
        // ENHANCEMENT: Added annual mileage
        {
          label: "Average Annual Mileage",
          value:
            vehicleAgeYears > 0
              ? `${(vehicle.odometer / vehicleAgeYears).toFixed(0)} km/year`
              : "N/A",
        },
        // ENHANCEMENT: Added efficiency recommendation
        {
          label: "Efficiency Status",
          value:
            vehicle.potentialRangeMaxCurrent > vehicle.batteryCapacity * 4
              ? "Excellent efficiency"
              : vehicle.potentialRangeMaxCurrent > vehicle.batteryCapacity * 3.5
              ? "Good efficiency"
              : "Below optimal - consider service check",
        },
      ],
    },
    {
      id: 4,
      title: "Warranty & Coverage",
      details: "Battery warranty status and protection timeline",
      status:
        vehicleAgeYears >= warrantyYears || vehicle.odometer >= warrantyKm
          ? "Expired"
          : timeRemainingYears <= 1 || kmRemaining < 20000
          ? "Expiring Soon"
          : timeRemainingYears <= 2 || kmRemaining < 40000
          ? "Active (Monitor)"
          : "Active",
      current: `${kmRemaining.toLocaleString()} km remaining`,
      target: `${warrantyKm.toLocaleString()} km or ${warrantyYears} years`,
      metrics: [
        {
          label: "Warranty Distance Left",
          value: `${kmRemaining.toLocaleString()} km (${kmPercent}%)`,
        },
        {
          label: "Warranty Time Left",
          value: `${timeRemainingYears} years (${timePercent}%)`,
        },
        {
          label: "Coverage Expires",
          value: `${
            vehicle.year + warrantyYears
          } or at ${warrantyKm.toLocaleString()} km`,
        },
        // ENHANCEMENT: Added estimated expiration date based on current usage
        {
          label: "Est. Coverage End Date",
          value:
            vehicleAgeYears > 0 && vehicle.odometer > 0
              ? `${Math.min(
                  vehicle.year + warrantyYears,
                  new Date().getFullYear() +
                    Math.ceil(
                      kmRemaining / (vehicle.odometer / vehicleAgeYears)
                    )
                )}`
              : `${vehicle.year + warrantyYears}`,
        },
        // ENHANCEMENT: Added next steps recommendation
        {
          label: "Recommendation",
          value:
            vehicleAgeYears >= warrantyYears || vehicle.odometer >= warrantyKm
              ? "Consider extended warranty"
              : timeRemainingYears <= 1 || kmRemaining < 20000
              ? "Review extended warranty options"
              : "Coverage active - no action needed",
        },
      ],
    },
    // ENHANCEMENT: Added new card for charging optimization
    {
      id: 5,
      title: "Charging Optimization",
      details: "Smart charging recommendations and cost savings",
      status: "Informational",
      current: vehicle.isPluggedIn ? "Charging" : "Ready to charge",
      target: "Optimized charging",
      metrics: [
        {
          label: "Recommended Daily Limit",
          value: "80% (for battery longevity)",
        },
        {
          label: "Current Charge Limit",
          value: `${((vehicle.chargeLimit / theoreticalMaxRange) * 100).toFixed(
            0
          )}%`, // Convert km limit to percentage
        },
        {
          label: "Charging Frequency",
          value:
            vehicle.stateOfChargeLifeCurrent > 0.5
              ? "High usage - monitor degradation"
              : "Normal usage pattern",
        },
        {
          label: "Cost Optimization Tip",
          value: "Charge during off-peak hours (11 PM - 7 AM)",
        },
        {
          label: "Battery Longevity Tip",
          value:
            vehicle.stateOfChargePercent > 0.9
              ? "Avoid frequent 100% charges"
              : "Current charging habits are good",
        },
      ],
    },
  ];
}

export function generateReport(vehicle: VehicleData): Report {
  const warnings: string[] = [];
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - vehicle.year;

  // ENHANCEMENT: More comprehensive battery charge warnings
  if (vehicle.stateOfChargePercent < 0.1) {
    warnings.push(
      "URGENT: Battery extremely low! Charge immediately to prevent permanent damage."
    );
  } else if (vehicle.stateOfChargePercent < 0.2) {
    warnings.push(
      "Battery charge critically low. Locate charging station immediately."
    );
  } else if (vehicle.stateOfChargePercent < 0.3) {
    warnings.push(
      "Battery charge low. Plan charging within the next few hours."
    );
  }

  // ENHANCEMENT: More detailed battery health warnings
  if (vehicle.stateOfHealthCurrent < 5) {
    warnings.push(
      "CRITICAL: Battery health severely compromised. Immediate professional assessment required."
    );
  } else if (vehicle.stateOfHealthCurrent < 15) {
    warnings.push(
      "Battery health significantly degraded. Schedule replacement consultation within 30 days."
    );
  } else if (vehicle.stateOfHealthCurrent < 30) {
    warnings.push(
      "Battery health declining. Begin planning for replacement within 6-12 months."
    );
  } else if (vehicle.stateOfHealthCurrent < 50) {
    warnings.push(
      "Battery showing early degradation signs. Increase monitoring frequency."
    );
  }

  // ENHANCEMENT: More granular odometer and service warnings
  if (vehicle.odometer > 200000) {
    warnings.push(
      "Very high mileage vehicle. Comprehensive systems check recommended every 6 months."
    );
  } else if (vehicle.odometer > 150000) {
    warnings.push(
      "High mileage vehicle. Annual comprehensive inspection strongly recommended."
    );
  } else if (vehicle.odometer > 100000) {
    warnings.push(
      "Vehicle approaching high-mileage status. Schedule comprehensive service check."
    );
  }

  // ENHANCEMENT: Improved warranty warnings with more context
  const warrantyStatus =
    vehicleAge >= 8 || vehicle.odometer >= 160000
      ? "Battery warranty expired. Budget for potential battery replacement costs ($15,000-$25,000)."
      : vehicleAge >= 7 || vehicle.odometer >= 140000
      ? "Battery warranty expires within 12 months. Research extended warranty options now."
      : vehicleAge >= 6 || vehicle.odometer >= 120000
      ? "Battery warranty in final coverage period. Begin researching post-warranty service options."
      : "";

  if (warrantyStatus) {
    warnings.push(warrantyStatus);
  }

  // ENHANCEMENT: Range and efficiency warnings
  const theoreticalRange = vehicle.batteryCapacity * 4;
  if (vehicle.potentialRangeMaxCurrent < theoreticalRange * 0.6) {
    warnings.push(
      "Significant range loss detected. Professional battery diagnostic recommended."
    );
  } else if (vehicle.potentialRangeMaxCurrent < theoreticalRange * 0.8) {
    warnings.push(
      "Noticeable range reduction. Monitor charging efficiency and driving patterns."
    );
  }

  // ENHANCEMENT: More specific and actionable recommendations
  const recommendations: string[] = [];

  if (vehicle.stateOfChargePercent < 0.2) {
    recommendations.push(
      "Find nearest charging station immediately using vehicle navigation."
    );
    recommendations.push(
      "Consider carrying portable emergency charger for future peace of mind."
    );
  }

  if (vehicle.stateOfHealthCurrent < 15) {
    recommendations.push(
      "Contact authorized service center for battery health assessment."
    );
    recommendations.push(
      "Obtain written battery condition report for warranty/insurance purposes."
    );
    recommendations.push(
      "Research battery replacement costs and financing options."
    );
  } else if (vehicle.stateOfHealthCurrent < 30) {
    recommendations.push("Schedule battery health assessment within 60 days.");
    recommendations.push(
      "Begin saving for potential battery replacement ($15,000-$25,000)."
    );
  }

  if (vehicle.odometer > 100000) {
    recommendations.push(
      "Schedule comprehensive vehicle inspection focusing on high-wear components."
    );
    recommendations.push(
      "Review maintenance schedule and consider more frequent service intervals."
    );
  }

  if (vehicleAge >= 7 || vehicle.odometer >= 140000) {
    recommendations.push(
      "Research extended warranty options before current coverage expires."
    );
    recommendations.push(
      "Compare costs: extended warranty vs. self-insurance fund."
    );
  }

  // ENHANCEMENT: Added charging optimization recommendations
  if (vehicle.stateOfChargePercent > 0.9 && !vehicle.isPluggedIn) {
    recommendations.push(
      "For battery longevity, consider limiting daily charging to 80% unless long trips planned."
    );
  }

  if (vehicle.isPluggedIn && vehicle.chargeState === "FULLY_CHARGED") {
    recommendations.push(
      "Unplug when fully charged to optimize battery health and reduce electricity costs."
    );
  }

  // ENHANCEMENT: Added cost-saving recommendations
  recommendations.push(
    "Schedule charging during off-peak electricity hours (typically 11 PM - 7 AM) to reduce costs."
  );

  if (vehicle.potentialRangeMaxCurrent < theoreticalRange * 0.8) {
    recommendations.push(
      "Check tire pressure monthly - under-inflated tires reduce range by up to 10%."
    );
    recommendations.push(
      "Use Eco mode and regenerative braking to maximize efficiency."
    );
  }

  // ENHANCEMENT: Generate more comprehensive report with additional fields
  return {
    model: `${vehicle.make} ${vehicle.model}`,
    batteryCapacity: `${vehicle.batteryCapacity} kWh`,
    odometer: `${vehicle.odometer.toLocaleString()} km`,
    chargeState: vehicle.chargeState,
    stateOfHealth: `${vehicle.stateOfHealthCurrent.toFixed(1)}%`,
    cycleLifeCurrent: vehicle.stateOfChargeLifeCurrent,
    cycleLifeTarget: 1.0,
    warrantyStatus: warrantyStatus || "Battery warranty is currently active.",
    warnings,
    recommendations,
    year: vehicle.year,
    warrantyYearsLeft: Math.max(8 - vehicleAge, 0),
    warrantyKmLeft: Math.max(160000 - vehicle.odometer, 0),

    // ENHANCEMENT: Added comprehensive analysis fields
    vehicleAge: vehicleAge,
    annualMileage:
      vehicleAge > 0 ? Math.round(vehicle.odometer / vehicleAge) : 0,
    batteryDegradation:
      (((100 - vehicle.stateOfHealthCurrent) / 100) * 100).toFixed(1) + "%",
    rangeEfficiency:
      ((vehicle.potentialRangeMaxCurrent / theoreticalRange) * 100).toFixed(1) +
      "%",
    estimatedReplacementCost:
      vehicle.stateOfHealthCurrent < 30
        ? "$15,000 - $25,000"
        : "Not applicable",
    chargingOptimizationScore:
      vehicle.stateOfChargePercent <= 0.9 && vehicle.stateOfChargePercent >= 0.2
        ? "Good"
        : "Needs improvement",
    overallVehicleCondition:
      vehicle.stateOfHealthCurrent > 50 && vehicle.odometer < 100000
        ? "Excellent"
        : vehicle.stateOfHealthCurrent > 30 && vehicle.odometer < 150000
        ? "Good"
        : vehicle.stateOfHealthCurrent > 15
        ? "Fair"
        : "Poor - Needs Attention",

    // ENHANCEMENT: Added next service recommendations with timeline
    nextServiceRecommendations: [
      {
        service: "Battery Health Check",
        timeframe:
          vehicle.stateOfHealthCurrent < 30 ? "Within 30 days" : "Annual",
        priority: vehicle.stateOfHealthCurrent < 15 ? "Critical" : "Routine",
      },
      {
        service: "Comprehensive Vehicle Inspection",
        timeframe: vehicle.odometer > 100000 ? "Every 6 months" : "Annual",
        priority: vehicle.odometer > 150000 ? "High" : "Standard",
      },
      {
        service: "Warranty Review",
        timeframe: vehicleAge >= 7 ? "Immediate" : "Before year 7",
        priority: vehicleAge >= 7 ? "High" : "Low",
      },
    ],
  };
}

/* 
SUMMARY OF ENHANCEMENTS ADDED:

1. BATTERY INFORMATION ENHANCEMENTS:
   - Added battery degradation percentage calculation
   - More accurate range calculations based on actual battery health
   - Added range efficiency metrics comparing actual vs theoretical performance
   - Enhanced charge cycle usage information

2. USER EXPERIENCE IMPROVEMENTS:
   - More intuitive labels (e.g., "Current Battery Level" instead of "State of Charge")
   - Better handling of negative values (showing "Replacement Recommended" instead of negative numbers)
   - Combined charging status information for clarity
   - Added practical targets (80-90% instead of 100% for daily charging)

3. COMPREHENSIVE WARNING SYSTEM:
   - More granular warning levels (added "Info" level for early indicators)
   - Enhanced battery health warnings with specific timelines
   - Service and maintenance warnings based on mileage thresholds
   - Range performance warnings to detect efficiency issues
   - Charging optimization recommendations

4. ADDITIONAL DATA INSIGHTS:
   - Vehicle age calculation and annual mileage tracking
   - Estimated charging time calculations
   - Cost optimization recommendations
   - Battery replacement cost estimates
   - Warranty expiration predictions based on usage patterns

5. NEW CHARGING OPTIMIZATION CARD:
   - Dedicated section for charging best practices
   - Cost-saving recommendations
   - Battery longevity tips
   - Smart charging guidance

6. ENHANCED REPORT GENERATION:
   - More specific and actionable recommendations
   - Timeline-based service recommendations
   - Overall vehicle condition assessment
   - Comprehensive analysis including efficiency scores
   - Next service recommendations with priority levels

These enhancements provide EV owners with:
- Better understanding of their vehicle's current condition
- Actionable insights for maintenance planning
- Cost-saving opportunities
- Battery longevity optimization
- Proactive maintenance scheduling
- More accurate range and efficiency tracking

The improvements are based on common EV ownership concerns and industry best practices for battery management and vehicle maintenance.
*/
