import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

/**
 * Home Component
 *
 * A functional component that serves as the landing page for unauthenticated users.
 * It displays a welcome message and a brief description of the application.
 *
 * @returns {JSX.Element} The Home component.
 *
 * @example
 * <Home />
 */
const Home = React.memo(() => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Fitness Tracker</h1>
          <p className="text-gray-700 mb-6">
            Track your fitness goals and share your progress with friends. Register or login to get started!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
});

export default Home;