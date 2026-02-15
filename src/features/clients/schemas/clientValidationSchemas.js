// features/clients/schemas/clientValidationSchemas.js
import * as Yup from "yup";

// Common validation rules
const phoneRegExp = /^[0-9]{10}$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Commercial client validation schema
export const commercialClientSchema = Yup.object().shape({
  // Section 1: Basic Business Information
  business_name: Yup.string()
    .required('Business name is required')
    .min(2, 'Business name must be at least 2 characters'),
  
  business_type: Yup.string()
    .required('Business type is required'),
  
  industry: Yup.string()
    .required('Industry is required'),
  
  business_registration_number: Yup.string().nullable(),

  // Section 2: Primary Contact Information
  contact_person_name: Yup.string()
    .required('Contact person name is required'),
  
  designation_role: Yup.string()
    .required('Designation/Role is required'),
  
  email_address: Yup.string()
    .required('Email address is required')
    .matches(emailRegExp, "Invalid email format"),
  
  mobile_number: Yup.string()
    .required('Mobile number is required')
    .matches(phoneRegExp, "Mobile number must be 10 digits"),
  
  alternate_mobile_number: Yup.string()
    .nullable()
    .matches(phoneRegExp, "Alternate mobile number must be 10 digits"),

  // Section 3: Business Address
  address_line1: Yup.string()
    .required('Address line 1 is required'),
  
  address_line2: Yup.string().nullable(),
  
  city: Yup.string()
    .required('City is required'),
  
  state: Yup.string()
    .required('State is required'),
  
  country: Yup.string()
    .required('Country is required'),
  
  pin_zipcode: Yup.string()
    .required('PIN/Zipcode is required')
    .matches(/^[0-9]{5,6}$/, "Invalid PIN/Zipcode"),

  // Section 4: Billing & Financial Details
  billing_name: Yup.string().nullable(),
  payment_term: Yup.string().nullable(),
  preferred_currency: Yup.string().nullable(),
  tax_percentage: Yup.string().nullable(),

  // Section 5: Additional Business details
  website_url: Yup.string()
    .url("Invalid URL format")
    .nullable(),
  
  logo: Yup.mixed().nullable(),
  
  client_category: Yup.string()
    .required('Client category is required'),
  
  notes_remark: Yup.string().nullable(),
});

// Residential client validation schema
export const residentialClientSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required'),
  
  last_name: Yup.string()
    .required('Last name is required'),
  
  residential_email: Yup.string()
    .required('Email address is required')
    .matches(emailRegExp, "Invalid email format"),
  
  residential_mobile: Yup.string()
    .required('Mobile number is required')
    .matches(phoneRegExp, "Mobile number must be 10 digits"),
  
  residential_address: Yup.string()
    .required('Residential address is required'),
});

// Availability schedule validation
export const availabilitySchema = Yup.object().shape({
  availableDays: Yup.array()
    .min(1, 'Select at least one available day'),
  
  preferredStartTime: Yup.string()
    .required('Preferred start time is required'),
  
  preferredEndTime: Yup.string()
    .required('Preferred end time is required')
    .test("is-greater", "End time must be after start time", function (value) {
      const { preferredStartTime } = this.parent;
      if (!preferredStartTime || !value) return true;
      return value > preferredStartTime;
    }),
  
  hasLunchBreak: Yup.boolean(),
  
  lunchStart: Yup.string()
    .nullable()
    .when('hasLunchBreak', {
      is: true,
      then: (schema) => schema.required('Lunch start time is required')
    }),
  
  lunchEnd: Yup.string()
    .nullable()
    .when('hasLunchBreak', {
      is: true,
      then: (schema) => schema
        .required('Lunch end time is required')
        .test(
          "is-greater",
          "Lunch end time must be after lunch start time",
          function (value) {
            const { lunchStart } = this.parent;
            if (!lunchStart || !value) return true;
            return value > lunchStart;
          }
        )
    }),
  
  availabilityNotes: Yup.string().nullable(),
});

// Combined schema based on client type
export const clientValidationSchema = (clientType) => {
  if (clientType === "commercial") {
    return commercialClientSchema.concat(availabilitySchema);
  }
  return residentialClientSchema.concat(availabilitySchema);
};

export default clientValidationSchema;