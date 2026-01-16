import React from 'react';
import { useConfig } from '../context/ConfigContext';

/**
 * ThemeAware - Apply theme colors to components
 * 
 * Usage:
 * <ThemeAware
 *   style={{ backgroundColor: 'primary', color: 'text' }}
 *   className="custom-class"
 * >
 *   <div>Themed content</div>
 * </ThemeAware>
 */
export const ThemeAware = ({ 
  children, 
  style = {}, 
  className = '',
  as: Component = 'div' 
}) => {
  const { config } = useConfig();
  
  const getColor = (colorName) => {
    if (!config || !config.theme || !config.theme.colors) {
      return colorName;
    }
    const colors = config.theme.colors;
    
    const colorMap = {
      'primary': colors.primary,
      'secondary': colors.secondary,
      'background': colors.background,
      'text': colors.text,
      'success': colors.success,
      'warning': colors.warning,
      'error': colors.error
    };
    
    return colorMap[colorName] || colorName;
  };

  const processedStyle = {};
  
  Object.keys(style).forEach(key => {
    const value = style[key];
    if (typeof value === 'string' && colorMap[value]) {
      processedStyle[key] = colorMap[value];
    } else {
      processedStyle[key] = value;
    }
  });

  return (
    <Component className={className} style={processedStyle}>
      {children}
    </Component>
  );
};

/**
 * ThemedButton - A button with theme colors
 * 
 * Usage:
 * <ThemedButton variant="primary" onClick={handleClick}>
 *   Submit
 * </ThemedButton>
 */
export const ThemedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  style = {},
  className = ''
}) => {
  const { config } = useConfig();
  
  const colors = config?.theme?.colors || {
    primary: '#25D366',
    secondary: '#128C7E',
    text: '#333333'
  };
  
  const variants = {
    primary: {
      backgroundColor: colors.primary,
      color: '#ffffff',
      border: 'none'
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: '#ffffff',
      border: 'none'
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.text,
      border: 'none'
    }
  };
  
  const sizes = {
    small: { padding: '8px 16px', fontSize: '14px' },
    medium: { padding: '12px 24px', fontSize: '16px' },
    large: { padding: '16px 32px', fontSize: '18px' }
  };

  const buttonStyle = {
    ...variants[variant],
    ...sizes[size],
    borderRadius: config?.theme?.borderRadius === 'rounded-full' ? '9999px' : '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    fontWeight: '600',
    ...style
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

/**
 * ThemedCard - A card with theme colors
 * 
 * Usage:
 * <ThemedCard elevation={2}>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </ThemedCard>
 */
export const ThemedCard = ({ 
  children, 
  elevation = 1,
  style = {},
  className = ''
}) => {
  const { config } = useConfig();
  
  const colors = config?.theme?.colors || {
    background: '#ffffff',
    text: '#333333'
  };

  const shadows = {
    1: '0 2px 4px rgba(0,0,0,0.1)',
    2: '0 4px 8px rgba(0,0,0,0.15)',
    3: '0 8px 16px rgba(0,0,0,0.2)'
  };

  const cardStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: config?.theme?.borderRadius === 'rounded-full' ? '16px' : '12px',
    boxShadow: shadows[elevation] || shadows[1],
    padding: '16px',
    ...style
  };

  return (
    <div className={className} style={cardStyle}>
      {children}
    </div>
  );
};

/**
 * ThemedBadge - A badge with theme colors
 * 
 * Usage:
 * <ThemedBadge variant="success">Active</ThemedBadge>
 */
export const ThemedBadge = ({ 
  children, 
  variant = 'default',
  style = {},
  className = ''
}) => {
  const { config } = useConfig();
  
  const colors = config?.theme?.colors || {
    primary: '#25D366',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    text: '#333333',
    background: '#F5F5F5'
  };

  const variants = {
    default: { backgroundColor: colors.background, color: colors.text },
    primary: { backgroundColor: colors.primary, color: '#ffffff' },
    success: { backgroundColor: colors.success, color: '#ffffff' },
    warning: { backgroundColor: colors.warning, color: '#ffffff' },
    error: { backgroundColor: colors.error, color: '#ffffff' }
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '600',
    ...variants[variant],
    ...style
  };

  return (
    <span className={className} style={badgeStyle}>
      {children}
    </span>
  );
};

export default { ThemeAware, ThemedButton, ThemedCard, ThemedBadge };
