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
            name="residential_email"
            label="Email Address"
            type="email"
            value={formik.values.residential_email}
            onChange={(value) => formik.setFieldValue('residential_email', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.residential_email && formik.errors.residential_email}
            helperText={formik.touched.residential_email && formik.errors.residential_email}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="residential_mobile"
            label="Mobile Number"
            value={formik.values.residential_mobile}
            onChange={(value) => formik.setFieldValue('residential_mobile', value)}
            onBlur={formik.handleBlur}
            error={formik.touched.residential_mobile && formik.errors.residential_mobile}
            helperText={formik.touched.residential_mobile && formik.errors.residential_mobile}
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