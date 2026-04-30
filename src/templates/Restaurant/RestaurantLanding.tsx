// src/templates/Restaurant/RestaurantLanding.tsx
import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import RestaurantAbout from './RestaurantAbout';
import RestaurantChef from './RestaurantChef';
import RestaurantContact from './RestaurantContact';
import RestaurantFooter from './RestaurantFooter';
import RestaurantGallery from './RestaurantGallery';
import RestaurantHeader from './RestaurantHeader';
import RestaurantHero from './RestaurantHero';
import RestaurantMenu from './RestaurantMenu';
import RestaurantReservations from './RestaurantReservations';
import RestaurantSpecialties from './RestaurantSpecialties';
import RestaurantTestimonials from './RestaurantTestimonials';

interface RestaurantLandingProps {
    onHomeClick?: () => void;
}

const RestaurantLanding: React.FC<RestaurantLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            <RestaurantHeader />
            <main className="flex-grow">
                <RestaurantHero />
                <RestaurantSpecialties />
                <RestaurantMenu />
                <RestaurantAbout />
                <RestaurantChef />
                <RestaurantGallery />
                <RestaurantTestimonials />
                <RestaurantReservations />
                <RestaurantContact />
            </main>
            <RestaurantFooter />
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
    );
    {/* </TemplateEditorProvider>
        </TemplateProvider> */}
};

export default RestaurantLanding;