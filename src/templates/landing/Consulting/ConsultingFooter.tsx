import { Award, Briefcase, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = { Award, Briefcase, Heart, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter };

// Valores por defecto (coinciden con los defaultItems de la configuración)
const DEFAULT_QUICK_LINKS = [
    { id: 'default_ql_1', label: 'Inicio', url: '#home', visible: true },
    { id: 'default_ql_2', label: 'Servicios', url: '#services', visible: true },
    { id: 'default_ql_3', label: 'Metodología', url: '#methodology', visible: true },
    { id: 'default_ql_4', label: 'Casos de éxito', url: '#testimonials', visible: true },
    { id: 'default_ql_5', label: 'Contacto', url: '#contact', visible: true }
];

const DEFAULT_EXPERTISE = [
    { id: 'default_exp_1', label: 'Estrategia Corporativa', visible: true },
    { id: 'default_exp_2', label: 'Transformación Digital', visible: true },
    { id: 'default_exp_3', label: 'Gestión del Talento', visible: true },
    { id: 'default_exp_4', label: 'Finanzas Corporativas', visible: true },
    { id: 'default_exp_5', label: 'Expansión Internacional', visible: true }
];

const DEFAULT_CERTIFICATIONS = [
    { id: 'default_cert_1', label: 'ISO 9001:2024', visible: true },
    { id: 'default_cert_2', label: 'Miembro de AACCP', visible: true },
    { id: 'default_cert_3', label: 'Certified Partners', visible: true },
    { id: 'default_cert_4', label: '+15 años de experiencia', visible: true }
];

const ConsultingFooter = () => {
    const { template } = useTemplate();
    const [quickLinks, setQuickLinks] = useState(DEFAULT_QUICK_LINKS);
    const [expertise, setExpertise] = useState(DEFAULT_EXPERTISE);
    const [certifications, setCertifications] = useState(DEFAULT_CERTIFICATIONS);

    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const footerHeadingClamp = `clamp(1rem, 4vw, ${typography.footerHeadingSize})`;
    const footerTextClamp = `clamp(0.75rem, 2.5vw, ${typography.footerTextSize})`;
    const footerLinkClamp = `clamp(0.75rem, 2.5vw, ${typography.footerLinkSize})`;

    const currentYear = new Date().getFullYear();

    // Cargar enlaces rápidos desde template.texts['quicklink_']
    useEffect(() => {
        const stored = template?.texts?.['quicklink_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setQuickLinks(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing quick links:', e);
            }
        }
        setQuickLinks(DEFAULT_QUICK_LINKS);
    }, [template?.texts]);

    // Cargar áreas de expertise desde template.texts['expertise_']
    useEffect(() => {
        const stored = template?.texts?.['expertise_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setExpertise(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing expertise:', e);
            }
        }
        setExpertise(DEFAULT_EXPERTISE);
    }, [template?.texts]);

    // Cargar certificaciones desde template.texts['cert_']
    useEffect(() => {
        const stored = template?.texts?.['cert_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setCertifications(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing certifications:', e);
            }
        }
        setCertifications(DEFAULT_CERTIFICATIONS);
    }, [template?.texts]);

    // URLs redes sociales (siguen siendo campos independientes)
    const socialUrls = {
        facebook: template?.texts?.social_facebook_url || '#',
        instagram: template?.texts?.social_instagram_url || '#',
        linkedin: template?.texts?.social_linkedin_url || '#',
        twitter: template?.texts?.social_twitter_url || '#',
    };

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

    // Enlaces legales (siempre visibles)
    const legalLinks = [
        { id: 'terms', defaultLabel: 'Términos y condiciones', defaultUrl: 'https://kernelicepage-production.up.railway.app/terminos' },
        { id: 'privacy', defaultLabel: 'Política de privacidad', defaultUrl: 'https://kernelicepage-production.up.railway.app/privacidad' },
        { id: 'cookies', defaultLabel: 'Cookies', defaultUrl: 'https://kernelicepage-production.up.railway.app/contacto' },
    ];

    const getIcon = (iconName: string, className: string = s.iconSize) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
    };

    const heartIcon = <Heart className="w-4 h-4 text-red-500" />;

    return (
        <footer id="footer" className="border-t" style={{ backgroundColor: s.footerBackground, borderColor: `${s.footerLinkColor}40` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa (sin cambios) */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
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

                    {/* Enlaces rápidos dinámicos */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, idx) => {
                                if (link.visible === false) return null;
                                return (
                                    <li key={link.id || idx}>
                                        <a href={link.url} className="transition-colors" style={{ color: s.footerLinkColor, fontSize: footerLinkClamp }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = s.footerLinkHoverColor}
                                            onMouseLeave={(e) => e.currentTarget.style.color = s.footerLinkColor}>
                                            {link.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Áreas de expertise dinámicas */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_expertise_title" defaultText="Áreas de Expertise" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {expertise.map((item, idx) => {
                                if (item.visible === false) return null;
                                return (
                                    <li key={item.id || idx}>
                                        <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                            {item.label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contacto directo (sin cambios) */}
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

                {/* Sección inferior (sin cambios) */}
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
                        {certifications.map((cert, idx) => {
                            if (cert.visible === false) return null;
                            return (
                                <span key={cert.id || idx} className="px-3 py-1 rounded-full border"
                                    style={{ backgroundColor: `${s.footerBackground}cc`, borderColor: s.footerLinkColor, color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    {cert.label}
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