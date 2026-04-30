// src/templates/Gym/GymSchedule.tsx
import { Clock } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const GymSchedule: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

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
        // ... otros días
    };

    return (
        <section
            id="schedule"
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
                        <EditableText elementId="gm_schedule_title_1" defaultText="Horarios de" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="gm_schedule_title_2" defaultText="clases" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="gm_schedule_description" defaultText="Encontrá el horario que mejor se adapte a tu rutina." tag="span" />
                    </p>
                </div>

                {/* Días */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedDay === day ? 'text-white' : ''
                                }`}
                            style={
                                selectedDay === day
                                    ? { background: sectionColors.buttonPrimaryBackground }
                                    : {
                                        backgroundColor: sectionColors.featuresCardBackground,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Horarios del día seleccionado */}
                <div className="max-w-3xl mx-auto">
                    {schedule[selectedDay as keyof typeof schedule].map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center p-4 rounded-lg mb-3 border transition-all hover:border-orange-500"
                            style={{ backgroundColor: sectionColors.featuresCardBackground, borderColor: sectionColors.featuresCardBorder }}
                        >
                            <div className="w-20 font-bold" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                <EditableText elementId={item.classId} defaultText={item.time} tag="span" />
                            </div>
                            <div className="flex-1">
                                <span className="font-semibold" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText elementId={item.classId} defaultText={item.className} tag="span" />
                                </span>
                                <span className="mx-2" style={{ color: sectionColors.bodyTextColor }}>con</span>
                                <span style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText elementId={item.trainerId} defaultText={item.trainer} tag="span" />
                                </span>
                            </div>
                            <Clock className="w-4 h-4" style={{ color: sectionColors.bodyTextColor }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GymSchedule;