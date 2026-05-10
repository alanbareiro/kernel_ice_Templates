// src/templates/FoodTruck/FoodTruckMenu.tsx
import { Star } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const FoodTruckMenu: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [activeCategory, setActiveCategory] = useState('burgers');

    const categories = [
        { id: 'burgers', name: 'Hamburguesas', nameId: 'ft_cat_burgers' },
        { id: 'tacos', name: 'Tacos', nameId: 'ft_cat_tacos' },
        { id: 'sides', name: 'Acompañamientos', nameId: 'ft_cat_sides' },
        { id: 'drinks', name: 'Bebidas', nameId: 'ft_cat_drinks' },
    ];

    const menuImages = {
        burger1: defaultImages.foodtruck.burger1,
        burger2: defaultImages.foodtruck.burger2,
        burger3: defaultImages.foodtruck.burger3,
        taco1: defaultImages.foodtruck.taco1,
        taco2: defaultImages.foodtruck.taco2,
        side1: defaultImages.foodtruck.side1,
        drink1: defaultImages.foodtruck.drink1,
    };

    const menuItems = {
        burgers: [
            { id: 'ft_burger_1', nameId: 'ft_burger_1_name', nameDefault: 'Clásica', descId: 'ft_burger_1_desc', descDefault: 'Carne 150g, queso cheddar, lechuga, tomate y salsa especial.', priceId: 'ft_burger_1_price', priceDefault: '$1200', rating: 4.8, imageId: 'ft_burger_1_image', defaultImage: menuImages.burger1 },
            { id: 'ft_burger_2', nameId: 'ft_burger_2_name', nameDefault: 'Cheddar & Bacon', descId: 'ft_burger_2_desc', descDefault: 'Carne 150g, doble cheddar, panceta ahumada y cebolla caramelizada.', priceId: 'ft_burger_2_price', priceDefault: '$1500', rating: 5.0, imageId: 'ft_burger_2_image', defaultImage: menuImages.burger2 },
            { id: 'ft_burger_3', nameId: 'ft_burger_3_name', nameDefault: 'Criolla', descId: 'ft_burger_3_desc', descDefault: 'Carne 150g, provoleta, chimichurri, tomate y rúcula.', priceId: 'ft_burger_3_price', priceDefault: '$1400', rating: 4.9, imageId: 'ft_burger_3_image', defaultImage: menuImages.burger3 },
            { id: 'ft_burger_4', nameId: 'ft_burger_4_name', nameDefault: 'Veggie', descId: 'ft_burger_4_desc', descDefault: 'Medallón de lentejas y quinoa, queso vegano, palta y espinaca.', priceId: 'ft_burger_4_price', priceDefault: '$1300', rating: 4.7, imageId: 'ft_burger_4_image', defaultImage: menuImages.burger1 },
        ],
        tacos: [
            { id: 'ft_taco_1', nameId: 'ft_taco_1_name', nameDefault: 'Tacos al pastor', descId: 'ft_taco_1_desc', descDefault: 'Tortilla de maíz, cerdo adobado, piña, cebolla y cilantro.', priceId: 'ft_taco_1_price', priceDefault: '$800 (x3)', rating: 4.9, imageId: 'ft_taco_1_image', defaultImage: menuImages.taco1 },
            { id: 'ft_taco_2', nameId: 'ft_taco_2_name', nameDefault: 'Tacos de carne', descId: 'ft_taco_2_desc', descDefault: 'Tortilla de maíz, carne desmechada, salsa verde y queso fresco.', priceId: 'ft_taco_2_price', priceDefault: '$850 (x3)', rating: 4.8, imageId: 'ft_taco_2_image', defaultImage: menuImages.taco2 },
            { id: 'ft_taco_3', nameId: 'ft_taco_3_name', nameDefault: 'Tacos de pollo', descId: 'ft_taco_3_desc', descDefault: 'Tortilla de maíz, pollo marinado, repollo morado y salsa chipotle.', priceId: 'ft_taco_3_price', priceDefault: '$800 (x3)', rating: 4.7, imageId: 'ft_taco_3_image', defaultImage: menuImages.taco1 },
        ],
        sides: [
            { id: 'ft_side_1', nameId: 'ft_side_1_name', nameDefault: 'Papas fritas', descId: 'ft_side_1_desc', descDefault: 'Papas rústicas con cheddar y panceta.', priceId: 'ft_side_1_price', priceDefault: '$600', rating: 4.8, imageId: 'ft_side_1_image', defaultImage: menuImages.side1 },
            { id: 'ft_side_2', nameId: 'ft_side_2_name', nameDefault: 'Aros de cebolla', descId: 'ft_side_2_desc', descDefault: 'Aros de cebolla rebozados, crujientes y dorados.', priceId: 'ft_side_2_price', priceDefault: '$550', rating: 4.7, imageId: 'ft_side_2_image', defaultImage: menuImages.side1 },
            { id: 'ft_side_3', nameId: 'ft_side_3_name', nameDefault: 'Ensalada fresca', descId: 'ft_side_3_desc', descDefault: 'Mezcla de hojas verdes, tomate, palta y vinagreta.', priceId: 'ft_side_3_price', priceDefault: '$450', rating: 4.6, imageId: 'ft_side_3_image', defaultImage: menuImages.side1 },
        ],
        drinks: [
            { id: 'ft_drink_1', nameId: 'ft_drink_1_name', nameDefault: 'Cerveza artesanal', descId: 'ft_drink_1_desc', descDefault: 'IPA, rubia o negra.', priceId: 'ft_drink_1_price', priceDefault: '$400', rating: 4.9, imageId: 'ft_drink_1_image', defaultImage: menuImages.drink1 },
            { id: 'ft_drink_2', nameId: 'ft_drink_2_name', nameDefault: 'Gaseosa', descId: 'ft_drink_2_desc', descDefault: 'Lata 355ml.', priceId: 'ft_drink_2_price', priceDefault: '$250', rating: 4.5, imageId: 'ft_drink_2_image', defaultImage: menuImages.drink1 },
            { id: 'ft_drink_3', nameId: 'ft_drink_3_name', nameDefault: 'Agua saborizada', descId: 'ft_drink_3_desc', descDefault: 'Pomelo, limón o frutos rojos.', priceId: 'ft_drink_3_price', priceDefault: '$200', rating: 4.6, imageId: 'ft_drink_3_image', defaultImage: menuImages.drink1 },
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
                        <EditableText elementId="ft_menu_title_1" defaultText="Nuestro" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="ft_menu_title_2" defaultText="Menú" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="ft_menu_description" defaultText="Comida callejera gourmet, hecha al momento con ingredientes frescos." tag="span" />
                    </p>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCategory === cat.id ? 'text-white shadow-lg' : ''
                                }`}
                            style={
                                activeCategory === cat.id
                                    ? { background: sectionColors.buttonPrimaryBackground }
                                    : {
                                        backgroundColor: sectionColors.featuresCardBackground,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            <EditableText elementId={cat.nameId} defaultText={cat.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Grid de productos */}
                <div className="grid md:grid-cols-2 gap-6">
                    {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
                        <div
                            key={item.id}
                            className="flex rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <div className="w-32 h-32 flex-shrink-0">
                                <EditableImage elementId={item.imageId} defaultImage={item.defaultImage} alt={item.nameDefault} className="w-full h-full object-cover" category="foodtruck" />
                            </div>
                            <div className="flex-1 p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3
                                        className="text-lg font-bold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText elementId={item.nameId} defaultText={item.nameDefault} tag="span" />
                                    </h3>
                                    <span
                                        className="text-lg font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText elementId={item.priceId} defaultText={item.priceDefault} tag="span" />
                                    </span>
                                </div>
                                <p
                                    className="text-sm mb-2"
                                    style={{ color: sectionColors.bodyTextColor }}
                                >
                                    <EditableText elementId={item.descId} defaultText={item.descDefault} tag="span" />
                                </p>
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span style={{ color: sectionColors.bodyTextColor }}>{item.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FoodTruckMenu;