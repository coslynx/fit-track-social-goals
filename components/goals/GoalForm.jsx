import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';
import Input from '../common/Input';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { generateRandomId, sanitizeInput } from '../../utils/helpers';


/**
 * GoalForm Component
 *
 * A functional component for creating and updating fitness goals.
 * It utilizes the `useFetch` hook for API requests,
 * `Input` component for form fields, `Button` for actions and `Modal` for displaying the form.
 *
 * The component manages form state for name, target, and unit. Handles loading and
 * error states returned from useFetch and provides user-friendly feedback.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {function} props.onClose - Function called to close the modal.
 * @param {object} [props.goal] - The goal object for editing.
 *
 * @returns {JSX.Element} The GoalForm component.
 *
 * @example
 * <GoalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} goal={goal} />
 */
const GoalForm = React.memo(({ isOpen, onClose, goal }) => {
  // Generate a unique id if one is not provided
  const formId = goal?._id || generateRandomId();

  // Initialize state variables for goal properties.
  const [name, setName] = useState(goal?.name || '');
  const [target, setTarget] = useState(goal?.target || 0);
  const [unit, setUnit] = useState(goal?.unit || '');

    // Use the useFetch hook for API calls
  const { isLoading, error, fetchData } = useFetch();



  // Define function to handle input changes for all input fields
    const handleInputChange = useCallback((value, event) => {
        const sanitizedValue = sanitizeInput(value);
      const { id } = event.target;
    switch (id) {
      case `name-${formId}`:
        setName(sanitizedValue);
        break;
      case `target-${formId}`:
          // Ensure the target is a number
          const numValue = Number(sanitizedValue);
        setTarget(isNaN(numValue) ? 0 : numValue);
        break;
      case `unit-${formId}`:
        setUnit(sanitizedValue);
        break;
      default:
        break;
    }
  }, [formId]);


    // Function to handle form submission
  const handleSubmit = useCallback(
      async (event) => {
          event.preventDefault();

          // Validate required fields
          if (!name || name.trim() === '' ||
              target === undefined || target === null ||
              unit === undefined || unit === null || unit.trim() === '') {
              console.error("Form Validation Failed: All fields are required");
              return;
          }

          const trimmedName = name.trim();
          const trimmedUnit = unit.trim();


          const goalData = {
              name: trimmedName,
              target: Number(target),
              unit: trimmedUnit,
          };

          try {
              if(goal?._id){
                  await fetchData(`/api/goals/${goal._id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(goalData),
                  });
              } else {
                  await fetchData('/api/goals', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(goalData),
                  });
              }

              onClose();
          } catch(err) {
              console.error("Error creating/updating goal:", err);
          }


      },
      [name, target, unit, fetchData, onClose, goal]
  );


    // Reset form when modal is closed
  useEffect(() => {
      if (!isOpen) {
          setName(goal?.name || '');
          setTarget(goal?.target || 0);
          setUnit(goal?.unit || '');
      }
  }, [isOpen, goal]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {goal ? 'Edit Goal' : 'Create Goal'}
        </h2>
        <Input
          type="text"
          placeholder="Enter goal name"
          value={name}
          onChange={handleInputChange}
          label="Name"
          id={`name-${formId}`}
          required
        />
        <Input
          type="number"
          placeholder="Enter target value"
          value={target}
          onChange={handleInputChange}
          label="Target"
          id={`target-${formId}`}
          required
        />
         <Input
          type="text"
          placeholder="Enter unit of measurement"
          value={unit}
          onChange={handleInputChange}
          label="Unit"
          id={`unit-${formId}`}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : goal ? 'Update Goal' : 'Create Goal'}
        </Button>
      </form>
    </Modal>
  );
});

// Define PropTypes for type checking and documentation purposes.
GoalForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    goal: PropTypes.shape({
        name: PropTypes.string.isRequired,
        target: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        _id: PropTypes.string,
    }),
};

// Set default props for the component
GoalForm.defaultProps = {
    goal: null,
};


export default GoalForm;