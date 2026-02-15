// features/quotes/components/QuoteForm/ClientApprovalSection.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import SectionHeader from '../../../../components/common/form/SectionHeader';

const ClientApprovalSection = ({ formik }) => {
  const [prevApprovalStatus, setPrevApprovalStatus] = useState(formik.values.approval_status);

  const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-GB');
  };

  // Handle approval status changes with proper date management
  useEffect(() => {
    const currentStatus = formik.values.approval_status;
    
    // Only trigger if status actually changed
    if (currentStatus !== prevApprovalStatus) {
      
      // When changing from pending to accepted/rejected
      if (prevApprovalStatus === 'pending' && (currentStatus === 'accepted' || currentStatus === 'rejected')) {
        formik.setFieldValue('approval_date', new Date());
        formik.setFieldValue('approval_action_date', new Date());
      }
      
      // When changing from accepted/rejected to pending
      else if ((prevApprovalStatus === 'accepted' || prevApprovalStatus === 'rejected') && currentStatus === 'pending') {
        formik.setFieldValue('approval_date', null);
        formik.setFieldValue('approval_action_date', null);
      }
      
      // When changing directly between accepted and rejected
      else if ((prevApprovalStatus === 'accepted' && currentStatus === 'rejected') || 
               (prevApprovalStatus === 'rejected' && currentStatus === 'accepted')) {
        formik.setFieldValue('approval_date', new Date());
        formik.setFieldValue('approval_action_date', new Date());
      }
      
      setPrevApprovalStatus(currentStatus);
    }
  }, [formik.values.approval_status, prevApprovalStatus, formik]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    formik.setFieldValue('approval_status', newStatus);
    // The useEffect will handle the date changes
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        height: '100%'
      }}
    >
      <SectionHeader number="4" title="Client Approval" />

      {/* Approval Status - User Input */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1
        }}
      >
        <Typography>Approval Status</Typography>
        <Select
          value={formik.values.approval_status}
          onChange={handleStatusChange}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Client Signature - User Input */}
      <Box sx={{ py: 1 }}>
        <Typography sx={{ mb: 1 }}>Client Signature</Typography>
        <TextField
          multiline
          rows={3}
          fullWidth
          placeholder="Client signature or name"
          value={formik.values.client_signature || ''}
          onChange={(e) => formik.setFieldValue('client_signature', e.target.value)}
          disabled={formik.values.approval_status === 'pending'}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Approval Date - Auto-calculated */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography>Approval Date</Typography>
        <Typography 
          sx={{ 
            fontWeight: 500,
            color: formik.values.approval_date ? 'text.primary' : 'text.secondary',
            fontStyle: formik.values.approval_date ? 'normal' : 'italic'
          }}
        >
          {formatDate(formik.values.approval_date)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Approval Action Date - Auto-calculated */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography>Approval Action Date</Typography>
        <Typography 
          sx={{ 
            fontWeight: 500,
            color: formik.values.approval_action_date ? 'text.primary' : 'text.secondary',
            fontStyle: formik.values.approval_action_date ? 'normal' : 'italic'
          }}
        >
          {formatDate(formik.values.approval_action_date)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ClientApprovalSection;