import {
    Calculator,
    Clock,
    Facebook,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter
} from 'lucide-react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const AccountingFooter = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
    };
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', id: 'a_social_fb' },
        { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', id: 'a_social_ig' },
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', id: 'a_social_li' },
        { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', id: 'a_social_tw' },
    ];

    const quickLinks = [
        { id: 'a_footer_link_home', label: 'Inicio', href: '#home' },
        { id: 'a_footer_link_services', label: 'Servicios', href: '#services' },
        { id: 'a_footer_link_about', label: 'Nosotros', href: '#about' },
        { id: 'a_footer_link_contact', label: 'Contacto', href: '#contact' },
    ];

    const services = [
        { id: 'a_footer_service_1', label: 'Liquidación de impuestos' },
        { id: 'a_footer_service_2', label: 'Contabilidad general' },
        { id: 'a_footer_service_3', label: 'Liquidación de sueldos' },
        { id: 'a_footer_service_4', label: 'Auditoría' },
        { id: 'a_footer_service_5', label: 'Sociedades' },
    ];

    const certifications = [
        { id: 'a_cert_1', label: 'Miembros del Consejo Profesional' },
        { id: 'a_cert_2', label: '⭐ Matrícula: CPCECABA 12345' },
        { id: 'a_cert_3', label: '🔒 Confidencialidad garantizada' },
    ];

    return (
        <footer className="text-white"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                {/* Sección principal */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <Calculator className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold">
                                <EditableText
                                    elementId="a_footer_brand_1"
                                    defaultText="Kernelize"
                                    tag="span"
                                    className="text-emerald-300"
                                />
                                <EditableText
                                    elementId="a_footer_brand_2"
                                    defaultText="Contadores"
                                    tag="span"
                                    className="text-emerald-400 ml-1"
                                />
                            </h2>
                        </div>
                        <p className="text-emerald-200 leading-relaxed">
                            <EditableText
                                elementId="a_footer_description"
                                defaultText="Estudio contable con más de 25 años de experiencia. Brindamos soluciones integrales con la máxima confidencialidad y profesionalismo."
                                tag="span"
                            />
                        </p>

                        {/* Redes sociales */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href="#"
                                    className="p-2 bg-emerald-800 rounded-lg text-emerald-200 hover:bg-emerald-700 hover:text-white transition-all"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-300 mb-4">
                            <EditableText
                                elementId="a_footer_quick_title"
                                defaultText="Enlaces Rápidos"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.href}
                                        className="text-emerald-200 hover:text-white transition-colors"
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

                    {/* Servicios */}
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-300 mb-4">
                            <EditableText
                                elementId="a_footer_services_title"
                                defaultText="Servicios"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.id}>
                                    <span className="text-emerald-200">
                                        <EditableText
                                            elementId={service.id}
                                            defaultText={service.label}
                                            tag="span"
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-4">
                            <EditableText
                                elementId="a_footer_contact_title"
                                defaultText="Contacto"
                                tag="span"
                            />
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="text-emerald-200">
                                    <EditableText
                                        elementId="a_footer_address"
                                        defaultText="Av. Corrientes 1234, CABA"
                                        tag="span"
                                    />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="text-emerald-200">
                                    <EditableText
                                        elementId="a_footer_phone"
                                        defaultText="+54 9 11 6745-7413"
                                        tag="span"
                                    />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="text-emerald-200">
                                    <EditableText
                                        elementId="a_footer_email"
                                        defaultText="contabilidad@kernelize.com"
                                        tag="span"
                                    />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="text-emerald-200">
                                    <EditableText
                                        elementId="a_footer_hours"
                                        defaultText="Lun-Vie 9:00 a 18:00"
                                        tag="span"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Toggle de tema */}
                        <div className="pt-6 mt-6 border-t" style={{ borderColor: `${colors.primary}40` }}>
                            <div className="flex items-center justify-between">
                                <span className="text-emerald-300">Tema:</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t" style={{ borderColor: `${colors.primary}40` }}></div>

                {/* Sección inferior */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="text-emerald-200">
                            © {currentYear}{' '}
                            <EditableText
                                elementId="a_footer_copyright"
                                defaultText="Kernelize Contadores. Todos los derechos reservados."
                                tag="span"
                            />
                        </p>
                        <p className="text-sm text-emerald-300 mt-1 flex items-center justify-center md:justify-start">
                            <EditableText
                                elementId="a_footer_made_with"
                                defaultText="Hecho con"
                                tag="span"
                            />
                            <Heart className="mx-1 w-4 h-4 text-red-400" />
                            <EditableText
                                elementId="a_footer_for"
                                defaultText="para la tranquilidad de nuestros clientes"
                                tag="span"
                            />
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        <a href="#" className="text-sm text-emerald-200 hover:text-white transition-colors">
                            <EditableText elementId="a_footer_terms" defaultText="Términos" tag="span" />
                        </a>
                        <a href="#" className="text-sm text-emerald-200 hover:text-white transition-colors">
                            <EditableText elementId="a_footer_privacy" defaultText="Privacidad" tag="span" />
                        </a>
                        <a href="#" className="text-sm text-emerald-200 hover:text-white transition-colors">
                            <EditableText elementId="a_footer_cookies" defaultText="Cookies" tag="span" />
                        </a>
                    </div>
                </div>

                {/* Certificaciones */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${colors.primary}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        {certifications.map((cert) => (
                            <span
                                key={cert.id}
                                className="px-3 py-1 bg-emerald-800 rounded-full border text-emerald-200"
                                style={{ borderColor: colors.primary }}
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

export default AccountingFooter;