import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/admin/products');
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.put(`/admin/products/${editingProduct.id}`, form);
            } else {
                await api.post('/admin/products', form);
            }
            setForm({ name: '', description: '', price: '', stock: '', category: '' });
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await api.delete(`/admin/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            stock: product.stock,
            category: product.category || '',
        });
    };

    if (loading) return <div className="text-center py-10">Loading products...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Manage Products</h2>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        required
                        step="0.01"
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-2 md:col-span-2"
                        rows="2"
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    {editingProduct && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingProduct(null);
                                setForm({ name: '', description: '', price: '', stock: '', category: '' });
                            }}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {products.length === 0 ? (
                <p className="text-gray-500">No products yet.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="text-sm font-bold text-blue-600">${product.price}</p>
                                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}