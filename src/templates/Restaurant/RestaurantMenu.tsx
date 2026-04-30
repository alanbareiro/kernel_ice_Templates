// src/templates/Restaurant/RestaurantMenu.tsx
import { Clock } from 'lucide-react';
import { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

type MenuItem = {
    nameId: string;
    nameDefault: string;
    descId: string;
    descDefault: string;
    priceId: string;
    priceDefault: string;
    chefPick?: boolean;
    unitId?: string;
    unitDefault?: string;
};

const RestaurantMenu = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [activeCategory, setActiveCategory] = useState('entradas');

    const categories = [
        { id: 'entradas', name: 'Entradas', icon: '🥗', nameId: 'r_category_entradas' },
        { id: 'principales', name: 'Platos Principales', icon: '🍖', nameId: 'r_category_principales' },
        { id: 'pastas', name: 'Pastas', icon: '🍝', nameId: 'r_category_pastas' },
        { id: 'postres', name: 'Postres', icon: '🍰', nameId: 'r_category_postres' },
        { id: 'bebidas', name: 'Bebidas', icon: '🍷', nameId: 'r_category_bebidas' },
    ];

    const menuItems: Record<string, MenuItem[]> = {
        entradas: [
            {
                nameId: 'r_menu_entrada_1_name',
                nameDefault: 'Provoleta a la parrilla',
                descId: 'r_menu_entrada_1_desc',
                descDefault: 'Queso provolone con orégano y ají molido',
                priceId: 'r_menu_entrada_1_price',
                priceDefault: '$4.500',
                chefPick: true
            },
            // ... resto de entradas
        ],
        // ... resto de categorías
    };

    return (
        <section
            id="menu"
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        className="font-bold mb-6"
                        style={{
                            fontSize: typography.sectionTitleSize,
                            color: sectionColors.featuresTitleColor
                        }}
                    >
                        <EditableText
                            elementId="r_menu_title_1"
                            defaultText="Nuestra"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="r_menu_title_2"
                                defaultText="Carta"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="r_menu_description"
                            defaultText="Selección de platos que cambian según la temporada, manteniendo nuestra esencia tradicional."
                            tag="span"
                        />
                    </p>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${activeCategory === category.id
                                    ? 'text-white shadow-lg scale-105'
                                    : 'hover:scale-105'
                                }`}
                            style={
                                activeCategory === category.id
                                    ? { background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }
                                    : {
                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            <span className="text-xl">{category.icon}</span>
                            <EditableText
                                elementId={category.nameId}
                                defaultText={category.name}
                                tag="span"
                            />
                        </button>
                    ))}
                </div>

                {/* Items del menú */}
                <div className="max-w-3xl mx-auto">
                    {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl p-6 mb-4 hover:shadow-xl transition-all hover:scale-[1.02]"
                            style={{
                                backgroundColor: `${sectionColors.buttonPrimaryBackground}08`,
                            }}
                        >
                            {item.chefPick && (
                                <div
                                    className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg text-white"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <span>👨‍🍳 Recomendación del chef</span>
                                </div>
                            )}

                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3
                                        className="text-xl font-bold mb-2 transition-colors"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId={item.nameId}
                                            defaultText={item.nameDefault}
                                            tag="span"
                                        />
                                    </h3>
                                    <p
                                        className="mb-3"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
                                        <EditableText
                                            elementId={item.descId}
                                            defaultText={item.descDefault}
                                            tag="span"
                                        />
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            15-20 min
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right ml-4">
                                    <span
                                        className="text-3xl font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText
                                            elementId={item.priceId}
                                            defaultText={item.priceDefault}
                                            tag="span"
                                        />
                                    </span>
                                    {item.unitId && item.unitDefault && (
                                        <p className="text-xs" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                            <EditableText
                                                elementId={item.unitId}
                                                defaultText={item.unitDefault}
                                                tag="span"
                                            />
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Línea decorativa */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                            />
                        </div>
                    ))}
                </div>

                {/* Nota */}
                <div
                    className="mt-12 text-center p-8 rounded-3xl"
                    style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}
                >
                    <p className="text-lg italic" style={{ color: sectionColors.bodyTextColor }}>
                        <EditableText
                            elementId="r_menu_note"
                            defaultText="Nuestra carta se renueva constantemente con ingredientes de temporada. Consultá por nuestras sugerencias del día."
                            tag="span"
                        />
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RestaurantMenu;