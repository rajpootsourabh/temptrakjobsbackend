import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/ui/AuthLayout';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { resetPassword } from '../services';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (!token || !email) {
      // Optionally show error immediately
    }
  }, [token, email]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setIsSubmitting(true);
    setStatus({});

    try {
      await resetPassword({
        email,
        token,
        ...values
      });
      
      setIsSubmitted(true);
      setSuccessMessage('Password reset successful! You can now login with your new password.');
    } catch (error) {
      setStatus({ apiError: error.message });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login', {
      state: { message: 'Password reset successful! Please login with your new password.' }
    });
  };

  return (
    <AuthLayout title="RESET PASSWORD">
      <ResetPasswordForm
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        successMessage={successMessage}
        onGoToLogin={handleGoToLogin}
        isSubmitting={isSubmitting}
        token={token}
        email={email}
      />

      <p className="text-center mt-6 text-gray-600 text-sm">
        Remember your password?{' '}
        <a
          href="/login"
          className="text-primary-800 hover:text-primary-600 hover:underline font-medium"
        >
          Login Now
        </a>
      </p>
    </AuthLayout>
  );
};

export default ResetPassword;