import { Clock } from 'lucide-react';
import { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

// Definir un tipo para los items del menú
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
    const colors = template?.colors || {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
    };
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
            {
                nameId: 'r_menu_entrada_2_name',
                nameDefault: 'Jamón crudo con burrata',
                descId: 'r_menu_entrada_2_desc',
                descDefault: 'Jamón crudo italiano, burrata, rúcula y tomates cherrys',
                priceId: 'r_menu_entrada_2_price',
                priceDefault: '$6.200'
            },
            {
                nameId: 'r_menu_entrada_3_name',
                nameDefault: 'Rabas a la Provenzal',
                descId: 'r_menu_entrada_3_desc',
                descDefault: 'Aros de calamar salteados con ajo y perejil',
                priceId: 'r_menu_entrada_3_price',
                priceDefault: '$5.800'
            },
            {
                nameId: 'r_menu_entrada_4_name',
                nameDefault: 'Empanadas criollas',
                descId: 'r_menu_entrada_4_desc',
                descDefault: 'Carne cortada a cuchillo, pollo o humita',
                priceId: 'r_menu_entrada_4_price',
                priceDefault: '$2.500',
                unitId: 'r_menu_entrada_4_unit',
                unitDefault: 'c/u'
            },
        ],
        principales: [
            {
                nameId: 'r_menu_principal_1_name',
                nameDefault: 'Bife de chorizo',
                descId: 'r_menu_principal_1_desc',
                descDefault: '300g de carne premium, guarnición a elección',
                priceId: 'r_menu_principal_1_price',
                priceDefault: '$9.500',
                chefPick: true
            },
            {
                nameId: 'r_menu_principal_2_name',
                nameDefault: 'Salmón a la plancha',
                descId: 'r_menu_principal_2_desc',
                descDefault: 'Con puré de batata y espárragos grillados',
                priceId: 'r_menu_principal_2_price',
                priceDefault: '$8.900'
            },
            {
                nameId: 'r_menu_principal_3_name',
                nameDefault: 'Risotto de hongos',
                descId: 'r_menu_principal_3_desc',
                descDefault: 'Arroz cremoso con hongos silvestres y parmesano',
                priceId: 'r_menu_principal_3_price',
                priceDefault: '$7.200'
            },
            {
                nameId: 'r_menu_principal_4_name',
                nameDefault: 'Matambre a la pizza',
                descId: 'r_menu_principal_4_desc',
                descDefault: 'Matambre tierno con salsa, muzzarella y aceitunas',
                priceId: 'r_menu_principal_4_price',
                priceDefault: '$8.200'
            },
        ],
        pastas: [
            {
                nameId: 'r_menu_pasta_1_name',
                nameDefault: 'Sorrentinos de salmón',
                descId: 'r_menu_pasta_1_desc',
                descDefault: 'Con salsa rosa y toque de vodka',
                priceId: 'r_menu_pasta_1_price',
                priceDefault: '$7.800',
                chefPick: true
            },
            {
                nameId: 'r_menu_pasta_2_name',
                nameDefault: 'Ñoquis de papa',
                descId: 'r_menu_pasta_2_desc',
                descDefault: 'Con salsa bolognesa o estofado',
                priceId: 'r_menu_pasta_2_price',
                priceDefault: '$6.500'
            },
            {
                nameId: 'r_menu_pasta_3_name',
                nameDefault: 'Ravioles de ricotta',
                descId: 'r_menu_pasta_3_desc',
                descDefault: 'Con salsa filetto, pesto o crema',
                priceId: 'r_menu_pasta_3_price',
                priceDefault: '$6.800'
            },
            {
                nameId: 'r_menu_pasta_4_name',
                nameDefault: 'Tallarines al huevo',
                descId: 'r_menu_pasta_4_desc',
                descDefault: 'Con salsa de hongos o mariscos',
                priceId: 'r_menu_pasta_4_price',
                priceDefault: '$7.200'
            },
        ],
        postres: [
            {
                nameId: 'r_menu_postre_1_name',
                nameDefault: 'Flan casero',
                descId: 'r_menu_postre_1_desc',
                descDefault: 'Con dulce de leche y crema',
                priceId: 'r_menu_postre_1_price',
                priceDefault: '$3.500',
                chefPick: true
            },
            {
                nameId: 'r_menu_postre_2_name',
                nameDefault: 'Volcán de chocolate',
                descId: 'r_menu_postre_2_desc',
                descDefault: 'Con helado de americana',
                priceId: 'r_menu_postre_2_price',
                priceDefault: '$4.200'
            },
            {
                nameId: 'r_menu_postre_3_name',
                nameDefault: 'Panqueques de manzana',
                descId: 'r_menu_postre_3_desc',
                descDefault: 'Con helado y salsa de dulce de leche',
                priceId: 'r_menu_postre_3_price',
                priceDefault: '$3.900'
            },
            {
                nameId: 'r_menu_postre_4_name',
                nameDefault: 'Ensalada de frutas',
                descId: 'r_menu_postre_4_desc',
                descDefault: 'Frutas de estación con granola y yogur',
                priceId: 'r_menu_postre_4_price',
                priceDefault: '$3.200'
            },
        ],
        bebidas: [
            {
                nameId: 'r_menu_bebida_1_name',
                nameDefault: 'Vino Malbec',
                descId: 'r_menu_bebida_1_desc',
                descDefault: 'Reserva, bodega Catena Zapata',
                priceId: 'r_menu_bebida_1_price',
                priceDefault: '$12.500'
            },
            {
                nameId: 'r_menu_bebida_2_name',
                nameDefault: 'Cerveza artesanal',
                descId: 'r_menu_bebida_2_desc',
                descDefault: 'Rubia, roja o negra',
                priceId: 'r_menu_bebida_2_price',
                priceDefault: '$2.800'
            },
            {
                nameId: 'r_menu_bebida_3_name',
                nameDefault: 'Coctelería',
                descId: 'r_menu_bebida_3_desc',
                descDefault: 'Clásicos y de autor',
                priceId: 'r_menu_bebida_3_price',
                priceDefault: '$3.500'
            },
            {
                nameId: 'r_menu_bebida_4_name',
                nameDefault: 'Agua saborizada',
                descId: 'r_menu_bebida_4_desc',
                descDefault: 'Pomelo, limón o frutos rojos',
                priceId: 'r_menu_bebida_4_price',
                priceDefault: '$2.200'
            },
        ],
    };

    return (
        <section id="menu" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-900 dark:text-red-100">
                        <EditableText
                            elementId="r_menu_title_1"
                            defaultText="Nuestra"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="r_menu_title_2"
                                defaultText="Carta"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-red-700 dark:text-red-300">
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
                                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50'
                                }`}
                            style={activeCategory === category.id ? { background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` } : {}}
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
                            className="group relative bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 mb-4 hover:shadow-xl transition-all hover:scale-[1.02]"
                        >
                            {item.chefPick && (
                                <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg text-white"
                                    style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <span>👨‍🍳 Recomendación del chef</span>
                                </div>
                            )}

                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2 group-hover:text-red-600 transition-colors">
                                        <EditableText
                                            elementId={item.nameId}
                                            defaultText={item.nameDefault}
                                            tag="span"
                                        />
                                    </h3>
                                    <p className="text-red-700 dark:text-red-300 mb-3">
                                        <EditableText
                                            elementId={item.descId}
                                            defaultText={item.descDefault}
                                            tag="span"
                                        />
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-red-500 dark:text-red-400">
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            15-20 min
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right ml-4">
                                    <span className="text-3xl font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText
                                            elementId={item.priceId}
                                            defaultText={item.priceDefault}
                                            tag="span"
                                        />
                                    </span>
                                    {item.unitId && item.unitDefault &&(
                                        <p className="text-xs text-red-500 dark:text-red-400">
                                            <EditableText
                                                elementId={item.unitId}
                                                defaultText={item.unitDefault || ''}
                                                tag="span"
                                            />
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Línea decorativa */}
                            <div className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }} />
                        </div>
                    ))}
                </div>

                {/* Nota */}
                <div className="mt-12 text-center p-8 rounded-3xl"
                    style={{ backgroundColor: `${colors.primary}10` }}>
                    <p className="text-red-800 dark:text-red-200 text-lg italic">
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