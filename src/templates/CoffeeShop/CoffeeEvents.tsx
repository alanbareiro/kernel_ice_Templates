import { Calendar, Clock, Users } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const CoffeeEvents: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
    };

    const eventImages = {
        event1: defaultImages.coffee.event1,
        event2: defaultImages.coffee.event2,
        event3: defaultImages.coffee.event3,
    };

    const events = [
        {
            id: 'event_1',
            titleId: 'cf_event_1_title', titleDefault: 'Taller de Latte Art',
            dateId: 'cf_event_1_date', dateDefault: '15 de Junio, 2024',
            timeId: 'cf_event_1_time', timeDefault: '10:00 - 12:00',
            descId: 'cf_event_1_desc', descDefault: 'Aprendé a dibujar en tu café. Taller práctico para principiantes.',
            capacityId: 'cf_event_1_capacity', capacityDefault: '15 personas',
            imageId: 'cf_event_1_image',
            defaultImage: eventImages.event1,
        },
        {
            id: 'event_2',
            titleId: 'cf_event_2_title', titleDefault: 'Cata de Cafés Especiales',
            dateId: 'cf_event_2_date', dateDefault: '22 de Junio, 2024',
            timeId: 'cf_event_2_time', timeDefault: '18:00 - 20:00',
            descId: 'cf_event_2_desc', descDefault: 'Descubrí cafés de diferentes orígenes y sus perfiles de sabor.',
            capacityId: 'cf_event_2_capacity', capacityDefault: '12 personas',
            imageId: 'cf_event_2_image',
            defaultImage: eventImages.event2,
        },
        {
            id: 'event_3',
            titleId: 'cf_event_3_title', titleDefault: 'Noche de Música en Vivo',
            dateId: 'cf_event_3_date', dateDefault: '30 de Junio, 2024',
            timeId: 'cf_event_3_time', timeDefault: '20:00 - 23:00',
            descId: 'cf_event_3_desc', descDefault: 'Disfrutá de música acústica mientras degustás nuestros cafés.',
            capacityId: 'cf_event_3_capacity', capacityDefault: '40 personas',
            imageId: 'cf_event_3_image',
            defaultImage: eventImages.event3,
        },
    ];

    return (
        <section id="events" className="section-padding bg-amber-50 dark:bg-amber-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 dark:text-amber-100">
                        <EditableText elementId="cf_events_title_1" defaultText="Próximos" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="cf_events_title_2" defaultText="eventos" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-amber-700 dark:text-amber-300">
                        <EditableText elementId="cf_events_description" defaultText="Compartí experiencias únicas alrededor del café." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white dark:bg-amber-900/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                            <div className="relative h-48">
                                <EditableImage
                                    elementId={event.imageId}
                                    defaultImage={event.defaultImage}
                                    alt={event.titleDefault}
                                    className="w-full h-full object-cover"
                                    category="coffee"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 text-amber-900 dark:text-amber-100">
                                    <EditableText elementId={event.titleId} defaultText={event.titleDefault} tag="span" />
                                </h3>
                                <div className="space-y-2 mb-4 text-amber-700 dark:text-amber-300">
                                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /><EditableText elementId={event.dateId} defaultText={event.dateDefault} tag="span" /></div>
                                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /><EditableText elementId={event.timeId} defaultText={event.timeDefault} tag="span" /></div>
                                    <div className="flex items-center"><Users className="w-4 h-4 mr-2" /><EditableText elementId={event.capacityId} defaultText={event.capacityDefault} tag="span" /></div>
                                </div>
                                <p className="text-amber-600 dark:text-amber-400 mb-4">
                                    <EditableText elementId={event.descId} defaultText={event.descDefault} tag="span" />
                                </p>
                                <button className="w-full py-2 rounded-lg text-white font-semibold" style={{ background: colors.primary }}>Reservar lugar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoffeeEvents;