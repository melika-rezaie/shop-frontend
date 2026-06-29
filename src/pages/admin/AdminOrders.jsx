import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/admin/orders');
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, status) => {
        setUpdating(orderId);
        try {
            await api.put(`/admin/orders/${orderId}/status`, { status });
            fetchOrders();
        } catch (err) {
            console.log(err);
        } finally {
            setUpdating(null);
        }
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-700',
        paid: 'bg-blue-100 text-blue-700',
        shipped: 'bg-purple-100 text-purple-700',
        delivered: 'bg-green-100 text-green-700',
    };

    if (loading) return <div className="text-center py-10">Loading orders...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Manage Orders</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500">No orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                                <div>
                                    <span className="font-bold">Order #{order.id}</span>
                                    <span className="text-sm text-gray-500 ml-4">
                                        {order.user?.name || 'Unknown User'}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-4">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {order.status}
                                    </span>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        disabled={updating === order.id}
                                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-3">
                                {order.items?.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm border-b py-1">
                                        <span>{item.product?.name || 'Unknown'} × {item.quantity}</span>
                                        <span>${Number(item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200">
                                    <span>Total:</span>
                                    <span>${Number(order.total_price).toFixed(2)}</span>
                                </div>
                                {order.shipping_address && (
                                    <p className="text-sm text-gray-600 mt-2">📍 {order.shipping_address}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}