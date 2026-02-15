import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import DebouncedTextField from '../../../components/common/form/DebouncedTextField';
import PasswordField from '../../../components/common/form/PasswordField'; // Import PasswordField
import CheckboxField from '../../../components/common/form/CheckboxField';
import AuthLayout from '../components/ui/AuthLayout';
import { registerSchema } from '../schemas/validationSchemas';
import { register } from '../services';

const Register = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({});

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setStatus({});

    try {
      await register(values);
      navigate('/login', {
        state: { message: 'Registration successful! Please login to continue.' }
      });
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setStatus({ apiError: error.message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="SIGN UP" isRegister>
      <Formik
        initialValues={{
          business_name: '',
          website_name: '',
          full_name: '',
          email: '',
          mobile_number: '',
          password: '',
          password_confirmation: '',
          terms_accepted: false,
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue, setFieldTouched, values }) => (
          <Form className="space-y-4">
            {status?.apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                {status.apiError}
              </div>
            )}

            <DebouncedTextField
              name="business_name"
              label="Business Name"
              placeholder="Enter your business name"
              value={values.business_name}
              onChange={(value) => setFieldValue('business_name', value)}
              onBlur={() => setFieldTouched('business_name', true)}
              error={touched.business_name && Boolean(errors.business_name)}
              helperText={touched.business_name && errors.business_name}
            />

            <DebouncedTextField
              name="website_name"
              label="Website Name"
              placeholder="Enter your website name"
              value={values.website_name}
              onChange={(value) => setFieldValue('website_name', value)}
              onBlur={() => setFieldTouched('website_name', true)}
              error={touched.website_name && Boolean(errors.website_name)}
              helperText={touched.website_name && errors.website_name}
            />

            <DebouncedTextField
              name="full_name"
              label="Full Name"
              placeholder="Enter your full name"
              value={values.full_name}
              onChange={(value) => setFieldValue('full_name', value)}
              onBlur={() => setFieldTouched('full_name', true)}
              error={touched.full_name && Boolean(errors.full_name)}
              helperText={touched.full_name && errors.full_name}
            />

            <DebouncedTextField
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              value={values.email}
              onChange={(value) => setFieldValue('email', value)}
              onBlur={() => setFieldTouched('email', true)}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <DebouncedTextField
              name="mobile_number"
              label="Mobile Number"
              placeholder="Enter your mobile number"
              value={values.mobile_number}
              onChange={(value) => setFieldValue('mobile_number', value)}
              onBlur={() => setFieldTouched('mobile_number', true)}
              error={touched.mobile_number && Boolean(errors.mobile_number)}
              helperText={touched.mobile_number && errors.mobile_number}
            />

            {/* Use PasswordField instead of DebouncedTextField for passwords */}
            <PasswordField
              name="password"
              label="Password"
              placeholder="Create a password"
              value={values.password}
              onChange={(e) => setFieldValue('password', e.target.value)}
              onBlur={() => setFieldTouched('password', true)}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <PasswordField
              name="password_confirmation"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={values.password_confirmation}
              onChange={(e) => setFieldValue('password_confirmation', e.target.value)}
              onBlur={() => setFieldTouched('password_confirmation', true)}
              error={touched.password_confirmation && Boolean(errors.password_confirmation)}
              helperText={touched.password_confirmation && errors.password_confirmation}
            />

            <div className="mt-4">
              <CheckboxField
                name="terms_accepted"
                label={
                  <span className="text-xs">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:underline">
                      Terms & Conditions
                    </Link>
                  </span>
                }
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              align="center"
              loading={isSubmitting}
              sx={{ width: 181, height: 43 }}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>

      <p className="text-center mt-6 text-gray-600 text-sm">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary-800 hover:text-primary-600 hover:underline font-medium"
        >
          Login Now
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;