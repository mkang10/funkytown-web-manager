import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Collapse,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const predefinedRanges = [
  { label: '3 ngày qua', value: 3 },
  { label: '7 ngày qua', value: 7 },
  { label: '14 ngày qua', value: 14 },
  { label: '30 ngày qua', value: 30 },
];

interface FilterPanelProps {
  filterOpen: boolean;
  onToggleFilter: () => void;
  assignmentDateFrom: string;
  assignmentDateTo: string;
  orderStatus: string;
  fullNameContains: string;
  onChangeAssignmentDateFrom: (v: string) => void;
  onChangeAssignmentDateTo: (v: string) => void;
  onChangeOrderStatus: (v: string) => void;
  onChangeFullNameContains: (v: string) => void;
  onSearchClick: () => void;
  onQuickRangeClick: (days: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterOpen,
  onToggleFilter,
  assignmentDateFrom,
  assignmentDateTo,
  orderStatus,
  fullNameContains,
  onChangeAssignmentDateFrom,
  onChangeAssignmentDateTo,
  onChangeOrderStatus,
  onChangeFullNameContains,
  onSearchClick,
  onQuickRangeClick,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          mb: 3,
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
          boxShadow: isDark
            ? '0 4px 20px rgba(0,0,0,0.8)'
            : '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <CardHeader
          avatar={
            <motion.div
              animate={{ rotate: filterOpen ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <IconButton onClick={onToggleFilter}>
                <FilterListIcon sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            </motion.div>
          }
          title={
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Bộ lọc nâng cao
            </Typography>
          }
        />
        <AnimatePresence initial={false}>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Collapse in={filterOpen} timeout={500} unmountOnExit>
                <CardContent>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Từ ngày"
                        type="date"
                        value={assignmentDateFrom}
                        onChange={(e) =>
                          onChangeAssignmentDateFrom(e.target.value)
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Đến ngày"
                        type="date"
                        value={assignmentDateTo}
                        onChange={(e) =>
                          onChangeAssignmentDateTo(e.target.value)
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <InputLabel>Trạng thái đơn</InputLabel>
                        <Select
                          value={orderStatus}
                          label="Trạng thái đơn"
                          onChange={(e) =>
                            onChangeOrderStatus(e.target.value)
                          }
                        >
                          <MenuItem value="">Tất cả</MenuItem>
                          <MenuItem value="Pending">Đang xử lý</MenuItem>
                          <MenuItem value="Shipped">Đã giao</MenuItem>
                          <MenuItem value="Completed">Hoàn tất</MenuItem>
                          <MenuItem value="Cancelled">Đã hủy</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="Tên khách"
                        placeholder="Nhập tên khách"
                        value={fullNameContains}
                        onChange={(e) =>
                          onChangeFullNameContains(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            backgroundColor: isDark ? '#fff' : '#000',
                            color: isDark ? '#000' : '#fff',
                            textTransform: 'none',
                            borderRadius: 3,
                            fontWeight: 700,
                            boxShadow: 'none',
                            '&:hover': {
                              backgroundColor: isDark ? '#eee' : '#222',
                            },
                          }}
                          onClick={onSearchClick}
                        >
                          Tìm
                        </Button>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {predefinedRanges.map((range) => (
                          <motion.div
                            key={range.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outlined"
                              onClick={() => onQuickRangeClick(range.value)}
                              sx={{
                                borderColor: theme.palette.text.primary,
                                color: theme.palette.text.primary,
                                textTransform: 'none',
                                borderRadius: 3,
                                fontWeight: 500,
                                px: 2,
                                py: 0.5,
                                '&:hover': {
                                  backgroundColor: theme.palette.action.hover,
                                  borderColor: theme.palette.text.primary,
                                },
                              }}
                            >
                              {range.label}
                            </Button>
                          </motion.div>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default FilterPanel;
