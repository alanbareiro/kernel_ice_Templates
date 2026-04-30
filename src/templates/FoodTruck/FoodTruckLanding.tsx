// src/templates/FoodTruck/FoodTruckLanding.tsx
import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import FoodTruckContact from './FoodTruckContact';
import FoodTruckFooter from './FoodTruckFooter';
import FoodTruckGallery from './FoodTruckGallery';
import FoodTruckHeader from './FoodTruckHeader';
import FoodTruckHero from './FoodTruckHero';
import FoodTruckLocation from './FoodTruckLocation';
import FoodTruckMenu from './FoodTruckMenu';
import FoodTruckSchedule from './FoodTruckSchedule';
import FoodTruckTestimonials from './FoodTruckTestimonials';

interface FoodTruckLandingProps {
    onHomeClick?: () => void;
}

const FoodTruckLanding: React.FC<FoodTruckLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <FoodTruckHeader />
            <main className="flex-grow">
                <FoodTruckHero />
                <FoodTruckMenu />
                <FoodTruckLocation />
                <FoodTruckSchedule />
                <FoodTruckGallery />
                <FoodTruckTestimonials />
                <FoodTruckContact />
            </main>
            <FoodTruckFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
    );
    {/* </TemplateEditorProvider>
        </TemplateProvider> */}
};

export default FoodTruckLanding;