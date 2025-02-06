import type React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertOctagon } from "lucide-react";

type StatusType = "alert" | "warning";

interface StatusCardProps {
  type: StatusType;
  message: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ type, message }) => {
  const isAlert = type === "alert";

  return (
    <div
      className={cn(
        "flex flex-1 items-center p-3 rounded-md w-3xs min-h-[60px] gap-4",
        "text-[#2C3E50] text-lg",
        isAlert ? "bg-[#FEE2E2]" : "bg-[#FFFBEB]",
        message.split(" ").length > 10 ? "min-h-[74px]" : "",
        message.split(" ").length > 20 ? "min-h-[99px]" : "",
      )}
      style={{ padding: "0.75rem" }}
    >
      {isAlert ? (
        <AlertOctagon className="w-10 h-10 mr-2 flex-shrink-0 text-[#B91C1C]" />
      ) : (
        <AlertTriangle className="w-10 h-10 mr-2 flex-shrink-0 text-[#F39C12]" />
      )}
      <p className="flex-grow pointer-events-none">{message}</p>
    </div>
  );
};

export { StatusCard };
