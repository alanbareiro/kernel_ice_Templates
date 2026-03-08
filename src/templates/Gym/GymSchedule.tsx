import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const GymSchedule: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
    };
    const [selectedDay, setSelectedDay] = useState('Lunes');

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const schedule = {
        Lunes: [
            { id: 'sched_1', time: '8:00', classId: 'gm_sched_mon_1_class', className: 'Funcional', trainerId: 'gm_sched_mon_1_trainer', trainer: 'Marcos' },
            { id: 'sched_2', time: '10:00', classId: 'gm_sched_mon_2_class', className: 'Yoga', trainerId: 'gm_sched_mon_2_trainer', trainer: 'Lucía' },
            { id: 'sched_3', time: '12:00', classId: 'gm_sched_mon_3_class', className: 'HIIT', trainerId: 'gm_sched_mon_3_trainer', trainer: 'Pablo' },
            { id: 'sched_4', time: '16:00', classId: 'gm_sched_mon_4_class', className: 'Spinning', trainerId: 'gm_sched_mon_4_trainer', trainer: 'Carolina' },
            { id: 'sched_5', time: '18:00', classId: 'gm_sched_mon_5_class', className: 'CrossFit', trainerId: 'gm_sched_mon_5_trainer', trainer: 'Marcos' },
            { id: 'sched_6', time: '20:00', classId: 'gm_sched_mon_6_class', className: 'Funcional', trainerId: 'gm_sched_mon_6_trainer', trainer: 'Pablo' },
        ],
        Martes: [
            { id: 'sched_7', time: '9:00', classId: 'gm_sched_tue_1_class', className: 'Spinning', trainerId: 'gm_sched_tue_1_trainer', trainer: 'Carolina' },
            { id: 'sched_8', time: '11:00', classId: 'gm_sched_tue_2_class', className: 'Yoga', trainerId: 'gm_sched_tue_2_trainer', trainer: 'Lucía' },
            { id: 'sched_9', time: '15:00', classId: 'gm_sched_tue_3_class', className: 'Funcional', trainerId: 'gm_sched_tue_3_trainer', trainer: 'Marcos' },
            { id: 'sched_10', time: '17:00', classId: 'gm_sched_tue_4_class', className: 'HIIT', trainerId: 'gm_sched_tue_4_trainer', trainer: 'Pablo' },
            { id: 'sched_11', time: '19:00', classId: 'gm_sched_tue_5_class', className: 'CrossFit', trainerId: 'gm_sched_tue_5_trainer', trainer: 'Marcos' },
        ],
        Miércoles: [
            { id: 'sched_12', time: '8:00', classId: 'gm_sched_wed_1_class', className: 'Funcional', trainerId: 'gm_sched_wed_1_trainer', trainer: 'Pablo' },
            { id: 'sched_13', time: '10:00', classId: 'gm_sched_wed_2_class', className: 'Yoga', trainerId: 'gm_sched_wed_2_trainer', trainer: 'Lucía' },
            { id: 'sched_14', time: '12:00', classId: 'gm_sched_wed_3_class', className: 'Spinning', trainerId: 'gm_sched_wed_3_trainer', trainer: 'Carolina' },
            { id: 'sched_15', time: '16:00', classId: 'gm_sched_wed_4_class', className: 'HIIT', trainerId: 'gm_sched_wed_4_trainer', trainer: 'Pablo' },
            { id: 'sched_16', time: '18:00', classId: 'gm_sched_wed_5_class', className: 'CrossFit', trainerId: 'gm_sched_wed_5_trainer', trainer: 'Marcos' },
            { id: 'sched_17', time: '20:00', classId: 'gm_sched_wed_6_class', className: 'Funcional', trainerId: 'gm_sched_wed_6_trainer', trainer: 'Pablo' },
        ],
        Jueves: [
            { id: 'sched_18', time: '9:00', classId: 'gm_sched_thu_1_class', className: 'Spinning', trainerId: 'gm_sched_thu_1_trainer', trainer: 'Carolina' },
            { id: 'sched_19', time: '11:00', classId: 'gm_sched_thu_2_class', className: 'Yoga', trainerId: 'gm_sched_thu_2_trainer', trainer: 'Lucía' },
            { id: 'sched_20', time: '15:00', classId: 'gm_sched_thu_3_class', className: 'Funcional', trainerId: 'gm_sched_thu_3_trainer', trainer: 'Marcos' },
            { id: 'sched_21', time: '17:00', classId: 'gm_sched_thu_4_class', className: 'HIIT', trainerId: 'gm_sched_thu_4_trainer', trainer: 'Pablo' },
            { id: 'sched_22', time: '19:00', classId: 'gm_sched_thu_5_class', className: 'CrossFit', trainerId: 'gm_sched_thu_5_trainer', trainer: 'Marcos' },
        ],
        Viernes: [
            { id: 'sched_23', time: '8:00', classId: 'gm_sched_fri_1_class', className: 'Funcional', trainerId: 'gm_sched_fri_1_trainer', trainer: 'Pablo' },
            { id: 'sched_24', time: '10:00', classId: 'gm_sched_fri_2_class', className: 'Yoga', trainerId: 'gm_sched_fri_2_trainer', trainer: 'Lucía' },
            { id: 'sched_25', time: '12:00', classId: 'gm_sched_fri_3_class', className: 'Spinning', trainerId: 'gm_sched_fri_3_trainer', trainer: 'Carolina' },
            { id: 'sched_26', time: '16:00', classId: 'gm_sched_fri_4_class', className: 'HIIT', trainerId: 'gm_sched_fri_4_trainer', trainer: 'Pablo' },
            { id: 'sched_27', time: '18:00', classId: 'gm_sched_fri_5_class', className: 'CrossFit', trainerId: 'gm_sched_fri_5_trainer', trainer: 'Marcos' },
            { id: 'sched_28', time: '20:00', classId: 'gm_sched_fri_6_class', className: 'Funcional', trainerId: 'gm_sched_fri_6_trainer', trainer: 'Pablo' },
        ],
        Sábado: [
            { id: 'sched_29', time: '9:00', classId: 'gm_sched_sat_1_class', className: 'Funcional', trainerId: 'gm_sched_sat_1_trainer', trainer: 'Marcos' },
            { id: 'sched_30', time: '11:00', classId: 'gm_sched_sat_2_class', className: 'Yoga', trainerId: 'gm_sched_sat_2_trainer', trainer: 'Lucía' },
            { id: 'sched_31', time: '13:00', classId: 'gm_sched_sat_3_class', className: 'CrossFit', trainerId: 'gm_sched_sat_3_trainer', trainer: 'Pablo' },
        ],
    };

    return (
        <section id="schedule" className="section-padding bg-black text-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <EditableText elementId="gm_schedule_title_1" defaultText="Horarios de" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                              style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="gm_schedule_title_2" defaultText="clases" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        <EditableText elementId="gm_schedule_description" defaultText="Encontrá el horario que mejor se adapte a tu rutina." tag="span" />
                    </p>
                </div>

                {/* Días */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                selectedDay === day
                                    ? 'text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                            style={selectedDay === day ? { background: colors.primary } : {}}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Horarios del día seleccionado */}
                <div className="max-w-3xl mx-auto">
                    {schedule[selectedDay as keyof typeof schedule].map((item) => (
                        <div key={item.id} className="flex items-center p-4 bg-gray-800 rounded-lg mb-3 border border-gray-700 hover:border-orange-500 transition-all">
                            <div className="w-20 text-orange-400 font-bold"><EditableText elementId={item.classId} defaultText={item.time} tag="span" /></div>
                            <div className="flex-1">
                                <span className="text-white font-semibold"><EditableText elementId={item.classId} defaultText={item.className} tag="span" /></span>
                                <span className="text-gray-400 mx-2">con</span>
                                <span className="text-gray-300"><EditableText elementId={item.trainerId} defaultText={item.trainer} tag="span" /></span>
                            </div>
                            <Clock className="w-4 h-4 text-gray-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GymSchedule;