import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../Services/Service';
import { getOrders } from '../../Services/productServices';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

function OrdersView() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter orders based on search query
        const filtered = orders.filter(order =>
            order.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.product.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOrders(filtered);
    }, [searchQuery, orders]);

    const fetchData = async () => {
        try {
            const res = await getOrders();
            setOrders(res);
            setFilteredOrders(res); // Initialize filtered orders
        } catch (error) {
            console.error("Error fetching Orders:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <section>
            <h1>Orders Management</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <TextField
                    label="Search Orders"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by customer or product"
                    style={{ width: '300px' }}
                />
                {/* Placeholder for potential future button, matching design */}
                {/* <Button variant="contained" color="primary" onClick={() => {}}>
                    Add Order
                </Button> */}
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Order ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Customer</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Product</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Product Price</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Total</TableCell>
                            {/* Placeholder for potential future actions column */}
                            {/* <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }} align="right">Actions</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.order_id}>
                                <TableCell>{order.order_id}</TableCell>
                                <TableCell>{order.first_name}</TableCell>
                                <TableCell>{order.product}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>{order.total_amount}</TableCell>
                                {/* Placeholder for potential future actions */}
                                {/* <TableCell align="right">
                                    <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error">
                                        Delete
                                    </Button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}

export default OrdersView;