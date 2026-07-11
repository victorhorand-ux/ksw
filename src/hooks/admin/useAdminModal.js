// src/hooks/admin/useAdminModal.js
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { uploadToCloudinary } from '../../utils/uploadService';

export function useAdminModal(initialForm) {
  const [formData, setFormData] = useState(initialForm);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = async (file) => {
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, image: url }));
      toast.success('Media Linked');
    } catch (e) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return { formData, setFormData, isUploading, isSaving, setIsSaving, handleImageUpload };
}