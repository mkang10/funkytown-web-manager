import React from "react";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Button,
    Typography,
    useTheme,
} from "@mui/material";
import {
    CheckCircleOutline as CheckCircleOutlineIcon,
    DoneAll as DoneAllIcon,
    HourglassBottom as HourglassIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { DispatchStoreDetail } from "@/type/dispatchnew";

const statusConfigs: Record<
    string,
    { color: string; icon: React.ReactNode }
> = {
    Processing: {
        color: "linear-gradient(90deg, #FFD54F, #FFA000)",
        icon: <HourglassIcon fontSize="small" />,
    },
    Success: {
        color: "linear-gradient(90deg, #66bb6a, #43a047)",
        icon: <DoneAllIcon fontSize="small" />,
    },
};

const DispatchTable: React.FC<{
    rows: DispatchStoreDetail[];
    router: any;
    onComplete: (row: DispatchStoreDetail) => void;
}> = ({ rows, router, onComplete }) => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    background: theme.palette.background.paper,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                background:
                                    theme.palette.mode === "dark"
                                        ? "#000"
                                        : "#000",
                            }}
                        >
                            {[
                                "Mã chi tiết",
                                "Kho",
                                "SL phân bổ",
                                "SL thực tế",
                                "Trạng thái",
                                "Ghi chú",
                                "Thao tác",
                            ].map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textAlign:
                                            header.includes("SL") || header === "Thao tác"
                                                ? "center"
                                                : "left",
                                        fontSize: "0.9rem",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const trimmedStatus = row.status.trim();
                            const config = statusConfigs[trimmedStatus] || {
                                color: theme.palette.grey[500],
                                icon: null,
                            };
                            const isSuccess = trimmedStatus === "Success";

                            return (
                                <motion.tr
                                    key={row.dispatchStoreDetailId}
                                    whileHover={{ scale: 1.02 }}
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}
                                    onClick={() =>
                                        router.push(
                                            `/staff-dispatch-request/${row.dispatchStoreDetailId}`
                                        )
                                    }
                                >
                                    <TableCell>{row.dispatchStoreDetailId}</TableCell>
                                    <TableCell>{row.warehouseName}</TableCell>
                                    <TableCell align="center">
                                        {row.allocatedQuantity}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.actualQuantity ?? "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                px: 1.5,
                                                py: 0.4,
                                                borderRadius: 2,
                                                background: config.color,
                                                color: "#fff",
                                                fontWeight: 600,
                                                fontSize: "0.8rem",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            {config.icon}
                                            {trimmedStatus}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.comments}</TableCell>
                                    <TableCell
                                        align="center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {!isSuccess ? (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<CheckCircleOutlineIcon />}
                                                sx={{
                                                    background:
                                                        "linear-gradient(90deg, #42a5f5, #478ed1)",
                                                    borderRadius: 20,
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                    px: 2,
                                                    boxShadow: "0 4px 12px rgba(66,165,245,0.4)",
                                                    "&:hover": {
                                                        background:
                                                            "linear-gradient(90deg, #1e88e5, #1565c0)",
                                                        boxShadow:
                                                            "0 6px 16px rgba(30,136,229,0.5)",
                                                    },
                                                }}
                                                onClick={() => onComplete(row)}
                                            >
                                                Hoàn thành
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<DoneAllIcon />}
                                                sx={{
                                                    borderRadius: 20,
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                    px: 2,
                                                    color: theme.palette.text.secondary,
                                                    borderColor: theme.palette.grey[400],
                                                    "&:hover": {
                                                        borderColor: theme.palette.grey[500],
                                                        backgroundColor:
                                                            theme.palette.action.hover,
                                                    },
                                                }}
                                                disabled
                                            >
                                                Đã hoàn tất
                                            </Button>
                                        )}
                                    </TableCell>
                                </motion.tr>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
    );
};

export default DispatchTable;
