// src/templates/Catering/CateringMenu.tsx
import { ChevronRight, Clock } from 'lucide-react';
import { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const CateringMenu = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    const buttons = template?.buttons || defaultButtons;

    const [activeCategory, setActiveCategory] = useState('entradas');

    const categories = [
        { id: 'entradas', name: 'Entradas', icon: '🥗', nameId: 'c_category_entradas' },
        { id: 'principales', name: 'Platos Principales', icon: '🍖', nameId: 'c_category_principales' },
        { id: 'postres', name: 'Postres', icon: '🍰', nameId: 'c_category_postres' },
        { id: 'bebidas', name: 'Bebidas', icon: '🍷', nameId: 'c_category_bebidas' },
    ];

    const menuItems = {
        entradas: [
            {
                nameId: 'c_menu_entrada_1_name',
                nameDefault: 'Bruschettas de tomate y albahaca',
                descId: 'c_menu_entrada_1_desc',
                descDefault: 'Pan artesanal con tomate fresco, albahaca y aceite de oliva',
                priceId: 'c_menu_entrada_1_price',
                priceDefault: '$12',
                time: '10 min'
            },
            {
                nameId: 'c_menu_entrada_2_name',
                nameDefault: 'Carpaccio de res',
                descId: 'c_menu_entrada_2_desc',
                descDefault: 'Finas láminas de res con alcaparras, parmesano y mostaza',
                priceId: 'c_menu_entrada_2_price',
                priceDefault: '$15',
                time: '15 min'
            },
            {
                nameId: 'c_menu_entrada_3_name',
                nameDefault: 'Langostinos al ajillo',
                descId: 'c_menu_entrada_3_desc',
                descDefault: 'Langostinos salteados con ajo, perejil y vino blanco',
                priceId: 'c_menu_entrada_3_price',
                priceDefault: '$18',
                time: '12 min'
            },
        ],
        principales: [
            {
                nameId: 'c_menu_principal_1_name',
                nameDefault: 'Salmón a la plancha',
                descId: 'c_menu_principal_1_desc',
                descDefault: 'Salmón con costra de hierbas, puré de papas y espárragos',
                priceId: 'c_menu_principal_1_price',
                priceDefault: '$28',
                time: '25 min'
            },
            {
                nameId: 'c_menu_principal_2_name',
                nameDefault: 'Risotto de hongos',
                descId: 'c_menu_principal_2_desc',
                descDefault: 'Risotto cremoso con hongos silvestres y parmesano',
                priceId: 'c_menu_principal_2_price',
                priceDefault: '$22',
                time: '20 min'
            },
            {
                nameId: 'c_menu_principal_3_name',
                nameDefault: 'Lomo saltado',
                descId: 'c_menu_principal_3_desc',
                descDefault: 'Tiras de lomo salteadas con cebolla, tomate y papas fritas',
                priceId: 'c_menu_principal_3_price',
                priceDefault: '$25',
                time: '20 min'
            },
        ],
        postres: [
            {
                nameId: 'c_menu_postre_1_name',
                nameDefault: 'Tiramisú',
                descId: 'c_menu_postre_1_desc',
                descDefault: 'Clásico postre italiano con mascarpone, café y cacao',
                priceId: 'c_menu_postre_1_price',
                priceDefault: '$10',
                time: '5 min'
            },
            {
                nameId: 'c_menu_postre_2_name',
                nameDefault: 'Volcán de chocolate',
                descId: 'c_menu_postre_2_desc',
                descDefault: 'Bizcocho de chocolate con corazón fundido',
                priceId: 'c_menu_postre_2_price',
                priceDefault: '$12',
                time: '8 min'
            },
            {
                nameId: 'c_menu_postre_3_name',
                nameDefault: 'Cheesecake de frutos rojos',
                descId: 'c_menu_postre_3_desc',
                descDefault: 'Tarta de queso con coulis de frutos rojos',
                priceId: 'c_menu_postre_3_price',
                priceDefault: '$11',
                time: '5 min'
            },
        ],
        bebidas: [
            {
                nameId: 'c_menu_bebida_1_name',
                nameDefault: 'Vino tinto reserva',
                descId: 'c_menu_bebida_1_desc',
                descDefault: 'Malbec argentino con notas de frutos rojos',
                priceId: 'c_menu_bebida_1_price',
                priceDefault: '$35',
                time: '5 min'
            },
            {
                nameId: 'c_menu_bebida_2_name',
                nameDefault: 'Coctelería premium',
                descId: 'c_menu_bebida_2_desc',
                descDefault: 'Cócteles clásicos y de autor',
                priceId: 'c_menu_bebida_2_price',
                priceDefault: '$15',
                time: '10 min'
            },
            {
                nameId: 'c_menu_bebida_3_name',
                nameDefault: 'Agua saborizada',
                descId: 'c_menu_bebida_3_desc',
                descDefault: 'Agua con frutas y hierbas frescas',
                priceId: 'c_menu_bebida_3_price',
                priceDefault: '$8',
                time: '5 min'
            },
        ],
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
                            elementId="c_menu_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="c_menu_title_2"
                                defaultText="Menú"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="c_menu_description"
                            defaultText="Una selección de nuestros platos más destacados. Todos los menús son personalizables según tus preferencias."
                            tag="span"
                        />
                    </p>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${activeCategory === category.id ? 'text-white shadow-lg scale-105' : ''
                                }`}
                            style={
                                activeCategory === category.id
                                    ? { background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }
                                    : {
                                        backgroundColor: sectionColors.featuresCardBackground,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            <span>{category.icon}</span>
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
                            className="group rounded-2xl p-6 mb-4 shadow-md hover:shadow-xl transition-all hover:scale-[1.02]"
                            style={{
                                backgroundColor: sectionColors.featuresCardBackground,
                                borderLeft: `4px solid ${sectionColors.buttonPrimaryBackground}`
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3
                                        className="text-xl font-bold mb-2"
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
                                    <div className="flex items-center space-x-4 text-sm">
                                        <span className="flex items-center" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                            <Clock className="w-4 h-4 mr-1" />
                                            {item.time}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span
                                        className="text-2xl font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText
                                            elementId={item.priceId}
                                            defaultText={item.priceDefault}
                                            tag="span"
                                        />
                                    </span>
                                    <p className="text-xs" style={{ color: sectionColors.bodyTextColor }}>por persona</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nota adicional */}
                <div className="mt-12 text-center">
                    <p
                        className="mb-4"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="c_menu_note"
                            defaultText="¿Tienes requisitos especiales? ¿Alergias o dietas específicas?"
                            tag="span"
                        />
                    </p>
                    <a
                        href={buttons.primary.url}
                        target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                        className="inline-flex items-center border-2 font-semibold px-8 py-3 rounded-full transition-all"
                        style={{
                            borderColor: sectionColors.buttonPrimaryBackground,
                            color: sectionColors.buttonPrimaryBackground
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryBackground;
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = sectionColors.buttonPrimaryBackground;
                        }}
                    >
                        <EditableText
                            elementId="c_menu_button"
                            defaultText="Solicitar menú personalizado"
                            tag="span"
                        />
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CateringMenu;