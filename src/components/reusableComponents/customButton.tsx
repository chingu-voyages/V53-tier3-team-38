import * as React from "react";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Settings,
  Calendar,
  ChefHat,
  AlertTriangle,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        small: "h-10 px-3 text-xs min-w-[58.81px]",
        medium: "h-10 px-4 text-sm min-w-[223.2]",
        big: "h-10 px-6 text-base min-w-[318.4px]",
      },
      variantColor: {
        white: "bg-white text-black hover:bg-gray-100 border border-gray-300",
        green: "bg-[#27AE60] text-white hover:bg-green-600",
        red: "bg-red-500 text-white hover:bg-red-600",
      },
    },
    defaultVariants: {
      size: "medium",
      variantColor: "white",
    },
  },
);

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?:
    | "settings"
    | "calendar"
    | "chef-hat"
    | "warning"
    | "play"
    | "gmail"
    | "github";
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, size, variantColor, icon, children, ...props }, ref) => {
    const IconComponent = icon ? getIcon(icon) : null;

    return (
      <Button
        className={cn(buttonVariants({ size, variantColor, className }))}
        ref={ref}
        {...props}
      >
        {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
        {children}
      </Button>
    );
  },
);
CustomButton.displayName = "CustomButton";

export { CustomButton, buttonVariants };

const getIcon = (
  icon: CustomButtonProps["icon"],
): LucideIcon | React.FC<React.SVGProps<SVGSVGElement>> => {
  switch (icon) {
    case "settings":
      return Settings;
    case "calendar":
      return Calendar;
    case "chef-hat":
      return ChefHat;
    case "warning":
      return AlertTriangle;
    case "play":
      return PlayCircle;
    case "gmail":
      return GmailIcon;
    case "github":
      return GithubIcon;
    default:
      return () => null;
  }
};

const GmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
