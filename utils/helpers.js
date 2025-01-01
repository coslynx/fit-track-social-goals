import crypto from 'crypto';

/**
 * Formats a date string or Date object into "YYYY-MM-DD" format.
 * Handles invalid input gracefully by returning null.
 * Sanitizes input string using trim()
 * @param {Date | string} date - The date to format.
 * @returns {string | null} The formatted date string or null if invalid input.
 * 
 * Test cases:
 * //Test formatDate('2024-07-20');
 * //Test formatDate(new Date());
 * //Test formatDate(null);
 * //Test formatDate('  2024-07-20  ');
 * //Test formatDate(12345);
 * //Test formatDate('2024/07/20')
 */
const formatDate = (date) => {
  try {
    if (date == null) {
      return null;
    }
    let dateObj;
    if (typeof date === 'string') {
      const trimmedDate = date.trim();
      dateObj = new Date(trimmedDate);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
        return null;
    }
    
    if (isNaN(dateObj.getTime())) {
      return null;
    }


    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error in formatDate:", error);
    return null;
  }
};


/**
 * Generates a unique random ID of 16 alphanumeric characters.
 * @returns {string} The generated random ID.
 * @throws {Error} If the random ID cannot be generated.
 * 
 * Test cases:
 * // Test generateRandomId();
 */
const generateRandomId = () => {
    try {
      const randomBytes = crypto.randomBytes(8);
      const randomId = randomBytes.toString('hex');
    
        if (randomId.length !== 16) {
          throw new Error('Failed to generate a valid random id');
      }

        return randomId;
    } catch (error) {
        console.error('Error generating random ID:', error);
        const err = new Error('Failed to generate random ID');
        err.code = 'ERR_RANDOM_ID';
        throw err;
    }
};



export { formatDate, generateRandomId };