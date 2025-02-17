import * as React from "react";
import { Button } from "@/components/ui/button";
import { Trash, Pencil, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        trash: "bg-red-100 text-red-600 hover:bg-red-200",
        pencil:
          "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200",
      },
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "pencil",
      size: "default",
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof iconButtonVariants> {
  icon: "trash" | "pencil";
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, ...props }, ref) => {
    const Icon: LucideIcon = icon === "trash" ? Trash : Pencil;
    console.log(
      "IconButtonProps",
      { className, variant, size, icon, ...props },
      ref,
    );

    return (
      <Button
        className={cn(iconButtonVariants({ variant: icon, size, className }))}
        ref={ref}
        {...props}
      >
        <Icon className="h-4 w-4" />
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
