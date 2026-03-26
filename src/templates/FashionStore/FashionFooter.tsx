import { Facebook, Heart, Instagram, Mail, MapPin, Phone, ShoppingBag, Twitter } from 'lucide-react';
import React from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const FashionFooter: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
    };
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2"><ShoppingBag className="w-8 h-8" style={{ color: colors.primary }} /><span className="text-2xl font-bold"><EditableText elementId="fa_footer_brand_1" defaultText="Kernelize" tag="span" /><EditableText elementId="fa_footer_brand_2" defaultText="Fashion" tag="span" className="ml-1 font-light" /></span></div>
                        <p className="text-sm text-gray-400"><EditableText elementId="fa_footer_description" defaultText="Moda con propósito. Diseños exclusivos, calidad premium y moda sustentable." tag="span" /></p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="fa_footer_quick_title" defaultText="Enlaces" tag="span" /></h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-gray-400 hover:text-white"><EditableText elementId="fa_footer_link_home" defaultText="Inicio" tag="span" /></a></li>
                            <li><a href="#collections" className="text-gray-400 hover:text-white"><EditableText elementId="fa_footer_link_collections" defaultText="Colecciones" tag="span" /></a></li>
                            <li><a href="#products" className="text-gray-400 hover:text-white"><EditableText elementId="fa_footer_link_products" defaultText="Productos" tag="span" /></a></li>
                            <li><a href="#lookbook" className="text-gray-400 hover:text-white"><EditableText elementId="fa_footer_link_lookbook" defaultText="Lookbook" tag="span" /></a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-white"><EditableText elementId="fa_footer_link_contact" defaultText="Contacto" tag="span" /></a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="fa_footer_contact_title" defaultText="Contacto" tag="span" /></h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3"><Phone className="w-5 h-5 text-gray-400 flex-shrink-0" /><span className="text-gray-400"><EditableText elementId="fa_footer_phone" defaultText="+54 11 5678-9012" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><Mail className="w-5 h-5 text-gray-400 flex-shrink-0" /><span className="text-gray-400"><EditableText elementId="fa_footer_email" defaultText="fashion@kernelize.com" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" /><span className="text-gray-400"><EditableText elementId="fa_footer_address" defaultText="Av. Santa Fe 2345, Palermo" tag="span" /></span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="fa_footer_social_title" defaultText="Seguinos" tag="span" /></h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-gray-400 hover:text-white"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
                        </div>
                        <div className="flex items-center justify-between"><span className="text-gray-400">Tema:</span><ThemeToggle /></div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <p className="text-center text-gray-400 text-sm">© {currentYear} <EditableText elementId="fa_footer_copyright" defaultText="Kernelize Fashion. Todos los derechos reservados." tag="span" /></p>
                    <p className="text-center text-gray-500 text-xs mt-2 flex items-center justify-center"><EditableText elementId="fa_footer_made_with" defaultText="Hecho con" tag="span" /><Heart className="w-3 h-3 mx-1 text-red-400" /><EditableText elementId="fa_footer_for" defaultText="para que expreses tu estilo" tag="span" /></p>
                </div>
            </div>
        </footer>
    );
};

export default FashionFooter;