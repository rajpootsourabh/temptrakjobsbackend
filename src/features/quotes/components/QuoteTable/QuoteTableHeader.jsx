// features/quotes/components/QuoteTable/QuoteTableHeader.jsx
import React from 'react';
import { TableHead, TableRow, TableCell, Checkbox, Typography } from '@mui/material';

const QuoteTableHeader = ({ selectAll = false, onSelectAll, showCheckbox = true }) => {
  return (
    <TableHead>
      <TableRow 
        sx={{ 
          background: '#f9fafb',
          '& .MuiTableCell-root': {
            py: '12px',  // Match row vertical padding
            px: '8px',   // Match row horizontal padding
            fontSize: '0.875rem',
            fontWeight: 600,
          },
          '& .MuiTableCell-root:first-of-type': {
            pl: '16px',
          },
          '& .MuiTableCell-root:last-of-type': {
            pr: '16px',
          }
        }}
      >
        {showCheckbox && (
          <TableCell padding="checkbox" sx={{ width: 50 }}>
            <Checkbox 
              checked={selectAll} 
              onChange={onSelectAll}
              size="small"
            />
          </TableCell>
        )}

        <TableCell sx={{ width: 100 }}>Quote #</TableCell>
        <TableCell sx={{ width: 200 }}>Quote Title</TableCell>
        <TableCell sx={{ width: 180 }}>Client Name</TableCell>
        <TableCell sx={{ width: 120 }}>Issue Date</TableCell>
        <TableCell sx={{ width: 120 }}>Expiry Date</TableCell>
        <TableCell sx={{ width: 100 }}>Amount</TableCell>
        <TableCell sx={{ width: 100 }}>Status</TableCell>
        <TableCell sx={{ width: 100 }}>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default QuoteTableHeader;