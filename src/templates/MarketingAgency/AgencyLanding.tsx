import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import { TemplateProvider } from '../../contexts/TemplateContext';
import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import AgencyAbout from './AgencyAbout';
import AgencyCaseStudies from './AgencyCaseStudies';
import AgencyContact from './AgencyContact';
import AgencyFooter from './AgencyFooter';
import AgencyHeader from './AgencyHeader';
import AgencyHero from './AgencyHero';
import AgencyServices from './AgencyServices';
import AgencyTeam from './AgencyTeam';
import AgencyTestimonials from './AgencyTestimonials';

interface AgencyLandingProps {
    onHomeClick?: () => void;
}

const AgencyLanding: React.FC<AgencyLandingProps> = ({ onHomeClick }) => {
    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <div className="min-h-screen flex flex-col">
                    <AgencyHeader />
                    <main className="flex-grow">
                        <AgencyHero />
                        <AgencyServices />
                        <AgencyCaseStudies />
                        <AgencyAbout />
                        <AgencyTeam />
                        <AgencyTestimonials />
                        <AgencyContact />
                    </main>
                    <AgencyFooter />
                    <EditorDashboard onHomeClick={onHomeClick} />
                    <EditModeToggle />
                </div>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};

export default AgencyLanding;