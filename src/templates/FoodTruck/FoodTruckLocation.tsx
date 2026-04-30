// src/templates/FoodTruck/FoodTruckLocation.tsx
import { Calendar, Clock, Navigation } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const FoodTruckLocation: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    // Placeholder para mapas
    const mapPlaceholder = 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800';

    const locations = [
        {
            id: 'loc_1',
            dayId: 'ft_loc_1_day', dayDefault: 'Lunes a Miércoles',
            placeId: 'ft_loc_1_place', placeDefault: 'Plaza San Martín',
            addressId: 'ft_loc_1_address', addressDefault: 'Av. Santa Fe y Maipú, Retiro',
            hoursId: 'ft_loc_1_hours', hoursDefault: '12:00 - 15:30 | 18:00 - 23:00',
            mapId: 'ft_loc_1_map',
            mapImage: mapPlaceholder,
        },
        {
            id: 'loc_2',
            dayId: 'ft_loc_2_day', dayDefault: 'Jueves y Viernes',
            placeId: 'ft_loc_2_place', placeDefault: 'Parque Centenario',
            addressId: 'ft_loc_2_address', addressDefault: 'Av. Díaz Vélez y Leopoldo Marechal, Caballito',
            hoursId: 'ft_loc_2_hours', hoursDefault: '12:00 - 16:00 | 19:00 - 00:00',
            mapId: 'ft_loc_2_map',
            mapImage: mapPlaceholder,
        },
        {
            id: 'loc_3',
            dayId: 'ft_loc_3_day', dayDefault: 'Sábados y Domingos',
            placeId: 'ft_loc_3_place', placeDefault: 'Plaza Italia',
            addressId: 'ft_loc_3_address', addressDefault: 'Av. Santa Fe y Av. Sarmiento, Palermo',
            hoursId: 'ft_loc_3_hours', hoursDefault: '11:00 - 16:00 | 18:00 - 23:30',
            mapId: 'ft_loc_3_map',
            mapImage: mapPlaceholder,
        },
    ];

    return (
        <section
            id="location"
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
                        <EditableText elementId="ft_loc_title_1" defaultText="Dónde" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="ft_loc_title_2" defaultText="encontrarnos" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="ft_loc_description" defaultText="Cambiamos de ubicación cada día. Seguinos para estar al tanto." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <div className="h-48 relative" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15` }}>
                                <img
                                    src={loc.mapImage}
                                    alt={loc.placeDefault}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 rounded-full p-2 shadow-lg" style={{ backgroundColor: sectionColors.featuresCardBackground }}>
                                    <Navigation className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-3">
                                    <Calendar className="w-5 h-5 mr-2" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <span className="font-semibold" style={{ color: sectionColors.featuresTitleColor }}>
                                        <EditableText elementId={loc.dayId} defaultText={loc.dayDefault} tag="span" />
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText elementId={loc.placeId} defaultText={loc.placeDefault} tag="span" />
                                </h3>
                                <p className="mb-3" style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText elementId={loc.addressId} defaultText={loc.addressDefault} tag="span" />
                                </p>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <span className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                        <EditableText elementId={loc.hoursId} defaultText={loc.hoursDefault} tag="span" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mapa general */}
                <div
                    className="mt-12 rounded-2xl p-6"
                    style={{ backgroundColor: sectionColors.featuresCardBackground }}
                >
                    <h3 className="text-xl font-bold mb-4" style={{ color: sectionColors.featuresTitleColor }}>
                        <EditableText elementId="ft_map_title" defaultText="Recorrido semanal" tag="span" />
                    </h3>
                    <div className="aspect-video rounded-xl overflow-hidden" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15` }}>
                        <img
                            src={mapPlaceholder}
                            alt="Mapa de ubicaciones"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoodTruckLocation;