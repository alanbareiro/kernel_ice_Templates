// src/templates/RealEstate/RealEstateProperties.tsx
import { Bath, Bed, Heart, MapPin, Square } from 'lucide-react';
import React, { useState } from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const RealEstateProperties: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [selectedType, setSelectedType] = useState('all');

    const types = [
        { id: 'all', name: 'Todas', nameId: 're_type_all' },
        { id: 'apartment', name: 'Departamentos', nameId: 're_type_apartment' },
        { id: 'house', name: 'Casas', nameId: 're_type_house' },
        { id: 'office', name: 'Oficinas', nameId: 're_type_office' },
        { id: 'land', name: 'Terrenos', nameId: 're_type_land' },
    ];

    const properties = [
        {
            id: 'prop_1', type: 'apartment',
            titleId: 're_prop_1_title', titleDefault: 'Departamento en Palermo',
            locationId: 're_prop_1_location', locationDefault: 'Palermo, CABA',
            priceId: 're_prop_1_price', priceDefault: 'USD 250.000',
            bedsId: 're_prop_1_beds', bedsDefault: '3',
            bathsId: 're_prop_1_baths', bathsDefault: '2',
            areaId: 're_prop_1_area', areaDefault: '85',
            imageId: 're_prop_1_image',
        },
        // ... otras propiedades
    ];

    const filteredProperties = selectedType === 'all'
        ? properties
        : properties.filter(p => p.type === selectedType);

    return (
        <section
            id="properties"
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
                        <EditableText elementId="re_properties_title_1" defaultText="Propiedades" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="re_properties_title_2" defaultText="destacadas" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="re_properties_description" defaultText="Las mejores opciones para vos." tag="span" />
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {types.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedType === type.id ? 'text-white' : ''
                                }`}
                            style={
                                selectedType === type.id
                                    ? { background: sectionColors.buttonPrimaryBackground }
                                    : {
                                        backgroundColor: sectionColors.featuresCardBackground,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            <EditableText elementId={type.nameId} defaultText={type.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Grid de propiedades */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((prop) => (
                        <div
                            key={prop.id}
                            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <EditableImage elementId={prop.imageId} defaultImage="" alt={prop.titleDefault} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" category="realestate" />
                                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                                    <Heart className="w-4 h-4" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                </button>
                            </div>
                            <div className="p-6">
                                <h3
                                    className="text-xl font-bold mb-2"
                                    style={{ color: sectionColors.featuresTitleColor }}
                                >
                                    <EditableText elementId={prop.titleId} defaultText={prop.titleDefault} tag="span" />
                                </h3>
                                <div className="flex items-center mb-3">
                                    <MapPin className="w-4 h-4 mr-1" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <span className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                        <EditableText elementId={prop.locationId} defaultText={prop.locationDefault} tag="span" />
                                    </span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <div className="flex items-center">
                                        <Bed className="w-4 h-4 mr-1" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                        <span className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId={prop.bedsId} defaultText={prop.bedsDefault} tag="span" />
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Bath className="w-4 h-4 mr-1" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                        <span className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId={prop.bathsId} defaultText={prop.bathsDefault} tag="span" />
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Square className="w-4 h-4 mr-1" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                        <span className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId={prop.areaId} defaultText={prop.areaDefault} tag="span" /> m²
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-2xl font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText elementId={prop.priceId} defaultText={prop.priceDefault} tag="span" />
                                    </span>
                                    <button
                                        className="px-4 py-2 text-white rounded-lg text-sm"
                                        style={{ background: sectionColors.buttonPrimaryBackground }}
                                    >
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealEstateProperties;