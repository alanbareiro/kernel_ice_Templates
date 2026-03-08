import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import { TemplateProvider } from '../../contexts/TemplateContext';
import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import ArchitectureAbout from './ArchitectureAbout';
import ArchitectureContact from './ArchitectureContact';
import ArchitectureFooter from './ArchitectureFooter';
import ArchitectureHeader from './ArchitectureHeader';
import ArchitectureHero from './ArchitectureHero';
import ArchitectureProjects from './ArchitectureProjects';
import ArchitectureServices from './ArchitectureServices';
import ArchitectureTeam from './ArchitectureTeam';

interface ArchitectureLandingProps {
    onHomeClick?: () => void;
}

const ArchitectureLanding: React.FC<ArchitectureLandingProps> = ({ onHomeClick }) => {
    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <div className="min-h-screen flex flex-col">
                    <ArchitectureHeader />
                    <main className="flex-grow">
                        <ArchitectureHero />
                        <ArchitectureProjects />
                        <ArchitectureServices />
                        <ArchitectureAbout />
                        <ArchitectureTeam />
                        <ArchitectureContact />
                    </main>
                    <ArchitectureFooter />
                    <EditorDashboard onHomeClick={onHomeClick} />
                    <EditModeToggle />
                </div>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};

export default ArchitectureLanding;