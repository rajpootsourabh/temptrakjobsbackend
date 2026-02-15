// features/clients/hooks/useClientForm.js
import { useState } from 'react';
import { WEEKDAYS, WEEKEND_DAYS, ALL_DAYS } from '../constants/clientConstants';

export const useClientForm = (formik) => {
  const [clientType, setClientType] = useState('commercial');

  const handleDayToggle = (dayValue) => {
    const currentDays = formik.values.availableDays;
    if (currentDays.includes(dayValue)) {
      formik.setFieldValue('availableDays', currentDays.filter(d => d !== dayValue));
    } else {
      formik.setFieldValue('availableDays', [...currentDays, dayValue]);
    }
  };

  const handleSelectWeekdays = () => {
    const currentDays = formik.values.availableDays;
    const allWeekdaysSelected = WEEKDAYS.every(day => currentDays.includes(day));

    if (allWeekdaysSelected) {
      formik.setFieldValue('availableDays', currentDays.filter(day => !WEEKDAYS.includes(day)));
    } else {
      const newDays = [...new Set([...currentDays, ...WEEKDAYS])];
      formik.setFieldValue('availableDays', newDays);
    }
  };

  const handleSelectWeekend = () => {
    const currentDays = formik.values.availableDays;
    const allWeekendSelected = WEEKEND_DAYS.every(day => currentDays.includes(day));

    if (allWeekendSelected) {
      formik.setFieldValue('availableDays', currentDays.filter(day => !WEEKEND_DAYS.includes(day)));
    } else {
      const newDays = [...new Set([...currentDays, ...WEEKEND_DAYS])];
      formik.setFieldValue('availableDays', newDays);
    }
  };

  const handleSelectAllDays = () => {
    const currentDays = formik.values.availableDays;
    const allSelected = ALL_DAYS.every(day => currentDays.includes(day));

    if (allSelected) {
      formik.setFieldValue('availableDays', []);
    } else {
      formik.setFieldValue('availableDays', ALL_DAYS);
    }
  };

  return {
    clientType,
    setClientType,
    handleDayToggle,
    handleSelectWeekdays,
    handleSelectWeekend,
    handleSelectAllDays,
  };
};