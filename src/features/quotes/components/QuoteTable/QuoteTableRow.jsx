// features/quotes/components/QuoteTable/QuoteTableRow.jsx
import React from 'react';
import { TableRow, TableCell, Checkbox, Box, IconButton } from '@mui/material';
import { Edit, Delete } from 'lucide-react';
import QuoteStatusChip from './QuoteStatusChip';

const QuoteTableRow = ({
  quote,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete
}) => {
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    if (onSelect) onSelect(quote.id);
  };

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Calculate item total or use subtotal
  const getItemTotal = () => {
    if (quote.items && quote.items.length > 0) {
      // If there are items, you might want to display the first item's total
      // Or calculate total from all items
      return quote.items[0]?.item_total || '0.00';
    }
    return '0.00';
  };

  return (
    <TableRow
      hover
      selected={isSelected}
      sx={{
        '&:hover': { background: '#fafafa' },
        '& .MuiTableCell-root': {
          py: '12px',
          px: '8px',
          fontSize: '0.875rem',
        },
        '& .MuiTableCell-root:first-of-type': {
          pl: '16px',
        },
        '& .MuiTableCell-root:last-of-type': {
          pr: '16px',
        }
      }}
    >
      <TableCell padding="checkbox" sx={{ width: 50 }}>
        <Checkbox
          checked={isSelected}
          onChange={handleCheckboxChange}
          size="small"
        />
      </TableCell>

      <TableCell sx={{ width: 100 }}>{quote.quote_number}</TableCell>
      <TableCell sx={{ width: 200 }}>{quote.title}</TableCell>
      <TableCell sx={{ width: 180 }}>{quote.client_name}</TableCell>
      <TableCell sx={{ width: 120 }}>{formatDate(quote.created_at)}</TableCell>
      <TableCell sx={{ width: 120 }}>{formatDate(quote.expires_at)}</TableCell>
      <TableCell sx={{ width: 100, fontWeight: 500 }}>
        {formatCurrency(quote.total_amount, quote.currency)}
      </TableCell>

      {/* STATUS BADGE */}
      <TableCell sx={{ width: 100 }}>
        <QuoteStatusChip status={quote.status} />
      </TableCell>

      {/* ACTIONS */}
      <TableCell sx={{ width: 100 }}>
        <Box display="flex" gap={0.5}>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onEdit?.(quote.id); }}
            sx={{ p: 0.5 }}
            disabled={!quote.can_edit}
          >
            <Edit size={16} />
          </IconButton>

          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onDelete?.(quote.id); }}
            sx={{ p: 0.5 }}
          >
            <Delete size={16} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default QuoteTableRow;