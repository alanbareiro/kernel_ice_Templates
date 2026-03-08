import { Beef, Coffee, Fish, Flame, Leaf, Wine } from 'lucide-react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RestaurantSpecialties = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
    };

    const specialties = [
        {
            icon: <Beef className="w-8 h-8" />,
            image: '🥩',
            titleId: 'r_specialty_1_title',
            titleDefault: 'Carnes Premium',
            descId: 'r_specialty_1_desc',
            descDefault: 'Cortes seleccionados a la parrilla, punto exacto.',
        },
        {
            icon: <Fish className="w-8 h-8" />,
            image: '🐟',
            titleId: 'r_specialty_2_title',
            titleDefault: 'Pescados y Mariscos',
            descId: 'r_specialty_2_desc',
            descDefault: 'Frescura del día, preparaciones mediterráneas.',
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            image: '🍝',
            titleId: 'r_specialty_3_title',
            titleDefault: 'Pastas Artesanales',
            descId: 'r_specialty_3_desc',
            descDefault: 'Elaboración propia, salsas tradicionales.',
        },
        {
            icon: <Flame className="w-8 h-8" />,
            image: '🔥',
            titleId: 'r_specialty_4_title',
            titleDefault: 'Parrilla Abierta',
            descId: 'r_specialty_4_desc',
            descDefault: 'Cocina a la vista, experiencia única.',
        },
        {
            icon: <Coffee className="w-8 h-8" />,
            image: '🍰',
            titleId: 'r_specialty_5_title',
            titleDefault: 'Postres Caseros',
            descId: 'r_specialty_5_desc',
            descDefault: 'Recetas de la abuela, toque moderno.',
        },
        {
            icon: <Wine className="w-8 h-8" />,
            image: '🍷',
            titleId: 'r_specialty_6_title',
            titleDefault: 'Cava de Vinos',
            descId: 'r_specialty_6_desc',
            descDefault: 'Selección nacional e importada.',
        },
    ];

    return (
        <section id="specialties" className="section-padding bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-900 dark:text-red-100">
                        <EditableText
                            elementId="r_specialties_title_1"
                            defaultText="Nuestras"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="r_specialties_title_2"
                                defaultText="Especialidades"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-red-700 dark:text-red-300">
                        <EditableText
                            elementId="r_specialties_description"
                            defaultText="Platos que definen nuestra esencia, preparados con los mejores ingredientes y mucho amor."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialties.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-red-900/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Fondo decorativo */}
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 group-hover:scale-150 transition-transform duration-500"
                                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }} />

                            {/* Contenido */}
                            <div className="relative z-10">
                                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    {item.image}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-red-900 dark:text-red-100 group-hover:text-red-600 transition-colors">
                                    <EditableText
                                        elementId={item.titleId}
                                        defaultText={item.titleDefault}
                                        tag="span"
                                    />
                                </h3>
                                <p className="text-red-700 dark:text-red-300">
                                    <EditableText
                                        elementId={item.descId}
                                        defaultText={item.descDefault}
                                        tag="span"
                                    />
                                </p>
                            </div>

                            {/* Decoración hover */}
                            <div className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RestaurantSpecialties;