import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Custom React hook for making API requests.
 *
 * @returns {object} An object containing:
 *   - data: The fetched data, initially null.
 *   - isLoading: Boolean indicating if the request is in progress.
 *   - error: An error message if the request fails, initially null.
 *   - fetchData: An async function to trigger the API request.
 *
 * Example of how to use the hook in a react component:
 *
 * const MyComponent = () => {
 *  const { data, isLoading, error, fetchData } = useFetch();
 *
 *  useEffect(() => {
 *      fetchData('/goals');
 *  }, [fetchData]);
 *
 *    if (isLoading) {
 *      return <p>Loading...</p>;
 *    }
 *
 *    if (error) {
 *       return <p>Error: {error}</p>;
 *    }
 *
 *    return (
 *      // Render your data here
 *      <div>
 *        {data && data.map(item => (<div key={item._id}>{item.name}</div>))}
 *      </div>
 *    )
 * };
 */
const useFetch = () => {
    // Initialize state variables for data, loading status, and error
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Asynchronously fetches data from the specified API endpoint.
     *
     * @param {string} url The API endpoint URL to fetch data from.
     * @throws {Error} If the API call fails, an error is thrown.
     */
    const fetchData = async (url) => {
        // Validate if url is a string and not empty
        if (!url || typeof url !== 'string' || url.trim() === '') {
            console.error("Invalid URL provided to useFetch:", url);
            setError('Invalid URL provided');
            return;
        }

        setIsLoading(true); // Set loading state to true before making the request
        setError(null); // Reset error state before making the request

        try {
            // Make the GET request to the provided URL using the axios api instance
            const response = await api.get(url);

            // Ensure the response data is not null and is a JavaScript object
            if (!response || !response.data || typeof response.data !== 'object') {
                console.error('Invalid data returned from API:', response);
                throw new Error('Failed to fetch data, invalid response');
            }
          
            if (response.status >= 400 && response.status < 600) {
               console.error('API request failed with status code:', response.status, response.data);
                throw new Error(response.data.message || 'Failed to fetch data with server error.');
            }


             // If the request is successful, update the data state
            setData(response.data);
        } catch (err) {
            // Log error to the console for debugging purposes
            console.error('API request error:', err);

            // Set error message based on the type of error
            if (err.response) {
                // Error from the server (e.g. 404, 500)
                setError(err.response.data.message || 'Failed to fetch data with server error.');
            }
            else {
                // Network error or other client-side errors
                setError(err.message || 'Failed to fetch data');
            }

        } finally {
            // Set loading to false regardless of request outcome
            setIsLoading(false);
        }
    };


    // Return the data, loading state, error, and the fetchData function
    return { data, isLoading, error, fetchData };
};


export default useFetch;