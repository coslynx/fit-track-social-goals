import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { sanitizeInput, generateRandomId } from '../utils/helpers';

/**
 * Goals Component
 *
 * The main page for displaying and managing fitness goals for authenticated users.
 * It fetches, displays, creates, updates, and deletes fitness goals.
 * Utilizes useAuth for authentication, useFetch for API calls, GoalCard for rendering goals,
 * and GoalForm for modal functionality.
 *
 * @returns {JSX.Element} The Goals component.
 *
 * @example
 * <Goals />
 */
const Goals = React.memo(() => {
    // Get user and auth status from useAuth hook
    const { user } = useAuth();
    // Initialize fetch hook for goals
    const {
        data: goals,
        isLoading,
        error,
        fetchData,
    } = useFetch();
     // Initialize fetch hook for delete goals
    const {
        fetchData: deleteGoalRequest,
    } = useFetch();
    // Initialize state for modal visibility and goal editing
    const [modalOpen, setModalOpen] = useState(false);
    const [goalToEdit, setGoalToEdit] = useState(null);
    // Use navigate for redirecting users if not authenticated
     const navigate = useNavigate();

     // Generate a unique id for the component
     const componentId = generateRandomId();

    // Check for user authentication, redirect if not logged in
    useEffect(() => {
      if (!user) {
            navigate('/');
        }
    }, [user, navigate]);


     // Fetch goals when the component mounts and when the user changes
    useEffect(() => {
        if(user){
           fetchData('/api/goals');
        }
    }, [fetchData, user]);


    // Function to handle goal deletion
    const handleDelete = useCallback(
        async (goalId) => {
            try {
                // Send delete request to the API
                await deleteGoalRequest(`/api/goals/${goalId}`, {
                   method: 'DELETE',
                });
                // After delete fetch all goals again
                await fetchData('/api/goals');
            } catch (err) {
              console.error('Error deleting goal:', err);
            }
        },
        [fetchData, deleteGoalRequest]
    );


    // Function to handle goal creation/update modal open
    const handleOpenModal = useCallback((goal) => {
        setGoalToEdit(goal || null);
        setModalOpen(true);
    }, []);

    // Function to handle goal create/update modal close
    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setGoalToEdit(null);
    }, []);

    // Sanitize goals data before rendering
    const sanitizedGoals = goals && Array.isArray(goals)
    ? goals.map((goal) => ({
      ...goal,
      name: sanitizeInput(goal.name),
      target: sanitizeInput(String(goal.target)),
      unit: sanitizeInput(goal.unit),
    }))
    : null;


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Manage Your Goals
                    </h1>
                      <div className="mb-4 flex justify-end">
                         <button
                             onClick={() => handleOpenModal(null)}
                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Create Goal
                            </button>
                        </div>
                     {isLoading && <p className="text-center">Loading goals...</p>}
                    {error && (
                        <p className="text-center text-red-500">
                            Error: {error}
                        </p>
                    )}
                    {sanitizedGoals && sanitizedGoals.length > 0 ? (
                        sanitizedGoals.map((goal) => (
                          <div key={`${goal._id}-${componentId}`}>
                              <GoalCard
                                  goal={goal}
                                  onDelete={handleDelete}
                              />
                              <div className="flex justify-end mb-4">
                                  <button
                                       onClick={() => handleOpenModal(goal)}
                                      className="text-blue-500 hover:text-blue-700 font-bold text-sm"
                                  >
                                    Edit
                                  </button>
                             </div>
                          </div>
                       ))
                    ) : (
                       !isLoading && !error && <p className="text-center">No goals found. Create one to get started!</p>
                    )}

                    <GoalForm
                         isOpen={modalOpen}
                         onClose={handleCloseModal}
                         goal={goalToEdit}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
});

export default Goals;