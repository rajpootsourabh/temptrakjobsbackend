// store/slices/features/quoteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quoteService from "../../../features/quotes/services/quoteService";

// ===== ASYNC THUNKS =====

// Fetch quotes with pagination
export const fetchQuotes = createAsyncThunk(
  "quotes/fetchQuotes",
  async (
    { page = 1, perPage = 15, filters = {}, sort = {} } = {},
    { rejectWithValue },
  ) => {
    try {
      const params = {
        page,
        per_page: perPage,
        ...filters,
        sort_by: sort.field,
        sort_direction: sort.direction,
      };

      const response = await quoteService.getAll(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quotes",
      );
    }
  },
);

// Fetch single quote
export const fetchQuoteById = createAsyncThunk(
  "quotes/fetchQuoteById",
  async (id, { rejectWithValue }) => {
    try {
      const quote = await quoteService.getById(id);
      return quote;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quote",
      );
    }
  },
);

// Create quote
export const createQuote = createAsyncThunk(
  "quotes/createQuote",
  async (quoteData, { rejectWithValue }) => {
    try {
      const newQuote = await quoteService.create(quoteData);
      return newQuote;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create quote",
      );
    }
  },
);

// Update quote
export const updateQuote = createAsyncThunk(
  "quotes/updateQuote",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updatedQuote = await quoteService.update(id, data);
      return updatedQuote;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quote",
      );
    }
  },
);

// Delete quote
export const deleteQuote = createAsyncThunk(
  "quotes/deleteQuote",
  async (id, { rejectWithValue }) => {
    try {
      await quoteService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete quote",
      );
    }
  },
);

// Send quote
export const sendQuote = createAsyncThunk(
  "quotes/sendQuote",
  async (id, { rejectWithValue }) => {
    try {
      const quote = await quoteService.sendQuote(id);
      return quote;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send quote",
      );
    }
  },
);

// Download quote
export const downloadQuote = createAsyncThunk(
  "quotes/downloadQuote",
  async ({ id, format = "pdf" }, { rejectWithValue }) => {
    try {
      const blob = await quoteService.downloadQuote(id, format);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quote-${id}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { id, format };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to download quote",
      );
    }
  },
);

// Duplicate quote
export const duplicateQuote = createAsyncThunk(
  "quotes/duplicateQuote",
  async (id, { rejectWithValue }) => {
    try {
      const quote = await quoteService.duplicateQuote(id);
      return quote;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to duplicate quote",
      );
    }
  },
);

// Fetch quote stats
export const fetchQuoteStats = createAsyncThunk(
  "quotes/fetchQuoteStats",
  async (_, { rejectWithValue }) => {
    try {
      const stats = await quoteService.getStats();
      return stats;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stats",
      );
    }
  },
);

// Update quote status
export const updateQuoteStatus = createAsyncThunk(
  "quotes/updateQuoteStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const quote = await quoteService.updateStatus(id, status);
      return quote;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

// ===== INITIAL STATE =====

const initialState = {
  quotes: [],
  currentQuote: null,
  pagination: {
    total: 0,
    perPage: 15,
    currentPage: 1,
    totalPages: 1,
    from: null,
    to: null,
  },
  loading: false,
  error: null,
  success: null,
  filters: {
    search: "",
    status: "",
    client_id: "",
    date_from: "",
    date_to: "",
  },
  sort: {
    field: "created_at",
    direction: "desc",
  },
  stats: null,
};

// ===== SLICE =====

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearCurrentQuote: (state) => {
      state.currentQuote = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sort = initialState.sort;
      state.pagination.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Quotes
      .addCase(fetchQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = action.payload.data;
        state.pagination = {
          total: action.payload.pagination.total,
          perPage: action.payload.pagination.perPage,
          currentPage: action.payload.pagination.currentPage,
          totalPages: action.payload.pagination.totalPages,
          from: action.payload.pagination.from,
          to: action.payload.pagination.to,
        };
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Quote
      .addCase(fetchQuoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuote = action.payload;
      })
      .addCase(fetchQuoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Quote
      .addCase(createQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes.unshift(action.payload);
        state.pagination.total += 1;
        state.success = "Quote created successfully";
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // Update Quote
      .addCase(updateQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateQuote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.quotes.findIndex(
          (q) => q.id === action.payload.id,
        );
        if (index !== -1) {
          state.quotes[index] = action.payload;
        }
        if (state.currentQuote?.id === action.payload.id) {
          state.currentQuote = action.payload;
        }
        state.success = "Quote updated successfully";
      })
      .addCase(updateQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // Delete Quote
      .addCase(deleteQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = state.quotes.filter((q) => q.id !== action.payload);
        state.pagination.total -= 1;
        if (state.currentQuote?.id === action.payload) {
          state.currentQuote = null;
        }
        state.success = "Quote deleted successfully";
      })
      .addCase(deleteQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // Send Quote
      .addCase(sendQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendQuote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.quotes.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) {
          state.quotes[index] = action.payload;
        }
        state.success = "Quote sent successfully";
      })
      .addCase(sendQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // Duplicate Quote
      .addCase(duplicateQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(duplicateQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes.unshift(action.payload);
        state.pagination.total += 1;
        state.success = "Quote duplicated successfully";
      })
      .addCase(duplicateQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // Fetch Stats
      .addCase(fetchQuoteStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchQuoteStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateQuoteStatus.fulfilled, (state, action) => {
        const index = state.quotes.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) {
          state.quotes[index] = action.payload;
        }
        if (state.currentQuote?.id === action.payload.id) {
          state.currentQuote = action.payload;
        }
      });
  },
});

export const {
  setFilters,
  setSort,
  setCurrentPage,
  clearCurrentQuote,
  clearError,
  clearSuccess,
  resetFilters,
} = quoteSlice.actions;

export default quoteSlice.reducer;