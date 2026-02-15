// components/common/form/DebouncedSearchableSelect.jsx
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  TextField, 
  MenuItem, 
  InputAdornment,
  Paper,
  ListSubheader
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const DebouncedSearchableSelect = ({ 
  value: propValue, 
  onChange, 
  delay = 300, 
  options = [],
  onBlur,
  searchPlaceholder = "Search...",
  showSearch = true,
  ...props 
}) => {
  const [value, setValue] = useState(propValue || '');
  const [isTouched, setIsTouched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Sync with prop value
  useEffect(() => {
    setValue(propValue || '');
  }, [propValue]);

  // Debounced onChange
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value !== propValue) {
        onChange(value);
        setIsTouched(true);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay, onChange, propValue]);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    
    return options.filter(option => 
      option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Handle blur
  const handleBlur = useCallback((e) => {
    setIsTouched(true);
    
    if (value !== propValue) {
      onChange(value);
    }
    
    // Delay closing to allow click on search input
    setTimeout(() => {
      if (!searchInputRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 200);
    
    if (onBlur) onBlur(e);
  }, [value, propValue, onChange, onBlur]);

  // Handle select change
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    setSearchTerm(''); // Clear search on selection
    setIsOpen(false);
  }, []);

  // Handle search input
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle open/close
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchTerm(''); // Clear search on close
  }, []);

  // Handle search input click (prevent menu close)
  const handleSearchClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <TextField
      {...props}
      select
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleOpen}
      SelectProps={{
        open: isOpen,
        onClose: handleClose,
        onOpen: handleOpen,
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: 300,
              overflow: 'auto'
            }
          }
        }
      }}
    >
      {showSearch && (
        <ListSubheader sx={{ bgcolor: 'background.paper', position: 'relative' }}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              position: 'sticky',
              top: 0,
              bgcolor: 'background.paper',
              zIndex: 1
            }}
          >
            <TextField
              inputRef={searchInputRef}
              size="small"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.stopPropagation()}
              onClick={handleSearchClick}
              onFocus={(e) => e.stopPropagation()}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </ListSubheader>
      )}

      {filteredOptions.length > 0 ? (
        filteredOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>
          No options found
        </MenuItem>
      )}
    </TextField>
  );
};

export default DebouncedSearchableSelect;