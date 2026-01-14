import React, { useState, useEffect } from 'react';

const SokoniModal = ({ isOpen, onClose, shops }) => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleShopSelect = async (shop) => {
    setSelectedShop(shop);
    setIsLoading(true);
    
    // Redirect to the marketplace with the shop parameter
    // Using shop_id as the parameter for the external site
    const marketplaceUrl = `https://tenearwhatsappcheckins.pages.dev?shop_id=${shop.id}`;
    
    // Open in a new tab
    window.open(marketplaceUrl, '_blank');
    
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>
              🏪 Sokoni
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#64748b' }}>
              Select a shop to visit
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#64748b',
              padding: '4px',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        {/* Shop List */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px'
        }}>
          {isLoading && selectedShop ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              color: '#64748b'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #e5e7eb',
                borderTopColor: '#0891B2',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '16px'
              }} />
              <p>Opening {selectedShop.name}...</p>
            </div>
          ) : shops && shops.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {shops.map((shop) => (
                <button
                  key={shop.id}
                  onClick={() => handleShopSelect(shop)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    background: '#f8fafc',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.borderColor = '#0891B2';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    🏪
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0,
                      fontWeight: 600,
                      color: '#1e293b',
                      fontSize: '1rem'
                    }}>
                      {shop.name}
                    </p>
                    {shop.description && (
                      <p style={{
                        margin: '4px 0 0',
                        fontSize: '0.75rem',
                        color: '#64748b',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {shop.description}
                      </p>
                    )}
                  </div>
                  <span style={{
                    color: '#0891B2',
                    fontSize: '1.25rem'
                  }}>
                    →
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              color: '#64748b',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏪</div>
              <p style={{ margin: 0 }}>No shops available at the moment.</p>
              <p style={{ margin: '8px 0 0', fontSize: '0.875rem' }}>Please check back later.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb',
          background: '#f8fafc'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            color: '#94a3b8',
            textAlign: 'center'
          }}>
            Swahili for "The Market Place"
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SokoniModal;
