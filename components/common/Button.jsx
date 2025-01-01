import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable button component with customizable text, styles, and click handling.
 *
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The content to render inside the button.
 * @param {function} [props.onClick] - An optional function to handle click events.
 * @param {object} [props.style] - Optional inline styles to apply to the button.
 * @param {string} [props.className] - Optional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} A button element.
 *
 * @example
 * // Usage example with different configurations:
 * <Button onClick={() => alert('Button clicked')} style={{ backgroundColor: 'blue', color: 'white' }}>
 *   Click Me
 * </Button>
 * <Button className="custom-button" style={{ color: 'red' }}>
 *   Custom Styled Button
 * </Button>
 * <Button>
 *  Default Button
 * </Button>
 */
const Button = React.memo(({ children, onClick, style, className }) => {
    // Sanitize the class name to prevent XSS vulnerabilities.
    const sanitizedClassName = typeof className === 'string' ? className : '';

    // Function to handle click events and prevent default behavior.
    const handleClick = (event) => {
      if (onClick) {
        event.preventDefault();
        onClick(event);
      }
    };


  return (
      <button
          role="button"
          tabIndex="0"
          onClick={handleClick}
          style={style}
          className={sanitizedClassName}
      >
        {children}
      </button>
  );
});

// Define PropTypes for type checking and documentation purposes.
Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
};

// Set default props for the component
Button.defaultProps = {
    onClick: undefined,
    style: {},
    className: '',
};


export default Button;