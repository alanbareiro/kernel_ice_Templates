import { Briefcase, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

// Mapeo de iconos
const iconMap: Record<string, any> = {
    Briefcase, Mail, Phone, MapPin, Heart, Facebook, Instagram, Linkedin, Twitter,
    // añadir más si se necesitan
};

const ConsultingFooter = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    const currentYear = new Date().getFullYear();

    // URLs redes sociales (desde template.texts)
    const socialUrls = {
        facebook: template?.texts?.social_facebook_url || '#',
        instagram: template?.texts?.social_instagram_url || '#',
        linkedin: template?.texts?.social_linkedin_url || '#',
        twitter: template?.texts?.social_twitter_url || '#',
    };

    const socialLinks = [
        { icon: <Facebook className={s.iconSize} />, label: 'Facebook', id: 'social_fb', url: socialUrls.facebook },
        { icon: <Instagram className={s.iconSize} />, label: 'Instagram', id: 'social_ig', url: socialUrls.instagram },
        { icon: <Linkedin className={s.iconSize} />, label: 'LinkedIn', id: 'social_li', url: socialUrls.linkedin },
        { icon: <Twitter className={s.iconSize} />, label: 'Twitter', id: 'social_tw', url: socialUrls.twitter },
    ];

    // Bloques de enlaces editables
    const quickLinks = [
        { id: 'link_home', defaultLabel: 'Inicio', defaultUrl: '#home' },
        { id: 'link_services', defaultLabel: 'Servicios', defaultUrl: '#services' },
        { id: 'link_methodology', defaultLabel: 'Metodología', defaultUrl: '#methodology' },
        { id: 'link_success', defaultLabel: 'Casos de éxito', defaultUrl: '#testimonials' },
        { id: 'link_contact', defaultLabel: 'Contacto', defaultUrl: '#contact' },
    ];

    const expertiseAreas = [
        { id: 'expertise_1', defaultLabel: 'Estrategia Corporativa' },
        { id: 'expertise_2', defaultLabel: 'Transformación Digital' },
        { id: 'expertise_3', defaultLabel: 'Gestión del Talento' },
        { id: 'expertise_4', defaultLabel: 'Finanzas Corporativas' },
        { id: 'expertise_5', defaultLabel: 'Expansión Internacional' },
    ];

    const contactInfo = [
        { id: 'contact_email', defaultIcon: 'Mail', defaultValue: 'consultoria@kernelize.com' },
        { id: 'contact_phone', defaultIcon: 'Phone', defaultValue: '+54 9 11 6745-7413' },
        { id: 'contact_location', defaultIcon: 'MapPin', defaultValue: 'Buenos Aires, Argentina' },
    ];

    const certifications = [
        { id: 'cert_1', defaultLabel: 'ISO 9001:2024' },
        { id: 'cert_2', defaultLabel: 'Miembro de AACCP' },
        { id: 'cert_3', defaultLabel: 'Certified Partners' },
        { id: 'cert_4', defaultLabel: '+15 años de experiencia' },
    ];

    const getIcon = (iconName: string, className: string = s.iconSize) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
    };

    // Icono del logo (maletín)
    const brandIconName = template?.texts?.footer_brand_icon || 'Briefcase';
    const BrandIcon = iconMap[brandIconName] || Briefcase;

    // Icono del corazón (para "Hecho con")
    const heartIcon = <Heart className="w-4 h-4 text-red-500" />;

    return (
        <footer id="footer" className="border-t" style={{ backgroundColor: s.footerBackground, borderColor: `${s.footerLinkColor}40` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                {/* Sección principal */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.footerLinkHoverColor}, ${s.footerHeadingColor})` }}>
                                <BrandIcon className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: s.footerHeadingColor }}>
                                <EditableText elementId="footer_brand_1" defaultText="Kernelize" tag="span" />
                                <EditableText elementId="footer_brand_2" defaultText="Consulting" tag="span" className="ml-1" />
                            </h2>
                        </div>
                        <p className="leading-relaxed" style={{ color: s.footerTextColor }}>
                            <EditableText elementId="footer_description" defaultText="Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes." tag="span" />
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-lg transition-all"
                                    style={{ backgroundColor: `${s.footerBackground}cc`, color: s.socialIconColor }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = s.socialIconHoverColor; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = s.socialIconColor; }}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: s.footerHeadingColor }}>
                            <EditableText elementId="footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => {
                                const label = template?.texts?.[`footer_${link.id}_label`] || link.defaultLabel;
                                const url = template?.texts?.[`footer_${link.id}_url`] || link.defaultUrl;
                                return (
                                    <li key={link.id}>
                                        <a href={url} className="transition-colors" style={{ color: s.footerLinkColor }}
                                            onMouseEnter={(e) => { e.currentTarget.style.color = s.footerLinkHoverColor; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.color = s.footerLinkColor; }}>
                                            <EditableText elementId={`footer_${link.id}_label`} defaultText={label} tag="span" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Áreas de Expertise */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: s.footerHeadingColor }}>
                            <EditableText elementId="footer_expertise_title" defaultText="Áreas de Expertise" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {expertiseAreas.map((area) => (
                                <li key={area.id}>
                                    <span style={{ color: s.footerTextColor }}>
                                        <EditableText elementId={area.id} defaultText={area.defaultLabel} tag="span" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto directo */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4" style={{ color: s.footerHeadingColor }}>
                            <EditableText elementId="footer_contact_title" defaultText="Contacto Directo" tag="span" />
                        </h3>
                        <div className="space-y-3">
                            {contactInfo.map((info) => {
                                const iconName = template?.texts?.[`footer_${info.id}_icon`] || info.defaultIcon;
                                const value = template?.texts?.[`footer_${info.id}_value`] || info.defaultValue;
                                return (
                                    <div key={info.id} className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                            {getIcon(iconName, s.iconSize)}
                                        </span>
                                        <span style={{ color: s.footerTextColor }}>
                                            <EditableText elementId={`footer_${info.id}_value`} defaultText={value} tag="span" />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t" style={{ borderColor: `${s.footerLinkColor}40` }}></div>

                {/* Sección inferior */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p style={{ color: s.footerTextColor }}>
                            © {currentYear} <EditableText elementId="footer_copyright" defaultText="Kernelize Consulting. Todos los derechos reservados." tag="span" />
                        </p>
                        <p className="text-sm mt-1 flex items-center justify-center md:justify-start" style={{ color: s.footerTextColor }}>
                            <EditableText elementId="footer_made_with" defaultText="Hecho con" tag="span" />
                            {heartIcon}
                            <EditableText elementId="footer_for" defaultText="para empresas que buscan crecer" tag="span" />
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        {['terms', 'privacy', 'cookies'].map((type) => {
                            const labelKey = `footer_${type}_label`;
                            const urlKey = `footer_${type}_url`;
                            const defaultLabels = { terms: 'Términos y condiciones', privacy: 'Política de privacidad', cookies: 'Cookies' };
                            return (
                                <a key={type} href={template?.texts?.[urlKey] || '#'} className="text-sm transition-colors"
                                    style={{ color: s.footerLinkColor }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = s.footerLinkHoverColor; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = s.footerLinkColor; }}>
                                    <EditableText elementId={labelKey} defaultText={defaultLabels[type as keyof typeof defaultLabels]} tag="span" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Certificaciones */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${s.footerLinkColor}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        {certifications.map((cert) => (
                            <span key={cert.id} className="px-3 py-1 rounded-full border"
                                style={{ backgroundColor: `${s.footerBackground}cc`, borderColor: s.footerLinkColor, color: s.footerTextColor }}>
                                <EditableText elementId={cert.id} defaultText={cert.defaultLabel} tag="span" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ConsultingFooter;