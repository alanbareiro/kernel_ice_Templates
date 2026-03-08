
import { Star } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const FoodTruckMenu: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
    };
    const [activeCategory, setActiveCategory] = useState('burgers');

    const categories = [
        { id: 'burgers', name: 'Hamburguesas', nameId: 'ft_cat_burgers' },
        { id: 'tacos', name: 'Tacos', nameId: 'ft_cat_tacos' },
        { id: 'sides', name: 'Acompañamientos', nameId: 'ft_cat_sides' },
        { id: 'drinks', name: 'Bebidas', nameId: 'ft_cat_drinks' },
    ];

    const menuItems = {
        burgers: [
            { id: 'ft_burger_1', nameId: 'ft_burger_1_name', nameDefault: 'Clásica', descId: 'ft_burger_1_desc', descDefault: 'Carne 150g, queso cheddar, lechuga, tomate y salsa especial.', priceId: 'ft_burger_1_price', priceDefault: '$1200', rating: 4.8, imageId: 'ft_burger_1_image' },
            { id: 'ft_burger_2', nameId: 'ft_burger_2_name', nameDefault: 'Cheddar & Bacon', descId: 'ft_burger_2_desc', descDefault: 'Carne 150g, doble cheddar, panceta ahumada y cebolla caramelizada.', priceId: 'ft_burger_2_price', priceDefault: '$1500', rating: 5.0, imageId: 'ft_burger_2_image' },
            { id: 'ft_burger_3', nameId: 'ft_burger_3_name', nameDefault: 'Criolla', descId: 'ft_burger_3_desc', descDefault: 'Carne 150g, provoleta, chimichurri, tomate y rúcula.', priceId: 'ft_burger_3_price', priceDefault: '$1400', rating: 4.9, imageId: 'ft_burger_3_image' },
            { id: 'ft_burger_4', nameId: 'ft_burger_4_name', nameDefault: 'Veggie', descId: 'ft_burger_4_desc', descDefault: 'Medallón de lentejas y quinoa, queso vegano, palta y espinaca.', priceId: 'ft_burger_4_price', priceDefault: '$1300', rating: 4.7, imageId: 'ft_burger_4_image' },
        ],
        tacos: [
            { id: 'ft_taco_1', nameId: 'ft_taco_1_name', nameDefault: 'Tacos al pastor', descId: 'ft_taco_1_desc', descDefault: 'Tortilla de maíz, cerdo adobado, piña, cebolla y cilantro.', priceId: 'ft_taco_1_price', priceDefault: '$800 (x3)', rating: 4.9, imageId: 'ft_taco_1_image' },
            { id: 'ft_taco_2', nameId: 'ft_taco_2_name', nameDefault: 'Tacos de carne', descId: 'ft_taco_2_desc', descDefault: 'Tortilla de maíz, carne desmechada, salsa verde y queso fresco.', priceId: 'ft_taco_2_price', priceDefault: '$850 (x3)', rating: 4.8, imageId: 'ft_taco_2_image' },
            { id: 'ft_taco_3', nameId: 'ft_taco_3_name', nameDefault: 'Tacos de pollo', descId: 'ft_taco_3_desc', descDefault: 'Tortilla de maíz, pollo marinado, repollo morado y salsa chipotle.', priceId: 'ft_taco_3_price', priceDefault: '$800 (x3)', rating: 4.7, imageId: 'ft_taco_3_image' },
        ],
        sides: [
            { id: 'ft_side_1', nameId: 'ft_side_1_name', nameDefault: 'Papas fritas', descId: 'ft_side_1_desc', descDefault: 'Papas rústicas con cheddar y panceta.', priceId: 'ft_side_1_price', priceDefault: '$600', rating: 4.8, imageId: 'ft_side_1_image' },
            { id: 'ft_side_2', nameId: 'ft_side_2_name', nameDefault: 'Aros de cebolla', descId: 'ft_side_2_desc', descDefault: 'Aros de cebolla rebozados, crujientes y dorados.', priceId: 'ft_side_2_price', priceDefault: '$550', rating: 4.7, imageId: 'ft_side_2_image' },
            { id: 'ft_side_3', nameId: 'ft_side_3_name', nameDefault: 'Ensalada fresca', descId: 'ft_side_3_desc', descDefault: 'Mezcla de hojas verdes, tomate, palta y vinagreta.', priceId: 'ft_side_3_price', priceDefault: '$450', rating: 4.6, imageId: 'ft_side_3_image' },
        ],
        drinks: [
            { id: 'ft_drink_1', nameId: 'ft_drink_1_name', nameDefault: 'Cerveza artesanal', descId: 'ft_drink_1_desc', descDefault: 'IPA, rubia o negra.', priceId: 'ft_drink_1_price', priceDefault: '$400', rating: 4.9, imageId: 'ft_drink_1_image' },
            { id: 'ft_drink_2', nameId: 'ft_drink_2_name', nameDefault: 'Gaseosa', descId: 'ft_drink_2_desc', descDefault: 'Lata 355ml.', priceId: 'ft_drink_2_price', priceDefault: '$250', rating: 4.5, imageId: 'ft_drink_2_image' },
            { id: 'ft_drink_3', nameId: 'ft_drink_3_name', nameDefault: 'Agua saborizada', descId: 'ft_drink_3_desc', descDefault: 'Pomelo, limón o frutos rojos.', priceId: 'ft_drink_3_price', priceDefault: '$200', rating: 4.6, imageId: 'ft_drink_3_image' },
        ],
    };

    return (
        <section id="menu" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900 dark:text-orange-100">
                        <EditableText elementId="ft_menu_title_1" defaultText="Nuestro" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="ft_menu_title_2" defaultText="Menú" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-orange-700 dark:text-orange-300">
                        <EditableText elementId="ft_menu_description" defaultText="Comida callejera gourmet, hecha al momento con ingredientes frescos." tag="span" />
                    </p>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCategory === cat.id
                                    ? 'text-white shadow-lg'
                                    : 'bg-orange-100 dark:bg-orange-800/50 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-700'
                                }`}
                            style={activeCategory === cat.id ? { background: colors.primary } : {}}
                        >
                            <EditableText elementId={cat.nameId} defaultText={cat.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Grid de productos */}
                <div className="grid md:grid-cols-2 gap-6">
                    {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
                        <div key={item.id} className="flex bg-orange-50 dark:bg-orange-900/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                            <div className="w-32 h-32 flex-shrink-0">
                                <EditableImage elementId={item.imageId} defaultImage="" alt={item.nameDefault} className="w-full h-full object-cover" category="foodtruck" />
                            </div>
                            <div className="flex-1 p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">
                                        <EditableText elementId={item.nameId} defaultText={item.nameDefault} tag="span" />
                                    </h3>
                                    <span className="text-lg font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText elementId={item.priceId} defaultText={item.priceDefault} tag="span" />
                                    </span>
                                </div>
                                <p className="text-sm text-orange-600 dark:text-orange-400 mb-2">
                                    <EditableText elementId={item.descId} defaultText={item.descDefault} tag="span" />
                                </p>
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="text-orange-700 dark:text-orange-300">{item.rating}</span>
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