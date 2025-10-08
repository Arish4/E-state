import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import './AddEstate.css';

const AddEstate = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null); // single image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { isSeller } = useAuth();
  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  // Handle single image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      setError('');
    }
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) { setError('Property name is required'); return false; }
    if (!formData.price || formData.price <= 0) { setError('Valid price is required'); return false; }
    if (!formData.location.trim()) { setError('Location is required'); return false; }
    if (!formData.description.trim()) { setError('Description is required'); return false; }
    if (!imageFile) { setError('At least 1 image is required'); return false; }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!isSeller) {
      setError('You need to be logged in as a seller to add properties');
      setLoading(false);
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const estateData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        location: formData.location.trim(),
        description: formData.description.trim()
      };

      await apiService.uploadEstate(estateData, imageFile); // send single file
      setMessage('Property added successfully!');

      setTimeout(() => navigate('/my-estates'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  if (!isSeller) {
    return (
      <div className="add-estate-page">
        <div className="container">
          <div className="error-state">
            <h2>Access Denied</h2>
            <p>You need to be logged in as a seller to add properties.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-estate-page">
      <div className="container">
        <div className="add-estate-header">
          <h1>Add New Property</h1>
          <p>List your property and reach potential buyers</p>
        </div>

        <div className="add-estate-form-container">
          <form onSubmit={handleSubmit} className="add-estate-form">

            <div className="form-section">
              <h3>Property Information</h3>
              <div className="form-group">
                <label htmlFor="name">Property Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (USD) *</label>
                  <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="1000" required />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="5" required />
              </div>
            </div>

            <div className="form-section">
              <h3>Property Image</h3>
              <div className="form-group">
                <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                {imageFile && (
                  <div className="file-preview">
                    <img src={URL.createObjectURL(imageFile)} alt="Preview" className="preview-image" />
                    <p className="file-name">{imageFile.name}</p>
                  </div>
                )}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate('/my-estates')}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding Property...' : 'Add Property'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEstate;
