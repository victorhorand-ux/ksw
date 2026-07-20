// src/pages/admin/tabs/ProductsTab.jsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ConfirmActionModal from '../components/ConfirmActionModal';
import useProductStore from '../../../stores/productStore';
import { toast } from 'react-hot-toast';

export default function ProductsTab({ products, onAdd, onEdit }) {
  const { deleteProduct } = useProductStore();
  const [confirmState, setConfirmState] = useState({ open: false, productId: null, loading: false });

  const handleDelete = async () => {
    if (!confirmState.productId) return;
    try {
      setConfirmState((prev) => ({ ...prev, loading: true }));
      await deleteProduct(confirmState.productId);
      toast.success('Product deleted successfully');
      setConfirmState({ open: false, productId: null, loading: false });
    } catch (e) {
      toast.error('Failed to delete product');
      setConfirmState((prev) => ({ ...prev, loading: false }));
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
            onDelete={(productId) => setConfirmState({ open: true, productId, loading: false })}
          />
        ))}
      </div>

      <ConfirmActionModal
        open={confirmState.open}
        title="Delete product?"
        message="This will remove the product from the catalog and any related listings."
        confirmLabel="Delete product"
        onCancel={() => setConfirmState({ open: false, productId: null, loading: false })}
        onConfirm={handleDelete}
        isLoading={confirmState.loading}
        destructive
      />
    </div>
  );
}