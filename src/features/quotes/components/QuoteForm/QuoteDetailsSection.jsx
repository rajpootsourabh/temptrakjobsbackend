// features/quotes/components/QuoteForm/QuoteDetailsSection.jsx
import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  FormHelperText,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Chip
} from '@mui/material';
import { Person, Business } from '@mui/icons-material';
import SectionHeader from '../../../../components/common/form/SectionHeader';
import DebouncedTextField from '../../../../components/common/form/DebouncedTextField';
import DebouncedSelect from '../../../../components/common/form/DebouncedSelect';
import { QUOTE_STATUS_OPTIONS, CURRENCIES, EQUITY_STATUS_OPTIONS } from '../../constants/quoteConstants';

// Helper function to get client display name based on client type
const getClientDisplayName = (client) => {
  if (!client) return '';
  
  if (client.client_type === 'commercial') {
    return client.business_name || 'Unnamed Business';
  } else {
    // Residential - combine first and last name
    const firstName = client.first_name || '';
    const lastName = client.last_name || '';
    return `${firstName} ${lastName}`.trim() || 'Unnamed Client';
  }
};

// Helper function to get client contact info for display
const getClientContact = (client) => {
  if (!client) return '';
  
  const parts = [];
  const phone = client.mobile_number || client.phone;
  if (phone) parts.push(phone);
  if (client.email) parts.push(client.email);
  return parts.join(' • ');
};

const QuoteDetailsSection = ({ formik, clients = [], loadingClients = false }) => {
  const [selectedClient, setSelectedClient] = useState(formik.values.client_id || '');

  // Handle client selection
  const handleClientChange = (event) => {
    const clientId = event.target.value;
    setSelectedClient(clientId);
    
    // Find the selected client
    const client = clients.find(c => c.id === clientId);
    
    if (client) {
      // Get display name based on client type
      const displayName = getClientDisplayName(client);
      
      // Auto-populate client details
      formik.setFieldValue('client_id', clientId);
      formik.setFieldValue('client_name', displayName);
      formik.setFieldValue('client_email', client.email || '');
    } else {
      // Clear client fields if no client selected
      formik.setFieldValue('client_id', '');
      formik.setFieldValue('client_name', '');
      formik.setFieldValue('client_email', '');
    }
  };

  // Update selected client when formik value changes (for edit mode or pre-selected client)
  useEffect(() => {
    if (formik.values.client_id && formik.values.client_id !== selectedClient) {
      setSelectedClient(formik.values.client_id);
    }
  }, [formik.values.client_id]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        mb: 4,
        borderRadius: 2,
        backgroundColor: '#fff'
      }}
    >
      <SectionHeader number="1" title="Quote Details" />

      <Grid container spacing={3}>
        {/* Row 1: Quote Number and Quote Title */}
        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="quote_number"
            label="Quote Number"
            value={formik.values.quote_number}
            onChange={(value) => formik.setFieldValue('quote_number', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.quote_number && Boolean(formik.errors.quote_number)}
            helperText={formik.touched.quote_number && formik.errors.quote_number}
            disabled
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="title"  // CHANGED: from quote_title to title
            label="Quote Title"
            value={formik.values.title}
            onChange={(value) => formik.setFieldValue('title', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            required
            fullWidth
          />
        </Grid>

        {/* Row 2: Equity Status and Client Selection */}
        <Grid item xs={12} md={6}>
          <DebouncedSelect
            name="equity_status"
            label="Equity Status"
            value={formik.values.equity_status}
            onChange={(value) => formik.setFieldValue('equity_status', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.equity_status && Boolean(formik.errors.equity_status)}
            helperText={formik.touched.equity_status && formik.errors.equity_status}
            options={EQUITY_STATUS_OPTIONS}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={formik.touched.client_id && Boolean(formik.errors.client_id)}>
            <InputLabel id="client-select-label">Select Client *</InputLabel>
            <Select
              labelId="client-select-label"
              id="client-select"
              value={selectedClient}
              label="Select Client *"
              onChange={handleClientChange}
              onBlur={formik.handleBlur}
              disabled={loadingClients}
              renderValue={(selected) => {
                if (!selected) return <em>Select a client</em>;
                const client = clients.find(c => c.id === selected);
                if (!client) return <em>Select a client</em>;
                
                const displayName = getClientDisplayName(client);
                const contact = getClientContact(client);
                const clientType = client.client_type === 'commercial' ? 'Commercial' : 'Residential';
                
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        bgcolor: client.client_type === 'commercial' ? 'primary.main' : 'secondary.main',
                        color: 'white'
                      }}
                    >
                      {client.client_type === 'commercial' ? <Business fontSize="small" /> : <Person fontSize="small" />}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                        {displayName}
                      </Typography>
                      <Chip 
                        label={clientType} 
                        size="small"
                        color={client.client_type === 'commercial' ? 'primary' : 'secondary'}
                        variant="outlined"
                        sx={{ height: 18, fontSize: '0.65rem', ml: 1 }}
                      />
                    </Box>
                  </Box>
                );
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {loadingClients ? (
                <MenuItem disabled>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} />
                    <Typography>Loading clients...</Typography>
                  </Box>
                </MenuItem>
              ) : (
                clients.map((client) => {
                  const displayName = getClientDisplayName(client);
                  const contact = getClientContact(client);
                  const isCommercial = client.client_type === 'commercial';
                  const clientType = isCommercial ? 'Commercial' : 'Residential';
                  
                  return (
                    <MenuItem key={client.id} value={client.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: isCommercial ? 'primary.main' : 'secondary.main',
                            color: 'white'
                          }}
                        >
                          {isCommercial ? <Business fontSize="small" /> : <Person fontSize="small" />}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {displayName}
                            </Typography>
                            <Chip 
                              label={clientType} 
                              size="small"
                              color={isCommercial ? 'primary' : 'secondary'}
                              variant="outlined"
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                          </Box>
                          {contact && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              {contact}
                            </Typography>
                          )}
                          {isCommercial && client.business_type && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              Type: {client.business_type}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </MenuItem>
                  );
                })
              )}
            </Select>
            {formik.touched.client_id && formik.errors.client_id && (
              <FormHelperText>{formik.errors.client_id}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Hidden fields for client data */}
        <input type="hidden" name="client_name" value={formik.values.client_name} />
        <input type="hidden" name="client_email" value={formik.values.client_email} />

        {/* Row 3: Quote Status and Currency */}
        <Grid item xs={12} md={6}>
          <DebouncedSelect
            name="status"
            label="Quote Status"
            value={formik.values.status}
            onChange={(value) => formik.setFieldValue('status', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            options={QUOTE_STATUS_OPTIONS}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DebouncedSelect
            name="currency"
            label="Currency"
            value={formik.values.currency}
            onChange={(value) => formik.setFieldValue('currency', value)}
            options={CURRENCIES}
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuoteDetailsSection;