import React from 'react';
import { useConfig } from '../context/ConfigContext';

/**
 * FeatureGuard - Conditionally renders children based on feature flags
 * 
 * Usage:
 * <FeatureGuard feature="marketplace">
 *   <MarketplaceComponent />
 * </FeatureGuard>
 * 
 * Or with fallback:
 * <FeatureGuard feature="marketplace" fallback={<p>Marketplace is disabled</p>}>
 *   <MarketplaceComponent />
 * </FeatureGuard>
 */
const FeatureGuard = ({ 
  feature, 
  children, 
  fallback = null,
  invert = false
}) => {
  const { isFeatureEnabled } = useConfig();
  
  const enabled = isFeatureEnabled(feature);
  const shouldShow = invert ? !enabled : enabled;
  
  if (!shouldShow) {
    return fallback;
  }
  
  return children;
};

/**
 * FeatureSwitch - Renders one of multiple components based on feature state
 * 
 * Usage:
 * <FeatureSwitch
 *   whenEnabled={<MarketplaceView />}
 *   whenDisabled={<ComingSoonView message="Marketplace coming soon!" />}
 *   feature="marketplace"
 * />
 */
export const FeatureSwitch = ({ 
  feature, 
  whenEnabled, 
  whenDisabled = null 
}) => {
  const { isFeatureEnabled } = useConfig();
  
  if (isFeatureEnabled(feature)) {
    return whenEnabled;
  }
  
  return whenDisabled;
};

/**
 * ModuleGuard - Checks module-specific configuration
 * 
 * Usage:
 * <ModuleGuard module="marketplace" action="enableInquiries">
 *   <InquiryButton />
 * </ModuleGuard>
 */
export const ModuleGuard = ({ 
  module, 
  action, 
  children, 
  fallback = null 
}) => {
  const { config } = useConfig();
  
  if (!config || !config.modules || !config.modules[module]) {
    return fallback;
  }
  
  const moduleConfig = config.modules[module];
  const isEnabled = moduleConfig[action] === true;
  
  if (!isEnabled) {
    return fallback;
  }
  
  return children;
};

/**
 * RoleGuard - Checks if user has required role
 * 
 * Usage:
 * <RoleGuard allowedRoles={['admin', 'manager']}>
 *   <AdminPanel />
 * </RoleGuard>
 */
export const RoleGuard = ({ 
  allowedRoles = [], 
  children, 
  fallback = null 
}) => {
  const { config } = useConfig();
  
  // Get current user role from auth context (imported dynamically to avoid circular dependency)
  // For now, we'll use a simple check
  const currentRole = window.localStorage.getItem('user_role') || 'user';
  
  if (allowedRoles.length === 0) {
    return children;
  }
  
  if (!allowedRoles.includes(currentRole)) {
    return fallback;
  }
  
  return children;
};

export default FeatureGuard;
