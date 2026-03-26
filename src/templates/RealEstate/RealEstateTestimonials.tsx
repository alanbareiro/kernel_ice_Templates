import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RealEstateTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
    };

    const testimonials = [
        {
            id: 'test_1',
            contentId: 're_test_1_content',
            contentDefault: 'Alejandro y su equipo me ayudaron a comprar mi primer departamento. Fueron súper pacientes y me explicaron todo el proceso. Muy recomendables.',
            nameId: 're_test_1_name', nameDefault: 'Ana López',
            roleId: 're_test_1_role', roleDefault: 'Compradora',
            rating: 5,
        },
        {
            id: 'test_2',
            contentId: 're_test_2_content',
            contentDefault: 'Vendí mi casa en tiempo récord gracias a la estrategia de marketing que implementaron. Profesionales y eficientes.',
            nameId: 're_test_2_name', nameDefault: 'Roberto Fernández',
            roleId: 're_test_2_role', roleDefault: 'Vendedor',
            rating: 5,
        },
        {
            id: 'test_3',
            contentId: 're_test_3_content',
            contentDefault: 'Invertí en un proyecto con ellos y la rentabilidad superó mis expectativas. Transparencia y seriedad.',
            nameId: 're_test_3_name', nameDefault: 'Marcela González',
            roleId: 're_test_3_role', roleDefault: 'Inversora',
            rating: 5,
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText elementId="re_test_title_1" defaultText="Lo que dicen" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="re_test_title_2" defaultText="nuestros clientes" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 shadow-lg">
                            <div className="flex mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                            <p className="text-lg text-emerald-800 dark:text-emerald-200 italic mb-6">"<EditableText elementId={t.contentId} defaultText={t.contentDefault} tag="span" />"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {t.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-100"><EditableText elementId={t.nameId} defaultText={t.nameDefault} tag="span" /></h4>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-400"><EditableText elementId={t.roleId} defaultText={t.roleDefault} tag="span" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealEstateTestimonials;