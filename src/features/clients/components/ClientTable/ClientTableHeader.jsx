// features/clients/components/ClientTable/ClientTableHeader.jsx
import React from 'react';
import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';

const ClientTableHeader = ({ selectAll, onSelectAll }) => {
    return (
        <TableHead sx={{ background: '#f9fafb' }}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox checked={selectAll} onChange={onSelectAll} />
                </TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default ClientTableHeader;