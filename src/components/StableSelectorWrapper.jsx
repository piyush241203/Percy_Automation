import React from 'react';

/**
 * StableSelectorWrapper provides descriptive, stable test attributes and helps
 * isolate dynamic visual changes or trigger simulated regression changes.
 */
export default function StableSelectorWrapper({
  testId,
  children,
  className = '',
  ignoreInPercy = false,
  as: Component = 'div',
  ...props
}) {
  // Check if we should inject dynamic regression testing classes
  const urlParams = new URLSearchParams(window.location.search);
  const regressionType = urlParams.get('regression');

  let regressionStyle = '';

  if (regressionType) {
    if (regressionType === 'font_change' && testId === 'app-body') {
      regressionStyle = ' font-mono tracking-widest text-yellow-500 ';
    }
    if (regressionType === 'color_change' && testId?.includes('button-primary')) {
      regressionStyle = ' !bg-red-600 hover:!bg-red-800 !text-white border-2 border-yellow-300 ';
    }
    if (regressionType === 'layout_break' && testId === 'dashboard-grid') {
      regressionStyle = ' !grid-cols-1 md:!grid-cols-1 lg:!grid-cols-1 gap-20 '; // Force standard grid elements into single column with huge gaps
    }
    if (regressionType === 'button_shift' && testId?.includes('checkout-submit')) {
      regressionStyle = ' translate-x-24 -translate-y-8 shadow-xl rotate-3 '; // Disruptive offset
    }
    if (regressionType === 'missing_image' && testId === 'hero-avatar') {
      regressionStyle = ' opacity-0 '; // Hide images entirely
    }
    if (regressionType === 'broken_responsive' && testId === 'navbar-menu') {
      regressionStyle = ' !hidden '; // Completely breaks responsiveness (hides navigation menu on all widths)
    }
  }

  // Percy can ignore marked nodes via global CSS/attributes or Percy configuration
  const percyIgnoreAttr = ignoreInPercy ? { 'data-percy-ignore': 'true' } : {};

  return (
    <Component
      data-testid={testId}
      className={`${className} ${regressionStyle}`}
      {...percyIgnoreAttr}
      {...props}
    >
      {children}
    </Component>
  );
}
