import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import { TemplateProvider } from '../../contexts/TemplateContext';
import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import LawFirmAbout from './LawFirmAbout';
import LawFirmAttorneys from './LawFirmAttorneys';
import LawFirmContact from './LawFirmContact';
import LawFirmFeatures from './LawFirmFeatures';
import LawFirmFooter from './LawFirmFooter';
import LawFirmHeader from './LawFirmHeader';
import LawFirmHero from './LawFirmHero';
import LawFirmPracticeAreas from './LawFirmPracticeAreas';
import LawFirmTestimonials from './LawFirmTestimonials';

interface LawFirmLandingProps {
    onHomeClick?: () => void;
}

const LawFirmLanding: React.FC<LawFirmLandingProps> = ({ onHomeClick }) => {
    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <div className="min-h-screen flex flex-col">
                    <LawFirmHeader />
                    <main className="flex-grow">
                        <LawFirmHero />
                        <LawFirmFeatures />
                        <LawFirmAbout />
                        <LawFirmPracticeAreas />
                        <LawFirmAttorneys />
                        <LawFirmTestimonials />
                        <LawFirmContact />
                    </main>
                    <LawFirmFooter />
                    <EditorDashboard onHomeClick={onHomeClick} />
                    <EditModeToggle />
                </div>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};

export default LawFirmLanding;