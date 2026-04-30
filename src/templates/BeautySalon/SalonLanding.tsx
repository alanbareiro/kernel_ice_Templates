import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import SalonAbout from './SalonAbout';
import SalonContact from './SalonContact';
import SalonFooter from './SalonFooter';
import SalonGallery from './SalonGallery';
import SalonHeader from './SalonHeader';
import SalonHero from './SalonHero';
import SalonPricing from './SalonPricing';
import SalonServices from './SalonServices';
import SalonTeam from './SalonTeam';
import SalonTestimonials from './SalonTestimonials';

interface SalonLandingProps {
    onHomeClick?: () => void;
}

const SalonLanding: React.FC<SalonLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <SalonHeader />
            <main className="flex-grow">
                <SalonHero />
                <SalonServices />
                <SalonPricing />
                <SalonAbout />
                <SalonGallery />
                <SalonTeam />
                <SalonTestimonials />
                <SalonContact />
            </main>
            <SalonFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default SalonLanding;