import React from "react";
import { IconButton, Stack, useTheme } from "@mui/material";
import { FilterList as FilterListIcon, Refresh as RefreshIcon } from "@mui/icons-material";

const HeaderActions: React.FC<{ onToggleFilter: () => void; onRefresh: () => void }> = ({ onToggleFilter, onRefresh }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        aria-label="filter"
        onClick={onToggleFilter}
        sx={{
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <FilterListIcon />
      </IconButton>
      <IconButton
        aria-label="refresh"
        onClick={onRefresh}
        sx={{
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <RefreshIcon />
      </IconButton>
    </Stack>
  );
};

export default HeaderActions;
