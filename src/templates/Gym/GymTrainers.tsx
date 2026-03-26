import { Award, Instagram } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const GymTrainers: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
    };

    const trainerImages = {
        trainer1: defaultImages.gym.trainer1,
        trainer2: defaultImages.gym.trainer2,
        trainer3: defaultImages.gym.trainer1,
        trainer4: defaultImages.gym.trainer2,
    };

    const trainers = [
        {
            id: 'trainer_1',
            nameId: 'gm_trainer_1_name', nameDefault: 'Marcos Díaz',
            roleId: 'gm_trainer_1_role', roleDefault: 'Head Coach',
            specialtyId: 'gm_trainer_1_specialty', specialtyDefault: 'CrossFit, Funcional',
            expId: 'gm_trainer_1_exp', expDefault: '10 años exp.',
            instagram: '@marcosdiaz',
            imageId: 'gm_trainer_1_image',
            defaultImage: trainerImages.trainer1,
        },
        {
            id: 'trainer_2',
            nameId: 'gm_trainer_2_name', nameDefault: 'Lucía Méndez',
            roleId: 'gm_trainer_2_role', roleDefault: 'Instructora de Yoga',
            specialtyId: 'gm_trainer_2_specialty', specialtyDefault: 'Yoga, Meditación',
            expId: 'gm_trainer_2_exp', expDefault: '8 años exp.',
            instagram: '@luciayoga',
            imageId: 'gm_trainer_2_image',
            defaultImage: trainerImages.trainer2,
        },
        {
            id: 'trainer_3',
            nameId: 'gm_trainer_3_name', nameDefault: 'Pablo Rodríguez',
            roleId: 'gm_trainer_3_role', roleDefault: 'Entrenador Personal',
            specialtyId: 'gm_trainer_3_specialty', specialtyDefault: 'Musculación, Nutrición',
            expId: 'gm_trainer_3_exp', expDefault: '12 años exp.',
            instagram: '@pablorodriguez',
            imageId: 'gm_trainer_3_image',
            defaultImage: trainerImages.trainer3,
        },
        {
            id: 'trainer_4',
            nameId: 'gm_trainer_4_name', nameDefault: 'Carolina Torres',
            roleId: 'gm_trainer_4_role', roleDefault: 'Instructora de Spinning',
            specialtyId: 'gm_trainer_4_specialty', specialtyDefault: 'Spinning, HIIT',
            expId: 'gm_trainer_4_exp', expDefault: '6 años exp.',
            instagram: '@caroltorres',
            imageId: 'gm_trainer_4_image',
            defaultImage: trainerImages.trainer4,
        },
    ];

    return (
        <section id="trainers" className="section-padding bg-black text-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <EditableText elementId="gm_trainers_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="gm_trainers_title_2" defaultText="entrenadores" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        <EditableText elementId="gm_trainers_description" defaultText="Profesionales con experiencia para guiarte en tu camino." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trainers.map((trainer) => (
                        <div key={trainer.id} className="group text-center">
                            <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-orange-500 transition-all">
                                <EditableImage
                                    elementId={trainer.imageId}
                                    defaultImage={trainer.defaultImage}
                                    alt={trainer.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="gym"
                                />
                                <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
                                    <Award className="w-4 h-4" style={{ color: colors.primary }} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                <EditableText elementId={trainer.nameId} defaultText={trainer.nameDefault} tag="span" />
                            </h3>
                            <p className="text-sm mb-1" style={{ color: colors.primary }}>
                                <EditableText elementId={trainer.roleId} defaultText={trainer.roleDefault} tag="span" />
                            </p>
                            <p className="text-sm text-gray-400 mb-2">
                                <EditableText elementId={trainer.specialtyId} defaultText={trainer.specialtyDefault} tag="span" /> • <EditableText elementId={trainer.expId} defaultText={trainer.expDefault} tag="span" />
                            </p>
                            <a href="#" className="inline-flex items-center text-gray-400 hover:text-orange-500">
                                <Instagram className="w-4 h-4 mr-1" /> {trainer.instagram}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GymTrainers;