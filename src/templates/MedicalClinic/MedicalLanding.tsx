import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import MedicalAbout from './MedicalAbout';
import MedicalContact from './MedicalContact';
import MedicalDoctors from './MedicalDoctors';
import MedicalHero from './MedicalHero';
import MedicalServices from './MedicalServices';
import MedicalTestimonials from './MedicalTestimonials';

interface MedicalLandingProps {
    onHomeClick?: () => void;
}

const MedicalLanding: React.FC<MedicalLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            {/* <MedicalHeader /> */}
            <main className="flex-grow">
                <MedicalHero />
                <MedicalServices />
                <MedicalAbout />
                <MedicalDoctors />
                <MedicalTestimonials />
                <MedicalContact />
            </main>
            {/* <MedicalFooter /> */}
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default MedicalLanding;