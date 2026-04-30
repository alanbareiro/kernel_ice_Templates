import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import GymClasses from './GymClasses';
import GymContact from './GymContact';
import GymFacilities from './GymFacilities';
import GymFooter from './GymFooter';
import GymHeader from './GymHeader';
import GymHero from './GymHero';
import GymPricing from './GymPricing';
import GymSchedule from './GymSchedule';
import GymTestimonials from './GymTestimonials';
import GymTrainers from './GymTrainers';

interface GymLandingProps {
    onHomeClick?: () => void;
}

const GymLanding: React.FC<GymLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <GymHeader />
            <main className="flex-grow">
                <GymHero />
                <GymClasses />
                <GymPricing />
                <GymTrainers />
                <GymFacilities />
                <GymSchedule />
                <GymTestimonials />
                <GymContact />
            </main>
            <GymFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default GymLanding;