import { Award, Briefcase, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = { Award, Briefcase, Heart, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter };

const ConsultingFooter = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const footerHeadingClamp = `clamp(1rem, 4vw, ${typography.footerHeadingSize})`;
    const footerTextClamp = `clamp(0.75rem, 2.5vw, ${typography.footerTextSize})`;
    const footerLinkClamp = `clamp(0.75rem, 2.5vw, ${typography.footerLinkSize})`;

    const currentYear = new Date().getFullYear();

    // URLs redes sociales (desde template.texts)
    const socialUrls = {
        facebook: template?.texts?.social_facebook_url || '#',
        instagram: template?.texts?.social_instagram_url || '#',
        linkedin: template?.texts?.social_linkedin_url || '#',
        twitter: template?.texts?.social_twitter_url || '#',
    };

    // Redes sociales con checkbox de visibilidad
    const socialNetworks = [
        { id: 'facebook', label: 'Facebook', defaultUrl: socialUrls.facebook, defaultIcon: 'Facebook' },
        { id: 'instagram', label: 'Instagram', defaultUrl: socialUrls.instagram, defaultIcon: 'Instagram' },
        { id: 'linkedin', label: 'LinkedIn', defaultUrl: socialUrls.linkedin, defaultIcon: 'Linkedin' },
        { id: 'twitter', label: 'Twitter', defaultUrl: socialUrls.twitter, defaultIcon: 'Twitter' },
    ];

    const shouldShowSocial = (id: string) => {
        const showKey = `show_social_${id}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? true : stored !== 'false';
    };

    // Enlaces rápidos (hasta 8)
    const quickLinksList = [
        { id: 'home', defaultLabel: 'Inicio', defaultUrl: '#home' },
        { id: 'services', defaultLabel: 'Servicios', defaultUrl: '#services' },
        { id: 'methodology', defaultLabel: 'Metodología', defaultUrl: '#methodology' },
        { id: 'testimonials', defaultLabel: 'Casos de éxito', defaultUrl: '#testimonials' },
        { id: 'contact', defaultLabel: 'Contacto', defaultUrl: '#contact' },
        { id: 'extra_1', defaultLabel: 'Enlace Extra 1', defaultUrl: '#' },
        { id: 'extra_2', defaultLabel: 'Enlace Extra 2', defaultUrl: '#' },
        { id: 'extra_3', defaultLabel: 'Enlace Extra 3', defaultUrl: '#' },
    ];

    const shouldShowQuickLink = (idx: number) => {
        const showKey = `show_quicklink_${idx}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? idx < 5 : stored !== 'false';
    };

    // Áreas de expertise
    const expertiseList = [
        { id: 'expertise_1', defaultLabel: 'Estrategia Corporativa' },
        { id: 'expertise_2', defaultLabel: 'Transformación Digital' },
        { id: 'expertise_3', defaultLabel: 'Gestión del Talento' },
        { id: 'expertise_4', defaultLabel: 'Finanzas Corporativas' },
        { id: 'expertise_5', defaultLabel: 'Expansión Internacional' },
        { id: 'expertise_6', defaultLabel: 'Innovación' },
        { id: 'expertise_7', defaultLabel: 'Sostenibilidad' },
        { id: 'expertise_8', defaultLabel: 'Ciberseguridad' },
    ];

    const shouldShowExpertise = (idx: number) => {
        const showKey = `show_expertise_${idx}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? idx < 5 : stored !== 'false';
    };

    // Enlaces legales (siempre visibles)
    const legalLinks = [
        { id: 'terms', defaultLabel: 'Términos y condiciones', defaultUrl: 'https://kernelicepage-production.up.railway.app/terminos' },
        { id: 'privacy', defaultLabel: 'Política de privacidad', defaultUrl: 'https://kernelicepage-production.up.railway.app/privacidad' },
        { id: 'cookies', defaultLabel: 'Cookies', defaultUrl: 'https://kernelicepage-production.up.railway.app/contacto' },
    ];

    // Certificaciones dinámicas
    const getCertificationLabel = (idx: number) => {
        const defaults: Record<number, string> = {
            1: 'ISO 9001:2024', 2: 'Miembro de AACCP', 3: 'Certified Partners', 4: '+15 años de experiencia'
        };
        return template?.texts?.[`cert_${idx}`] || defaults[idx] || `Certificación ${idx}`;
    };
    const shouldShowCertification = (idx: number) => {
        const showKey = `show_certification_${idx}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? idx <= 4 : stored !== 'false';
    };

    const getIcon = (iconName: string, className: string = s.iconSize) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
    };

    const heartIcon = <Heart className="w-4 h-4 text-red-500" />;

    return (
        <footer id="footer" className="border-t" style={{ backgroundColor: s.footerBackground, borderColor: `${s.footerLinkColor}40` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            {/* Logo: usa EditableImage para poder cambiarlo desde el dashboard */}
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.footerLinkHoverColor}, ${s.footerHeadingColor})` }}>
                                <EditableImage
                                    elementId="footer_logo"
                                    defaultImage=""
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                    category="consulting"
                                    containerClassName="w-full h-full"
                                    modalRelative={false}
                                />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                                <EditableText elementId="footer_brand_1" defaultText="Kernelize" tag="span" />
                                <EditableText elementId="footer_brand_2" defaultText="Consulting" tag="span" className="ml-1" />
                            </h2>
                        </div>
                        <p className="leading-relaxed" style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                            <EditableText elementId="footer_description" defaultText="Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes." tag="span" />
                        </p>
                        <div className="flex space-x-3">
                            {socialNetworks.map((social) => {
                                if (!shouldShowSocial(social.id)) return null;
                                return (
                                    <a key={social.id} href={social.defaultUrl} target="_blank" rel="noopener noreferrer"
                                        className="p-2 rounded-lg transition-all"
                                        style={{ backgroundColor: `${s.footerBackground}cc`, color: s.socialIconColor }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = s.socialIconHoverColor}
                                        onMouseLeave={(e) => e.currentTarget.style.color = s.socialIconColor}>
                                        {getIcon(social.defaultIcon, s.iconSize)}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinksList.map((link, idx) => {
                                if (!shouldShowQuickLink(idx)) return null;
                                const label = template?.texts?.[`quicklink_label_${link.id}`] || link.defaultLabel;
                                const url = template?.texts?.[`quicklink_url_${link.id}`] || link.defaultUrl;
                                return (
                                    <li key={link.id}>
                                        <a href={url} className="transition-colors" style={{ color: s.footerLinkColor, fontSize: footerLinkClamp }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = s.footerLinkHoverColor}
                                            onMouseLeave={(e) => e.currentTarget.style.color = s.footerLinkColor}>
                                            <EditableText elementId={`quicklink_label_${link.id}`} defaultText={label} tag="span" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Áreas de Expertise */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_expertise_title" defaultText="Áreas de Expertise" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {expertiseList.map((area, idx) => {
                                if (!shouldShowExpertise(idx)) return null;
                                const label = template?.texts?.[`expertise_label_${area.id}`] || area.defaultLabel;
                                return (
                                    <li key={area.id}>
                                        <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                            <EditableText elementId={`expertise_label_${area.id}`} defaultText={label} tag="span" />
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contacto directo */}
                    <div className="space-y-4">
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_contact_title" defaultText="Contacto Directo" tag="span" />
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                    {getIcon('Mail', s.iconSize)}
                                </span>
                                <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId="footer_contact_email" defaultText="consultoria@kernelize.com" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                    {getIcon('Phone', s.iconSize)}
                                </span>
                                <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId="footer_contact_phone" defaultText="+54 9 11 6745-7413" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                    {getIcon('MapPin', s.iconSize)}
                                </span>
                                <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId="footer_contact_location" defaultText="Buenos Aires, Argentina" tag="span" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t" style={{ borderColor: `${s.footerLinkColor}40` }}></div>

                {/* Sección inferior */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                            © {currentYear} <EditableText elementId="footer_copyright" defaultText="Kernelize Consulting. Todos los derechos reservados." tag="span" />
                        </p>
                        <p className="text-sm mt-1 flex items-center justify-center md:justify-start" style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                            <EditableText elementId="footer_made_with" defaultText="Hecho con" tag="span" />
                            {heartIcon}
                            <EditableText elementId="footer_for" defaultText="para empresas que buscan crecer" tag="span" />
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        {legalLinks.map((item) => {
                            const label = template?.texts?.[`legal_label_${item.id}`] || item.defaultLabel;
                            const url = template?.texts?.[`legal_url_${item.id}`] || item.defaultUrl;
                            return (
                                <a key={item.id} href={url} className="text-sm transition-colors" style={{ color: s.footerLinkColor, fontSize: footerLinkClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = s.footerLinkHoverColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = s.footerLinkColor}>
                                    <EditableText elementId={`legal_label_${item.id}`} defaultText={label} tag="span" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Certificaciones dinámicas */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${s.footerLinkColor}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
                            if (!shouldShowCertification(idx)) return null;
                            const certLabel = getCertificationLabel(idx);
                            return (
                                <span key={idx} className="px-3 py-1 rounded-full border" style={{ backgroundColor: `${s.footerBackground}cc`, borderColor: s.footerLinkColor, color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId={`cert_${idx}`} defaultText={certLabel} tag="span" />
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ConsultingFooter;