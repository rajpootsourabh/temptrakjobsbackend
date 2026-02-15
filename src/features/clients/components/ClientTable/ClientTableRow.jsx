// features/clients/components/ClientTable/ClientTableRow.jsx
import React from 'react';
import { TableRow, TableCell, Checkbox, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import EllipsisText from '../../../../components/common/EllipsisText';
import ProfileAvatar from '../../../../components/common/avatar/ProfileAvatar';
import ClientCategoryChip from './ClientCategoryChip';
import StatusChip from '../../../../components/common/chips/StatusChip';

const ClientTableRow = ({ client, isSelected, onSelect }) => {
    // Map API fields correctly
    const companyName = client.business_name || client.company || client.businessName || client.name || 'N/A';
    const businessType = client.business_type || 'Technology';
    const contactName = client.contact_person_name || client.contactPerson || client.first_name + " " + client.last_name || 'N/A';
    const position = client.designation_role || client.position || 'Manager';
    const email = client.email_address || client.email || 'N/A';
    const phone = client.mobile_number || client.phone || client.mobileNumber || 'N/A';
    const category = client.client_category || client.category || 'regular';
    const status = client.status || 'active';

    return (
        <TableRow hover selected={isSelected}>
            <TableCell padding="checkbox">
                <Checkbox checked={isSelected} onChange={() => onSelect(client.id)} />
            </TableCell>

            {/* Company */}
            <TableCell>
                <Link to={`/customer/edit/${client.id}`} style={{ textDecoration: 'none' }}>
                    <EllipsisText
                        text={companyName}
                        sx={{ fontSize: '0.85rem', fontWeight: 500 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {businessType}
                    </Typography>
                </Link>
            </TableCell>

            {/* Contact */}
            <TableCell>
                <ProfileAvatar name={contactName} position={position} />
            </TableCell>

            {/* Email */}
            <TableCell>
                <EllipsisText
                    text={email}
                    sx={{ fontSize: '0.9rem', fontWeight: 500, maxWidth: 240 }}
                />
            </TableCell>

            {/* Phone */}
            <TableCell>
                <EllipsisText
                    text={phone}
                    sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                />
            </TableCell>

            {/* Category */}
            <TableCell>
                <ClientCategoryChip category={category} />
            </TableCell>

            {/* Status */}
            <TableCell>
                <StatusChip status={status} />
            </TableCell>
        </TableRow>
    );
};

export default ClientTableRow;