
import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import CoffeeAbout from './CoffeeAbout';
import CoffeeContact from './CoffeeContact';
import CoffeeEvents from './CoffeeEvents';
import CoffeeFooter from './CoffeeFooter';
import CoffeeGallery from './CoffeeGallery';
import CoffeeHeader from './CoffeeHeader';
import CoffeeHero from './CoffeeHero';
import CoffeeMenu from './CoffeeMenu';
import CoffeeTestimonials from './CoffeeTestimonials';

interface CoffeeLandingProps {
    onHomeClick?: () => void;
}

const CoffeeLanding: React.FC<CoffeeLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <CoffeeHeader />
            <main className="flex-grow">
                <CoffeeHero />
                <CoffeeMenu />
                <CoffeeAbout />
                <CoffeeGallery />
                <CoffeeEvents />
                <CoffeeTestimonials />
                <CoffeeContact />
            </main>
            <CoffeeFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default CoffeeLanding;