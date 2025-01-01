import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * A reusable modal component that displays content in an overlay.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {function} props.onClose - Function called to close the modal.
 * @param {React.ReactNode} props.children - The content to display in the modal.
 * @param {string} [props.className] - Optional CSS classes to apply to the modal overlay.
 *
 * @returns {JSX.Element | null} A modal element or null if not open.
 *
 * @example
 *  <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
 *      <p>This is the modal content.</p>
 *      <Button onClick={() => setModalOpen(false)}>Close</Button>
 *  </Modal>
 */
const Modal = React.memo(({ isOpen, onClose, children, className }) => {
    // Sanitize the class name to prevent XSS vulnerabilities.
    const sanitizedClassName = typeof className === 'string' ? className : '';

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ${sanitizedClassName}`}>
            <div className="bg-white p-6 rounded shadow-xl">
                <div className="flex justify-end">
                    <Button onClick={(event) => {
                       event.preventDefault();
                       onClose();
                    }} className="text-gray-500 hover:text-gray-700">
                        <span>&times;</span>
                    </Button>
                </div>
                {children}
            </div>
        </div>
    );
});


// Define PropTypes for type checking and documentation purposes.
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

// Set default props for the component
Modal.defaultProps = {
    className: '',
};


export default Modal;