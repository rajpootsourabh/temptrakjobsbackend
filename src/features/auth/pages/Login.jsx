import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/ui/AuthLayout';
import LoginForm from '../components/forms/LoginForm';
import { login } from '../services';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (location.state?.message) {
      setShowSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setIsSubmitting(true);
    setStatus({});

    try {
      await login(values);
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      setStatus({ apiError: error.message });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="LOGIN">
      <LoginForm
        onSubmit={handleSubmit}
        initialValues={{ email: '', password: '' }}
        isSubmitting={isSubmitting}
        status={status}
        showSuccessMessage={showSuccessMessage}
      />
      
      <p className="text-center mt-6 text-gray-600 text-sm">
        If you haven't Registered yet?{' '}
        <a
          href="/register"
          className="text-primary-800 hover:text-primary-600 hover:underline font-medium"
        >
          Register Now
        </a>
      </p>
    </AuthLayout>
  );
};

export default Login;