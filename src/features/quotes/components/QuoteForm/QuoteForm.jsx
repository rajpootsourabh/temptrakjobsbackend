// features/quotes/components/QuoteForm/QuoteForm.jsx
import React, { useState } from 'react';
import { Box, Grid, Paper, Divider, Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { quoteValidationSchema } from '../../schemas/validationSchemas';
import QuoteDetailsSection from './QuoteDetailsSection';
import QuoteLineItems from './QuoteLineItems';
import PricingSummarySection from './PricingSummarySection';
import ClientApprovalSection from './ClientApprovalSection';
import FollowUpRemindersSection from './FollowUpRemindersSection';
import ConversionToJobSection from './ConversionToJobSection';
import QuoteFormActions from './QuoteFormActions';
import { calculateQuoteTotals } from '../../utils/quoteTransformers';

const QuoteForm = ({
  initialData = {},
  onSubmit,
  isLoading = false,
  submitError = null,
  clients = [],
  loadingClients = false,
  isEditMode = false
}) => {
  const navigate = useNavigate();
  const [quoteNumber] = useState(`QT-${Date.now().toString().slice(-6)}`);

  console.log('🎯 QuoteForm rendered', {
    isLoading,
    submitError,
    clientsCount: clients?.length,
    loadingClients,
    initialData
  });

  // ONLY snake_case field names - removed all camelCase fallbacks
  const initialValues = {
    // Section 1: Quote Details
    quote_number: initialData.quote_number || quoteNumber,
    title: initialData.title || '',  // Changed from quote_title to title (matches API)
    client_id: initialData.client_id || '',
    client_name: initialData.client_name || '',
    client_email: initialData.client_email || '',
    status: initialData.status || 'draft',
    equity_status: initialData.equity_status || 'not_applicable',
    currency: initialData.currency || 'USD',

    // Section 2: Line Items
    line_items: initialData.items?.length > 0
      ? initialData.items.map(item => ({
        id: item.id,
        item_name: item.item_name,
        description: item.description || '',
        quantity: item.quantity || 1,
        unit_price: item.unit_price || 1,
        tax_rate: item.tax_rate || 0,
        package_id: item.package_id || null,
      }))
      : [
        {
          item_name: '',
          description: '',
          quantity: 1,
          unit_price: 0,
          tax_rate: 0,
          package_id: null,
        }
      ],
    selected_package: initialData.selected_package || '',

    // Section 3: Pricing Summary
    discount: initialData.discount || 0,
    deposit_required: initialData.deposit_required !== undefined
      ? initialData.deposit_required
      : false,
    deposit_type: initialData.deposit_type || 'percentage',
    deposit_amount: initialData.deposit_amount || 50,

    // Section 4: Client Approval
    approval_status: initialData.approval_status || 'pending',
    client_signature: initialData.client_signature || '',
    approval_date: initialData.approval_date || null,
    approval_action_date: initialData.approval_action_date || null,

    // Section 5: Follow Ups & Reminders
    reminders: initialData.reminders?.map(reminder => ({
      id: reminder.id,
      follow_up_schedule: reminder.follow_up_schedule,
      reminder_type: reminder.reminder_type,
      reminder_status: reminder.reminder_status,
    })) || [],

    // Section 6: Conversion to Job
    can_convert_to_job: initialData.can_convert_to_job !== undefined
      ? initialData.can_convert_to_job
      : true,
    job_id: initialData.job_id || '',
    converted_at: initialData.converted_at || null,

    // Meta
    notes: initialData.notes || '',
    expires_at: initialData.expires_at || null,
  };

  console.log('📦 Initial values set (snake_case only):', initialValues);

  // Calculate totals for PricingSummarySection
  const calculateTotals = (values) => {
    const totals = calculateQuoteTotals(values.line_items);
    return totals;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('🎯 Formik handleSubmit called with values:', values);

    try {
      await onSubmit(values);
      console.log('✅ onSubmit completed successfully');
    } catch (error) {
      console.error('❌ onSubmit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveAndSend = async (values, { setSubmitting }) => {
    console.log('📧 Save and Send clicked with values:', values);

    try {
      // Add the send_email flag to the values
      const valuesWithSendEmail = { ...values, send_email: true };
      console.log('📧 Submitting with send_email flag:', valuesWithSendEmail);

      await onSubmit(valuesWithSendEmail);
      console.log('✅ Save and Send completed successfully');
    } catch (error) {
      console.error('❌ Save and Send error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    console.log('📝 Cancel clicked, navigating to /quotes');
    navigate('/quotes');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={quoteValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {(formik) => {
        console.log('🔄 Formik state:', {
          values: formik.values,
          errors: formik.errors,
          touched: formik.touched,
          isSubmitting: formik.isSubmitting,
          isValid: formik.isValid,
          dirty: formik.dirty
        });

        const totals = calculateTotals(formik.values);

        return (
          <Form>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              {submitError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {submitError}
                </Alert>
              )}

              {/* Section 1: Quote Details */}
              <QuoteDetailsSection
                formik={formik}
                clients={clients}
                loadingClients={loadingClients}
              />

              <Divider sx={{ my: 4 }} />

              {/* Section 2: Line Items & Packages */}
              <QuoteLineItems formik={formik} />

              <Divider sx={{ my: 4 }} />

              {/* Sections 3 & 4: Pricing Summary and Client Approval */}
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <PricingSummarySection
                      formik={formik}
                      subtotal={totals.subtotal}
                      total={totals.total}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ClientApprovalSection formik={formik} />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Sections 5 & 6: Follow Ups and Conversion */}
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FollowUpRemindersSection formik={formik} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ConversionToJobSection formik={formik} />
                  </Grid>
                </Grid>
              </Box>

              {/* Form Actions */}
              <QuoteFormActions
                onCancel={handleCancel}
                isLoading={isLoading || formik.isSubmitting}
                isEditMode={isEditMode}
                onSaveAndSend={() => {
                  console.log('🖱️ Save & Send button clicked - calling formik.handleSubmit with save and send handler');
                  // Set the submit handler to handleSaveAndSend for this submission
                  formik.setSubmitting(true);
                  handleSaveAndSend(formik.values, formik);
                }}
              />
            </Paper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default QuoteForm;