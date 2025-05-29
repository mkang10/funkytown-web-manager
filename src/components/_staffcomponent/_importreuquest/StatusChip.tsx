import React, { cloneElement } from "react";
import { Chip, useTheme, ChipProps } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  HourglassBottom as HourglassBottomIcon,
  WarningAmber as WarningAmberIcon,
  Cancel as CancelIcon,
  DoneAll as DoneAllIcon,
} from "@mui/icons-material";

interface StatusChipProps {
  status: string;
}

type StatusKey = "processing" | "success" | "shortage" | "handled" | "rejected";

const statusMap: Record<StatusKey, {
  color: ChipProps["color"];
  icon: React.JSX.Element;  // icon gốc không màu, chỉ size thôi
  bgColor: string;
  iconColor: string; // thêm màu icon cho từng trạng thái (màu sáng)
}> = {
  processing: {
    color: "warning",
    icon: <HourglassBottomIcon fontSize="small" />,
    bgColor: "rgba(255, 193, 7, 1)",
    iconColor: "#fff9c4", // vàng nhạt sáng
  },
  success: {
    color: "success",
    icon: <DoneAllIcon fontSize="small" />,
    bgColor: "rgba(76, 175, 80, 1)",
    iconColor: "#c8e6c9", // xanh lá sáng
  },
  shortage: {
    color: "info",
    icon: <WarningAmberIcon fontSize="small" />,
    bgColor: "rgba(3, 169, 244, 1)",
    iconColor: "#bbdefb", // xanh dương sáng
  },
  handled: {
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
    bgColor: "rgba(56, 142, 60, 1)",
    iconColor: "#a5d6a7", // xanh lá sáng hơn
  },
  rejected: {
    color: "error",
    icon: <CancelIcon fontSize="small" />,
    bgColor: "rgba(244, 67, 54, 1)",
    iconColor: "#ef9a9a", // đỏ sáng
  },
};



const isValidStatus = (status: string): status is StatusKey => {
  return Object.keys(statusMap).includes(status);
};
const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const theme = useTheme();
  const lowerStatus = status.toLowerCase().trim();
  const info = isValidStatus(lowerStatus) ? statusMap[lowerStatus] : undefined;

  const iconWithColor = info?.icon
    ? cloneElement(info.icon, { htmlColor: info.iconColor })
    : undefined;

  const chipProps = {
    label: status,
    size: "small" as const,
    variant: "filled" as const,
    color: info?.color ?? "default",
    sx: {
      display: "inline-flex",
      alignItems: "center",
      gap: 0.5,
      px: 1.5,
      py: 0.4,
      borderRadius: 2,
      backgroundColor: info?.bgColor ?? theme.palette.grey[500],
      color: "#fff",
      fontWeight: 600,
      fontSize: "0.8rem",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      textTransform: "capitalize",
    },
    ...(iconWithColor && { icon: iconWithColor }),
  };

  return <Chip {...chipProps} />;
};

export default StatusChip;
