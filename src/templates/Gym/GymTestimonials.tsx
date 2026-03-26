import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const GymTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
    };

    const testimonials = [
        {
            id: 'test_1',
            contentId: 'gm_test_1_content',
            contentDefault: 'Empecé hace 6 meses con el plan Premium y los resultados son increíbles. Los entrenadores son muy profesionales y el ambiente es motivador.',
            nameId: 'gm_test_1_name', nameDefault: 'Martín López',
            roleId: 'gm_test_1_role', roleDefault: 'Miembro hace 6 meses',
            rating: 5,
        },
        {
            id: 'test_2',
            contentId: 'gm_test_2_content',
            contentDefault: 'Las clases de spinning son lo mejor. Carolina es una excelente instructora y siempre te empuja a dar lo mejor.',
            nameId: 'gm_test_2_name', nameDefault: 'Laura Fernández',
            roleId: 'gm_test_2_role', roleDefault: 'Miembro hace 1 año',
            rating: 5,
        },
        {
            id: 'test_3',
            contentId: 'gm_test_3_content',
            contentDefault: 'Bajé 15 kilos con el acompañamiento de Pablo. El plan nutricional y el entrenamiento personalizado hicieron toda la diferencia.',
            nameId: 'gm_test_3_name', nameDefault: 'Carlos Rodríguez',
            roleId: 'gm_test_3_role', roleDefault: 'Miembro hace 8 meses',
            rating: 5,
        },
    ];

    return (
        <section className="section-padding bg-gray-900 text-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <EditableText elementId="gm_test_title_1" defaultText="Lo que dicen" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="gm_test_title_2" defaultText="nuestros miembros" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-orange-500 transition-all">
                            <div className="flex mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                            <p className="text-lg text-gray-300 italic mb-6">"<EditableText elementId={t.contentId} defaultText={t.contentDefault} tag="span" />"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {t.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-white"><EditableText elementId={t.nameId} defaultText={t.nameDefault} tag="span" /></h4>
                                    <p className="text-sm text-gray-400"><EditableText elementId={t.roleId} defaultText={t.roleDefault} tag="span" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GymTestimonials;