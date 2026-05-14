import { Cake, ChefHat, PartyPopper, Truck, UtensilsCrossed, Wine } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = { UtensilsCrossed, Wine, Cake, PartyPopper, Truck, ChefHat };

const DEFAULT_FEATURES = [
    { id: 'default_1', icon: 'UtensilsCrossed', title: 'Buffet Completo', description: 'Variedad de platos fríos y calientes para todos los gustos y necesidades dietéticas.', visible: true },
    { id: 'default_2', icon: 'Wine', title: 'Maridaje Profesional', description: 'Selección de vinos y bebidas que complementan perfectamente cada plato.', visible: true },
    { id: 'default_3', icon: 'Cake', title: 'Repostería Exquisita', description: 'Postres y tartas artesanales que endulzan cualquier celebración.', visible: true },
    { id: 'default_4', icon: 'PartyPopper', title: 'Eventos Especiales', description: 'Bodas, cumpleaños, aniversarios y celebraciones corporativas.', visible: true },
    { id: 'default_5', icon: 'Truck', title: 'Logística Completa', description: 'Transporte, montaje y servicio de mesa incluidos en nuestros paquetes.', visible: true },
    { id: 'default_6', icon: 'ChefHat', title: 'Chefs Expertos', description: 'Equipo de cocineros con formación internacional y pasión por la gastronomía.', visible: true }
];

const CateringFeatures = () => {
    const { template } = useTemplate();
    const [features, setFeatures] = useState(DEFAULT_FEATURES);

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    useEffect(() => {
        const stored = template?.texts?.['c_feature_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setFeatures(parsed);
                    return;
                }
            } catch (e) { }
        }
        setFeatures(DEFAULT_FEATURES);
    }, [template?.texts]);

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-8 h-8" /> : <UtensilsCrossed className="w-8 h-8" />;
    };

    return (
        <section className="section-padding" style={{ backgroundColor: sectionColors.featuresBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-bold mb-6" style={{ fontSize: typography.featuresTitleSize, color: sectionColors.featuresTitleColor }}>
                        <EditableText elementId="c_features_title_1" defaultText="Servicios de" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                            <EditableText elementId="c_features_title_2" defaultText="Catering Premium" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl" style={{ color: sectionColors.bodyTextColor }}>
                        <EditableText elementId="c_features_description" defaultText="Ofrecemos soluciones gastronómicas completas para todo tipo de eventos, con la más alta calidad y atención al detalle." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => {
                        if (feature.visible === false) return null;
                        return (
                            <div key={feature.id || idx} className="group p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl" style={{ backgroundColor: sectionColors.featuresCardBackground, borderColor: sectionColors.featuresCardBorder }}>
                                <div className="w-16 h-16 rounded-xl p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}>
                                    <div className="w-full h-full rounded-xl flex items-center justify-center" style={{ backgroundColor: sectionColors.featuresCardBackground, color: sectionColors.buttonPrimaryBackground }}>
                                        {getIcon(feature.icon)}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-600 transition-colors" style={{ color: sectionColors.featuresTitleColor }}>
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed" style={{ color: sectionColors.bodyTextColor }}>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CateringFeatures;