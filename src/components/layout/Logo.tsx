import { Shield } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl", 
    lg: "text-3xl"
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36
  };

  return (
    <div className={`flex items-center gap-2 font-bold text-primary ${sizeClasses[size]} ${className}`}>
      <Shield size={iconSizes[size]} className="text-primary" />
      <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        ConnectSure
      </span>
    </div>
  );
};