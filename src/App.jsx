import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from './hooks/useAuth';

// Components
import ErrorBoundary from './components/feedback/ErrorBoundary';
import ProtectedRoute from './components/routes/ProtectedRoute';

// Pages
import { Login, Register, ForgotPassword, ResetPassword } from './features/auth';
import NotFound from './pages/NotFound';

// Layout - Import from the new dashboard feature
import { Layout } from './features/dashboard';
import NewClientPage from './features/clients/pages/NewClientPage';
import ClientList from './features/clients/pages/ClientList';
import QuoteList from './features/quotes/pages/QuoteList';
import CreateQuote from './features/quotes/pages/CreateQuote';
import EditClientPage from './features/clients/pages/EditClientPage';
import EditQuote from './features/quotes/pages/EditQuote';
import JobsList from './features/job/JobsList';

///temp
import Dashboard from './features/dashboard/temp/dashboard/Dashboard';

// Create a wrapper component that uses the hook inside Router
const AppContent = () => {
  const { loadAuthState } = useAuth();

  useEffect(() => {
    loadAuthState();
  }, [loadAuthState]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Clients */}
        <Route path="/customers" element={<ClientList />} />
        <Route path="/customer/new" element={<NewClientPage />} />
        <Route path="/customer/edit/:id" element={<EditClientPage />} />
        {/* <Route path="/clients/:id" element={<ClientProfile />} /> */}

        {/* Quotes */}
        <Route path="/quotes" element={<QuoteList />} />
        <Route path="/quotes/create" element={<CreateQuote />} />
        <Route path="/quotes/edit/:id" element={<EditQuote />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Dashboard />} />

        {/* Schedule */}
        <Route path="/schedule" element={<Dashboard />} />
        <Route path="/invoices" element={<Dashboard />} />
        <Route path="/timesheets" element={<Dashboard />} />
        <Route path="/online-booking" element={<Dashboard />} />
        <Route path="/reports" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        {/* <Route path="/schedule/create" element={<CreateSchedule />} /> */}
      </Route>

      {/* Redirect root to appropriate page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

// Make sure you have this default export
export default App;