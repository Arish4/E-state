import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './EstateDetails.css';

const EstateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEstate = async () => {
      try {
        setLoading(true);
        const allEstates = await apiService.getAllEstates();
        const foundEstate = allEstates.find((e) => e._id === id);
        if (!foundEstate) {
          setError('Property not found');
        } else {
          setEstate(foundEstate);
        }
      } catch (err) {
        setError(err.message || 'Failed to load property');
      } finally {
        setLoading(false);
      }
    };
    fetchEstate();
  }, [id]);

  if (loading) {
    return (
      <div className="estates-page">
        <div className="container">
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estates-page">
        <div className="container error-state">
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="btn btn-outline">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="estates-page">
      <div className="container">
        <div className="estate-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Full Image */}
          <div className="estate-image" style={{ height: '500px' }}>
            {estate.image ? (
              <img src={estate.image} alt={estate.name} style={{ objectFit: 'cover' }} />
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

          {/* Estate Details */}
          <div className="estate-content">
            <h3 className="estate-name">{estate.name}</h3>
            <p className="estate-location">📍 {estate.location}</p>
            <p className="estate-price">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(estate.price)}
            </p>
            <p className="estate-description">{estate.description}</p>
            <div className="estate-actions">
              <button className="btn btn-outline" onClick={() => navigate(-1)}>
                Back
              </button>
              <button className="btn btn-primary"
                onClick={() => alert("Can't contact now")}
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateDetails;
