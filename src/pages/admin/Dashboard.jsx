import React, { useState } from 'react';
import AdminLayout from './layouts/AdminLayout';
import { useAdminData } from '../../hooks/admin/useAdminData';
import OverviewTab from './tabs/OverviewTab';
import ProductsTab from './tabs/ProductsTab';
import OrdersTab from './tabs/OrdersTab';
import CategoriesTab from './tabs/CategoriesTab';
import SubscribersTab from './tabs/SubscribersTab';
import PostsTab from './tabs/PostsTab'; // 🚀 Added PostsTab
import ProductModal from './components/ProductModal';
import CategoryModal from './components/CategoryModal';

import useProductStore from '../../stores/productStore';
import useOrderStore from '../../stores/orderStore';
import useCategoryStore from '../../stores/categoryStore';

import { toast } from 'react-hot-toast';
import { triggerCloudflareRebuild } from '../../utils/rebuildService'; // 🚀 Added Webhook trigger
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'; // 🚀 Added Firebase mutators
import { db } from '../../config/firebase';
import { useQueryClient } from '@tanstack/react-query'; // 🚀 Added Cache invalidator

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
  const { updateOrderStatus } = useOrderStore();
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
              await updateOrderStatus(orderId, newStatus);
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
                triggerCloudflareRebuild(); // 🚀 Rebuild site on deletion
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

      {/* 🚀 NEW: Posts Tab Integration */}
      {activeTab === 'posts' && (
        <PostsTab 
          posts={data.posts}
          onToggleStatus={async (postId, newStatus) => {
            try {
              await updateDoc(doc(db, 'posts', postId), { status: newStatus });
              toast.success(`Post marked as ${newStatus}`);
              triggerCloudflareRebuild(); // 🚀 Rebuild site
              queryClient.invalidateQueries(['admin-data']); // Instantly refresh UI
            } catch (e) {
              toast.error('Failed to update status');
            }
          }}
          onDelete={async (postId) => {
            if (window.confirm('Permanently delete this article?')) {
              try {
                await deleteDoc(doc(db, 'posts', postId));
                toast.success('Article deleted');
                triggerCloudflareRebuild(); // 🚀 Rebuild site
                queryClient.invalidateQueries(['admin-data']); // Instantly refresh UI
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
            const productData = {
              ...formData,
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
              triggerCloudflareRebuild(); // 🚀 Rebuild site
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
              triggerCloudflareRebuild(); // 🚀 Rebuild site
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