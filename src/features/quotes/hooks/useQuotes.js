// features/quotes/hooks/useQuotes.js
import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuotes,
  fetchQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
  sendQuote,
  downloadQuote,
  duplicateQuote,
  fetchQuoteStats,
  setFilters,
  setSort,
  setCurrentPage,
  clearCurrentQuote,
  clearError,
  clearSuccess,
  resetFilters,
  updateQuoteStatus,
} from "../../../store/slices/features/quoteSlice";

export const useQuotes = ({ limit = 15, autoFetch = true } = {}) => {
  const dispatch = useDispatch();

  const {
    quotes,
    currentQuote,
    pagination,
    loading,
    error,
    success,
    filters,
    sort,
    stats,
  } = useSelector((state) => state.quotes);

  const [localError, setLocalError] = useState(null);
  
  // Use refs to track previous values
  const prevFiltersRef = useRef();
  const prevSortRef = useRef();
  const prevPageRef = useRef();
  const isMountedRef = useRef(true);
  const fetchInProgressRef = useRef(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      // Clear any pending timeouts on unmount
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Separate useEffect for handling filter changes with debounce
  useEffect(() => {
    if (!autoFetch) return;
    
    // Clear any pending timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce the fetch to avoid too many requests
    searchTimeoutRef.current = setTimeout(() => {
      if (fetchInProgressRef.current) {
        // If a fetch is in progress, wait and try again
        searchTimeoutRef.current = setTimeout(() => {
          performFetch();
        }, 300);
      } else {
        performFetch();
      }
    }, 300); // 300ms debounce
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [dispatch, pagination.currentPage, filters, sort, limit, autoFetch]);

  const performFetch = useCallback(() => {
    if (!autoFetch) return;
    if (fetchInProgressRef.current) return;
    
    fetchInProgressRef.current = true;
    
    dispatch(
      fetchQuotes({
        page: pagination.currentPage,
        perPage: limit,
        filters,
        sort,
      })
    ).finally(() => {
      setTimeout(() => {
        if (isMountedRef.current) {
          fetchInProgressRef.current = false;
        }
      }, 100);
    });
    
    // Update refs after fetch
    prevFiltersRef.current = filters;
    prevSortRef.current = sort;
    prevPageRef.current = pagination.currentPage;
  }, [dispatch, pagination.currentPage, filters, sort, limit, autoFetch]);

  /* ---------------------------------------------------------
     FILTER / SEARCH / SORT HANDLERS
  --------------------------------------------------------- */
  const handleSearch = useCallback(
    (searchTerm) => {
      // Reset to page 1 when searching
      dispatch(setCurrentPage(1));
      dispatch(setFilters({ search: searchTerm }));
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      // Reset to page 1 when filtering
      dispatch(setCurrentPage(1));
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (field, direction) => {
      dispatch(setSort({ field, direction }));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (event, newPage) => {
      dispatch(setCurrentPage(newPage + 1));
    },
    [dispatch]
  );

  const refresh = useCallback(() => {
    // Clear any pending timeouts
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (fetchInProgressRef.current) return;
    
    fetchInProgressRef.current = true;
    
    dispatch(
      fetchQuotes({
        page: pagination.currentPage,
        perPage: limit,
        filters,
        sort,
      })
    ).finally(() => {
      setTimeout(() => {
        if (isMountedRef.current) {
          fetchInProgressRef.current = false;
        }
      }, 100);
    });
  }, [dispatch, pagination.currentPage, limit, filters, sort]);

  /* ---------------------------------------------------------
     CRUD OPERATIONS
  --------------------------------------------------------- */
  const getQuote = useCallback(async (id) => {
    try {
      return await dispatch(fetchQuoteById(id)).unwrap();
    } catch (err) {
      const msg =
        err?.message || err?.data?.message || "Failed to fetch quote";
      setLocalError(msg);
      throw new Error(msg);
    }
  }, [dispatch]);

  const createQuoteHandler = useCallback(async (data) => {
    try {
      const result = await dispatch(createQuote(data)).unwrap();
      // Refresh quotes after creating
      setTimeout(() => refresh(), 500);
      return result;
    } catch (err) {
      setLocalError(err);
      throw err;
    }
  }, [dispatch, refresh]);

  const updateQuoteHandler = useCallback(async (id, data) => {
    try {
      const result = await dispatch(updateQuote({ id, data })).unwrap();
      // Refresh quotes after updating
      setTimeout(() => refresh(), 500);
      return result;
    } catch (err) {
      setLocalError(err);
      throw err;
    }
  }, [dispatch, refresh]);

  const deleteQuoteHandler = useCallback(async (id) => {
    try {
      await dispatch(deleteQuote(id)).unwrap();
      // Refresh quotes after deleting
      setTimeout(() => refresh(), 500);
    } catch (err) {
      setLocalError(err);
      throw err;
    }
  }, [dispatch, refresh]);

  const sendQuoteHandler = useCallback(async (id) => {
    try {
      return await dispatch(sendQuote(id)).unwrap();
    } catch (err) {
      setLocalError(err);
      throw err;
    }
  }, [dispatch]);

  const downloadQuoteHandler = useCallback(
    async (id, format = "pdf") => {
      try {
        await dispatch(downloadQuote({ id, format })).unwrap();
      } catch (err) {
        setLocalError(err);
        throw err;
      }
    },
    [dispatch]
  );

  const duplicateQuoteHandler = useCallback(async (id) => {
    try {
      const result = await dispatch(duplicateQuote(id)).unwrap();
      // Refresh quotes after duplicating
      setTimeout(() => refresh(), 500);
      return result;
    } catch (err) {
      setLocalError(err);
      throw err;
    }
  }, [dispatch, refresh]);

  const getQuoteStatsHandler = useCallback(async () => {
    try {
      return await dispatch(fetchQuoteStats()).unwrap();
    } catch (err) {
      setLocalError(err);
      throw err;
    }
  }, [dispatch]);

  /* ---------------------------------------------------------
     FILTER UTILITIES
  --------------------------------------------------------- */
  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(setCurrentPage(1)); // Reset to page 1 when filters change
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const updateSort = useCallback(
    (field, direction) =>
      dispatch(setSort({ field, direction })),
    [dispatch]
  );

  const setPage = useCallback(
    (page) => dispatch(setCurrentPage(page)),
    [dispatch]
  );

  const resetAllFilters = useCallback(() => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  /* ---------------------------------------------------------
     CLEAR / STATUS HELPERS
  --------------------------------------------------------- */
  const clearCurrent = useCallback(
    () => dispatch(clearCurrentQuote()),
    [dispatch]
  );

  const clearQuoteError = useCallback(() => {
    setLocalError(null);
    dispatch(clearError());
  }, [dispatch]);

  const clearQuoteSuccess = useCallback(
    () => dispatch(clearSuccess()),
    [dispatch]
  );

  const changeQuoteStatus = useCallback(
    (id, status) =>
      dispatch(updateQuoteStatus({ id, status })),
    [dispatch]
  );

  /* ---------------------------------------------------------
     DERIVED DATA
  --------------------------------------------------------- */
  const getQuotesByStatus = useCallback(
    (status) => quotes.filter((q) => q.status === status),
    [quotes]
  );

  const getTotalQuotesValue = useCallback(
    (status = null) => {
      const filtered = status
        ? quotes.filter((q) => q.status === status)
        : quotes;

      return filtered.reduce(
        (sum, q) => sum + (q.total_amount || 0),
        0
      );
    },
    [quotes]
  );

  /* ---------------------------------------------------------
     RETURN API
  --------------------------------------------------------- */
  return {
    quotes,
    currentQuote,
    loading,
    error: error || localError,
    success,
    stats,

    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.total,
      perPage: pagination.perPage,
      from: pagination.from,
      to: pagination.to,
    },

    filters,
    sort,

    loadQuotes: refresh,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    handleSort,
    refresh,

    getQuote,
    createQuote: createQuoteHandler,
    updateQuote: updateQuoteHandler,
    deleteQuote: deleteQuoteHandler,
    sendQuote: sendQuoteHandler,
    downloadQuote: downloadQuoteHandler,
    duplicateQuote: duplicateQuoteHandler,
    getQuoteStats: getQuoteStatsHandler,

    updateFilters,
    updateSort,
    setPage,
    resetFilters: resetAllFilters,

    getQuotesByStatus,
    getTotalQuotesValue,
    changeQuoteStatus,

    clearCurrent,
    clearError: clearQuoteError,
    clearSuccess: clearQuoteSuccess,
  };
};