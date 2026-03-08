import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const FoodTruckTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
    };

    const testimonials = [
        {
            id: 'test_1',
            contentId: 'ft_test_1_content',
            contentDefault: 'Las mejores hamburguesas sobre ruedas. El Cheddar & Bacon es espectacular. Los sigo a donde vayan!',
            nameId: 'ft_test_1_name', nameDefault: 'Martín López',
            roleId: 'ft_test_1_role', roleDefault: '@martin_comidas',
            rating: 5,
        },
        {
            id: 'test_2',
            contentId: 'ft_test_2_content',
            contentDefault: 'Los tacos al pastor son lo más parecido a México que probé en Buenos Aires. Muy recomendable.',
            nameId: 'ft_test_2_name', nameDefault: 'Camila Rodríguez',
            roleId: 'ft_test_2_role', roleDefault: '@cami_viajera',
            rating: 5,
        },
        {
            id: 'test_3',
            contentId: 'ft_test_3_content',
            contentDefault: 'Excelente atención y la comida es de primera. Las papas con cheddar son adictivas.',
            nameId: 'ft_test_3_name', nameDefault: 'Javier Méndez',
            roleId: 'ft_test_3_role', roleDefault: '@javi_foodie',
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900 dark:text-orange-100">
                        <EditableText elementId="ft_test_title_1" defaultText="Lo que dicen" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="ft_test_title_2" defaultText="nuestros seguidores" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-8 shadow-lg">
                            <div className="flex mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                            <p className="text-lg text-orange-800 dark:text-orange-200 italic mb-6">"<EditableText elementId={t.contentId} defaultText={t.contentDefault} tag="span" />"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {t.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-orange-900 dark:text-orange-100"><EditableText elementId={t.nameId} defaultText={t.nameDefault} tag="span" /></h4>
                                    <p className="text-sm text-orange-600 dark:text-orange-400"><EditableText elementId={t.roleId} defaultText={t.roleDefault} tag="span" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FoodTruckTestimonials;