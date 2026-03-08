import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const SalonTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
    };

    const testimonials = [
        {
            id: 'test_1',
            contentId: 'sl_test_1_content',
            contentDefault: 'María Laura es una artista. Entendió exactamente lo que quería y el resultado superó mis expectativas. El salón es hermoso y la atención excelente.',
            nameId: 'sl_test_1_name', nameDefault: 'Ana González',
            roleId: 'sl_test_1_role', roleDefault: '@ana.beauty',
            rating: 5,
        },
        {
            id: 'test_2',
            contentId: 'sl_test_2_content',
            contentDefault: 'Me maquillé con Carolina para mi casamiento y fue perfecto. Duró todo el día y las fotos quedaron espectaculares. Muy profesional y cálida.',
            nameId: 'sl_test_2_name', nameDefault: 'Lucía Martínez',
            roleId: 'sl_test_2_role', roleDefault: '@luciamartinez',
            rating: 5,
        },
        {
            id: 'test_3',
            contentId: 'sl_test_3_content',
            contentDefault: 'Valentina hace magia con las uñas. Hace un año que me hago las manos con ella y siempre quedan perfectas. La recomiendo mucho.',
            nameId: 'sl_test_3_name', nameDefault: 'Camila Rodríguez',
            roleId: 'sl_test_3_role', roleDefault: '@cami.rod',
            rating: 5,
        },
    ];

    return (
        <section className="section-padding bg-pink-50 dark:bg-pink-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pink-900 dark:text-pink-100">
                        <EditableText elementId="sl_test_title_1" defaultText="Lo que dicen" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="sl_test_title_2" defaultText="nuestras clientas" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-pink-900/20 rounded-2xl p-8 shadow-lg">
                            <div className="flex mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                            <p className="text-lg text-pink-800 dark:text-pink-200 italic mb-6">"<EditableText elementId={t.contentId} defaultText={t.contentDefault} tag="span" />"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {t.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-pink-900 dark:text-pink-100"><EditableText elementId={t.nameId} defaultText={t.nameDefault} tag="span" /></h4>
                                    <p className="text-sm text-pink-600 dark:text-pink-400"><EditableText elementId={t.roleId} defaultText={t.roleDefault} tag="span" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalonTestimonials;