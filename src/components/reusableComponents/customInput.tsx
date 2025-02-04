import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inputWrapperVariants = cva("grid w-full items-center gap-1.5", {
  variants: {
    error: {
      true: "text-destructive",
    },
  },
  defaultVariants: {
    error: false,
  },
});

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputWrapperVariants> {
  label: string;
  type: "text" | "email" | "password";
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const validate = (value: string) => {
      if (!value) {
        setErrorMessage(`${label} is required`);
        return false;
      }
      switch (type) {
        case "email":
          if (!emailRegex.test(value)) {
            setErrorMessage("Invalid email address");
            console.error(error);
            return false;
          }
          break;
        case "password":
          if (value.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            console.error(error);
            return false;
          }
          break;
      }
      setErrorMessage("");
      return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (touched) {
        validate(e.target.value);
      }
    };

    const handleBlur = () => {
      setTouched(true);
      validate(value);
    };

    return (
      <div className={cn(inputWrapperVariants({ error: !!errorMessage }))}>
        <Label htmlFor={props.id || label.toLowerCase()}>{label}</Label>
        <div className="relative">
          <Input
            type={type}
            id={props.id || label.toLowerCase()}
            className={cn(
              "w-[318.4px] h-[41.6px] border-none placeholder-gray-400",
              errorMessage && "focus-visible:ring-destructive",
              className,
            )}
            ref={ref}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          />
        </div>
        {errorMessage && (
          <p className="text-sm font-medium text-destructive">{errorMessage}</p>
        )}
      </div>
    );
  },
);
CustomInput.displayName = "CustomInput";

export { CustomInput };
