import {
    Clock,
    Facebook,
    Heart,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
    UtensilsCrossed
} from 'lucide-react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RestaurantFooter = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
    };
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', id: 'r_social_fb' },
        { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', id: 'r_social_ig' },
        { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', id: 'r_social_tw' },
    ];

    const quickLinks = [
        { id: 'r_footer_link_home', label: 'Inicio', href: '#home' },
        { id: 'r_footer_link_menu', label: 'Menú', href: '#menu' },
        { id: 'r_footer_link_chef', label: 'Chef', href: '#chef' },
        { id: 'r_footer_link_gallery', label: 'Galería', href: '#gallery' },
        { id: 'r_footer_link_reservations', label: 'Reservas', href: '#reservations' },
    ];

    const recognitions = [
        { id: 'r_recog_1', label: '⭐ Recomendado por Guía Michelin' },
        { id: 'r_recog_2', label: '🥇 5 años consecutivos' },
        { id: 'r_recog_3', label: '🌟 Los mejores de Palermo' },
    ];

    return (
        <footer className="text-white"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                {/* Sección principal */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información del restaurante */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <UtensilsCrossed className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold">
                                <EditableText
                                    elementId="r_footer_brand_1"
                                    defaultText="Kernelize"
                                    tag="span"
                                    className="text-red-300"
                                />
                                <EditableText
                                    elementId="r_footer_brand_2"
                                    defaultText="Restó"
                                    tag="span"
                                    className="text-red-400 ml-1"
                                />
                            </h2>
                        </div>
                        <p className="text-red-200 leading-relaxed">
                            <EditableText
                                elementId="r_footer_description"
                                defaultText="Desde 1985 ofreciendo la mejor experiencia gastronómica. Tradición italiana, corazón argentino."
                                tag="span"
                            />
                        </p>

                        {/* Redes sociales */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href="#"
                                    className="p-2 bg-red-800 rounded-lg text-red-200 hover:bg-red-700 hover:text-white transition-all"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold text-red-300 mb-4">
                            <EditableText
                                elementId="r_footer_explore_title"
                                defaultText="Explorá"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.href}
                                        className="text-red-200 hover:text-white transition-colors"
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
                        <h3 className="text-lg font-semibold text-red-300 mb-4">
                            <EditableText
                                elementId="r_footer_hours_title"
                                defaultText="Horarios"
                                tag="span"
                            />
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-red-200">
                                        <EditableText
                                            elementId="r_footer_tue_thu"
                                            defaultText="Martes a Jueves: 12-00hs"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-red-200">
                                        <EditableText
                                            elementId="r_footer_fri_sat"
                                            defaultText="Viernes y Sábados: 12-01hs"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-red-200">
                                        <EditableText
                                            elementId="r_footer_sun"
                                            defaultText="Domingos: 12-23hs"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-red-300 mb-4">
                            <EditableText
                                elementId="r_footer_contact_title"
                                defaultText="Contacto"
                                tag="span"
                            />
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <span className="text-red-200">
                                    <EditableText
                                        elementId="r_footer_address"
                                        defaultText="Av. Palermo 1234, CABA"
                                        tag="span"
                                    />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <span className="text-red-200">
                                    <EditableText
                                        elementId="r_footer_phone"
                                        defaultText="+54 9 11 6745-7413"
                                        tag="span"
                                    />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <span className="text-red-200">
                                    <EditableText
                                        elementId="r_footer_email"
                                        defaultText="contacto@kernelizeresto.com"
                                        tag="span"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Toggle de tema */}
                        <div className="pt-6 mt-6 border-t" style={{ borderColor: `${colors.primary}40` }}>
                            <div className="flex items-center justify-between">
                                <span className="text-red-300">Tema:</span>
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
                        <p className="text-red-200">
                            © {currentYear}{' '}
                            <EditableText
                                elementId="r_footer_copyright"
                                defaultText="Kernelize Restó. Todos los derechos reservados."
                                tag="span"
                            />
                        </p>
                        <p className="text-sm text-red-300 mt-1 flex items-center justify-center md:justify-start">
                            <EditableText
                                elementId="r_footer_made_with"
                                defaultText="Hecho con"
                                tag="span"
                            />
                            <Heart className="mx-1 w-4 h-4 text-red-400" />
                            <EditableText
                                elementId="r_footer_for"
                                defaultText="para los amantes de la buena mesa"
                                tag="span"
                            />
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        <a href="#" className="text-sm text-red-200 hover:text-white transition-colors">
                            <EditableText elementId="r_footer_terms" defaultText="Términos" tag="span" />
                        </a>
                        <a href="#" className="text-sm text-red-200 hover:text-white transition-colors">
                            <EditableText elementId="r_footer_privacy" defaultText="Privacidad" tag="span" />
                        </a>
                        <a href="#" className="text-sm text-red-200 hover:text-white transition-colors">
                            <EditableText elementId="r_footer_cookies" defaultText="Cookies" tag="span" />
                        </a>
                    </div>
                </div>

                {/* Reconocimientos */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${colors.primary}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        {recognitions.map((rec) => (
                            <span
                                key={rec.id}
                                className="px-3 py-1 bg-red-800 rounded-full border text-red-200"
                                style={{ borderColor: colors.primary }}
                            >
                                <EditableText
                                    elementId={rec.id}
                                    defaultText={rec.label}
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

export default RestaurantFooter;