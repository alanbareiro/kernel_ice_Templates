import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import { TemplateProvider } from '../../contexts/TemplateContext';
import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import DigitalAbout from './DigitalAbout';
import DigitalContact from './DigitalContact';
import DigitalFooter from './DigitalFooter';
import DigitalHeader from './DigitalHeader';
import DigitalHero from './DigitalHero';
import DigitalPortfolio from './DigitalPortfolio';
import DigitalServices from './DigitalServices';
import DigitalTestimonials from './DigitalTestimonials';


interface DigitalLandingProps {
    onHomeClick?: () => void;
}

const DigitalLanding: React.FC<DigitalLandingProps> = ({ onHomeClick }) => {
    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <div className="min-h-screen flex flex-col">
                    <DigitalHeader />
                    <main className="flex-grow">
                        <DigitalHero />
                        <DigitalServices />
                        <DigitalPortfolio />
                        <DigitalAbout />
                        <DigitalTestimonials />
                        <DigitalContact />
                    </main>
                    <DigitalFooter />
                    <EditorDashboard onHomeClick={onHomeClick} />
                    <EditModeToggle />
                </div>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};

export default DigitalLanding;