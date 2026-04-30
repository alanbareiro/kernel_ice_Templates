import React from 'react';
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import StartupContact from './StartupContact';
import StartupFeatures from './StartupFeatures';
import StartupHero from './StartupHero';
import StartupProblem from './StartupProblem';
import StartupSolution from './StartupSolution';
import StartupTeam from './StartupTeam';

interface StartupLandingProps {
    onHomeClick?: () => void;
}

const StartupLanding: React.FC<StartupLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            {/* <StartupHeader /> */}
            <main className="flex-grow">
                <StartupHero />
                <StartupProblem />
                <StartupSolution />
                <StartupFeatures />
                <StartupTeam />
                <StartupContact />
            </main>
            {/* <StartupFooter />git n */}
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default StartupLanding;