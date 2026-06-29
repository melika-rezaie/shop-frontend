import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        👑 Admin Dashboard
      </h2>

      {/* منوی ادمین */}
      {isAuthenticated && user?.is_admin && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            to="/admin/dashboard"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            📦 Products
          </Link>
          <Link
            to="/admin/orders"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            📋 Orders
          </Link>
          <Link
            to="/admin/users"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            👥 Users
          </Link>
        </div>
      )}

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-blue-600">
            {stats.total_products}
          </h3>
          <p className="text-gray-600">Total Products</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-green-600">
            {stats.total_orders}
          </h3>
          <p className="text-gray-600">Total Orders</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-600">
            {stats.total_users}
          </h3>
          <p className="text-gray-600">Total Users</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-yellow-600">
            ${Number(stats.total_revenue).toFixed(2)}
          </h3>
          <p className="text-gray-600">Revenue</p>
        </div>
      </div>
    </div>
  );
}