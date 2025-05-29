import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCompleteDialog: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 600, color: '#111' }}>
        Xác nhận hoàn thành
      </DialogTitle>
      <DialogContent>
        <Typography>
          Bạn có chắc chắn xác nhận đã hoàn thành đơn hàng không?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#111' }}>
          Không
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{ backgroundColor: '#111', borderRadius: 3 }}
        >
          Có
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmCompleteDialog;
