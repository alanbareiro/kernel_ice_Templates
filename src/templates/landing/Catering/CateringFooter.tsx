import { Clock, Coffee, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors } from '../../../types/template.types';

const DEFAULT_QUICK_LINKS = [
    { id: 'ql1', label: 'Inicio', url: '#home', visible: true },
    { id: 'ql2', label: 'Servicios', url: '#services', visible: true },
    { id: 'ql3', label: 'Menú', url: '#menu', visible: true },
    { id: 'ql4', label: 'Galería', url: '#gallery', visible: true },
    { id: 'ql5', label: 'Contacto', url: '#contact', visible: true }
];

const DEFAULT_CERTIFICATIONS = [
    { id: 'cert1', label: '⭐ Calidad certificada', visible: true },
    { id: 'cert2', label: '🥇 Miembro de AAGA', visible: true },
    { id: 'cert3', label: '🌿 Ingredientes frescos', visible: true }
];

const CateringFooter = () => {
    const { template } = useTemplate();
    const [quickLinks, setQuickLinks] = useState(DEFAULT_QUICK_LINKS);
    const [certifications, setCertifications] = useState(DEFAULT_CERTIFICATIONS);

    const sectionColors = template?.sectionColors || defaultSectionColors;
    // const typography = template?.typography || defaultTypography;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const storedQL = template?.texts?.['c_footer_quicklink_'];
        if (storedQL) {
            try {
                const parsed = JSON.parse(storedQL);
                if (Array.isArray(parsed) && parsed.length > 0) setQuickLinks(parsed);
            } catch (e) { }
        } else setQuickLinks(DEFAULT_QUICK_LINKS);
    }, [template?.texts]);

    useEffect(() => {
        const storedCert = template?.texts?.['c_cert_'];
        if (storedCert) {
            try {
                const parsed = JSON.parse(storedCert);
                if (Array.isArray(parsed) && parsed.length > 0) setCertifications(parsed);
            } catch (e) { }
        } else setCertifications(DEFAULT_CERTIFICATIONS);
    }, [template?.texts]);

    const socialUrls = {
        facebook: template?.texts?.c_social_facebook_url || '#',
        instagram: template?.texts?.c_social_instagram_url || '#',
        linkedin: template?.texts?.c_social_linkedin_url || '#',
        twitter: template?.texts?.c_social_twitter_url || '#',
    };

    const socialNetworks = [
        { id: 'facebook', icon: <Facebook className="w-5 h-5" />, url: socialUrls.facebook, visible: template?.texts?.show_social_facebook !== 'false' },
        { id: 'instagram', icon: <Instagram className="w-5 h-5" />, url: socialUrls.instagram, visible: template?.texts?.show_social_instagram !== 'false' },
        { id: 'linkedin', icon: <Linkedin className="w-5 h-5" />, url: socialUrls.linkedin, visible: template?.texts?.show_social_linkedin !== 'false' },
        { id: 'twitter', icon: <Twitter className="w-5 h-5" />, url: socialUrls.twitter, visible: template?.texts?.show_social_twitter !== 'false' }
    ];

    return (
        <footer className="text-white" style={{ background: `linear-gradient(135deg, ${sectionColors.footerBackground}, ${sectionColors.footerBackground})` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                                <Coffee className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold">
                                <EditableText elementId="c_footer_brand_1" defaultText="Kernelize" tag="span" className="text-amber-300" />
                                <EditableText elementId="c_footer_brand_2" defaultText="Catering" tag="span" className="text-orange-300 ml-1" />
                            </h2>
                        </div>
                        <p style={{ color: sectionColors.footerTextColor }} className="leading-relaxed">
                            <EditableText elementId="c_footer_description" defaultText="Hacemos de tu evento una experiencia gastronómica inolvidable. Calidad, creatividad y pasión en cada plato." tag="span" />
                        </p>
                        <div className="flex space-x-3">
                            {socialNetworks.map(social => social.visible && (
                                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg transition-all" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}40`, color: sectionColors.footerLinkColor }}>{social.icon}</a>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces rápidos dinámicos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}><EditableText elementId="c_footer_quick_title" defaultText="Enlaces Rápidos" tag="span" /></h3>
                        <ul className="space-y-2">
                            {quickLinks.map(link => link.visible !== false && (
                                <li key={link.id}><a href={link.url} className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Horarios y contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}><EditableText elementId="c_footer_hours_title" defaultText="Horarios de atención" tag="span" /></h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3"><Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} /><div><p style={{ color: sectionColors.footerTextColor }}><EditableText elementId="c_footer_hours_week" defaultText="Lun-Vie: 9:00 - 20:00" tag="span" /></p><p style={{ color: sectionColors.footerTextColor }}><EditableText elementId="c_footer_hours_sat" defaultText="Sáb: 10:00 - 18:00" tag="span" /></p></div></li>
                            <li className="flex items-start space-x-3"><Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} /><span style={{ color: sectionColors.footerTextColor }}><EditableText elementId="c_footer_phone" defaultText="+54 9 11 6745-7413" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} /><span style={{ color: sectionColors.footerTextColor }}><EditableText elementId="c_footer_email" defaultText="eventos@kernelizecatering.com" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} /><span style={{ color: sectionColors.footerTextColor }}><EditableText elementId="c_footer_location" defaultText="Buenos Aires, Argentina" tag="span" /></span></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}><EditableText elementId="c_footer_newsletter" defaultText="Novedades" tag="span" /></h3>
                        <p className="text-sm" style={{ color: sectionColors.footerTextColor }}><EditableText elementId="c_footer_newsletter_desc" defaultText="Suscríbete para recibir promociones y novedades gastronómicas." tag="span" /></p>
                        <form className="space-y-3"><input type="email" placeholder="tu@email.com" className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 text-white" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}40`, borderColor: `${sectionColors.buttonPrimaryBackground}60` }} />
                            <button type="submit" className="w-full px-4 py-2 text-white font-medium rounded-lg transition-all" style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}><EditableText elementId="c_footer_newsletter_button" defaultText="Suscribirse" tag="span" /></button></form>
                    </div>
                </div>

                <div className="border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}></div>

                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p style={{ color: sectionColors.footerTextColor }}>© {currentYear} <EditableText elementId="c_footer_copyright" defaultText="Kernelize Catering. Todos los derechos reservados." tag="span" /></p>
                        <p className="text-sm mt-1 flex items-center justify-center md:justify-start" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="c_footer_made_with" defaultText="Hecho con" tag="span" /><Heart className="mx-1 w-4 h-4 text-red-400" /><EditableText elementId="c_footer_for" defaultText="para los amantes de la buena mesa" tag="span" /></p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        <a href="#" className="text-sm transition-colors" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="c_footer_terms" defaultText="Términos" tag="span" /></a>
                        <a href="#" className="text-sm transition-colors" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="c_footer_privacy" defaultText="Privacidad" tag="span" /></a>
                        <a href="#" className="text-sm transition-colors" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="c_footer_cookies" defaultText="Cookies" tag="span" /></a>
                    </div>
                </div>

                {/* Certificaciones dinámicas */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        {certifications.map(cert => cert.visible !== false && (
                            <span key={cert.id} className="px-3 py-1 rounded-full" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}40`, color: sectionColors.footerTextColor }}>{cert.label}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default CateringFooter;