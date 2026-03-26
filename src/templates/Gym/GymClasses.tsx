import { Bike, Dumbbell, Heart, Target, Users, Zap } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const GymClasses: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
    };

    const classImages = {
        class1: defaultImages.gym.class1,
        class2: defaultImages.gym.class2,
        class3: defaultImages.gym.class1,
        class4: defaultImages.gym.class2,
        class5: defaultImages.gym.class1,
        class6: defaultImages.gym.class2,
    };

    const classes = [
        {
            id: 'class_1',
            icon: <Dumbbell className="w-8 h-8" />,
            titleId: 'gm_class_1_title', titleDefault: 'Funcional',
            descId: 'gm_class_1_desc', descDefault: 'Entrenamiento de alta intensidad que combina fuerza, resistencia y movilidad.',
            timeId: 'gm_class_1_time', timeDefault: 'Lun-Mie-Vie 8:00',
            imageId: 'gm_class_1_image',
            defaultImage: classImages.class1,
        },
        {
            id: 'class_2',
            icon: <Bike className="w-8 h-8" />,
            titleId: 'gm_class_2_title', titleDefault: 'Spinning',
            descId: 'gm_class_2_desc', descDefault: 'Clase de ciclismo indoor con música motivadora y diferentes niveles.',
            timeId: 'gm_class_2_time', timeDefault: 'Mar-Jue 18:30',
            imageId: 'gm_class_2_image',
            defaultImage: classImages.class2,
        },
        {
            id: 'class_3',
            icon: <Heart className="w-8 h-8" />,
            titleId: 'gm_class_3_title', titleDefault: 'Yoga',
            descId: 'gm_class_3_desc', descDefault: 'Conexión cuerpo-mente, flexibilidad y relajación para todos los niveles.',
            timeId: 'gm_class_3_time', timeDefault: 'Lun-Mie 10:00',
            imageId: 'gm_class_3_image',
            defaultImage: classImages.class3,
        },
        {
            id: 'class_4',
            icon: <Target className="w-8 h-8" />,
            titleId: 'gm_class_4_title', titleDefault: 'CrossFit',
            descId: 'gm_class_4_desc', descDefault: 'Entrenamiento de alta intensidad con ejercicios funcionales.',
            timeId: 'gm_class_4_time', timeDefault: 'Mar-Jue-Sab 9:00',
            imageId: 'gm_class_4_image',
            defaultImage: classImages.class4,
        },
        {
            id: 'class_5',
            icon: <Users className="w-8 h-8" />,
            titleId: 'gm_class_5_title', titleDefault: 'Body Combat',
            descId: 'gm_class_5_desc', descDefault: 'Artes marciales y movimientos de defensa personal al ritmo de la música.',
            timeId: 'gm_class_5_time', timeDefault: 'Vie 19:00',
            imageId: 'gm_class_5_image',
            defaultImage: classImages.class5,
        },
        {
            id: 'class_6',
            icon: <Zap className="w-8 h-8" />,
            titleId: 'gm_class_6_title', titleDefault: 'HIIT',
            descId: 'gm_class_6_desc', descDefault: 'Entrenamiento interválico de alta intensidad para quemar calorías.',
            timeId: 'gm_class_6_time', timeDefault: 'Lun-Mie-Vie 12:00',
            imageId: 'gm_class_6_image',
            defaultImage: classImages.class6,
        },
    ];

    return (
        <section id="classes" className="section-padding bg-black text-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <EditableText elementId="gm_classes_title_1" defaultText="Nuestras" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="gm_classes_title_2" defaultText="clases" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        <EditableText elementId="gm_classes_description" defaultText="Variedad de disciplinas para todos los gustos y niveles." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.map((cls) => (
                        <div key={cls.id} className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all">
                            <div className="h-48 overflow-hidden">
                                <EditableImage
                                    elementId={cls.imageId}
                                    defaultImage={cls.defaultImage}
                                    alt={cls.titleDefault}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    category="gym"
                                />
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                    {cls.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">
                                    <EditableText elementId={cls.titleId} defaultText={cls.titleDefault} tag="span" />
                                </h3>
                                <p className="text-gray-400 mb-3">
                                    <EditableText elementId={cls.descId} defaultText={cls.descDefault} tag="span" />
                                </p>
                                <p className="text-sm text-orange-400">
                                    <EditableText elementId={cls.timeId} defaultText={cls.timeDefault} tag="span" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GymClasses;