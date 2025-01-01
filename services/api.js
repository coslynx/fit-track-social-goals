import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = process.env.NODE_ENV === 'production'
  ? window.location.origin
  : process.env.CLIENT_URL ? process.env.CLIENT_URL : 'http://localhost:5000';

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the configured axios instance as the default export
export default api;


/*
    Example of handling response errors using the .catch block:
    api.get('/some-endpoint')
        .then(response => {
            // Handle success
            console.log(response.data);
        })
        .catch(error => {
            // Log the error for debugging
            console.error("API Request Error:", error);

            // Redirect user to error page or show a generic error message
            // window.location.href = "/error";
            // alert("An error occurred, please try again later.");

            //Check for specific error types
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
        });

    Note:
    1. This is only an example, you should use try/catch blocks inside of each component that calls this api.js to catch errors, and not just at the api call level.
    2. The error handling logic should be customized based on specific API endpoint requirements.
*/

/*
    Security Note:
    1. It is crucial to sanitize user inputs before sending API requests.
    2. Ensure that any data received from API responses is properly sanitized before rendering to avoid XSS attacks.
    3. Authentication tokens should be added via 'Authorization' header in the component logic that uses this api.js, not directly in this file using interceptors.
*/


/*
    Testing Note:
    This module can be tested manually by making an API call in any component like this:
        import api from '../services/api';
        const fetchData = async () => {
            try{
                const response = await api.get('/goals');
                console.log(response);
            } catch(error){
                console.error(error);
            }
        };
        fetchData();
    And check the request headers, URL, and the response in the browser's network tab and console.
*/