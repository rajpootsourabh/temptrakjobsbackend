// features/quotes/schemas/validationSchemas.js
import * as Yup from "yup";

// Custom date validation to check if date is in the future
const futureDate = (message) =>
  Yup.date()
    .nullable()
    .test("is-future", message, (value) => !value || value > new Date());

export const quoteValidationSchema = Yup.object().shape({
  // Quote Title - MANDATORY
  title: Yup.string()
    .required("Quote title is required")
    .max(255, "Title must be at most 255 characters")
    .test(
      "not-empty",
      "Quote title cannot be empty",
      (value) => !!value && value.trim().length > 0,
    ),

  // Client - MANDATORY
  client_id: Yup.string()
    .required("Client is required")
    .test(
      "client-selected",
      "Please select a valid client",
      (value) => !!value && value !== "",
    ),

  // Currency - MANDATORY
  currency: Yup.string()
    .required("Currency is required")
    .length(3, "Currency must be 3 characters (e.g., USD, EUR, GBP)"),

  // Line Items - MANDATORY
  line_items: Yup.array()
    .of(
      Yup.object().shape({
        item_name: Yup.string()
          .required("Item name is required")
          .max(255, "Item name must be at most 255 characters")
          .test(
            "not-empty",
            "Item name cannot be empty",
            (value) => !!value && value.trim().length > 0,
          ),

        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1")
          .integer("Quantity must be a whole number")
          .typeError("Quantity must be a number"),

        unit_price: Yup.number()
          .required("Unit price is required")
          .min(0, "Unit price cannot be negative")
          .typeError("Unit price must be a number"),
      }),
    )
    .min(1, "At least one line item is required"),
});
