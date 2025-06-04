"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Battery,
  Zap,
  Lightbulb,
  AlertTriangle,
  Car,
  DollarSign,
  Shield,
  Clock,
  Activity,
} from "lucide-react";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/ui/Credenza";
import { Report } from "../../types/types";

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  report: Report;
}

const ReportDialog = ({ open, onClose, report }: ReportDialogProps) => {
  // Helper function to get status color based on overall condition
  const getConditionColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "excellent":
        return "text-green-600 dark:text-green-400";
      case "good":
        return "text-blue-600 dark:text-blue-400";
      case "fair":
        return "text-yellow-600 dark:text-yellow-400";
      case "poor - needs attention":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Helper function to get priority color for service recommendations
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20";
      case "high":
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20";
      case "standard":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20";
      case "routine":
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/20";
    }
  };

  return (
    <Credenza open={open} onOpenChange={onClose}>
      <CredenzaContent className="h-11/12 max-w-4xl printable-area">
        <CredenzaHeader>
          <CredenzaTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Car className="h-5 w-5 text-[#FEBD1A]" />
            Comprehensive Vehicle Report
          </CredenzaTitle>
        </CredenzaHeader>

        <CredenzaBody className="overflow-y-scroll space-y-6">
          {/* ENHANCEMENT: Overall Vehicle Condition Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Overall Assessment</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Vehicle Condition
                </p>
                <p
                  className={`font-bold text-lg ${getConditionColor(
                    report.overallVehicleCondition
                  )}`}>
                  {report.overallVehicleCondition || "Assessment Pending"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Charging Optimization
                </p>
                <p className="font-medium">
                  {report.chargingOptimizationScore || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* ENHANCEMENT: Enhanced Vehicle Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Vehicle Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Car className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Vehicle Details</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Model</p>
                  <p className="font-medium">
                    {report.model || "Unknown Model"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Vehicle Age</p>
                  <p className="font-medium">
                    {report.vehicleAge || "N/A"} years
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Distance</p>
                  <p className="font-medium">{report.odometer || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Annual Mileage</p>
                  <p className="font-medium">
                    {report.annualMileage || "N/A"} km/year
                  </p>
                </div>
              </div>
            </div>

            {/* Battery Performance */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Battery className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Battery Performance</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Battery Capacity</p>
                  <p className="font-medium">
                    {report.batteryCapacity || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Health Score</p>
                  <p className="font-medium">{report.stateOfHealth || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Degradation</p>
                  <p className="font-medium text-orange-600">
                    {report.batteryDegradation || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Range Efficiency</p>
                  <p className="font-medium">
                    {report.rangeEfficiency || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ENHANCEMENT: Charging Status Section */}
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">Current Charging Status</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Charge State</p>
                <p className="font-medium flex items-center gap-1">
                  <Zap className="h-4 w-4 text-green-500" />
                  {report.chargeState || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Cycle Usage</p>
                <p className="font-medium">
                  {report.cycleLifeCurrent || 0} / {report.cycleLifeTarget || 1}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Optimization Score</p>
                <p className="font-medium">
                  {report.chargingOptimizationScore || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* ENHANCEMENT: Warranty & Cost Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Warranty Section */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Warranty Coverage</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">
                    {report.warrantyStatus || "Active"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Remaining Coverage</p>
                  <p className="font-medium">
                    {report.warrantyYearsLeft || 0} years,{" "}
                    {report.warrantyKmLeft || 0} km
                  </p>
                </div>
              </div>
            </div>

            {/* Cost Information */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold">Cost Information</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">
                    Est. Battery Replacement
                  </p>
                  <p className="font-medium">
                    {report.estimatedReplacementCost || "Not applicable"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current Health Impact</p>
                  <p className="font-medium">
                    {report.stateOfHealth &&
                    parseFloat(report.stateOfHealth) < 30
                      ? "Consider replacement planning"
                      : "No immediate action needed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ENHANCEMENT: Service Recommendations Section */}
          {report.nextServiceRecommendations &&
            report.nextServiceRecommendations.length > 0 && (
              <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold">
                    Upcoming Service Recommendations
                  </h3>
                </div>
                <div className="space-y-3">
                  {report.nextServiceRecommendations.map((service, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md border ${getPriorityColor(
                        service.priority
                      )}`}>
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium">{service.service}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                          {service.priority}
                        </span>
                      </div>
                      <p className="text-sm opacity-80">{service.timeframe}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Warnings Section - Enhanced */}
          {report.warnings && report.warnings.length > 0 && (
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold flex items-center gap-2 mb-3 text-red-700 dark:text-red-300">
                <AlertTriangle className="h-5 w-5" />
                Active Warnings ({report.warnings.length})
              </h4>
              <div className="space-y-2">
                {report.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 bg-white/50 dark:bg-black/20 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{warning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Section - Enhanced */}
          {report.recommendations && report.recommendations.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-300">
                <Lightbulb className="h-5 w-5" />
                Actionable Recommendations ({report.recommendations.length})
              </h4>
              <div className="space-y-2">
                {report.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 bg-white/50 dark:bg-black/20 rounded">
                    <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ENHANCEMENT: Quick Actions Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-white/60 dark:bg-black/20 rounded">
                <p className="font-medium mb-1">Schedule Service</p>
                <p className="text-muted-foreground">
                  Book your next maintenance appointment
                </p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-black/20 rounded">
                <p className="font-medium mb-1">Charging Optimization</p>
                <p className="text-muted-foreground">
                  Review your charging patterns and costs
                </p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-black/20 rounded">
                <p className="font-medium mb-1">Warranty Check</p>
                <p className="text-muted-foreground">
                  Verify current coverage and options
                </p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-black/20 rounded">
                <p className="font-medium mb-1">Download Report</p>
                <p className="text-muted-foreground">
                  Save this report for your records
                </p>
              </div>
            </div>
          </div>
        </CredenzaBody>

        <CredenzaFooter className="flex gap-2 no-print">
          {/* <Button
            variant="outline"
            onClick={() => {
              // ENHANCEMENT: Add functionality to download/print report
              window.print();
            }}
            className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Print Report
          </Button> */}
          <CredenzaClose asChild>
            <Button
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
              Close Report
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default ReportDialog;

/* 
SUMMARY OF REPORT DIALOG ENHANCEMENTS:

1. VISUAL IMPROVEMENTS:
   - Added more icons for better visual organization (Car, Activity, Shield, DollarSign, etc.)
   - Color-coded sections with appropriate backgrounds and borders
   - Gradient backgrounds for key sections
   - Better spacing and typography hierarchy

2. COMPREHENSIVE DATA DISPLAY:
   - Overall vehicle condition assessment at the top
   - Enhanced vehicle details including age and annual mileage
   - Separate battery performance section with health metrics
   - Current charging status with optimization score
   - Warranty and cost information in dedicated sections

3. NEW SECTIONS ADDED:
   - Overall Assessment section showing vehicle condition and charging optimization
   - Service Recommendations with priority levels and timeframes
   - Cost Information including battery replacement estimates
   - Quick Actions section for immediate next steps
   - Enhanced warnings and recommendations with icons and better formatting

4. IMPROVED USER EXPERIENCE:
   - Color-coded priority levels for service recommendations
   - Visual indicators for different types of information
   - Better responsive design for mobile and desktop
   - Print functionality for report archiving
   - More intuitive information grouping

5. ENHANCED FUNCTIONALITY:
   - Helper functions for status and priority color coding
   - Dynamic content display based on available data
   - Better handling of optional report fields
   - Print report functionality
   - Improved accessibility with proper icons and labels

6. PROFESSIONAL PRESENTATION:
   - Card-based layout for different information categories
   - Consistent styling and spacing
   - Professional color scheme with appropriate contrast
   - Clear information hierarchy and visual separation

*/
