import {
    Cake,
    ChefHat,
    PartyPopper,
    Truck,
    UtensilsCrossed,
    Wine
} from 'lucide-react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CateringFeatures = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
    };

    const features = [
        {
            icon: <UtensilsCrossed className="w-8 h-8" />,
            titleId: 'c_feature_title_buffet',
            titleDefault: 'Buffet Completo',
            descId: 'c_feature_desc_buffet',
            descDefault: 'Variedad de platos fríos y calientes para todos los gustos y necesidades dietéticas.',
            color: 'from-amber-500 to-amber-600',
        },
        {
            icon: <Wine className="w-8 h-8" />,
            titleId: 'c_feature_title_wine',
            titleDefault: 'Maridaje Profesional',
            descId: 'c_feature_desc_wine',
            descDefault: 'Selección de vinos y bebidas que complementan perfectamente cada plato.',
            color: 'from-orange-500 to-orange-600',
        },
        {
            icon: <Cake className="w-8 h-8" />,
            titleId: 'c_feature_title_desserts',
            titleDefault: 'Repostería Exquisita',
            descId: 'c_feature_desc_desserts',
            descDefault: 'Postres y tartas artesanales que endulzan cualquier celebración.',
            color: 'from-amber-600 to-orange-600',
        },
        {
            icon: <PartyPopper className="w-8 h-8" />,
            titleId: 'c_feature_title_events',
            titleDefault: 'Eventos Especiales',
            descId: 'c_feature_desc_events',
            descDefault: 'Bodas, cumpleaños, aniversarios y celebraciones corporativas.',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: <Truck className="w-8 h-8" />,
            titleId: 'c_feature_title_logistics',
            titleDefault: 'Logística Completa',
            descId: 'c_feature_desc_logistics',
            descDefault: 'Transporte, montaje y servicio de mesa incluidos en nuestros paquetes.',
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: <ChefHat className="w-8 h-8" />,
            titleId: 'c_feature_title_chefs',
            titleDefault: 'Chefs Expertos',
            descId: 'c_feature_desc_chefs',
            descDefault: 'Equipo de cocineros con formación internacional y pasión por la gastronomía.',
            color: 'from-orange-600 to-amber-700',
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 dark:text-amber-100">
                        <EditableText
                            elementId="c_features_title_1"
                            defaultText="Servicios de"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                            <EditableText
                                elementId="c_features_title_2"
                                defaultText="Catering Premium"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-amber-700 dark:text-amber-300">
                        <EditableText
                            elementId="c_features_description"
                            defaultText="Ofrecemos soluciones gastronómicas completas para todo tipo de eventos, con la más alta calidad y atención al detalle."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 hover:shadow-xl"
                            style={{ borderColor: `hover:${colors.primary}` }}
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className="w-full h-full rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center"
                                    style={{ color: colors.primary }}>
                                    {feature.icon}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-amber-900 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                <EditableText
                                    elementId={feature.titleId}
                                    defaultText={feature.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                                <EditableText
                                    elementId={feature.descId}
                                    defaultText={feature.descDefault}
                                    tag="span"
                                />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CateringFeatures;