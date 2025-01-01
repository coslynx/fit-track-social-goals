import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { sanitizeInput } from '../../utils/helpers';

/**
 * GoalCard Component
 *
 * A functional component for displaying a single fitness goal.
 * It receives a goal object as a prop and renders goal details.
 *
 * The component displays the goal's name, target, and unit, and provides a delete button.
 * It handles cases where goal is null or does not match expected structure gracefully by not rendering anything.
 *
 * @param {object} props - The component props.
 * @param {object} props.goal - The goal object to display.
 * @param {function} props.onDelete - A function to handle delete button clicks.
 *
 * @returns {JSX.Element | null} The GoalCard component or null if goal is invalid.
 *
 * @example
 * <GoalCard
 *   goal={{ name: 'Run 5k', target: 5, unit: 'km', _id: '123' }}
 *   onDelete={(id) => console.log('Delete goal with id:', id)}
 * />
 */
const GoalCard = React.memo(({ goal, onDelete }) => {
  // Check if goal is valid and has the required structure
  if (!goal || typeof goal !== 'object' || !goal.name || !goal.target || !goal.unit || !goal._id) {
    return null;
  }

  const sanitizedGoalName = sanitizeInput(goal.name);
  const sanitizedGoalTarget = sanitizeInput(String(goal.target));
  const sanitizedGoalUnit = sanitizeInput(goal.unit);


  // Function to handle delete button clicks
  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(goal._id);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{sanitizedGoalName}</h3>
      <p className="text-gray-700 mb-1">
        Target: {sanitizedGoalTarget}
      </p>
      <p className="text-gray-500 text-sm">
        Unit: {sanitizedGoalUnit}
      </p>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
});


// Define PropTypes for type checking and documentation purposes.
GoalCard.propTypes = {
  goal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    target: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
    onDelete: PropTypes.func,
};

// Set default props for the component
GoalCard.defaultProps = {
    onDelete: () => {},
};

export default GoalCard;