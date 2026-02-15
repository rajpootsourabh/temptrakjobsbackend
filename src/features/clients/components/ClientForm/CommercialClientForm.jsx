// features/clients/components/ClientForm/CommercialClientForm.jsx
import React from 'react';
import { Grid, Paper, Divider } from '@mui/material';
import SectionHeader from '../../../../components/common/form/SectionHeader';
import DebouncedTextField from '../../../../components/common/form/DebouncedTextField';
import DebouncedSelect from '../../../../components/common/form/DebouncedSelect';
import LogoUploader from './LogoUploader';
import {
  BUSINESS_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  DESIGNATION_ROLE_OPTIONS,
  STATE_OPTIONS,
  COUNTRY_OPTIONS,
  PAYMENT_TERM_OPTIONS,
  CURRENCY_OPTIONS,
  TAX_PERCENTAGE_OPTIONS,
  CLIENT_CATEGORY_OPTIONS
} from '../../constants/clientConstants';

const CommercialClientForm = ({ formik, mode = 'create' }) => {
  return (
    <>
      {/* Section 1: Basic Business Information */}
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
          title="Basic Business Information"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="business_name"
              label="Business Name"
              value={formik.values.business_name}
              onChange={(value) => formik.setFieldValue('business_name', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.business_name && formik.errors.business_name}
              helperText={formik.touched.business_name && formik.errors.business_name}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="business_type"
              label="Business Type"
              value={formik.values.business_type}
              onChange={(value) => formik.setFieldValue('business_type', value)}
              options={BUSINESS_TYPE_OPTIONS}
              error={formik.touched.business_type && formik.errors.business_type}
              helperText={formik.touched.business_type && formik.errors.business_type}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="industry"
              label="Industry"
              value={formik.values.industry}
              onChange={(value) => formik.setFieldValue('industry', value)}
              options={INDUSTRY_OPTIONS}
              error={formik.touched.industry && formik.errors.industry}
              helperText={formik.touched.industry && formik.errors.industry}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="business_registration_number"
              label="Business Registration Number"
              value={formik.values.business_registration_number}
              onChange={(value) => formik.setFieldValue('business_registration_number', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.business_registration_number && formik.errors.business_registration_number}
              helperText={formik.touched.business_registration_number && formik.errors.business_registration_number}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Section 2: Primary Contact Information */}
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
          number="2"
          title="Primary Contact Information"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="contact_person_name"
              label="Contact Person Name"
              value={formik.values.contact_person_name}
              onChange={(value) => formik.setFieldValue('contact_person_name', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.contact_person_name && formik.errors.contact_person_name}
              helperText={formik.touched.contact_person_name && formik.errors.contact_person_name}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="designation_role"
              label="Designation/Role"
              value={formik.values.designation_role}
              onChange={(value) => formik.setFieldValue('designation_role', value)}
              options={DESIGNATION_ROLE_OPTIONS}
              error={formik.touched.designation_role && formik.errors.designation_role}
              helperText={formik.touched.designation_role && formik.errors.designation_role}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="email_address"
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
              name="mobile_number"
              label="Mobile Number"
              value={formik.values.mobile_number}
              onChange={(value) => formik.setFieldValue('mobile_number', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile_number && formik.errors.mobile_number}
              helperText={formik.touched.mobile_number && formik.errors.mobile_number}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="alternate_mobile_number"
              label="Alternate Mobile Number"
              value={formik.values.alternate_mobile_number}
              onChange={(value) => formik.setFieldValue('alternate_mobile_number', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.alternate_mobile_number && formik.errors.alternate_mobile_number}
              helperText={formik.touched.alternate_mobile_number && formik.errors.alternate_mobile_number}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Section 3: Business Address */}
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
          number="3"
          title="Business Address"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="address_line1"
              label="Address Line 1"
              value={formik.values.address_line1}
              onChange={(value) => formik.setFieldValue('address_line1', value)}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.address_line1 && formik.errors.address_line1}
              helperText={formik.touched.address_line1 && formik.errors.address_line1}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="address_line2"
              label="Address Line 2"
              value={formik.values.address_line2}
              onChange={(value) => formik.setFieldValue('address_line2', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.address_line2 && formik.errors.address_line2}
              helperText={formik.touched.address_line2 && formik.errors.address_line2}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="city"
              label="City"
              value={formik.values.city}
              onChange={(value) => formik.setFieldValue('city', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.city && formik.errors.city}
              helperText={formik.touched.city && formik.errors.city}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="state"
              label="State"
              value={formik.values.state}
              onChange={(value) => formik.setFieldValue('state', value)}
              options={STATE_OPTIONS}
              error={formik.touched.state && formik.errors.state}
              helperText={formik.touched.state && formik.errors.state}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={(value) => formik.setFieldValue('country', value)}
              options={COUNTRY_OPTIONS}
              error={formik.touched.country && formik.errors.country}
              helperText={formik.touched.country && formik.errors.country}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="pin_zipcode"
              label="Pin/Zipcode"
              value={formik.values.pin_zipcode}
              onChange={(value) => formik.setFieldValue('pin_zipcode', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.pin_zipcode && formik.errors.pin_zipcode}
              helperText={formik.touched.pin_zipcode && formik.errors.pin_zipcode}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Section 4: Billing & Financial Details */}
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
          number="4"
          title="Billing & Financial Details"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="billing_name"
              label="Billing Name"
              value={formik.values.billing_name}
              onChange={(value) => formik.setFieldValue('billing_name', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.billing_name && formik.errors.billing_name}
              helperText={formik.touched.billing_name && formik.errors.billing_name}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="payment_term"
              label="Payment Term"
              value={formik.values.payment_term}
              onChange={(value) => formik.setFieldValue('payment_term', value)}
              options={PAYMENT_TERM_OPTIONS}
              error={formik.touched.payment_term && formik.errors.payment_term}
              helperText={formik.touched.payment_term && formik.errors.payment_term}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="preferred_currency"
              label="Preferred Currency"
              value={formik.values.preferred_currency}
              onChange={(value) => formik.setFieldValue('preferred_currency', value)}
              options={CURRENCY_OPTIONS}
              error={formik.touched.preferred_currency && formik.errors.preferred_currency}
              helperText={formik.touched.preferred_currency && formik.errors.preferred_currency}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="tax_percentage"
              label="Tax Percentage"
              value={formik.values.tax_percentage}
              onChange={(value) => formik.setFieldValue('tax_percentage', value)}
              options={TAX_PERCENTAGE_OPTIONS}
              error={formik.touched.tax_percentage && formik.errors.tax_percentage}
              helperText={formik.touched.tax_percentage && formik.errors.tax_percentage}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Section 5: Additional Business details */}
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
          number="5"
          title="Additional Business details"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DebouncedTextField
              name="website_url"
              label="Website URL"
              value={formik.values.website_url}
              onChange={(value) => formik.setFieldValue('website_url', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.website_url && formik.errors.website_url}
              helperText={formik.touched.website_url && formik.errors.website_url}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LogoUploader formik={formik} mode={mode} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DebouncedSelect
              name="client_category"
              label="Client Category"
              value={formik.values.client_category}
              onChange={(value) => formik.setFieldValue('client_category', value)}
              options={CLIENT_CATEGORY_OPTIONS}
              error={formik.touched.client_category && formik.errors.client_category}
              helperText={formik.touched.client_category && formik.errors.client_category}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <DebouncedTextField
              name="notes_remark"
              label="Notes & Remark"
              value={formik.values.notes_remark}
              onChange={(value) => formik.setFieldValue('notes_remark', value)}
              onBlur={formik.handleBlur}
              multiline
              rows={3}
              error={formik.touched.notes_remark && formik.errors.notes_remark}
              helperText={formik.touched.notes_remark && formik.errors.notes_remark}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 4 }} />
    </>
  );
};

export default CommercialClientForm;