import { useEffect, useState } from 'react';
import api from '../api/api';
import { useCart } from '../context/CartContext';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading products...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Products</h1>
            
            {products.length === 0 ? (
                <p className="text-gray-500">No products yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400">📷 No image</span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description || 'No description'}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm transition"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}