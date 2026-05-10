import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import CleaningAbout from './CleaningAbout';
import CleaningContact from './CleaningContact';
import CleaningHero from './CleaningHero';
import CleaningPricing from './CleaningPricing';
import CleaningProcess from './CleaningProcess';
import CleaningServices from './CleaningServices';
import CleaningTestimonials from './CleaningTestimonials';

interface CleaningLandingProps {
    onHomeClick?: () => void;
}

const CleaningLanding: React.FC<CleaningLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            {/* <CleaningHeader /> */}
            <main className="flex-grow">
                <CleaningHero />
                <CleaningServices />
                <CleaningPricing />
                <CleaningAbout />
                <CleaningProcess />
                <CleaningTestimonials />
                <CleaningContact />
            </main>
            {/* <CleaningFooter /> */}
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default CleaningLanding;