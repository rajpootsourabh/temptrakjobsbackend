// features/clients/constants/clientConstants.js
export const BUSINESS_TYPE_OPTIONS = [
  { value: "", label: "Select Business Type" },
  { value: "individual", label: "Individual" },
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
  { value: "non_profit", label: "Non-Profit Organization" },
  { value: "government", label: "Government Agency" },
  { value: "other", label: "Other" },
];

// ===== INDUSTRIES =====
export const INDUSTRY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "construction", label: "Construction" },
  { value: "education", label: "Education" },
  { value: "hospitality", label: "Hospitality" },
  { value: "transportation", label: "Transportation" },
  { value: "other", label: "Other" },
];

export const DAYS_OF_WEEK = [
  { value: "mon", label: "Mon" },
  { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" },
  { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" },
  { value: "sat", label: "Sat" },
  { value: "sun", label: "Sun" },
];

export const DESIGNATION_ROLE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "owner", label: "Owner" },
  { value: "ceo", label: "CEO" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
  { value: "accountant", label: "Accountant" },
  { value: "admin", label: "Admin" },
  { value: "purchasing_manager", label: "Purchasing Manager" },
  { value: "other", label: "Other" },
];

export const STATE_OPTIONS = [
  { value: "alabama", label: "Alabama" },
  { value: "alaska", label: "Alaska" },
  { value: "arizona", label: "Arizona" },
  { value: "arkansas", label: "Arkansas" },
  { value: "california", label: "California" },
  { value: "colorado", label: "Colorado" },
  { value: "connecticut", label: "Connecticut" },
  { value: "delaware", label: "Delaware" },
  { value: "florida", label: "Florida" },
  { value: "georgia", label: "Georgia" },
  { value: "hawaii", label: "Hawaii" },
  { value: "idaho", label: "Idaho" },
  { value: "illinois", label: "Illinois" },
  { value: "indiana", label: "Indiana" },
  { value: "iowa", label: "Iowa" },
  { value: "kansas", label: "Kansas" },
  { value: "kentucky", label: "Kentucky" },
  { value: "louisiana", label: "Louisiana" },
  { value: "maine", label: "Maine" },
  { value: "maryland", label: "Maryland" },
  { value: "massachusetts", label: "Massachusetts" },
  { value: "michigan", label: "Michigan" },
  { value: "minnesota", label: "Minnesota" },
  { value: "mississippi", label: "Mississippi" },
  { value: "missouri", label: "Missouri" },
  { value: "montana", label: "Montana" },
  { value: "nebraska", label: "Nebraska" },
  { value: "nevada", label: "Nevada" },
  { value: "new_hampshire", label: "New Hampshire" },
  { value: "new_jersey", label: "New Jersey" },
  { value: "new_mexico", label: "New Mexico" },
  { value: "new_york", label: "New York" },
  { value: "north_carolina", label: "North Carolina" },
  { value: "north_dakota", label: "North Dakota" },
  { value: "ohio", label: "Ohio" },
  { value: "oklahoma", label: "Oklahoma" },
  { value: "oregon", label: "Oregon" },
  { value: "pennsylvania", label: "Pennsylvania" },
  { value: "rhode_island", label: "Rhode Island" },
  { value: "south_carolina", label: "South Carolina" },
  { value: "south_dakota", label: "South Dakota" },
  { value: "tennessee", label: "Tennessee" },
  { value: "texas", label: "Texas" },
  { value: "utah", label: "Utah" },
  { value: "vermont", label: "Vermont" },
  { value: "virginia", label: "Virginia" },
  { value: "washington", label: "Washington" },
  { value: "west_virginia", label: "West Virginia" },
  { value: "wisconsin", label: "Wisconsin" },
  { value: "wyoming", label: "Wyoming" },
];

export const COUNTRY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "india", label: "India" },
  { value: "usa", label: "USA" },
];

export const PAYMENT_TERM_OPTIONS = [
  { value: "", label: "Select" },
  { value: "due_on_receipt", label: "Due on Receipt" }, // Added
  { value: "net_7", label: "Net 7 Days" }, // Added
  { value: "net_15", label: "Net 15 Days" },
  { value: "net_30", label: "Net 30 Days" },
  { value: "net_45", label: "Net 45 Days" }, // Added
  { value: "net_60", label: "Net 60 Days" },
];

export const CURRENCY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "inr", label: "INR (₹)" }, // Enhanced
  { value: "usd", label: "USD ($)" }, // Enhanced
  { value: "eur", label: "EUR (€)" }, // Added
  { value: "gbp", label: "GBP (£)" }, // Added
  { value: "aed", label: "AED (د.إ)" }, // Added
  { value: "sgd", label: "SGD (S$)" }, // Added
  { value: "cad", label: "CAD (C$)" }, // Added
  { value: "aud", label: "AUD (A$)" }, // Added
];

export const TAX_PERCENTAGE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "0", label: "0%" }, // Added
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
  { value: "28", label: "28%" }, // Added
];

export const CLIENT_CATEGORY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "new", label: "New Client" },
  { value: "regular", label: "Regular" },
  { value: "premium", label: "Premium" },
  { value: "vip", label: "VIP Client" },
  { value: "strategic", label: "Strategic Partner" },
  { value: "at_risk", label: "At Risk" },
];

export const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri"];
export const WEEKEND_DAYS = ["sat", "sun"];
export const ALL_DAYS = [...WEEKDAYS, ...WEEKEND_DAYS];

// ===== INITIAL FORM VALUES =====
export const INITIAL_CLIENT_VALUES = {
  // Client Type
  client_type: "commercial",

  // Commercial
  business_name: "",
  business_type: "",
  industry: "",
  business_registration_number: "",

  // Contact (used for both)
  contact_person_name: "",
  designation_role: "",
  email_address: "",
  mobile_number: "",
  alternate_mobile_number: "",

  // Address
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  country: "",
  pin_zipcode: "",

  // Billing
  billing_name: "",
  payment_term: "",
  preferred_currency: "",
  tax_percentage: "",
  tax_id: "",

  // Additional
  website_url: "",
  logo_temp_id: null,
  logo_url: null,
  remove_logo: false,
  client_category: "",
  notes_remark: "",

  // Residential
  first_name: "",
  last_name: "",
  residential_email: "",
  residential_mobile: "",
  residential_address: "",

  // Availability
  availableDays: [],
  preferredStartTime: "",
  preferredEndTime: "",
  hasLunchBreak: false,
  lunchStart: "",
  lunchEnd: "",
  availabilityNotes: "",
};
