// features/quotes/components/QuoteForm/QuoteLineItems.jsx
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Button,
    IconButton,
    Select,
    MenuItem,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DebouncedTextField from '../../../../components/common/form/DebouncedTextField';
import SectionHeader from '../../../../components/common/form/SectionHeader';

const QuoteLineItems = ({ formik }) => {
    const { values, setFieldValue } = formik;

    const handleAddLineItem = () => {
        const newItem = {
            item_name: '',
            description: '',
            quantity: 1,
            unit_price: 0,
            tax_rate: 18,
            package_id: null,
        };
        setFieldValue('line_items', [...values.line_items, newItem]);
    };

    const handleRemoveLineItem = (index) => {
        const updatedItems = values.line_items.filter((_, i) => i !== index);
        setFieldValue('line_items', updatedItems);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...values.line_items];
        updatedItems[index][field] = value;
        setFieldValue('line_items', updatedItems);
    };

    const calculateItemTotal = (item) => {
        const subtotal = (item.quantity || 0) * (item.unit_price || 0);
        const taxAmount = subtotal * ((item.tax_rate || 0) / 100);
        return subtotal + taxAmount;
    };

    const calculateSubtotal = () => {
        return values.line_items.reduce((sum, item) => {
            return sum + ((item.quantity || 0) * (item.unit_price || 0));
        }, 0);
    };

    const calculateTotal = () => {
        return values.line_items.reduce((sum, item) => {
            return sum + calculateItemTotal(item);
        }, 0);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: values.currency || 'USD',
        }).format(amount);
    };

    return (
        <Box sx={{ mt: 3 }}>
            <SectionHeader
                number="2"
                title="Line Items & Packages"
            />

            <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', mb: 2 }}>
                Add in Items/Packages
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Item Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Unit Price</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>TAX</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Item Total</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.line_items.map((item, index) => (
                            <TableRow key={index} hover>
                                <TableCell>
                                    <DebouncedTextField
                                        value={item.item_name || ''}
                                        onChange={(value) => handleItemChange(index, 'item_name', value)}
                                        placeholder="Item name"
                                        size="small"
                                        required
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <DebouncedTextField
                                        value={item.description || ''}
                                        onChange={(value) => handleItemChange(index, 'description', value)}
                                        placeholder="Description"
                                        size="small"
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <DebouncedTextField
                                        type="number"
                                        value={item.quantity || 1}
                                        onChange={(value) => handleItemChange(index, 'quantity', parseInt(value) || 1)}
                                        size="small"
                                        sx={{ width: 80 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DebouncedTextField
                                        type="number"
                                        value={item.unit_price || 1}
                                        onChange={(value) => handleItemChange(index, 'unit_price', parseFloat(value) || 0)}
                                        size="small"
                                        sx={{ width: 100 }}
                                        InputProps={{
                                            startAdornment: <span style={{ marginRight: 4 }}>$</span>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DebouncedTextField
                                        type="number"
                                        value={item.tax_rate || 18}
                                        onChange={(value) => handleItemChange(index, 'tax_rate', parseFloat(value) || 0)}
                                        size="small"
                                        sx={{ width: 80 }}
                                        InputProps={{
                                            endAdornment: <span style={{ marginLeft: 4 }}>%</span>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {formatCurrency(calculateItemTotal(item))}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleRemoveLineItem(index)}
                                        size="small"
                                        disabled={values.line_items.length <= 1}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddLineItem}
                    size="medium"
                >
                    Add Row
                </Button>

                {/* <Typography variant="body2" sx={{ color: '#666' }}>
                    Or Select Packages:
                </Typography>

                <Select
                    value={values.selected_package || ''}
                    onChange={(e) => setFieldValue('selected_package', e.target.value)}
                    displayEmpty
                    size="small"
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="">-- Select Package --</MenuItem>
                    <MenuItem value="basic">Basic Package</MenuItem>
                    <MenuItem value="standard">Standard Package</MenuItem>
                    <MenuItem value="premium">Premium Package</MenuItem>
                    <MenuItem value="enterprise">Enterprise Package</MenuItem>
                </Select> */}
            </Box>

            {/* Simple Summary */}
            <Box sx={{
                p: 2,
                backgroundColor: '#f8f9fa',
                borderRadius: 1,
                border: '1px solid #e0e0e0'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>Subtotal:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatCurrency(calculateSubtotal())}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>Total Amount:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#183B59' }}>
                        {formatCurrency(calculateTotal())}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default QuoteLineItems;