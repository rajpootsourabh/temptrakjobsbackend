// features/clients/components/ClientForm/ResidentialClientForm.jsx
import React from 'react';
import { Grid, Paper } from '@mui/material';
import SectionHeader from '../../../../components/common/form/SectionHeader';
import DebouncedTextField from '../../../../components/common/form/DebouncedTextField';

const ResidentialClientForm = ({ formik }) => {
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
      <SectionHeader
        number="1"
        title="Personal Details"
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="first_name"
            label="First Name"
            value={formik.values.first_name}
            onChange={(value) => formik.setFieldValue('first_name', value)}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.first_name && formik.errors.first_name}
            helperText={formik.touched.first_name && formik.errors.first_name}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="last_name"
            label="Last Name"
            value={formik.values.last_name}
            onChange={(value) => formik.setFieldValue('last_name', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && formik.errors.last_name}
            helperText={formik.touched.last_name && formik.errors.last_name}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="email_address"  // Changed from residential_email to common field
            label="Email Address"
            type="email"
            value={formik.values.email_address}
            onChange={(value) => formik.setFieldValue('email_address', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.email_address && formik.errors.email_address}
            helperText={formik.touched.email_address && formik.errors.email_address}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="mobile_number"  // Changed from residential_mobile to common field
            label="Mobile Number"
            value={formik.values.mobile_number}
            onChange={(value) => formik.setFieldValue('mobile_number', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile_number && formik.errors.mobile_number}
            helperText={formik.touched.mobile_number && formik.errors.mobile_number}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <DebouncedTextField
            name="residential_address"
            label="Address"
            value={formik.values.residential_address}
            onChange={(value) => formik.setFieldValue('residential_address', value)}
            onBlur={formik.handleBlur}
            multiline
            rows={2}
            error={formik.touched.residential_address && formik.errors.residential_address}
            helperText={formik.touched.residential_address && formik.errors.residential_address}
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResidentialClientForm;