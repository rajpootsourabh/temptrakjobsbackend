// features/quotes/components/QuoteForm/QuoteFormActions.jsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { Save as SaveIcon, Send as SendIcon, Update as UpdateIcon } from '@mui/icons-material';

const QuoteFormActions = ({ onCancel, isLoading, onSaveAndSend, isEditMode = false }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
      <Button
        variant="outlined"
        onClick={onCancel}
        disabled={isLoading}
        sx={{ textTransform: 'none', fontWeight: 600 }}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        // startIcon={isEditMode ? <UpdateIcon /> : <SaveIcon />}
        sx={{ textTransform: 'none', fontWeight: 600 }}
      >
        {isLoading ? 'Saving...' : (isEditMode ? 'Update Quote' : 'Save Quote')}
      </Button>

      {/* {!isEditMode && (
        <Button
          type="button"
          variant="contained"
          disabled={isLoading}
          // startIcon={<SendIcon />}
          onClick={onSaveAndSend}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          {isLoading ? 'Saving...' : 'Save & Send'}
        </Button>
      )} */}
    </Box>
  );
};

export default QuoteFormActions;