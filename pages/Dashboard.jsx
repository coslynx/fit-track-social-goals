import React, { useEffect, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import GoalCard from '../components/goals/GoalCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { sanitizeInput } from '../utils/helpers';

/**
 * Dashboard Component
 *
 * The main dashboard page for authenticated users.
 * It displays a list of the user's fitness goals.
 * Utilizes useAuth for user authentication and useFetch for API calls.
 * Handles loading, error, and delete operations gracefully.
 *
 * @returns {JSX.Element} The Dashboard component.
 *
 * @example
 * <Dashboard />
 */
const Dashboard = React.memo(() => {
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


    // Fetch goals when the component mounts and when the user changes
    useEffect(() => {
      if(user){
        fetchData('/api/goals');
      }
    }, [fetchData, user]);

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
                        Welcome {user ? user.username : 'Guest'}, here are your goals:
                    </h1>
                    {isLoading && <p className="text-center">Loading goals...</p>}
                    {error && (
                        <p className="text-center text-red-500">
                            Error: {error}
                        </p>
                    )}
                    {sanitizedGoals && sanitizedGoals.length > 0 ? (
                        sanitizedGoals.map((goal) => (
                            <GoalCard
                                key={goal._id}
                                goal={goal}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        !isLoading && !error &&  <p className="text-center">No goals found. Create one to get started!</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
});

export default Dashboard;