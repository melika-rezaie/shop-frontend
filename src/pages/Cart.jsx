import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Your Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
        <Link to="/products" className="text-blue-500 hover:underline">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                ) : (
                  <span className="text-gray-400 text-sm">📷</span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </span>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="text-red-500 px-4 py-2 rounded hover:bg-red-50 transition"
              >
                Clear Cart
              </button>
              <Link to="/checkout" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
                Checkout →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}