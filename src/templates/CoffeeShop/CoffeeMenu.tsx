import { Cake, Clock, Coffee, CupSoda, Sandwich } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CoffeeMenu: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
    };
    const [activeCategory, setActiveCategory] = useState('coffee');

    const categories = [
        { id: 'coffee', name: 'Café', icon: <Coffee className="w-5 h-5" />, nameId: 'cf_cat_coffee' },
        { id: 'drinks', name: 'Bebidas', icon: <CupSoda className="w-5 h-5" />, nameId: 'cf_cat_drinks' },
        { id: 'food', name: 'Comidas', icon: <Sandwich className="w-5 h-5" />, nameId: 'cf_cat_food' },
        { id: 'desserts', name: 'Postres', icon: <Cake className="w-5 h-5" />, nameId: 'cf_cat_desserts' },
    ];

    const menuItems = {
        coffee: [
            { id: 'cf_item_1', nameId: 'cf_coffee_1_name', nameDefault: 'Espresso', descId: 'cf_coffee_1_desc', descDefault: 'Café puro y concentrado, intenso y aromático.', priceId: 'cf_coffee_1_price', priceDefault: '$450' },
            { id: 'cf_item_2', nameId: 'cf_coffee_2_name', nameDefault: 'Americano', descId: 'cf_coffee_2_desc', descDefault: 'Espresso con agua caliente, suave y equilibrado.', priceId: 'cf_coffee_2_price', priceDefault: '$500' },
            { id: 'cf_item_3', nameId: 'cf_coffee_3_name', nameDefault: 'Latte', descId: 'cf_coffee_3_desc', descDefault: 'Espresso con abundante leche vaporizada y una capa de espuma.', priceId: 'cf_coffee_3_price', priceDefault: '$650' },
            { id: 'cf_item_4', nameId: 'cf_coffee_4_name', nameDefault: 'Cappuccino', descId: 'cf_coffee_4_desc', descDefault: 'Espresso con leche y espuma de leche, espolvoreado con cacao.', priceId: 'cf_coffee_4_price', priceDefault: '$650' },
            { id: 'cf_item_5', nameId: 'cf_coffee_5_name', nameDefault: 'Mocha', descId: 'cf_coffee_5_desc', descDefault: 'Espresso con chocolate, leche y crema batida.', priceId: 'cf_coffee_5_price', priceDefault: '$750' },
            { id: 'cf_item_6', nameId: 'cf_coffee_6_name', nameDefault: 'Flat White', descId: 'cf_coffee_6_desc', descDefault: 'Espresso con microespuma de leche, cremoso y suave.', priceId: 'cf_coffee_6_price', priceDefault: '$700' },
        ],
        drinks: [
            { id: 'cf_item_7', nameId: 'cf_drink_1_name', nameDefault: 'Té', descId: 'cf_drink_1_desc', descDefault: 'Té negro, verde o de hierbas.', priceId: 'cf_drink_1_price', priceDefault: '$400' },
            { id: 'cf_item_8', nameId: 'cf_drink_2_name', nameDefault: 'Chocolate caliente', descId: 'cf_drink_2_desc', descDefault: 'Chocolate caliente cremoso con crema batida.', priceId: 'cf_drink_2_price', priceDefault: '$600' },
            { id: 'cf_item_9', nameId: 'cf_drink_3_name', nameDefault: 'Jugo natural', descId: 'cf_drink_3_desc', descDefault: 'Naranja, pomelo o multivitaminico.', priceId: 'cf_drink_3_price', priceDefault: '$550' },
            { id: 'cf_item_10', nameId: 'cf_drink_4_name', nameDefault: 'Limonada', descId: 'cf_drink_4_desc', descDefault: 'Limonada clásica o con menta y jengibre.', priceId: 'cf_drink_4_price', priceDefault: '$500' },
        ],
        food: [
            { id: 'cf_item_11', nameId: 'cf_food_1_name', nameDefault: 'Tostado', descId: 'cf_food_1_desc', descDefault: 'Pan de campo con jamón y queso.', priceId: 'cf_food_1_price', priceDefault: '$800' },
            { id: 'cf_item_12', nameId: 'cf_food_2_name', nameDefault: 'Medialunas', descId: 'cf_food_2_desc', descDefault: 'Docena de medialunas de manteca.', priceId: 'cf_food_2_price', priceDefault: '$1200' },
            { id: 'cf_item_13', nameId: 'cf_food_3_name', nameDefault: 'Sandwich de lomito', descId: 'cf_food_3_desc', descDefault: 'Lomito, jamón, queso, lechuga, tomate y huevo.', priceId: 'cf_food_3_price', priceDefault: '$1500' },
            { id: 'cf_item_14', nameId: 'cf_food_4_name', nameDefault: 'Ensalada', descId: 'cf_food_4_desc', descDefault: 'Ensalada mixta con pollo o atún.', priceId: 'cf_food_4_price', priceDefault: '$1100' },
        ],
        desserts: [
            { id: 'cf_item_15', nameId: 'cf_dessert_1_name', nameDefault: 'Cheesecake', descId: 'cf_dessert_1_desc', descDefault: 'Cheesecake con frutos rojos.', priceId: 'cf_dessert_1_price', priceDefault: '$750' },
            { id: 'cf_item_16', nameId: 'cf_dessert_2_name', nameDefault: 'Brownie', descId: 'cf_dessert_2_desc', descDefault: 'Brownie de chocolate con nueces.', priceId: 'cf_dessert_2_price', priceDefault: '$600' },
            { id: 'cf_item_17', nameId: 'cf_dessert_3_name', nameDefault: 'Alfajores', descId: 'cf_dessert_3_desc', descDefault: 'Alfajores de maicena o chocolate.', priceId: 'cf_dessert_3_price', priceDefault: '$250' },
            { id: 'cf_item_18', nameId: 'cf_dessert_4_name', nameDefault: 'Tarta de manzana', descId: 'cf_dessert_4_desc', descDefault: 'Tarta de manzana con helado.', priceId: 'cf_dessert_4_price', priceDefault: '$700' },
        ],
    };

    return (
        <section id="menu" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 dark:text-amber-100">
                        <EditableText
                            elementId="cf_menu_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="cf_menu_title_2"
                                defaultText="Menú"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-amber-700 dark:text-amber-300">
                        <EditableText
                            elementId="cf_menu_description"
                            defaultText="Selección de cafés, bebidas, comidas y postres para disfrutar en cualquier momento."
                            tag="span"
                        />
                    </p>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${activeCategory === cat.id
                                    ? 'text-white shadow-lg'
                                    : 'bg-amber-100 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-700'
                                }`}
                            style={activeCategory === cat.id ? { background: colors.primary } : {}}
                        >
                            <span>{cat.icon}</span>
                            <EditableText elementId={cat.nameId} defaultText={cat.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Items del menú */}
                <div className="max-w-4xl mx-auto">
                    {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
                        <div key={item.id} className="group p-6 mb-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                                        <EditableText elementId={item.nameId} defaultText={item.nameDefault} tag="span" />
                                    </h3>
                                    <p className="text-amber-700 dark:text-amber-300 mb-2">
                                        <EditableText elementId={item.descId} defaultText={item.descDefault} tag="span" />
                                    </p>
                                    <div className="flex items-center text-sm text-amber-500">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>10-15 min</span>
                                    </div>
                                </div>
                                <div className="text-right ml-4">
                                    <span className="text-2xl font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText elementId={item.priceId} defaultText={item.priceDefault} tag="span" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoffeeMenu;