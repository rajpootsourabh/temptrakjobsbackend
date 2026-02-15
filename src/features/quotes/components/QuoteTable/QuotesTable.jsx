// features/quotes/components/QuoteTable/QuotesTable.jsx
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
import QuoteTableHeader from './QuoteTableHeader';
import QuoteTableRow from './QuoteTableRow';

const QuotesTable = ({
  data = [],
  onEdit,
  onDelete,
  onSelect,
  selectedQuotes = [],
  showPagination = true,
  pagination = {
    page: 0,
    rowsPerPage: 10,
    total: 0,
    onPageChange: () => {},
    onRowsPerPageChange: () => {}
  }
}) => {
  const [selectAll, setSelectAll] = useState(false);

  // Calculate paginated data
  const paginatedData = showPagination 
    ? data.slice(
        pagination.page * pagination.rowsPerPage,
        pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
      )
    : data;

  // Update selectAll state when selectedQuotes or data changes
  useEffect(() => {
    if (paginatedData.length > 0 && selectedQuotes.length === paginatedData.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedQuotes, paginatedData]);

  const handleSelectAll = () => {
    if (selectAll) {
      onSelect?.([]);
    } else {
      onSelect?.(paginatedData.map(item => item.id));
    }
  };

  const handleSelect = (quoteId) => {
    let newSelected = [];
    if (selectedQuotes.includes(quoteId)) {
      newSelected = selectedQuotes.filter(id => id !== quoteId);
    } else {
      newSelected = [...selectedQuotes, quoteId];
    }
    onSelect?.(newSelected);
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      <Table>
        <QuoteTableHeader
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
        />

        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((quote) => (
              <QuoteTableRow
                key={quote.id}
                quote={quote}
                isSelected={selectedQuotes.includes(quote.id)}
                onSelect={handleSelect}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                No quotes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showPagination && data.length > 0 && (
        <TablePagination
          component="div"
          count={pagination.total || data.length}
          page={pagination.page}
          onPageChange={pagination.onPageChange}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            borderTop: '1px solid #e5e7eb',
            '& .MuiTablePagination-select': {
              fontSize: '0.875rem',
              py: 0.5,
            },
            '& .MuiTablePagination-displayedRows': {
              fontSize: '0.875rem',
            },
            '& .MuiTablePagination-actions': {
              ml: 1,
            }
          }}
        />
      )}
    </TableContainer>
  );
};

export default QuotesTable;