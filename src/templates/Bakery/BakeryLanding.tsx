import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import BakeryAbout from './BakeryAbout';
import BakeryContact from './BakeryContact';
import BakeryFooter from './BakeryFooter';
import BakeryGallery from './BakeryGallery';
import BakeryHeader from './BakeryHeader';
import BakeryHero from './BakeryHero';
import BakeryProducts from './BakeryProducts';
import BakeryTestimonials from './BakeryTestimonials';

interface BakeryLandingProps {
    onHomeClick?: () => void;
}

const BakeryLanding: React.FC<BakeryLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <BakeryHeader />
            <main className="flex-grow">
                <BakeryHero />
                <BakeryProducts />
                <BakeryAbout />
                <BakeryGallery />
                <BakeryTestimonials />
                <BakeryContact />
            </main>
            <BakeryFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default BakeryLanding;