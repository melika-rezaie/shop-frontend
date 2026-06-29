import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { user } = useAuth(); // <-- گرفتن کاربر فعلی
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}/toggle-admin`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userId) => {
    // جلوگیری از حذف خودش
    if (userId === user?.id) {
      alert("❌ You cannot delete yourself!");
      return;
    }

    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading users...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users yet.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Orders</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-gray-200">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3 font-medium">
                    {u.name}
                    {u.id === user?.id && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-gray-600">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        u.is_admin
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.is_admin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="p-3">{u.orders_count || 0}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => toggleAdmin(u.id)}
                        className={`px-3 py-1 rounded text-sm transition ${
                          u.is_admin
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {u.is_admin ? "Remove Admin" : "Make Admin"}
                      </button>

                      <button
                        onClick={() => deleteUser(u.id)}
                        disabled={u.id === user?.id}
                        className={`px-3 py-1 rounded text-sm transition ${
                          u.id === user?.id
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}