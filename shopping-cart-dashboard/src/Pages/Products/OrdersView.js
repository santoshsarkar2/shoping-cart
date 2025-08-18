import React,{useEffect,useState} from 'react'
import { formatCurrency } from '../../Services/Service'
import { getOrders } from '../../Services/productServices'


function OrdersView() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
            fetchData();
        }, []);
    
        const fetchData = async () => {
            try {
                const res = await getOrders(); // Replace with your actual API call
                setOrders(res);
                //console.log("Orders Page: ", orders);
            } catch (error) {
                console.error("Error fetching Orders:", error);
            }
        };
    
    return (
        <section>
            <h2>Orders</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>                            
                            <th>Product Price</th>                            
                            <th>Total</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.first_name}</td>
                                <td>{order.product}</td>
                                <td>{order.price}</td>
                                <td>{order.total_amount}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
export default OrdersView