import {
    Briefcase,
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

const ConsultingFooter = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
    };
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', id: 'social_fb', url: '#' },
        { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', id: 'social_ig', url: '#' },
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', id: 'social_li', url: '#' },
        { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', id: 'social_tw', url: '#' },
    ];

    const quickLinks = [
        { id: 'link_home', label: 'Inicio', href: '#home' },
        { id: 'link_services', label: 'Servicios', href: '#services' },
        { id: 'link_methodology', label: 'Metodología', href: '#methodology' },
        { id: 'link_success', label: 'Casos de éxito', href: '#testimonials' },
        { id: 'link_contact', label: 'Contacto', href: '#contact' },
    ];

    const expertiseAreas = [
        { id: 'expertise_1', label: 'Estrategia Corporativa' },
        { id: 'expertise_2', label: 'Transformación Digital' },
        { id: 'expertise_3', label: 'Gestión del Talento' },
        { id: 'expertise_4', label: 'Finanzas Corporativas' },
        { id: 'expertise_5', label: 'Expansión Internacional' },
    ];

    const contactInfo = [
        { id: 'contact_email', icon: <Mail className="w-5 h-5" />, value: 'consultoria@kernelize.com' },
        { id: 'contact_phone', icon: <Phone className="w-5 h-5" />, value: '+54 9 11 6745-7413' },
        { id: 'contact_location', icon: <MapPin className="w-5 h-5" />, value: 'Buenos Aires, Argentina' },
    ];

    const certifications = [
        { id: 'cert_1', label: 'ISO 9001:2024' },
        { id: 'cert_2', label: 'Miembro de AACCP' },
        { id: 'cert_3', label: 'Certified Partners' },
        { id: 'cert_4', label: '+15 años de experiencia' },
    ];

    return (
        <footer className="text-white border-t"
            style={{ backgroundColor: colors.accent, borderColor: `${colors.primary}40` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                {/* Sección principal */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold">
                                <EditableText
                                    elementId="footer_brand_1"
                                    defaultText="Kernelize"
                                    tag="span"
                                    className="text-blue-400"
                                />
                                <EditableText
                                    elementId="footer_brand_2"
                                    defaultText="Consulting"
                                    tag="span"
                                    className="text-slate-400 ml-1"
                                />
                            </h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            <EditableText
                                elementId="footer_description"
                                defaultText="Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes."
                                tag="span"
                            />
                        </p>

                        {/* Redes sociales */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            <EditableText
                                elementId="footer_quick_title"
                                defaultText="Enlaces Rápidos"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-blue-400 transition-colors"
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

                    {/* Áreas de Expertise */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            <EditableText
                                elementId="footer_expertise_title"
                                defaultText="Áreas de Expertise"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-2">
                            {expertiseAreas.map((area) => (
                                <li key={area.id}>
                                    <span className="text-slate-400">
                                        <EditableText
                                            elementId={area.id}
                                            defaultText={area.label}
                                            tag="span"
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto directo */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            <EditableText
                                elementId="footer_contact_title"
                                defaultText="Contacto Directo"
                                tag="span"
                            />
                        </h3>

                        <div className="space-y-3">
                            {contactInfo.map((info) => (
                                <div key={info.id} className="flex items-start space-x-3">
                                    <span className="text-blue-400 flex-shrink-0 mt-0.5">
                                        {info.icon}
                                    </span>
                                    <span className="text-slate-400">
                                        <EditableText
                                            elementId={info.id}
                                            defaultText={info.value}
                                            tag="span"
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Toggle de tema */}
                        <div className="pt-6 mt-6 border-t border-slate-800">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Tema:</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-slate-800"></div>

                {/* Sección inferior */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Derechos de autor */}
                    <div className="text-center md:text-left">
                        <p className="text-slate-400">
                            © {currentYear}{' '}
                            <EditableText
                                elementId="footer_copyright"
                                defaultText="Kernelize Consulting. Todos los derechos reservados."
                                tag="span"
                            />
                        </p>
                        <p className="text-sm text-slate-500 mt-1 flex items-center justify-center md:justify-start">
                            <EditableText
                                elementId="footer_made_with"
                                defaultText="Hecho con"
                                tag="span"
                            />
                            <Heart className="mx-1 w-4 h-4 text-red-500" />
                            <EditableText
                                elementId="footer_for"
                                defaultText="para empresas que buscan crecer"
                                tag="span"
                            />
                        </p>
                    </div>

                    {/* Enlaces legales */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                            <EditableText
                                elementId="footer_terms"
                                defaultText="Términos y condiciones"
                                tag="span"
                            />
                        </a>
                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                            <EditableText
                                elementId="footer_privacy"
                                defaultText="Política de privacidad"
                                tag="span"
                            />
                        </a>
                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                            <EditableText
                                elementId="footer_cookies"
                                defaultText="Cookies"
                                tag="span"
                            />
                        </a>
                    </div>
                </div>

                {/* Certificaciones */}
                <div className="pb-8 pt-4 border-t border-slate-800">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        {certifications.map((cert) => (
                            <span
                                key={cert.id}
                                className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-slate-300"
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

export default ConsultingFooter;