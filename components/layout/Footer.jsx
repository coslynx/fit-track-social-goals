import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer Component
 *
 * A functional component for the main application footer, including a copyright notice.
 * The footer renders a copyright notice with the current year.
 *
 * @param {object} props - The component props.
 * @param {object} [props.style] - Optional inline styles for the footer.
 * @param {string} [props.className] - Optional CSS classes to apply to the footer.
 *
 * @returns {JSX.Element} The Footer component.
 *
 * @example
 * <Footer />
 */
const Footer = React.memo(({ style, className }) => {
  // Sanitize the class name to prevent XSS vulnerabilities.
    const sanitizedClassName = typeof className === 'string' ? className : '';
  const currentYear = new Date().getFullYear();
  return (
    <footer role="contentinfo" className={`text-gray-500 text-center p-4 ${sanitizedClassName}`} style={style}>
      <p>
        Copyright © {currentYear} Fitness Tracker. All rights reserved.
      </p>
    </footer>
  );
});

// Define PropTypes for type checking and documentation purposes.
Footer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

// Set default props for the component
Footer.defaultProps = {
    style: {},
    className: '',
};

export default Footer;