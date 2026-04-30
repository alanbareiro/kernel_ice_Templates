import EditModeToggle from '../../components/Editor/EditModeToggle';
import EditorDashboard from '../../components/Editor/EditorDashboard';
// import { TemplateProvider } from '../../contexts/TemplateContext';
// import { TemplateEditorProvider } from '../../contexts/TemplateEditorContext';
import AccountingAbout from './AccountingAbout';
import AccountingContact from './AccountingContact';
import AccountingFeatures from './AccountingFeatures';
import AccountingHero from './AccountingHero';
import AccountingServices from './AccountingServices';
import AccountingTestimonials from './AccountingTestimonials';

interface AccountingLandingProps {
    onHomeClick?: () => void;
}

const AccountingLanding: React.FC<AccountingLandingProps> = ({ onHomeClick }) => {
    return (
        // <TemplateProvider>
        //     <TemplateEditorProvider>
        <div className="min-h-screen flex flex-col">
            {/* <AccountingHeader /> */}
            <main className="flex-grow">
                <AccountingHero />
                <AccountingFeatures />
                <AccountingAbout />
                <AccountingServices />
                <AccountingTestimonials />
                <AccountingContact />
            </main>
            {/* <AccountingFooter /> */}
            <EditorDashboard onHomeClick={onHomeClick} />
            <EditModeToggle />
        </div>
        //     </TemplateEditorProvider>
        // </TemplateProvider>
    );
};

export default AccountingLanding;