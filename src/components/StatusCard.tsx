import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  XCircle,
} from "lucide-react";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/ui/Credenza"; // Import the Credenza component
import { cn } from "@/lib/utils";
import { StatusCardData } from "../../types/types";

interface StatusCardProps {
  data: StatusCardData;
}

const StatusCard: React.FC<StatusCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-500 text-white";
      case "Warning":
        return "bg-yellow-500 text-black";
      case "Critical":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Healthy":
        return <CheckCircle2 className="h-5 w-5" />;
      case "Warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "Critical":
        return <XCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{data.title}</h3>
              <p className="text-sm text-muted-foreground">{data.details}</p>
            </div>

            <div className="mt-auto space-y-4">
              {/* Status indicator */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <div
                  className={cn(
                    "px-3 py-1 rounded-full flex items-center gap-1.5",
                    getStatusColor(data.status)
                  )}>
                  {getStatusIcon(data.status)}
                  <span>{data.status}</span>
                </div>
              </div>
              {/* Current & Target values */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted/50 p-2 rounded">
                  <span className="block text-muted-foreground text-xs">
                    Current
                  </span>
                  <span className="font-medium">{data.current}</span>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <span className="block text-muted-foreground text-xs">
                    Target
                  </span>
                  <span className="font-medium">{data.target}</span>
                </div>
              </div>
              {/* Add additional fields here, for example: */}
              {/* {data.status && (
                <div className="bg-muted/50 p-2 rounded">
                  <span className="block text-muted-foreground text-xs">
                    Battery Health
                  </span>
                  <span className="font-medium">{data.status}%</span>
                </div>
              )} */}
              {/* {data.range && (
                <div className="bg-muted/50 p-2 rounded">
                  <span className="block text-muted-foreground text-xs">
                    Range
                  </span>
                  <span className="font-medium">{data.range} km</span>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Card footer with details button */}
        <div className="bg-[#FEBD1A]/20 p-2 flex justify-end">
          <Button
            onClick={() => setIsOpen(true)}
            className="font-semibold text-primary bg-[#FEBD1A]/90 hover:bg-[#FEBD1A]/40 transition-all duration-300 flex items-center gap-1">
            DETAILS <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Credenza Dialog for mobile/desktop */}
        <Credenza open={isOpen} onOpenChange={setIsOpen}>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>{data.title}</CredenzaTitle>
              <CredenzaDescription>{data.details}</CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
              {data.metrics && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase text-muted-foreground font-medium">
                    Metrics
                  </h4>
                  <div className="space-y-1.5">
                    {data.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                        <span>{metric.label}</span>
                        <span className="font-medium">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New fields to display */}
              {/* {data.batteryHealth && (
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Battery Health: {data.batteryHealth}%
                  </span>
                </div>
              )} */}

              {/* {data.range && (
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Estimated Range: {data.range} km
                  </span>
                </div>
              )} */}
            </CredenzaBody>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button>Close</Button>
              </CredenzaClose>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
