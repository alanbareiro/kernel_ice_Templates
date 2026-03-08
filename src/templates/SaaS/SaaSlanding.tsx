import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import { TemplateProvider } from '../../contexts/TemplateContext';
import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import SAASContact from './SAASContact';
import SaaSFAQ from './SaaSFAQ';
import SaaSFeatures from './SaaSFeatures';
import SaaSFooter from './SaaSFooter';
import SaaSHeader from './SaaSHeader';
import SaaSHero from './SaaSHero';
import SaaSHowItWorks from './SaaSHowItWorks';
import SAASPricing from './SAASPricing';

interface SaaSlandingProps {
    onHomeClick?: () => void;
}

const SaaSlanding: React.FC<SaaSlandingProps> = ({ onHomeClick }) => {
    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <div className="min-h-screen flex flex-col">
                    <SaaSHeader />
                    <main className="flex-grow">
                        <SaaSHero />
                        <SaaSFeatures />
                        <SaaSHowItWorks />
                        <SAASPricing />
                        <SaaSFAQ />
                        <SAASContact />
                    </main>
                    <SaaSFooter />
                    <EditorDashboard onHomeClick={onHomeClick} />
                    <EditModeToggle />
                </div>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};

export default SaaSlanding;