// src/templates/Catering/CateringFooter.tsx
import {
    Clock,
    Coffee,
    Facebook,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter
} from 'lucide-react';
// import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

const CateringFooter = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    // const typography = template?.typography || defaultTypography;

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', id: 'c_social_fb' },
        { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', id: 'c_social_ig' },
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', id: 'c_social_li' },
        { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', id: 'c_social_tw' },
    ];

    const quickLinks = [
        { id: 'c_footer_link_home', label: 'Inicio', href: '#home' },
        { id: 'c_footer_link_services', label: 'Servicios', href: '#services' },
        { id: 'c_footer_link_menu', label: 'Menú', href: '#menu' },
        { id: 'c_footer_link_gallery', label: 'Galería', href: '#gallery' },
        { id: 'c_footer_link_contact', label: 'Contacto', href: '#contact' },
    ];

    const certifications = [
        { id: 'c_cert_1', label: '⭐ Calidad certificada' },
        { id: 'c_cert_2', label: '🥇 Miembro de AAGA' },
        { id: 'c_cert_3', label: '🌿 Ingredientes frescos' },
    ];

    return (
        <footer
            className="text-white"
            style={{ background: `linear-gradient(135deg, ${sectionColors.footerBackground}, ${sectionColors.footerBackground})` }}
        >
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                {/* Sección principal */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                            >
                                <Coffee className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold">
                                <EditableText
                                    elementId="c_footer_brand_1"
                                    defaultText="Kernelize"
                                    tag="span"
                                    className="text-amber-300"
                                />
                                <EditableText
                                    elementId="c_footer_brand_2"
                                    defaultText="Catering"
                                    tag="span"
                                    className="text-orange-300 ml-1"
                                />
                            </h2>
                        </div>
                        <p style={{ color: sectionColors.footerTextColor }} className="leading-relaxed">
                            <EditableText
                                elementId="c_footer_description"
                                defaultText="Hacemos de tu evento una experiencia gastronómica inolvidable. Calidad, creatividad y pasión en cada plato."
                                tag="span"
                            />
                        </p>

                        {/* Redes sociales */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href="#"
                                    className="p-2 rounded-lg transition-all"
                                    style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}40`, color: sectionColors.footerLinkColor }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText
                                elementId="c_footer_quick_title"
                                defaultText="Enlaces Rápidos"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.href}
                                        className="transition-colors"
                                        style={{ color: sectionColors.footerLinkColor }}
                                    >
                                        <EditableText
                                            elementId={link.id}
                                            defaultText={link.label}
                                            tag="span"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Horarios */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText
                                elementId="c_footer_hours_title"
                                defaultText="Horarios de atención"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <div>
                                    <p style={{ color: sectionColors.footerTextColor }}>
                                        <EditableText
                                            elementId="c_footer_hours_week"
                                            defaultText="Lun-Vie: 9:00 - 20:00"
                                            tag="span"
                                        />
                                    </p>
                                    <p style={{ color: sectionColors.footerTextColor }}>
                                        <EditableText
                                            elementId="c_footer_hours_sat"
                                            defaultText="Sáb: 10:00 - 18:00"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.footerTextColor }}>
                                    <EditableText
                                        elementId="c_footer_phone"
                                        defaultText="+54 9 11 6745-7413"
                                        tag="span"
                                    />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.footerTextColor }}>
                                    <EditableText
                                        elementId="c_footer_email"
                                        defaultText="eventos@kernelizecatering.com"
                                        tag="span"
                                    />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.footerTextColor }}>
                                    <EditableText
                                        elementId="c_footer_location"
                                        defaultText="Buenos Aires, Argentina"
                                        tag="span"
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText
                                elementId="c_footer_newsletter"
                                defaultText="Novedades"
                                tag="span"
                            />
                        </h3>
                        <p className="text-sm" style={{ color: sectionColors.footerTextColor }}>
                            <EditableText
                                elementId="c_footer_newsletter_desc"
                                defaultText="Suscríbete para recibir promociones y novedades gastronómicas."
                                tag="span"
                            />
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 text-white"
                                style={{
                                    backgroundColor: `${sectionColors.buttonPrimaryBackground}40`,
                                    borderColor: `${sectionColors.buttonPrimaryBackground}60`,
                                }}
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white font-medium rounded-lg transition-all"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                            >
                                <EditableText
                                    elementId="c_footer_newsletter_button"
                                    defaultText="Suscribirse"
                                    tag="span"
                                />
                            </button>
                        </form>

                        {/* Toggle de tema */}
                        <div className="pt-4 flex items-center justify-between">
                            <span className="text-sm" style={{ color: sectionColors.footerHeadingColor }}>Tema:</span>
                            {/* <ThemeToggle /> */}
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}></div>

                {/* Sección inferior */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p style={{ color: sectionColors.footerTextColor }}>
                            © {currentYear}{' '}
                            <EditableText
                                elementId="c_footer_copyright"
                                defaultText="Kernelize Catering. Todos los derechos reservados."
                                tag="span"
                            />
                        </p>
                        <p className="text-sm mt-1 flex items-center justify-center md:justify-start" style={{ color: sectionColors.footerLinkColor }}>
                            <EditableText
                                elementId="c_footer_made_with"
                                defaultText="Hecho con"
                                tag="span"
                            />
                            <Heart className="mx-1 w-4 h-4 text-red-400" />
                            <EditableText
                                elementId="c_footer_for"
                                defaultText="para los amantes de la buena mesa"
                                tag="span"
                            />
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        <a href="#" className="text-sm transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                            <EditableText elementId="c_footer_terms" defaultText="Términos" tag="span" />
                        </a>
                        <a href="#" className="text-sm transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                            <EditableText elementId="c_footer_privacy" defaultText="Privacidad" tag="span" />
                        </a>
                        <a href="#" className="text-sm transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                            <EditableText elementId="c_footer_cookies" defaultText="Cookies" tag="span" />
                        </a>
                    </div>
                </div>

                {/* Certificaciones */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        {certifications.map((cert) => (
                            <span
                                key={cert.id}
                                className="px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor: `${sectionColors.buttonPrimaryBackground}40`,
                                    color: sectionColors.footerTextColor
                                }}
                            >
                                <EditableText
                                    elementId={cert.id}
                                    defaultText={cert.label}
                                    tag="span"
                                />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default CateringFooter;