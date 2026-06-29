import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders');
            setOrders(res.data);
        } catch (err) {
            setError('Failed to load orders');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading orders...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 My Orders</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Link to="/products" className="text-blue-500 hover:underline">
                        Start Shopping →
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <div>
                                    <span className="font-semibold text-gray-700">Order #{order.id}</span>
                                    <span className="text-sm text-gray-500 ml-4">
                                        {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    order.status === 'paid' ? 'bg-blue-100 text-blue-700' :
                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                                    'bg-green-100 text-green-700'
                                }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            <div className="p-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
                                        <div>
                                            <span className="font-medium">{item.product.name}</span>
                                            <span className="text-gray-500 text-sm ml-2">× {item.quantity}</span>
                                        </div>
                                        <span>${Number(item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-200">
                                    <span>Total:</span>
                                    <span className="text-blue-600">${Number(order.total_price).toFixed(2)}</span>
                                </div>
                                {order.shipping_address && (
                                    <div className="mt-4 pt-2 border-t border-gray-200">
                                        <p className="text-sm text-gray-600">
                                            📍 {order.shipping_address}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}