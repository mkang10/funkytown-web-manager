import React from "react";
import { Card, Stack, FormControl, InputLabel, Select, MenuItem, useTheme } from "@mui/material";

const FilterCard: React.FC<{ statuses: string[]; statusFilter: string; setStatusFilter: (value: string) => void }> = ({
  statuses,
  statusFilter,
  setStatusFilter,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        px: 2,
        py: 1,
      }}
      elevation={0}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="flex-start">
        <FormControl size="small" sx={{ minWidth: 180, bgcolor: theme.palette.background.default }}>
          <InputLabel sx={{ color: theme.palette.text.secondary }}>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            label="Trạng thái"
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              color: theme.palette.text.primary,
              ".MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.divider },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              ".MuiSvgIcon-root": { color: theme.palette.text.primary },
            }}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s} sx={{ color: theme.palette.text.primary }}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Card>
  );
};

export default FilterCard;
