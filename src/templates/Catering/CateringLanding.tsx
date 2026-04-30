import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
// import { TemplateProvider } from '../../contexts/TemplateContext';
// import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import CateringAbout from './CateringAbout';
import CateringContact from './CateringContact';
import CateringFeatures from './CateringFeatures';
import CateringGallery from './CateringGallery';
import CateringHero from './CateringHero';
import CateringMenu from './CateringMenu';
import CateringTestimonials from './CateringTestimonials';

// En ConsultingLanding.tsx
interface CateringLandingProps {
    onHomeClick?: () => void;
}

const CateringLanding: React.FC<CateringLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            {/* <CateringHeader /> */}
            <main className="flex-grow">
                <CateringHero />
                <CateringFeatures />
                <CateringAbout />
                <CateringMenu />
                <CateringGallery />
                <CateringTestimonials />
                <CateringContact />
            </main>
            {/* <CateringFooter /> */}
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default CateringLanding;