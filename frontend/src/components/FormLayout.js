import React from 'react';
import PageHeader from './PageHeader';
import ContentCard from './ContentCard';

/**
 * FormLayout - Reusable standardized form container for Admin Panel.
 * Implements the 10,000% polished enterprise SaaS design system.
 */
const FormLayout = ({
    title,
    subtitle,
    headerActions = [],
    children,
    maxWidth = "max-w-4xl"
}) => {
    return (
        <div className={`${maxWidth} mx-auto px-6 py-8 w-full animate-fade-in`}>
            {/* Page Header */}
            <PageHeader
                title={title}
                subtitle={subtitle}
                actions={headerActions}
            />

            {/* Form Card */}
            <div className="mt-8">
                <ContentCard className="p-8 space-y-8">
                    {children}
                </ContentCard>
            </div>
        </div>
    );
};

export default FormLayout;
