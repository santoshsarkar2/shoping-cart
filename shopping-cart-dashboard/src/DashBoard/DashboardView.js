import React, { useState, useEffect, useMemo } from 'react'
import StatCard from '../Components/StatCard'
import { getOrders, getProduct } from '../Services/productServices'




function DashboardView() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res1 = await getOrders();
            setOrders(res1);
            const res2 = await getProduct();
            setProducts(res2);
        } catch (error) {
            console.error("Error fetching Orders:", error);
        }
    };

    
    const revenue = 0;
    const orderCount= orders.length;
    const productCount= products.length;



            // --- Helper Functions ---
            function formatCurrency(amount) {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(amount);
            }




    // const stats = useMemo(() => {
    //     //fetchData();
    //     //if (!data) return { revenue: 0, orderCount: 0, productCount: 0 };
    //     const revenue = orders.reduce((sum, order) => {
    //         return order.status !== 'Cancelled' ? sum + order.total : sum;
    //     }, 0);
    //     return {
    //         revenue: formatCurrency(revenue),
    //         orderCount: orders.length,
    //         productCount: products.length,
    //     };
    // }, []);

    return (
        <section>
            <h2>Dashboard</h2>
            
            <div className="stats-grid">
                <StatCard icon="attach_money" label="Total Revenue" value={revenue} />
                <StatCard icon="shopping_cart" label="Total Orders" value={orderCount} />
                <StatCard icon="inventory" label="Total Products" value={productCount} />
            </div>
        </section>
    );
}

export default DashboardView
