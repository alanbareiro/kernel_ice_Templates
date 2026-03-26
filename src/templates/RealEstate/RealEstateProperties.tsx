import { Bath, Bed, Heart, MapPin, Square } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const RealEstateProperties: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
    };
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
        {
            id: 'prop_2', type: 'apartment',
            titleId: 're_prop_2_title', titleDefault: 'Penthouse en Puerto Madero',
            locationId: 're_prop_2_location', locationDefault: 'Puerto Madero, CABA',
            priceId: 're_prop_2_price', priceDefault: 'USD 550.000',
            bedsId: 're_prop_2_beds', bedsDefault: '4',
            bathsId: 're_prop_2_baths', bathsDefault: '3',
            areaId: 're_prop_2_area', areaDefault: '150',
            imageId: 're_prop_2_image',
        },
        {
            id: 'prop_3', type: 'house',
            titleId: 're_prop_3_title', titleDefault: 'Casa en Nordelta',
            locationId: 're_prop_3_location', locationDefault: 'Nordelta, Tigre',
            priceId: 're_prop_3_price', priceDefault: 'USD 850.000',
            bedsId: 're_prop_3_beds', bedsDefault: '5',
            bathsId: 're_prop_3_baths', bathsDefault: '4',
            areaId: 're_prop_3_area', areaDefault: '300',
            imageId: 're_prop_3_image',
        },
        {
            id: 'prop_4', type: 'house',
            titleId: 're_prop_4_title', titleDefault: 'Chalet en San Isidro',
            locationId: 're_prop_4_location', locationDefault: 'San Isidro',
            priceId: 're_prop_4_price', priceDefault: 'USD 620.000',
            bedsId: 're_prop_4_beds', bedsDefault: '4',
            bathsId: 're_prop_4_baths', bathsDefault: '3',
            areaId: 're_prop_4_area', areaDefault: '220',
            imageId: 're_prop_4_image',
        },
        {
            id: 'prop_5', type: 'office',
            titleId: 're_prop_5_title', titleDefault: 'Oficina en Catalinas',
            locationId: 're_prop_5_location', locationDefault: 'Catalinas, CABA',
            priceId: 're_prop_5_price', priceDefault: 'USD 320.000',
            bedsId: 're_prop_5_beds', bedsDefault: '0',
            bathsId: 're_prop_5_baths', bathsDefault: '2',
            areaId: 're_prop_5_area', areaDefault: '120',
            imageId: 're_prop_5_image',
        },
        {
            id: 'prop_6', type: 'land',
            titleId: 're_prop_6_title', titleDefault: 'Terreno en Pilar',
            locationId: 're_prop_6_location', locationDefault: 'Pilar',
            priceId: 're_prop_6_price', priceDefault: 'USD 180.000',
            bedsId: 're_prop_6_beds', bedsDefault: '-',
            bathsId: 're_prop_6_baths', bathsDefault: '-',
            areaId: 're_prop_6_area', areaDefault: '800',
            imageId: 're_prop_6_image',
        },
    ];

    const filteredProperties = selectedType === 'all'
        ? properties
        : properties.filter(p => p.type === selectedType);

    return (
        <section id="properties" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText elementId="re_properties_title_1" defaultText="Propiedades" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="re_properties_title_2" defaultText="destacadas" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-emerald-700 dark:text-emerald-300">
                        <EditableText elementId="re_properties_description" defaultText="Las mejores opciones para vos." tag="span" />
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {types.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedType === type.id
                                    ? 'text-white'
                                    : 'bg-emerald-100 dark:bg-emerald-800/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-700'
                                }`}
                            style={selectedType === type.id ? { background: colors.primary } : {}}
                        >
                            <EditableText elementId={type.nameId} defaultText={type.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Grid de propiedades */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((prop) => (
                        <div key={prop.id} className="group bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                            <div className="relative h-64 overflow-hidden">
                                <EditableImage elementId={prop.imageId} defaultImage="" alt={prop.titleDefault} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" category="realestate" />
                                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                                    <Heart className="w-4 h-4" style={{ color: colors.primary }} />
                                </button>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-emerald-900 dark:text-emerald-100">
                                    <EditableText elementId={prop.titleId} defaultText={prop.titleDefault} tag="span" />
                                </h3>
                                <div className="flex items-center mb-3 text-emerald-600 dark:text-emerald-400">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="text-sm"><EditableText elementId={prop.locationId} defaultText={prop.locationDefault} tag="span" /></span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <div className="flex items-center"><Bed className="w-4 h-4 mr-1 text-emerald-500" /><span className="text-sm text-emerald-700 dark:text-emerald-300"><EditableText elementId={prop.bedsId} defaultText={prop.bedsDefault} tag="span" /></span></div>
                                    <div className="flex items-center"><Bath className="w-4 h-4 mr-1 text-emerald-500" /><span className="text-sm text-emerald-700 dark:text-emerald-300"><EditableText elementId={prop.bathsId} defaultText={prop.bathsDefault} tag="span" /></span></div>
                                    <div className="flex items-center"><Square className="w-4 h-4 mr-1 text-emerald-500" /><span className="text-sm text-emerald-700 dark:text-emerald-300"><EditableText elementId={prop.areaId} defaultText={prop.areaDefault} tag="span" /> m²</span></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText elementId={prop.priceId} defaultText={prop.priceDefault} tag="span" />
                                    </span>
                                    <button className="px-4 py-2 text-white rounded-lg text-sm"
                                        style={{ background: colors.primary }}>
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