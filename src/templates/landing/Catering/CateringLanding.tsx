import EditModeToggle from '../../../components/Editor/EditModeToggle';
import EditorDashboard from '../../../components/Editor/EditorDashboard';
import CateringAbout from './CateringAbout';
import CateringContact from './CateringContact';
import CateringFeatures from './CateringFeatures';
import CateringFooter from './CateringFooter';
import CateringGallery from './CateringGallery';
import CateringHeader from './CateringHeader';
import CateringHero from './CateringHero';
import CateringMenu from './CateringMenu';
import CateringTestimonials from './CateringTestimonials';

interface CateringLandingProps {
    onHomeClick?: () => void;
}

const CateringLanding: React.FC<CateringLandingProps> = ({ onHomeClick }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <CateringHeader />
            <main className="flex-grow">
                <CateringHero />
                <CateringFeatures />
                <CateringAbout />
                <CateringMenu />
                <CateringGallery />
                <CateringTestimonials />
                <CateringContact />
            </main>
            <CateringFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
    );
};

export default CateringLanding;