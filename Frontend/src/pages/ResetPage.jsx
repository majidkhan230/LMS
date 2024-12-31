import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordResetForm } from "@/components/password-reset-form";

export default function ResetPasswordPage() {
  const handlePasswordReset = async (data) => {
    console.log("Password Reset Data:", data);
    // Replace with your API call
    try {
      // Simulate an API request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Password reset successfully.");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordResetForm onSubmit={handlePasswordReset} />
        </CardContent>
      </Card>
    </div>
  );
}
