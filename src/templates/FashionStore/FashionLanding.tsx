import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import FashionAbout from './FashionAbout';
import FashionCollections from './FashionCollections';
import FashionContact from './FashionContact';
import FashionHero from './FashionHero';
import FashionLookbook from './FashionLookbook';
import FashionProducts from './FashionProducts';
import FashionTestimonials from './FashionTestimonials';

interface FashionLandingProps {
    onHomeClick?: () => void;
}

const FashionLanding: React.FC<FashionLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            {/* <FashionHeader /> */}
            <main className="flex-grow">
                <FashionHero />
                <FashionCollections />
                <FashionProducts />
                <FashionLookbook />
                <FashionAbout />
                <FashionTestimonials />
                <FashionContact />
            </main>
            {/* <FashionFooter /> */}
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default FashionLanding;