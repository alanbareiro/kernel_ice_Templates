import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
// import { TemplateProvider } from '../../contexts/TemplateContext';
// import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import ConsultingAbout from './ConsultingAbout';
import ConsultingContact from './ConsultingContact';
import ConsultingFeatures from './ConsultingFeatures';
import ConsultingFooter from './ConsultingFooter';
import ConsultingHeader from './ConsultingHeader';
import ConsultingHero from './ConsultingHero';
import ConsultingTestimonials from './ConsultingTestimonials';

// En ConsultingLanding.tsx
interface ConsultingLandingProps {
    onHomeClick?: () => void;
}

const ConsultingLanding: React.FC<ConsultingLandingProps> = ({ onHomeClick }) => {
    console.log('🏠 ConsultingLanding renderizado, onHomeClick:', onHomeClick);
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <ConsultingHeader />
            <main className="flex-grow">
                <ConsultingHero />
                <ConsultingFeatures />
                <ConsultingAbout />
                <ConsultingTestimonials />
                <ConsultingContact />
            </main>
            <ConsultingFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default ConsultingLanding;