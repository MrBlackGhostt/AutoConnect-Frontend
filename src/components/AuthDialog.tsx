import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FromProps } from "../../types/types";

import { CheckCircle, Car } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface AuthDialogProps {
  mode?: "login" | "signup";
  trigger?: React.ReactNode;
  className?: string;
}

export function AuthDialog({
  mode = "login",
  trigger,
  className,
}: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "auth" | "smartcar" | "complete"
  >("smartcar");
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      (async () => {
        try {
          const res = await fetch("/api/exchange", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              code,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            console.log("🚀 ---------------🚀");
            console.log("🚀 ~ data:", data);
            console.log("🚀 ---------------🚀");
          }
        } catch (error) {
          console.log("🚀 -----------------🚀");
          console.log("🚀 ~ error:", error);
          console.log("🚀 -----------------🚀");
          if (error instanceof Error) {
            throw new Error(`Something went wrong: ${error.message}`);
          } else {
            throw new Error("Something went wrong: unknown error");
          }
        }
      })();
    }
  }, []);

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FromProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      zipCode: "",
    },
  });

  const handleFormSubmit: SubmitHandler<FromProps> = async (data) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setOwnerId(result.data);
        toast.success("Account created successfully!", {
          description: `We've sent a confirmation to ${data.email}`,
          duration: 3000,
        });
        // Move to Smartcar connection step
        setCurrentStep("smartcar");
      } else {
        toast.error(result.message || "Signup failed, please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const handleSmartcarConnection = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch("/api/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerId }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Successfully connected with Smartcar!");
        setCurrentStep("complete");
        // Auto-close after showing success
        setTimeout(() => {
          handleDialogClose(isOpen);
        }, 2000);
      } else {
        toast.error(result.message || "Failed to connect with Smartcar.");
      }
    } catch (error) {
      toast.error("An error occurred while connecting with Smartcar.");
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  // const handleSkipSmartcar = () => {
  //   toast.info("You can connect your vehicle later from your dashboard.");
  //   setIsOpen(false);
  // };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset everything when dialog closes
      setCurrentStep("auth");
      setOwnerId(null);
      reset();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "smartcar":
        return (
          <div className="text-center space-y-6 py-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Connect Your Vehicle</h3>
              <p className="text-gray-600 text-sm">
                Connect your car with Smartcar to unlock personalized features
                and insights.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleSmartcarConnection}
                disabled={isConnecting}
                className="w-full bg-[#F0C412] text-black hover:bg-[#EFC727]">
                <Link
                  href="https://connect.smartcar.com/oauth/authorize?response_type=code
&client_id=df848e5f-7837-40bb-b503-f433883c75f5
&redirect_uri=http://localhost:3000/
&scope=read_battery read_alerts read_charge read_charge_locations read_climate read_compass read_diagnostics read_extended_vehicle_info read_location read_odometer read_security read_service_history read_speedometer read_thermometer read_tires read_user_profile read_vehicle_info read_vin
&mode=simulated">
                  {" "}
                  {isConnecting ? "Connecting..." : "Connect with Smartcar"}
                </Link>
              </Button>
              {/* <Button
                variant="ghost"
                onClick={handleSkipSmartcar}
                className="w-full text-gray-600">
                Skip for now
              </Button> */}
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="text-center space-y-6 py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">All Set!</h3>
              <p className="text-gray-600 text-sm">
                Your account is ready and your vehicle is connected.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <Tabs
            defaultValue={mode}
            className="w-full"
            activationMode="automatic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        id="email-login"
                        {...field}
                        placeholder="your@email.com"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input id="password-login" type="password" {...field} />
                    )}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F0C412] text-black hover:bg-[#EFC727]">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name-signup">First Name</Label>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: "First name is required" }}
                      render={({ field }) => (
                        <Input
                          id="first-name-signup"
                          {...field}
                          placeholder="John"
                        />
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last-name-signup">Last Name</Label>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: "Last name is required" }}
                      render={({ field }) => (
                        <Input
                          id="last-name-signup"
                          {...field}
                          placeholder="Doe"
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        id="email-signup"
                        type="email"
                        {...field}
                        placeholder="your@email.com"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input id="password-signup" type="password" {...field} />
                    )}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip-signup">Zip Code</Label>
                  <Controller
                    name="zipCode"
                    control={control}
                    rules={{
                      required: "Zip code is required",
                      pattern: {
                        value: /^\d{5}$/,
                        message: "Please enter a valid zip code (5 digits)",
                      },
                    }}
                    render={({ field }) => (
                      <Input id="zip-signup" type="text" {...field} />
                    )}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F0C412] text-black hover:bg-[#EFC727]">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant={mode === "login" ? "ghost" : "default"}
            className={className}
            onClick={() => setIsOpen(true)}>
            {mode === "login" ? "Login" : "Sign Up"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">
          {currentStep === "auth"
            ? "Authentication"
            : currentStep === "smartcar"
            ? "Connect Vehicle"
            : "Setup Complete"}
        </DialogTitle>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}
