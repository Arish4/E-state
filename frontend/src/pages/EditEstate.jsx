import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import './EditEstate.css';

const EditEstate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    description: '',
    status: 'available'
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { isSeller } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSeller) {
      setError('You need to be logged in as a seller to edit properties');
      setLoading(false);
      return;
    }
    fetchEstate();
  }, [id, isSeller]);

  const fetchEstate = async () => {
    try {
      setLoading(true);
      const estates = await apiService.getMyEstates();
      const estate = estates.find(e => e._id === id);
      
      if (!estate) {
        setError('Property not found');
        return;
      }

      setFormData({
        name: estate.name,
        price: estate.price.toString(),
        location: estate.location,
        description: estate.description,
        status: estate.status || 'available'
      });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch property details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setMessage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Property name is required');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setError('Valid price is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    if (!validateForm()) {
      setSaving(false);
      return;
    }

    try {
      const estateData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        location: formData.location.trim(),
        description: formData.description.trim(),
        status: formData.status
      };

      await apiService.updateEstate(id, estateData, imageFile);
      setMessage('Property updated successfully!');
      
      setTimeout(() => {
        navigate('/my-estates');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update property');
    } finally {
      setSaving(false);
    }
  };

  if (!isSeller) {
    return (
      <div className="edit-estate-page">
        <div className="container">
          <div className="error-state">
            <h2>Access Denied</h2>
            <p>You need to be logged in as a seller to edit properties.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="edit-estate-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-estate-page">
      <div className="container">
        <div className="edit-estate-header">
          <h1>Edit Property</h1>
          <p>Update your property information and images</p>
        </div>

        <div className="edit-estate-form-container">
          <form onSubmit={handleSubmit} className="edit-estate-form">
            <div className="form-section">
              <h3>Property Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Property Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Beautiful 3-Bedroom Villa"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (USD) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 500000"
                    min="0"
                    step="1000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Downtown, New York"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property in detail..."
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>Property Image</h3>
              
              <div className="form-group">
                <label htmlFor="image">Update Image (Optional)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="file-upload-display">
                    {imageFile ? (
                      <div className="file-preview">
                        <img 
                          src={URL.createObjectURL(imageFile)} 
                          alt="Preview" 
                          className="preview-image"
                        />
                        <p className="file-name">{imageFile.name}</p>
                      </div>
                    ) : (
                      <div className="file-placeholder">
                        <span className="upload-icon">📷</span>
                        <p>Click to upload new image</p>
                        <small>Max size: 5MB (Leave empty to keep current image)</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => navigate('/my-estates')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Updating Property...' : 'Update Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEstate;
