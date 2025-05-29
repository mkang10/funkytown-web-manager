import React from 'react';
import { Button, Stack } from '@mui/material';

const ranges = [3,7,14,30] as const;
interface Props { onSelect: (days: number) => void; }
const QuickRangeButtons: React.FC<Props> = ({ onSelect }) => (
  <Stack direction="row" spacing={1}>
    {ranges.map(d => (
      <Button key={d} onClick={() => onSelect(d)}>{`${d} ngày qua`}</Button>
    ))}
  </Stack>
);
export default QuickRangeButtons;

