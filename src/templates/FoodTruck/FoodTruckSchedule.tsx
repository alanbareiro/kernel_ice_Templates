
import { Clock, MapPin } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const FoodTruckSchedule: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
    };

    const schedule = [
        { id: 'sched_1', day: 'Lunes', dayId: 'ft_sched_1_day', dayDefault: 'Lunes', timeId: 'ft_sched_1_time', timeDefault: '12:00 - 15:30 / 18:00 - 23:00', locationId: 'ft_sched_1_loc', locationDefault: 'Plaza San Martín' },
        { id: 'sched_2', day: 'Martes', dayId: 'ft_sched_2_day', dayDefault: 'Martes', timeId: 'ft_sched_2_time', timeDefault: '12:00 - 15:30 / 18:00 - 23:00', locationId: 'ft_sched_2_loc', locationDefault: 'Plaza San Martín' },
        { id: 'sched_3', day: 'Miércoles', dayId: 'ft_sched_3_day', dayDefault: 'Miércoles', timeId: 'ft_sched_3_time', timeDefault: '12:00 - 15:30 / 18:00 - 23:00', locationId: 'ft_sched_3_loc', locationDefault: 'Plaza San Martín' },
        { id: 'sched_4', day: 'Jueves', dayId: 'ft_sched_4_day', dayDefault: 'Jueves', timeId: 'ft_sched_4_time', timeDefault: '12:00 - 16:00 / 19:00 - 00:00', locationId: 'ft_sched_4_loc', locationDefault: 'Parque Centenario' },
        { id: 'sched_5', day: 'Viernes', dayId: 'ft_sched_5_day', dayDefault: 'Viernes', timeId: 'ft_sched_5_time', timeDefault: '12:00 - 16:00 / 19:00 - 00:00', locationId: 'ft_sched_5_loc', locationDefault: 'Parque Centenario' },
        { id: 'sched_6', day: 'Sábado', dayId: 'ft_sched_6_day', dayDefault: 'Sábado', timeId: 'ft_sched_6_time', timeDefault: '11:00 - 16:00 / 18:00 - 23:30', locationId: 'ft_sched_6_loc', locationDefault: 'Plaza Italia' },
        { id: 'sched_7', day: 'Domingo', dayId: 'ft_sched_7_day', dayDefault: 'Domingo', timeId: 'ft_sched_7_time', timeDefault: '11:00 - 16:00 / 18:00 - 23:30', locationId: 'ft_sched_7_loc', locationDefault: 'Plaza Italia' },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900 dark:text-orange-100">
                        <EditableText elementId="ft_schedule_title_1" defaultText="Horarios y" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="ft_schedule_title_2" defaultText="ubicaciones" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-orange-700 dark:text-orange-300">
                        <EditableText elementId="ft_schedule_description" defaultText="Nuestra agenda semanal. Siempre estamos en movimiento." tag="span" />
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {schedule.map((item, index) => (
                        <div key={item.id} className={`flex items-center p-4 ${index % 2 === 0 ? 'bg-orange-50 dark:bg-orange-900/10' : ''} rounded-lg`}>
                            <div className="w-24 font-bold text-orange-900 dark:text-orange-100">
                                <EditableText elementId={item.dayId} defaultText={item.dayDefault} tag="span" />
                            </div>
                            <div className="flex-1 flex items-center">
                                <Clock className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                                <span className="text-orange-700 dark:text-orange-300 mr-4">
                                    <EditableText elementId={item.timeId} defaultText={item.timeDefault} tag="span" />
                                </span>
                                <MapPin className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                                <span className="text-orange-700 dark:text-orange-300">
                                    <EditableText elementId={item.locationId} defaultText={item.locationDefault} tag="span" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FoodTruckSchedule;