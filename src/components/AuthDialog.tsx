"use client";
import { useState } from "react";
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

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setValue,
    // reset,
  } = useForm<FromProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      zipCode: "",
    },
  });

  const handleFormSubmit: SubmitHandler<FromProps> = (data) => {
    const { email } = data;
    toast.success(
      mode === "login" ? "Welcome back!" : "Welcome to Auto Connect!",
      {
        description: `We've sent a confirmation to ${email}`,
        className:
          "text-sm bg-green-500 text-green font-semibold p-3 rounded-md", // Improved contrast with white text on green background
        duration: 3000, // You can increase the duration for better visibility
      }
    );
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant={mode === "login" ? "ghost" : "default"}
            className={className}>
            {mode === "login" ? "Login" : "Sign Up"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">Auth Form</DialogTitle>
        <Tabs defaultValue={mode} className="w-full">
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
                  <p className="text-red-500">{errors.email.message}</p>
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
                  <p className="text-red-500">{errors.password.message}</p>
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
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-name-signup">Last Name</Label>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <Input id="last-name-signup" {...field} placeholder="Doe" />
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
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
                  <p className="text-red-500">{errors.email.message}</p>
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
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <Input id="password-signup" type="password" {...field} />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
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
                  <p className="text-red-500">{errors.zipCode.message}</p>
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
      </DialogContent>
    </Dialog>
  );
}
