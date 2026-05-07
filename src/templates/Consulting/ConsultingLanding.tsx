import { useLayoutEffect, useRef } from 'react';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultTypography } from '../../types/template.types';
import ConsultingAbout from './ConsultingAbout';
import ConsultingContact from './ConsultingContact';
import ConsultingFeatures from './ConsultingFeatures';
import ConsultingFooter from './ConsultingFooter';
import ConsultingHeader from './ConsultingHeader';
import ConsultingHero from './ConsultingHero';
import ConsultingTestimonials from './ConsultingTestimonials';

interface ConsultingLandingProps {
    onHomeClick?: () => void;
}

const ConsultingLanding: React.FC<ConsultingLandingProps> = ({ onHomeClick }) => {
    const { template } = useTemplate();
    const typography = template?.typography || defaultTypography;
    const rootRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (rootRef.current) {
            console.log('Aplicando tipografía:', typography);
            rootRef.current.style.setProperty('--font-heading', typography.headingFont);
            rootRef.current.style.setProperty('--font-body', typography.bodyFont);
        }
    }, [typography]);

    return (
        <div className="min-h-screen flex">
            <EditorDashboard onHomeClick={onHomeClick} />
            <div
                ref={rootRef}
                id="template-root"
                className="flex-1 flex flex-col"
                style={{
                    fontFamily: typography.bodyFont,
                }}
            // style={{
            //     '--font-heading': typography.headingFont,
            //     '--font-body': typography.bodyFont,
            // } as React.CSSProperties}
            >
                <style>{`
    #template-root h1, #template-root h2, #template-root h3,
    #template-root h4, #template-root h5, #template-root h6 {
      font-family: ${typography.headingFont};
    }
  `}</style>
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