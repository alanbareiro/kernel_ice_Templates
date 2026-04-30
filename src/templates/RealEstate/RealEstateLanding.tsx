import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import RealEstateAbout from './RealEstateAbout';
import RealEstateAgents from './RealEstateAgents';
import RealEstateContact from './RealEstateContact';
import RealEstateFooter from './RealEstateFooter';
import RealEstateHeader from './RealEstateHeader';
import RealEstateHero from './RealEstateHero';
import RealEstateProperties from './RealEstateProperties';
import RealEstateServices from './RealEstateServices';
import RealEstateTestimonials from './RealEstateTestimonials';

interface RealEstateLandingProps {
    onHomeClick?: () => void;
}

const RealEstateLanding: React.FC<RealEstateLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <RealEstateHeader />
            <main className="flex-grow">
                <RealEstateHero />
                <RealEstateProperties />
                <RealEstateServices />
                <RealEstateAbout />
                <RealEstateAgents />
                <RealEstateTestimonials />
                <RealEstateContact />
            </main>
            <RealEstateFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default RealEstateLanding;