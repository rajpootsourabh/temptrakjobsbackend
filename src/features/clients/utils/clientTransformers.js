// features/clients/utils/clientTransformers.js

// Transform API response to form format
export const transformClientFromApi = (apiClient) => {
  return {
    id: apiClient.id,
    vendor_id: apiClient.vendor_id,
    client_type: apiClient.client_type || "commercial",

    // Personal Details (for residential)
    first_name: apiClient.first_name || "",
    last_name: apiClient.last_name || "",

    // Business Information
    business_name: apiClient.business_name || "",
    business_type: apiClient.business_type || "",
    industry: apiClient.industry || "",
    business_registration_number: apiClient.business_registration_number || "",

    // Contact Information
    contact_person_name: apiClient.contact_person_name || "",
    designation_role: apiClient.designation || "",
    email_address: apiClient.email || "",
    mobile_number: apiClient.mobile_number || "",
    alternate_mobile_number: apiClient.alternate_mobile_number || "",

    // Address - flattened as per your form structure
    address_line1: apiClient.address?.address_line_1 || "",
    address_line2: apiClient.address?.address_line_2 || "",
    city: apiClient.address?.city || "",
    state: apiClient.address?.state || "",
    country: apiClient.address?.country || "",
    pin_zipcode: apiClient.address?.zip_code || "",

    // Billing
    billing_name: apiClient.payment?.billing_name || "",
    payment_term: apiClient.payment?.payment_term || "",
    preferred_currency: apiClient.payment?.preferred_currency || "",
    tax_percentage: apiClient.tax?.tax_percentage
      ? parseFloat(apiClient.tax.tax_percentage).toString()
      : "",
    tax_id: apiClient.tax?.tax_id || "",

    // Additional
    website_url: apiClient.website_url || "",
    logo_url: apiClient.logo?.url,
    logo_temp_id: null, // Always reset temp_id
    remove_logo: false, // Add remove flag for update mode
    client_category: apiClient.client_category || "",
    notes_remark: apiClient.notes || "",
    status: apiClient.status || "active",

    // Availability Schedule
    availableDays:
      apiClient.availability_schedule?.available_days?.map((day) => {
        const dayMap = {
          monday: "mon",
          tuesday: "tue",
          wednesday: "wed",
          thursday: "thu",
          friday: "fri",
          saturday: "sat",
          sunday: "sun",
        };
        return dayMap[day] || day;
      }) || [],
    preferredStartTime:
      apiClient.availability_schedule?.preferred_start_time || "",
    preferredEndTime: apiClient.availability_schedule?.preferred_end_time || "",
    hasLunchBreak: apiClient.availability_schedule?.has_lunch_break || false,
    lunchStart: apiClient.availability_schedule?.lunch_start || "",
    lunchEnd: apiClient.availability_schedule?.lunch_end || "",
    availabilityNotes: apiClient.availability_schedule?.notes || "",

    // Metadata
    created_at: apiClient.created_at,
    updated_at: apiClient.updated_at,
    created_by: apiClient.created_by,
    updated_by: apiClient.updated_by,
  };
};

// Transform form data to API format (matching your expected payload)
export const transformClientForApi = (formData) => {
  const apiData = {
    client_type: formData.client_type || "commercial",

    // Personal Details (only for residential)
    ...(formData.client_type === "residential"
      ? {
          first_name: formData.first_name,
          last_name: formData.last_name,
        }
      : {}),

    // Business Information (for commercial)
    ...(formData.client_type === "commercial"
      ? {
          business_name: formData.business_name,
          business_type: formData.business_type,
          industry: formData.industry,
          business_registration_number: formData.business_registration_number,
        }
      : {}),

    // Contact Information (common for both)
    contact_person_name: formData.contact_person_name,
    designation: formData.designation_role,
    email: formData.email_address || formData.residential_email,
    mobile_number: formData.mobile_number || formData.residential_mobile,
    alternate_mobile_number: formData.alternate_mobile_number,

    // Address - flattened as per your expected payload
    address_line_1: formData.address_line1 || formData.residential_address,
    address_line_2: formData.address_line2,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    zip_code: formData.pin_zipcode,

    // Billing
    billing_name: formData.billing_name,
    payment_term: formData.payment_term,
    preferred_currency: formData.preferred_currency,

    // Tax
    tax_percentage: formData.tax_percentage
      ? parseFloat(formData.tax_percentage)
      : null,
    tax_id: formData.tax_id || "",

    // Additional
    website_url: formData.website_url,
    client_category: formData.client_category,
    notes: formData.notes_remark,
  };

  // IMPORTANT: Handle logo based on mode and form values
  if (formData.id) {
    // UPDATE MODE
    if (formData.remove_logo) {
      // User wants to remove existing logo
      apiData.remove_logo = true;
    } else if (formData.logo_temp_id) {
      // User uploaded a new logo
      apiData.logo_temp_id = formData.logo_temp_id;
    }
    // If neither, don't send anything about logo (keep existing)
  } else {
    // CREATE MODE
    if (formData.logo_temp_id) {
      apiData.logo_temp_id = formData.logo_temp_id;
    }
  }

  // Add availability schedule if any days are selected
  if (formData.availableDays?.length > 0) {
    apiData.availability_schedule = {
      available_days: formData.availableDays.map((day) => {
        // Convert abbreviations to full day names
        const dayMap = {
          mon: "monday",
          tue: "tuesday",
          wed: "wednesday",
          thu: "thursday",
          fri: "friday",
          sat: "saturday",
          sun: "sunday",
        };
        return dayMap[day] || day;
      }),
      preferred_start_time: formData.preferredStartTime,
      preferred_end_time: formData.preferredEndTime,
      has_lunch_break: formData.hasLunchBreak || false,
      lunch_start: formData.lunchStart,
      lunch_end: formData.lunchEnd,
      notes: formData.availabilityNotes || "",
    };
  }

  // Remove undefined or null values
  Object.keys(apiData).forEach((key) => {
    if (apiData[key] === undefined || apiData[key] === null) {
      delete apiData[key];
    }
  });

  console.log('Final API payload:', apiData); // Add for debugging
  return apiData;
};