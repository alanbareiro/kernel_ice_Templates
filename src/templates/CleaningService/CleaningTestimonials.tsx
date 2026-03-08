import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CleaningTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
    };

    const testimonials = [
        {
            id: 'test_1',
            contentId: 'cl_test_1_content',
            contentDefault: 'Excelente servicio. Contraté la limpieza profunda para mi casa después de una mudanza y quedó impecable. Puntuales y muy profesionales.',
            nameId: 'cl_test_1_name', nameDefault: 'Ana López',
            roleId: 'cl_test_1_role', roleDefault: 'Cliente',
            rating: 5,
        },
        {
            id: 'test_2',
            contentId: 'cl_test_2_content',
            contentDefault: 'Hace 6 meses que nos hacen la limpieza de la oficina. Siempre cumplen, el personal es confiable y la calidad excelente.',
            nameId: 'cl_test_2_name', nameDefault: 'Martín Rodríguez',
            roleId: 'cl_test_2_role', roleDefault: 'Dueño de empresa',
            rating: 5,
        },
        {
            id: 'test_3',
            contentId: 'cl_test_3_content',
            contentDefault: 'Limpieza de alfombras increíble. Parecían nuevas. Muy recomendables, volveré a contratar.',
            nameId: 'cl_test_3_name', nameDefault: 'Carolina Pérez',
            roleId: 'cl_test_3_role', roleDefault: 'Cliente',
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sky-900 dark:text-sky-100">
                        <EditableText elementId="cl_test_title_1" defaultText="Lo que dicen" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="cl_test_title_2" defaultText="nuestros clientes" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-8 shadow-lg">
                            <div className="flex mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                            <p className="text-lg text-sky-800 dark:text-sky-200 italic mb-6">"<EditableText elementId={t.contentId} defaultText={t.contentDefault} tag="span" />"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {t.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-sky-900 dark:text-sky-100"><EditableText elementId={t.nameId} defaultText={t.nameDefault} tag="span" /></h4>
                                    <p className="text-sm text-sky-600 dark:text-sky-400"><EditableText elementId={t.roleId} defaultText={t.roleDefault} tag="span" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CleaningTestimonials;