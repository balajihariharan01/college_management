import React from 'react';

/**
 * Global Dashboard Alignment Container
 * Enforces strict max-width, horizontal padding, layout spacing, 
 * and ensures it acts as a flexible content zone next to standard sidebars.
 */
const DashboardContainer = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto px-8 py-8 w-full animate-fade-in">
            {children}
        </div>
    );
};

export default DashboardContainer;
