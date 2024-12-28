import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}