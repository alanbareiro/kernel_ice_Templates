// src/templates/landing/Consulting/ConsultingLanding.tsx
import { useLayoutEffect, useRef } from 'react';
import EditorDashboard from '../../../components/Editor/EditorDashboard';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultTypography } from '../../../types/template.types';
import ConsultingAbout from './ConsultingAbout';
import ConsultingContact from './ConsultingContact';
import ConsultingFeatures from './ConsultingFeatures';
import ConsultingFooter from './ConsultingFooter';
import ConsultingHeader from './ConsultingHeader';
import ConsultingHero from './ConsultingHero';
import ConsultingTestimonials from './ConsultingTestimonials';

interface ConsultingLandingProps {
    onHomeClick?: () => void;
    isPreview?: boolean;
}

const ConsultingLanding: React.FC<ConsultingLandingProps> = ({ onHomeClick, isPreview = false }) => {
    const { template } = useTemplate();
    const typography = template?.typography || defaultTypography;
    const rootRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (rootRef.current) {
            rootRef.current.style.setProperty('--font-heading', typography.headingFont);
            rootRef.current.style.setProperty('--font-body', typography.bodyFont);
        }
    }, [typography]);

    return (
        <div className="min-h-screen flex">
            {/* Solo mostrar el dashboard si NO es preview */}
            {!isPreview && <EditorDashboard onHomeClick={onHomeClick} />}
            <div
                ref={rootRef}
                id="template-root"
                className="flex-1 flex flex-col"
                style={{
                    fontFamily: typography.bodyFont
                }}
            >
                <ConsultingHeader />
                <main className="flex-grow">
                    <ConsultingHero />
                    <ConsultingFeatures />
                    <ConsultingAbout />
                    <ConsultingTestimonials />
                    <ConsultingContact />
                </main>
                <ConsultingFooter />
            </div>
        </div>
    );
};

export default ConsultingLanding;