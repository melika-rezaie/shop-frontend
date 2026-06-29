import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/api';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, totalPrice, clearCart } = useCart();
    const [shippingAddress, setShippingAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const items = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
        }));

        try {
            await api.post('/orders', {
                items,
                shipping_address: shippingAddress,
            });
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>
                <p className="text-gray-500">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Shipping Address</label>
                    <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Enter your address"
                        required
                    />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-green-300"
                >
                    {loading ? 'Placing order...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
}