import React, { useMemo } from 'react'
import StatCard from '../Components/StatCard'
//import { Route, Routes } from 'react-router-dom';



function DashboardView({ data }) {

    // --- Helper Functions ---
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }




    const stats = useMemo(() => {
        if (!data) return { revenue: 0, orderCount: 0, productCount: 0 };
        const revenue = data.orders.reduce((sum, order) => {
            return order.status !== 'Cancelled' ? sum + order.total : sum;
        }, 0);
        return {
            revenue: formatCurrency(revenue),
            orderCount: data.orders.length,
            productCount: data.products.length,
        };
    }, [data]);

    return (
        <section>
            <h2>Dashboard</h2>

            

            <div className="stats-grid">
                <StatCard icon="attach_money" label="Total Revenue" value={stats.revenue} />
                <StatCard icon="shopping_cart" label="Total Orders" value={stats.orderCount} />
                <StatCard icon="inventory" label="Total Products" value={stats.productCount} />
            </div>
        </section>
    );
}

export default DashboardView
