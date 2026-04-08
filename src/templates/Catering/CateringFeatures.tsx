// src/templates/Catering/CateringFeatures.tsx
import {
    Cake,
    ChefHat,
    PartyPopper,
    Truck,
    UtensilsCrossed,
    Wine
} from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const CateringFeatures = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const features = [
        {
            icon: <UtensilsCrossed className="w-8 h-8" />,
            titleId: 'c_feature_title_buffet',
            titleDefault: 'Buffet Completo',
            descId: 'c_feature_desc_buffet',
            descDefault: 'Variedad de platos fríos y calientes para todos los gustos y necesidades dietéticas.',
        },
        {
            icon: <Wine className="w-8 h-8" />,
            titleId: 'c_feature_title_wine',
            titleDefault: 'Maridaje Profesional',
            descId: 'c_feature_desc_wine',
            descDefault: 'Selección de vinos y bebidas que complementan perfectamente cada plato.',
        },
        {
            icon: <Cake className="w-8 h-8" />,
            titleId: 'c_feature_title_desserts',
            titleDefault: 'Repostería Exquisita',
            descId: 'c_feature_desc_desserts',
            descDefault: 'Postres y tartas artesanales que endulzan cualquier celebración.',
        },
        {
            icon: <PartyPopper className="w-8 h-8" />,
            titleId: 'c_feature_title_events',
            titleDefault: 'Eventos Especiales',
            descId: 'c_feature_desc_events',
            descDefault: 'Bodas, cumpleaños, aniversarios y celebraciones corporativas.',
        },
        {
            icon: <Truck className="w-8 h-8" />,
            titleId: 'c_feature_title_logistics',
            titleDefault: 'Logística Completa',
            descId: 'c_feature_desc_logistics',
            descDefault: 'Transporte, montaje y servicio de mesa incluidos en nuestros paquetes.',
        },
        {
            icon: <ChefHat className="w-8 h-8" />,
            titleId: 'c_feature_title_chefs',
            titleDefault: 'Chefs Expertos',
            descId: 'c_feature_desc_chefs',
            descDefault: 'Equipo de cocineros con formación internacional y pasión por la gastronomía.',
        },
    ];

    return (
        <section
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
                            elementId="c_features_title_1"
                            defaultText="Servicios de"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="c_features_title_2"
                                defaultText="Catering Premium"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
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
                            className="group p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: sectionColors.featuresCardBackground,
                                borderColor: sectionColors.featuresCardBorder,
                            }}
                        >
                            <div
                                className="w-16 h-16 rounded-xl p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}
                            >
                                <div
                                    className="w-full h-full rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: sectionColors.featuresCardBackground, color: sectionColors.buttonPrimaryBackground }}
                                >
                                    {feature.icon}
                                </div>
                            </div>

                            <h3
                                className="text-2xl font-bold mb-3 group-hover:text-amber-600 transition-colors"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={feature.titleId}
                                    defaultText={feature.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p className="leading-relaxed" style={{ color: sectionColors.bodyTextColor }}>
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