// features/clients/components/ClientForm/NewClientForm.jsx
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Paper } from '@mui/material';
import ClientTypeSelector from './ClientTypeSelector';
import CommercialClientForm from './CommercialClientForm';
import ResidentialClientForm from './ResidentialClientForm';
import AvailabilitySchedule from './AvailabilitySchedule';
import FormActions from './FormActions';
import { clientValidationSchema } from '../../schemas/clientValidationSchemas';
import { INITIAL_CLIENT_VALUES } from '../../constants/clientConstants';

const NewClientForm = ({
  onSubmit,
  onCancel,
  onSaveAndCreateQuote,
  initialData = {},
  isLoading = false
}) => {
  const mode = initialData?.id ? 'update' : 'create';
  const [clientType, setClientType] = useState(initialData.client_type || 'commercial');
  const [loadingAction, setLoadingAction] = useState(null);

  useEffect(() => {
    console.log('isLoading changed:', isLoading);
  }, [isLoading]);

  const mergedInitialValues = {
    ...INITIAL_CLIENT_VALUES,
    client_type: clientType,
    ...initialData,
  };

  const handleSubmit = async (values, { setSubmitting, setTouched }) => {
    // Mark all fields as touched to show validation errors
    const allFields = Object.keys(values);
    const touchedFields = {};
    allFields.forEach(field => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);

    console.log("========== FORM SUBMISSION PAYLOAD ==========");
    console.log("Form values:", values);
    console.log("Client Type:", values.client_type);
    console.log("JSON Stringified:", JSON.stringify(values, null, 2));
    console.log("==============================================");
    
    setLoadingAction('save');
    try {
      await onSubmit(values);
    } finally {
      setLoadingAction(null);
      setSubmitting(false);
    }
  };

  const handleSaveAndCreateQuoteClick = async (values, { setSubmitting, setTouched }) => {
    // Mark all fields as touched to show validation errors
    const allFields = Object.keys(values);
    const touchedFields = {};
    allFields.forEach(field => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);

    if (onSaveAndCreateQuote) {
      setLoadingAction('saveAndCreate');
      try {
        await onSaveAndCreateQuote(values);
      } finally {
        setLoadingAction(null);
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={mergedInitialValues}
      validationSchema={clientValidationSchema(clientType)}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true} // This will show validation immediately
    >
      {(formikProps) => (
        <Form>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <ClientTypeSelector
              clientType={clientType}
              onChange={setClientType}
              formik={formikProps}
              mode={mode}
            />

            {clientType === 'commercial' ? (
              <CommercialClientForm
                formik={formikProps}
                mode={mode}
              />
            ) : (
              <ResidentialClientForm
                formik={formikProps}
                mode={mode}
              />
            )}

            <AvailabilitySchedule
              formik={formikProps}
              mode={mode}
            />

            <FormActions
              onCancel={onCancel}
              isLoading={isLoading || loadingAction !== null}
              loadingAction={loadingAction}
              onSaveAndCreateQuote={() => formikProps.submitForm(handleSaveAndCreateQuoteClick)}
            />
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default NewClientForm;