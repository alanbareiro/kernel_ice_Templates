// src/templates/BeautySalon/SalonPricing.tsx
import { Check } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const SalonPricing: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const services = [
        { id: 'price_1', nameId: 'sl_price_1_name', nameDefault: 'Corte de cabello', priceId: 'sl_price_1_price', priceDefault: '$2500' },
        { id: 'price_2', nameId: 'sl_price_2_name', nameDefault: 'Corte + Peinado', priceId: 'sl_price_2_price', priceDefault: '$3500' },
        { id: 'price_3', nameId: 'sl_price_3_name', nameDefault: 'Coloración completa', priceId: 'sl_price_3_price', priceDefault: '$6000' },
        { id: 'price_4', nameId: 'sl_price_4_name', nameDefault: 'Balayage', priceId: 'sl_price_4_price', priceDefault: '$7500' },
        { id: 'price_5', nameId: 'sl_price_5_name', nameDefault: 'Mechas', priceId: 'sl_price_5_price', priceDefault: '$5500' },
        { id: 'price_6', nameId: 'sl_price_6_name', nameDefault: 'Lifting de pestañas', priceId: 'sl_price_6_price', priceDefault: '$2800' },
        { id: 'price_7', nameId: 'sl_price_7_name', nameDefault: 'Extensiones de pestañas', priceId: 'sl_price_7_price', priceDefault: '$4500' },
        { id: 'price_8', nameId: 'sl_price_8_name', nameDefault: 'Perfilado de cejas', priceId: 'sl_price_8_price', priceDefault: '$1500' },
        { id: 'price_9', nameId: 'sl_price_9_name', nameDefault: 'Maquillaje social', priceId: 'sl_price_9_price', priceDefault: '$3000' },
        { id: 'price_10', nameId: 'sl_price_10_name', nameDefault: 'Maquillaje de novia', priceId: 'sl_price_10_price', priceDefault: '$6000' },
        { id: 'price_11', nameId: 'sl_price_11_name', nameDefault: 'Limpieza facial', priceId: 'sl_price_11_price', priceDefault: '$3500' },
        { id: 'price_12', nameId: 'sl_price_12_name', nameDefault: 'Manicuría semipermanente', priceId: 'sl_price_12_price', priceDefault: '$2200' },
        { id: 'price_13', nameId: 'sl_price_13_name', nameDefault: 'Pedicuría completa', priceId: 'sl_price_13_price', priceDefault: '$2800' },
        { id: 'price_14', nameId: 'sl_price_14_name', nameDefault: 'Capping', priceId: 'sl_price_14_price', priceDefault: '$2500' },
    ];

    return (
        <section
            id="pricing"
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
                        <EditableText elementId="sl_pricing_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="sl_pricing_title_2" defaultText="precios" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="sl_pricing_description" defaultText="Precios transparentes, sin sorpresas. Calidad garantizada." tag="span" />
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div
                        className="rounded-2xl p-8 shadow-lg"
                        style={{ backgroundColor: sectionColors.featuresCardBackground }}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            {services.map((service) => (
                                <div key={service.id} className="flex items-center justify-between p-3 border-b last:border-0" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-3" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                        <span style={{ color: sectionColors.featuresTitleColor }}>
                                            <EditableText elementId={service.nameId} defaultText={service.nameDefault} tag="span" />
                                        </span>
                                    </div>
                                    <span
                                        className="font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText elementId={service.priceId} defaultText={service.priceDefault} tag="span" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-center mt-6 italic" style={{ color: sectionColors.bodyTextColor }}>
                        <EditableText elementId="sl_pricing_note" defaultText="*Los precios son orientativos. Consultá por promociones y combos." tag="span" />
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SalonPricing;