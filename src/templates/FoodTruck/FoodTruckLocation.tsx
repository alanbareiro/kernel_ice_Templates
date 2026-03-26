import { Calendar, Clock, Navigation } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const FoodTruckLocation: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
    };

    const locations = [
        {
            id: 'loc_1',
            dayId: 'ft_loc_1_day', dayDefault: 'Lunes a Miércoles',
            placeId: 'ft_loc_1_place', placeDefault: 'Plaza San Martín',
            addressId: 'ft_loc_1_address', addressDefault: 'Av. Santa Fe y Maipú, Retiro',
            hoursId: 'ft_loc_1_hours', hoursDefault: '12:00 - 15:30 | 18:00 - 23:00',
            mapId: 'ft_loc_1_map',
        },
        {
            id: 'loc_2',
            dayId: 'ft_loc_2_day', dayDefault: 'Jueves y Viernes',
            placeId: 'ft_loc_2_place', placeDefault: 'Parque Centenario',
            addressId: 'ft_loc_2_address', addressDefault: 'Av. Díaz Vélez y Leopoldo Marechal, Caballito',
            hoursId: 'ft_loc_2_hours', hoursDefault: '12:00 - 16:00 | 19:00 - 00:00',
            mapId: 'ft_loc_2_map',
        },
        {
            id: 'loc_3',
            dayId: 'ft_loc_3_day', dayDefault: 'Sábados y Domingos',
            placeId: 'ft_loc_3_place', placeDefault: 'Plaza Italia',
            addressId: 'ft_loc_3_address', addressDefault: 'Av. Santa Fe y Av. Sarmiento, Palermo',
            hoursId: 'ft_loc_3_hours', hoursDefault: '11:00 - 16:00 | 18:00 - 23:30',
            mapId: 'ft_loc_3_map',
        },
    ];

    return (
        <section id="location" className="section-padding bg-orange-50 dark:bg-orange-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900 dark:text-orange-100">
                        <EditableText elementId="ft_loc_title_1" defaultText="Dónde" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="ft_loc_title_2" defaultText="encontrarnos" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-orange-700 dark:text-orange-300">
                        <EditableText elementId="ft_loc_description" defaultText="Cambiamos de ubicación cada día. Seguinos para estar al tanto." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {locations.map((loc) => (
                        <div key={loc.id} className="bg-white dark:bg-orange-900/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                            <div className="h-48 bg-orange-100 dark:bg-orange-800 relative">
                                <EditableImage elementId={loc.mapId} defaultImage="" alt={loc.placeDefault} className="w-full h-full object-cover" category="foodtruck" />
                                <div className="absolute top-3 right-3 bg-white dark:bg-orange-800 rounded-full p-2 shadow-lg">
                                    <Navigation className="w-5 h-5" style={{ color: colors.primary }} />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-3">
                                    <Calendar className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                                    <span className="font-semibold text-orange-900 dark:text-orange-100">
                                        <EditableText elementId={loc.dayId} defaultText={loc.dayDefault} tag="span" />
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-orange-900 dark:text-orange-100">
                                    <EditableText elementId={loc.placeId} defaultText={loc.placeDefault} tag="span" />
                                </h3>
                                <p className="text-orange-700 dark:text-orange-300 mb-3">
                                    <EditableText elementId={loc.addressId} defaultText={loc.addressDefault} tag="span" />
                                </p>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                                    <span className="text-sm text-orange-600 dark:text-orange-400">
                                        <EditableText elementId={loc.hoursId} defaultText={loc.hoursDefault} tag="span" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mapa general */}
                <div className="mt-12 bg-white dark:bg-orange-900/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-orange-900 dark:text-orange-100">
                        <EditableText elementId="ft_map_title" defaultText="Recorrido semanal" tag="span" />
                    </h3>
                    <div className="aspect-video bg-orange-100 dark:bg-orange-800 rounded-xl overflow-hidden">
                        <EditableImage elementId="ft_main_map" defaultImage="" alt="Mapa de ubicaciones" className="w-full h-full object-cover" category="foodtruck" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoodTruckLocation;