"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Collapse, Grid, Alert, useTheme, alpha } from "@mui/material";
import { ImportDetailItem, AuditLog } from "@/type/importdetail";

interface CollapsibleArrayProps {
  data: any[];
}
const CollapsibleArray: React.FC<CollapsibleArrayProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <Box sx={{ ml: 2 }}>
      <Button
        variant="outlined"
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.primary,
          "&:hover": {
            borderColor: theme.palette.text.secondary,
            backgroundColor: alpha(theme.palette.action.hover, 0.1),
          },
          borderRadius: "50px",
          padding: "8px 20px",
          textTransform: "none",
          boxShadow: theme.shadows[1],
          transition: "all 0.3s ease",
        }}
      >
        {open ? "Ẩn Các Mục" : "Hiển Thị Các Mục"}
      </Button>
      <Collapse in={open}>
        {data.map((item, index) => (
          <Box key={index} sx={{ ml: 2, mt: 1 }}>
            <RenderValue value={item} />
          </Box>
        ))}
      </Collapse>
    </Box>
  );
};

interface RenderValueProps {
  value: any;
}
const RenderValue: React.FC<RenderValueProps> = ({ value }) => {
  const theme = useTheme();
  if (value === null || value === undefined || value === "") return null;

  if (typeof value !== "object") {
    return (
      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
        {String(value)}
      </Typography>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return <CollapsibleArray data={value} />;
  }

  const entries = Object.entries(value).filter(
    ([, v]) => v !== null && v !== undefined && v !== ""
  );
  if (entries.length === 0) return null;
  return (
    <Box sx={{ ml: 2 }}>
      {entries.map(([key, val]) => (
        <Box key={key} sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
            <strong>{key}:</strong>{" "}
            {typeof val === "object" ? <RenderValue value={val} /> : String(val)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

interface ImportDetailDetailsProps {
  details: ImportDetailItem[];
  auditLogs: AuditLog[];
}

const ImportDetailDetails: React.FC<ImportDetailDetailsProps> = ({ details, auditLogs }) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openAudit, setOpenAudit] = useState<boolean>(false);
  const theme = useTheme();

  const handleToggleDetails = () => setOpenDetails((prev) => !prev);
  const handleToggleAudit = () => setOpenAudit((prev) => !prev);

  const renderChangeData = (changeData: string): React.ReactNode => {
    if (!changeData) return null;
    try {
      const parsed = JSON.parse(changeData);
      return <RenderValue value={parsed} />;
    } catch (error) {
      return (
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          {changeData}
        </Typography>
      );
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Button
        variant="outlined"
        onClick={handleToggleDetails}
        sx={{
          mb: 1,
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.primary,
          "&:hover": {
            borderColor: theme.palette.text.secondary,
            backgroundColor: alpha(theme.palette.action.hover, 0.1),
          },
          borderRadius: "50px",
          padding: "8px 20px",
          textTransform: "none",
          boxShadow: theme.shadows[1],
          transition: "all 0.3s ease",
        }}
      >
        {openDetails ? "Ẩn Chi Tiết Nhập Kho" : "Hiển Thị Chi Tiết Nhập Kho"}
      </Button>
      <Collapse in={openDetails}>
        {details.map((detail) => (
          <Box
            key={detail.importDetailId}
            sx={{
              ml: 2,
              mt: 1,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
              pb: 1,
              mb: 1,
              backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.background.paper, 0.2) : alpha(theme.palette.background.paper, 1),
              borderRadius: "8px",
              boxShadow: theme.shadows[1],
              transition: "all 0.3s ease",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
              <strong>Mã Sản Phẩm:</strong> {detail.productVariantId}
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
              <strong>Số Lượng:</strong> {detail.quantity}
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
              <strong>Tên Sản Phẩm:</strong> {detail.productVariantName || "-"}
            </Typography>
            <Box sx={{ ml: 2, mt: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                <strong>Phân Bổ Kho:</strong>
              </Typography>
              {detail.storeDetails.map((store) => {
                const missing = store.allocatedQuantity - store.actualQuantity;
                return (
                  <Box key={store.storeId} sx={{ ml: 2, mt: 0.5 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      <strong>Kho ID:</strong> {store.storeId} - <strong>Tên Kho:</strong> {store.storeName} -{" "}
                      <strong>Phân Bổ:</strong> {store.allocatedQuantity} - <strong>Thực Tế:</strong>{" "}
                      {store.actualQuantity} - <strong>Nhân Viên:</strong> {store.staffName} -{" "}
                      <strong>Trạng Thái:</strong> {store.status.trim()}
                    </Typography>
                    {missing > 0 && store.status.trim() === "Shortage" && (
                      <Alert severity="error" sx={{ mt: 1, borderRadius: "8px" }}>
                        Thiếu {missing} mặt hàng{missing > 1 ? "" : ""}
                      </Alert>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Collapse>

      <Button
        variant="outlined"
        onClick={handleToggleAudit}
        sx={{
          mt: 2,
          mb: 1,
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.primary,
          "&:hover": {
            borderColor: theme.palette.text.secondary,
            backgroundColor: alpha(theme.palette.action.hover, 0.1),
          },
          borderRadius: "50px",
          padding: "8px 20px",
          textTransform: "none",
          boxShadow: theme.shadows[1],
          transition: "all 0.3s ease",
        }}
      >
        {openAudit ? "Ẩn Nhật Ký Kiểm Tra" : "Hiển Thị Nhật Ký Kiểm Tra"}
      </Button>
      <Collapse in={openAudit}>
        {auditLogs.map((log) => (
          <Box
            key={log.auditLogId}
            sx={{
              ml: 2,
              mt: 1,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
              pb: 1,
              mb: 1,
              backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.background.paper, 0.2) : alpha(theme.palette.background.paper, 1),
              borderRadius: "8px",
              boxShadow: theme.shadows[1],
              transition: "all 0.3s ease",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>ID Kiểm Tra:</strong> {log.auditLogId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Bảng:</strong> {log.tableName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Thao Tác:</strong> {log.operation}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Thay Đổi Bởi:</strong> {log.changedByName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Ngày Thay Đổi:</strong> {log.changeDate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Bình Luận:</strong> {log.comment}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  <strong>Dữ Liệu Thay Đổi:</strong>
                </Typography>
                {renderChangeData(log.changeData)}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Collapse>
    </Box>
  );
};

export default ImportDetailDetails;
