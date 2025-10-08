import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import './Estates.css';
import { useNavigate } from 'react-router-dom';
const Estates = () => {
  const navigate = useNavigate(); 
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { isBuyer } = useAuth();

  useEffect(() => {
    if (!isBuyer) {
      setError('You need to be logged in as a buyer to view estates');
      setLoading(false);
      return;
    }
    fetchEstates();
  }, [isBuyer]);

  const fetchEstates = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllEstates();
      setEstates(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch estates');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchEstates();
      return;
    }

    try {
      setLoading(true);
      const data = await apiService.searchEstates(searchQuery);
      setEstates(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Search failed');
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

  if (!isBuyer) {
    return (
      <div className="estates-page">
        <div className="container">
          <div className="error-state">
            <h2>Access Denied</h2>
            <p>You need to be logged in as a buyer to view estates.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="estates-page">
      <div className="container">
        <div className="estates-header">
          <h1>Browse Properties</h1>
          <p>Discover your perfect property from our curated selection</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search by name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                🔍 Search
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchEstates} className="btn btn-outline">
              Try Again
            </button>
          </div>
        )}

        {/* Estates Grid */}
        {!loading && !error && (
          <>
            <div className="estates-count">
              <p>{estates.length} properties found</p>
            </div>
            
            {estates.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏠</div>
                <h3>No Properties Found</h3>
                <p>Try adjusting your search criteria or check back later for new listings.</p>
              </div>
            ) : (
              <div className="estates-grid">
                {estates.map((estate) => (
                  <div key={estate._id} className="estate-card">
                    <div className="estate-image">
                      {estate.image ? (
                        <img src={estate.image} alt={estate.name} />
                      ) : (
                        <div className="image-placeholder">
                          <span>🏠</span>
                        </div>
                      )}
                      <div className="estate-status">
                        <span className={`status-badge ${estate.status}`}>
                          {estate.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="estate-content">
                      <h3 className="estate-name">{estate.name}</h3>
                      <p className="estate-location">📍 {estate.location}</p>
                      <p className="estate-price">{formatPrice(estate.price)}</p>
                      <p className="estate-description">
                        {estate.description.length > 100 
                          ? `${estate.description.substring(0, 100)}...` 
                          : estate.description
                        }
                      </p>
                      
                      <div className="estate-actions">
                      <button
    className="btn btn-primary btn-small"
    onClick={() => navigate(`/estate/${estate._id}`)}
  >
    View Details
  </button>
                        <button className="btn btn-outline btn-small"
                          onClick={() => alert("Can't contact now")}
                        >
                          Contact Seller
                        </button>
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

export default Estates;
