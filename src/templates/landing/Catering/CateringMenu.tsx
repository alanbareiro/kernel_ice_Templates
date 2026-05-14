import { ChevronRight, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../../types/template.types';

const DEFAULT_CATEGORIES = [
    { id: 'cat_1', name: 'Entradas', icon: '🥗', visible: true },
    { id: 'cat_2', name: 'Platos Principales', icon: '🍖', visible: true },
    { id: 'cat_3', name: 'Postres', icon: '🍰', visible: true },
    { id: 'cat_4', name: 'Bebidas', icon: '🍷', visible: true }
];

const DEFAULT_MENU_ITEMS = [
    { id: 'item1', category: 'entradas', name: 'Bruschettas de tomate y albahaca', description: 'Pan artesanal con tomate fresco, albahaca y aceite de oliva', price: '$12', time: '10 min', visible: true },
    { id: 'item2', category: 'entradas', name: 'Carpaccio de res', description: 'Finas láminas de res con alcaparras, parmesano y mostaza', price: '$15', time: '15 min', visible: true },
    { id: 'item3', category: 'entradas', name: 'Langostinos al ajillo', description: 'Langostinos salteados con ajo, perejil y vino blanco', price: '$18', time: '12 min', visible: true },
    { id: 'item4', category: 'principales', name: 'Salmón a la plancha', description: 'Salmón con costra de hierbas, puré de papas y espárragos', price: '$28', time: '25 min', visible: true },
    { id: 'item5', category: 'principales', name: 'Risotto de hongos', description: 'Risotto cremoso con hongos silvestres y parmesano', price: '$22', time: '20 min', visible: true },
    { id: 'item6', category: 'principales', name: 'Lomo saltado', description: 'Tiras de lomo salteadas con cebolla, tomate y papas fritas', price: '$25', time: '20 min', visible: true },
    { id: 'item7', category: 'postres', name: 'Tiramisú', description: 'Clásico postre italiano con mascarpone, café y cacao', price: '$10', time: '5 min', visible: true },
    { id: 'item8', category: 'postres', name: 'Volcán de chocolate', description: 'Bizcocho de chocolate con corazón fundido', price: '$12', time: '8 min', visible: true },
    { id: 'item9', category: 'postres', name: 'Cheesecake de frutos rojos', description: 'Tarta de queso con coulis de frutos rojos', price: '$11', time: '5 min', visible: true },
    { id: 'item10', category: 'bebidas', name: 'Vino tinto reserva', description: 'Malbec argentino con notas de frutos rojos', price: '$35', time: '5 min', visible: true },
    { id: 'item11', category: 'bebidas', name: 'Coctelería premium', description: 'Cócteles clásicos y de autor', price: '$15', time: '10 min', visible: true },
    { id: 'item12', category: 'bebidas', name: 'Agua saborizada', description: 'Agua con frutas y hierbas frescas', price: '$8', time: '5 min', visible: true }
];

const CateringMenu = () => {
    const { template } = useTemplate();
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [menuItems, setMenuItems] = useState(DEFAULT_MENU_ITEMS);
    const [activeCategory, setActiveCategory] = useState('entradas');

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    const buttons = template?.buttons || defaultButtons;

    useEffect(() => {
        const storedCats = template?.texts?.['c_menu_category_'];
        if (storedCats) {
            try {
                const parsed = JSON.parse(storedCats);
                if (Array.isArray(parsed) && parsed.length > 0) setCategories(parsed);
            } catch (e) { }
        } else setCategories(DEFAULT_CATEGORIES);
    }, [template?.texts]);

    useEffect(() => {
        const storedItems = template?.texts?.['c_menu_item_'];
        if (storedItems) {
            try {
                const parsed = JSON.parse(storedItems);
                if (Array.isArray(parsed) && parsed.length > 0) setMenuItems(parsed);
            } catch (e) { }
        } else setMenuItems(DEFAULT_MENU_ITEMS);
    }, [template?.texts]);

    const currentItems = menuItems.filter(item => item.category === activeCategory && item.visible !== false);

    return (
        <section id="menu" className="section-padding" style={{ backgroundColor: sectionColors.featuresBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-bold mb-6" style={{ fontSize: typography.featuresTitleSize, color: sectionColors.featuresTitleColor }}>
                        <EditableText elementId="c_menu_title_1" defaultText="Nuestro" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                            <EditableText elementId="c_menu_title_2" defaultText="Menú" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl" style={{ color: sectionColors.bodyTextColor }}>
                        <EditableText elementId="c_menu_description" defaultText="Una selección de nuestros platos más destacados. Todos los menús son personalizables según tus preferencias." tag="span" />
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => {
                        if (cat.visible === false) return null;
                        const isActive = activeCategory === cat.name.toLowerCase().replace(/ /g, '');
                        return (
                            <button key={cat.id} onClick={() => setActiveCategory(cat.name.toLowerCase().replace(/ /g, ''))}
                                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${isActive ? 'text-white shadow-lg scale-105' : ''}`}
                                style={isActive ? { background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` } : { backgroundColor: sectionColors.featuresCardBackground, color: sectionColors.bodyTextColor }}>
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-3xl mx-auto">
                    {currentItems.map((item) => (
                        <div key={item.id} className="group rounded-2xl p-6 mb-4 shadow-md hover:shadow-xl transition-all hover:scale-[1.02]" style={{ backgroundColor: sectionColors.featuresCardBackground, borderLeft: `4px solid ${sectionColors.buttonPrimaryBackground}` }}>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>{item.name}</h3>
                                    <p className="mb-3" style={{ color: sectionColors.bodyTextColor }}>{item.description}</p>
                                    <div className="flex items-center space-x-4 text-sm">
                                        <span className="flex items-center" style={{ color: sectionColors.buttonPrimaryBackground }}><Clock className="w-4 h-4 mr-1" />{item.time}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>{item.price}</span>
                                    <p className="text-xs" style={{ color: sectionColors.bodyTextColor }}>por persona</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="mb-4" style={{ color: sectionColors.bodyTextColor }}><EditableText elementId="c_menu_note" defaultText="¿Tienes requisitos especiales? ¿Alergias o dietas específicas?" tag="span" /></p>
                    <a href={buttons.primary.url} target={buttons.primary.openInNewTab ? '_blank' : '_self'} className="inline-flex items-center border-2 font-semibold px-8 py-3 rounded-full transition-all" style={{ borderColor: sectionColors.buttonPrimaryBackground, color: sectionColors.buttonPrimaryBackground }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryBackground; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = sectionColors.buttonPrimaryBackground; }}>
                        <EditableText elementId="c_menu_button" defaultText="Solicitar menú personalizado" tag="span" /><ChevronRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CateringMenu;