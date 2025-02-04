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
        "flex items-center p-3 rounded-md w-[178px] min-h-[49px]",
        "text-white text-sm",
        isAlert ? "bg-[#580F0F]" : "bg-[#645414]",
        message.split(" ").length > 10 ? "min-h-[74px]" : "",
        message.split(" ").length > 20 ? "min-h-[99px]" : "",
      )}
    >
      {isAlert ? (
        <AlertOctagon className="w-5 h-5 mr-2 flex-shrink-0 text-[#AE2F2F]" />
      ) : (
        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 text-[#F39C12]" />
      )}
      <p className="flex-grow">{message}</p>
    </div>
  );
};

export { StatusCard };
