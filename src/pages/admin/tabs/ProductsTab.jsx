// src/pages/admin/tabs/ProductsTab.jsx
import React from 'react';
import ProductCard from '../components/ProductCard';
import useProductStore from '../../../stores/productStore';
import { toast } from 'react-hot-toast';

export default function ProductsTab({ products, onAdd, onEdit }) {
  const { deleteProduct } = useProductStore();

  const handleDelete = async (productId) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        toast.success('Product deleted');
      } catch (e) {
        toast.error('Failed to delete');
      }
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
        <p className="text-slate-400 font-medium">No products available.</p>
        <button onClick={onAdd} className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase">
          + Add Product
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black">Manage Products</h2>
        <button 
          onClick={onAdd}
          className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase shadow-lg hover:bg-slate-800 transition-all"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onEdit={onEdit} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}