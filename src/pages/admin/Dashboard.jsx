// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react';
import AdminLayout from './layouts/AdminLayout';
import { useAdminData } from '../../hooks/admin/useAdminData';
import OverviewTab from './tabs/OverviewTab';
import ProductsTab from './tabs/ProductsTab';
import OrdersTab from './tabs/OrdersTab';
import CategoriesTab from './tabs/CategoriesTab';
import SubscribersTab from './tabs/SubscribersTab';
import PostsTab from './tabs/PostsTab'; 
import ProductModal from './components/ProductModal';
import CategoryModal from './components/CategoryModal';

import useProductStore from '../../stores/productStore';
import useCategoryStore from '../../stores/categoryStore';
import { useUpdateOrderStatus } from '../../hooks/mutations/useUpdateOrderStatus';

import { toast } from 'react-hot-toast';
import { triggerCloudflareRebuild } from '../../utils/rebuildService'; 
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../../config/firebase';
import { useQueryClient } from '@tanstack/react-query'; 

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Product State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Category State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminData();
  
  const { addProduct, updateProduct } = useProductStore();
  const { mutateAsync: updateOrderStatus } = useUpdateOrderStatus();
  const { addCategory, updateCategory, deleteCategory } = useCategoryStore();

  if (isLoading) return <div className="p-10 font-black text-slate-400 animate-pulse">Loading System...</div>;

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      
      {activeTab === 'overview' && <OverviewTab data={data} />}
      
      {activeTab === 'products' && (
        <ProductsTab 
          products={data.products} 
          onAdd={() => { setEditingProduct(null); setShowProductModal(true); }}
          onEdit={(prod) => { setEditingProduct(prod); setShowProductModal(true); }}
        />
      )}

      {activeTab === 'orders' && (
        <OrdersTab 
          orders={data.orders} 
          onUpdateStatus={async (orderId, newStatus) => {
            try {
              await updateOrderStatus({ orderId, newStatus });
              toast.success(`Order updated to ${newStatus}`, { icon: '📦' });
            } catch (e) {
              toast.error('Failed to update status');
            }
          }} 
        />
      )}

      {activeTab === 'categories' && (
        <CategoriesTab 
          categories={data.categories}
          onAdd={() => { setEditingCategory(null); setShowCategoryModal(true); }}
          onEdit={(cat) => { setEditingCategory(cat); setShowCategoryModal(true); }}
          onDelete={async (catId) => {
            if (window.confirm('Delete this category?')) {
              try {
                await deleteCategory(catId);
                toast.success('Category removed');
                triggerCloudflareRebuild(); 
              } catch (e) {
                toast.error('Failed to remove category');
              }
            }
          }}
        />
      )}
      
      {activeTab === 'subscribers' && (
        <SubscribersTab subscribers={data.subscribers} />
      )}

      {activeTab === 'posts' && (
        <PostsTab 
          posts={data.posts}
          onToggleStatus={async (postId, newStatus) => {
            try {
              await updateDoc(doc(db, 'posts', postId), { status: newStatus });
              toast.success(`Post marked as ${newStatus}`);
              triggerCloudflareRebuild(); 
              queryClient.invalidateQueries(['admin-data']); 
            } catch (e) {
              toast.error('Failed to update status');
            }
          }}
          onDelete={async (postId) => {
            if (window.confirm('Permanently delete this article?')) {
              try {
                await deleteDoc(doc(db, 'posts', postId));
                toast.success('Article deleted');
                triggerCloudflareRebuild(); 
                queryClient.invalidateQueries(['admin-data']); 
              } catch (e) {
                toast.error('Failed to delete article');
              }
            }
          }}
        />
      )}

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal 
          product={editingProduct} 
          categories={data.categories}
          onClose={() => setShowProductModal(false)}
          onSave={async (formData) => {
            
            // 🚀 NEW: Auto-generate the slug from the product name
            const generatedSlug = formData.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-') 
              .replace(/(^-|-$)+/g, '');   

            const productData = {
              ...formData,
              slug: formData.slug || generatedSlug, // 🚀 Save it to Firestore
              price: Number(formData.price),
              stock: Number(formData.stock),
              updatedAt: new Date().toISOString()
            };

            try {
              if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
                toast.success('Product updated!');
              } else {
                await addProduct({ ...productData, createdAt: new Date().toISOString() });
                toast.success('New product added!');
              }
              triggerCloudflareRebuild(); 
              setShowProductModal(false);
            } catch (e) {
              toast.error("Failed to save product");
            }
          }}
        />
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setShowCategoryModal(false)}
          onSave={async (formData) => {
            try {
              const catId = editingCategory ? editingCategory.id : formData.name.toLowerCase().replace(/\s+/g, '-');
              const categoryData = { ...formData, id: catId };
              
              if (editingCategory) {
                await updateCategory(editingCategory.id, categoryData);
                toast.success('Category updated');
              } else {
                await addCategory(categoryData);
                toast.success('Category created');
              }
              triggerCloudflareRebuild(); 
              setShowCategoryModal(false);
            } catch (error) {
              toast.error("Failed to save category");
            }
          }}
        />
      )}
    </AdminLayout>
  );
}