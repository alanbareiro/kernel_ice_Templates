import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const FashionTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
    };

    const testimonials = [
        {
            id: 'test_1',
            contentId: 'fa_test_1_content',
            contentDefault: 'Las prendas de Kernelize son de una calidad excepcional. Compré un vestido para una boda y recibí miles de cumplidos. La atención también es excelente.',
            nameId: 'fa_test_1_name', nameDefault: 'Valentina Rossi',
            roleId: 'fa_test_1_role', roleDefault: '@valerossi',
            rating: 5,
        },
        {
            id: 'test_2',
            contentId: 'fa_test_2_content',
            contentDefault: 'Me encanta que sea una marca local y sustentable. Los diseños son únicos y la ropa dura muchísimo. Ya soy clienta fiel.',
            nameId: 'fa_test_2_name', nameDefault: 'Camila López',
            roleId: 'fa_test_2_role', roleDefault: '@camilopez',
            rating: 5,
        },
        {
            id: 'test_3',
            contentId: 'fa_test_3_content',
            contentDefault: 'Compré online y llegó súper rápido. La talla era perfecta y la calidad superior a lo que esperaba. Muy recomendable.',
            nameId: 'fa_test_3_name', nameDefault: 'Martina García',
            roleId: 'fa_test_3_role', roleDefault: '@martigar',
            rating: 5,
        },
    ];

    return (
        <section className="section-padding bg-gray-50 dark:bg-gray-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                        <EditableText elementId="fa_test_title_1" defaultText="Lo que dicen" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="fa_test_title_2" defaultText="nuestras clientas" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <div className="flex mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">"<EditableText elementId={t.contentId} defaultText={t.contentDefault} tag="span" />"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {t.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white"><EditableText elementId={t.nameId} defaultText={t.nameDefault} tag="span" /></h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><EditableText elementId={t.roleId} defaultText={t.roleDefault} tag="span" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FashionTestimonials;