import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/ui/AuthLayout';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import { forgotPassword } from '../services';

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setIsSubmitting(true);
    setStatus({});

    try {
      await forgotPassword(values);
      setIsSubmitted(true);
      setSuccessMessage('Password reset link sent to your email. Please check your inbox.');
    } catch (error) {
      setStatus({ apiError: error.message });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setSuccessMessage('');
  };

  return (
    <AuthLayout title="FORGOT PASSWORD">
      <ForgotPasswordForm
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        successMessage={successMessage}
        onResend={handleResend}
        isSubmitting={isSubmitting}
      />

      <p className="text-center mt-6 text-gray-600 text-sm">
        Remember your password?{' '}
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

export default ForgotPassword;