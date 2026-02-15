// features/clients/components/ClientForm/AvailabilitySchedule.jsx
import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import SectionHeader from '../../../../components/common/form/SectionHeader';
import DebouncedTextField from '../../../../components/common/form/DebouncedTextField';
import { DAYS_OF_WEEK, WEEKDAYS, WEEKEND_DAYS, ALL_DAYS } from '../../constants/clientConstants';
import { useClientForm } from '../../hooks/useClientForm';

const AvailabilitySchedule = ({ formik }) => {
  const {
    handleDayToggle,
    handleSelectWeekdays,
    handleSelectWeekend,
    handleSelectAllDays
  } = useClientForm(formik);

  const getSelectedCount = () => {
    const count = formik.values.availableDays.length;
    return `${count} day${count !== 1 ? 's' : ''} selected`;
  };

  const isAllDaysSelected = formik.values.availableDays.length === ALL_DAYS.length;
  const isWeekdaysSelected = WEEKDAYS.every(day => formik.values.availableDays.includes(day));
  const isWeekendSelected = WEEKEND_DAYS.every(day => formik.values.availableDays.includes(day));

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
        number="6"
        title="Availability Schedule"
      />

      <Grid container spacing={3}>
        {/* Available Days - Checkbox Group with Quick Select Buttons */}
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.5,
            flexWrap: 'wrap',
            gap: 1
          }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Available Days
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleSelectAllDays}
                sx={{
                  minWidth: '70px',
                  backgroundColor: isAllDaysSelected ? 'primary.main' : 'transparent',
                  color: isAllDaysSelected ? 'white' : 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: isAllDaysSelected ? 'primary.dark' : 'rgba(25,118,210,0.04)',
                  }
                }}
              >
                {isAllDaysSelected ? '✓ All Days' : 'All Days'}
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={handleSelectWeekdays}
                sx={{
                  minWidth: '70px',
                  backgroundColor: isWeekdaysSelected ? 'primary.main' : 'transparent',
                  color: isWeekdaysSelected ? 'white' : 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: isWeekdaysSelected ? 'primary.dark' : 'rgba(25,118,210,0.04)',
                  }
                }}
              >
                {isWeekdaysSelected ? '✓ Weekdays' : 'Weekdays'}
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={handleSelectWeekend}
                sx={{
                  minWidth: '70px',
                  backgroundColor: isWeekendSelected ? 'primary.main' : 'transparent',
                  color: isWeekendSelected ? 'white' : 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: isWeekendSelected ? 'primary.dark' : 'rgba(25,118,210,0.04)',
                  }
                }}
              >
                {isWeekendSelected ? '✓ Weekend' : 'Weekend'}
              </Button>
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            px: 1,
            py: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.default'
          }}>
            {DAYS_OF_WEEK.map((day) => (
              <FormControlLabel
                key={day.value}
                control={
                  <Checkbox
                    checked={formik.values.availableDays.includes(day.value)}
                    onChange={() => handleDayToggle(day.value)}
                    name={`availableDays.${day.value}`}
                    size="small"
                    sx={{
                      color: 'primary.main',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label={day.label}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    fontWeight: formik.values.availableDays.includes(day.value) ? 500 : 400,
                  },
                  minWidth: '80px',
                  m: 0,
                  p: 0.5,
                  borderRadius: 1,
                  backgroundColor: formik.values.availableDays.includes(day.value)
                    ? 'rgba(25, 118, 210, 0.08)'
                    : 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              />
            ))}
          </Box>

          {/* Show selected count */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {getSelectedCount()}
            </Typography>
          </Box>
        </Grid>

        {/* Preferred Working Hours */}
        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="preferredStartTime"
            label="Preferred Start Time"
            type="time"
            value={formik.values.preferredStartTime}
            onChange={(value) => formik.setFieldValue('preferredStartTime', value)}
            onBlur={formik.handleBlur}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DebouncedTextField
            name="preferredEndTime"
            label="Preferred End Time"
            type="time"
            value={formik.values.preferredEndTime}
            onChange={(value) => formik.setFieldValue('preferredEndTime', value)}
            onBlur={formik.handleBlur}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
        </Grid>

        {/* Lunch Break Checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.hasLunchBreak}
                onChange={(e) => formik.setFieldValue('hasLunchBreak', e.target.checked)}
                name="hasLunchBreak"
                color="primary"
              />
            }
            label="Has Lunch Break"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.9375rem',
                color: 'text.secondary',
              },
            }}
          />
        </Grid>

        {/* Conditional Lunch Break Times */}
        {formik.values.hasLunchBreak && (
          <>
            <Grid item xs={12} md={6}>
              <DebouncedTextField
                name="lunchStart"
                label="Lunch Start Time"
                type="time"
                value={formik.values.lunchStart}
                onChange={(value) => formik.setFieldValue('lunchStart', value)}
                onBlur={formik.handleBlur}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DebouncedTextField
                name="lunchEnd"
                label="Lunch End Time"
                type="time"
                value={formik.values.lunchEnd}
                onChange={(value) => formik.setFieldValue('lunchEnd', value)}
                onBlur={formik.handleBlur}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </Grid>
          </>
        )}

        {/* Availability Notes */}
        <Grid item xs={12}>
          <DebouncedTextField
            name="availabilityNotes"
            label="Availability Notes"
            value={formik.values.availabilityNotes}
            onChange={(value) => formik.setFieldValue('availabilityNotes', value)}
            onBlur={formik.handleBlur}
            multiline
            rows={3}
            fullWidth
            placeholder="Any special instructions or notes about availability..."
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AvailabilitySchedule;