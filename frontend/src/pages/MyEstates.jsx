import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import './MyEstates.css';

const MyEstates = () => {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isSeller } = useAuth();

  useEffect(() => {
    if (!isSeller) {
      setError('You need to be logged in as a seller to view your estates');
      setLoading(false);
      return;
    }
    fetchMyEstates();
  }, [isSeller]);

  const fetchMyEstates = async () => {
    try {
      setLoading(true);
      const data = await apiService.getMyEstates();
      setEstates(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch your estates');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!isSeller) {
    return (
      <div className="my-estates-page">
        <div className="container">
          <div className="error-state">
            <h2>Access Denied</h2>
            <p>You need to be logged in as a seller to view your estates.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-estates-page">
      <div className="container">
        <div className="my-estates-header">
          <div className="header-content">
            <h1>My Properties</h1>
            <p>Manage your property listings and track their performance</p>
          </div>
          <Link to="/add-estate" className="btn btn-primary">
            + Add New Property
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{estates.length}</div>
            <div className="stat-label">Total Properties</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {estates.filter(e => e.status === 'available').length}
            </div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {estates.filter(e => e.status === 'sold').length}
            </div>
            <div className="stat-label">Sold</div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchMyEstates} className="btn btn-outline">
              Try Again
            </button>
          </div>
        )}

        {/* Estates List */}
        {!loading && !error && (
          <>
            {estates.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏠</div>
                <h3>No Properties Listed</h3>
                <p>Start by adding your first property to the platform.</p>
                <Link to="/add-estate" className="btn btn-primary">
                  Add Your First Property
                </Link>
              </div>
            ) : (
              <div className="estates-list">
                {estates.map((estate) => (
                  <div key={estate._id} className="estate-item">
                    <div className="estate-image">
                      {estate.image ? (
                        <img src={estate.image} alt={estate.name} />
                      ) : (
                        <div className="image-placeholder">
                          <span>🏠</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="estate-details">
                      <div className="estate-header">
                        <h3 className="estate-name">{estate.name}</h3>
                        <span className={`status-badge ${estate.status}`}>
                          {estate.status}
                        </span>
                      </div>
                      
                      <p className="estate-location">📍 {estate.location}</p>
                      <p className="estate-price">{formatPrice(estate.price)}</p>
                      <p className="estate-description">
                        {estate.description.length > 150 
                          ? `${estate.description.substring(0, 150)}...` 
                          : estate.description
                        }
                      </p>
                      
                      <div className="estate-actions">
                        <Link 
                          to={`/edit-estate/${estate._id}`} 
                          className="btn btn-outline btn-small"
                        >
                          Edit
                        </Link>
                        <button className="btn btn-danger btn-small">
                          Delete
                        </button>
                        {/* <button className="btn btn-secondary btn-small">
                          View Details
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyEstates;
