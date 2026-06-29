import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {isAuthenticated && user?.is_admin && (
          <Link
            to="/admin/dashboard"
            className="text-purple-600 hover:text-purple-800"
          >
            👑 Admin
          </Link>
        )}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛒 Shop
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/orders" className="text-gray-700 hover:text-blue-600">
                📦 Orders
              </Link>
              <span className="text-gray-700">👋 {user?.name}</span>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}

          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
