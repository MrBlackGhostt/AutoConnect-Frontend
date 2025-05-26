"use client";
import { useState } from "react";
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zipCode: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formIsValid = validateForm();
    if (formIsValid) {
      const { email } = formData;
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
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate First Name
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    // Validate Last Name
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    // Validate Zip Code (5 digits)
    const zipCodeRegex = /^\d{5}$/;
    if (!formData.zipCode) {
      newErrors.zipCode = "Zip code is required";
      isValid = false;
    } else if (!zipCodeRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code (5 digits)";
      isValid = false;
    } else {
      newErrors.zipCode = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input
                  id="email-login"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-login">Password</Label>
                <Input
                  id="password-login"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
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
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="first-name-signup">First Name</Label>
                <Input
                  id="first-name-signup"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-name-signup">Last Name</Label>
                <Input
                  id="last-name-signup"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input
                  id="email-signup"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input
                  id="password-signup"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip-signup">Zip Code</Label>
                <Input
                  id="zip-signup"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
                {errors.zipCode && (
                  <p className="text-red-500">{errors.zipCode}</p>
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
