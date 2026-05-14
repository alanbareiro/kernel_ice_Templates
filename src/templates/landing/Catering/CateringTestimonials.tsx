import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const DEFAULT_TESTIMONIALS = [
    { id: 't1', name: 'Laura y Carlos', role: 'Casamiento - Noviembre 2024', content: 'El servicio fue impecable desde el principio hasta el final. Nuestros invitados siguen hablando de la comida, especialmente del risotto y los postres. ¡Gracias por hacer de nuestra boda un día perfecto!', image: '👰‍♀️🤵‍♂️', rating: 5, visible: true },
    { id: 't2', name: 'Empresa TechCorp', role: 'Evento Corporativo', content: 'Contratamos sus servicios para nuestra cena de fin de año. Quedamos impresionados con la calidad, la presentación y la atención. Sin duda los volveremos a contratar.', image: '🏢', rating: 5, visible: true },
    { id: 't3', name: 'Ana María', role: 'Cumpleaños 50', content: 'Celebré mi cumpleaños con ellos y fue espectacular. Se adaptaron a mis preferencias y crearon un menú personalizado que encantó a todos. Profesionales y talentosos.', image: '🎂', rating: 5, visible: true }
];

const CateringTestimonials = () => {
    const { template } = useTemplate();
    const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    useEffect(() => {
        const stored = template?.texts?.['c_testimonial_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) setTestimonials(parsed);
            } catch (e) { }
        } else setTestimonials(DEFAULT_TESTIMONIALS);
    }, [template?.texts]);

    return (
        <section className="section-padding" style={{ backgroundColor: sectionColors.featuresBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                        <span className="text-3xl">💬</span>
                    </div>
                    <h2 className="font-bold mb-6" style={{ fontSize: typography.featuresTitleSize, color: sectionColors.featuresTitleColor }}>
                        <EditableText elementId="c_testimonials_title_1" defaultText="Lo que dicen nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                            <EditableText elementId="c_testimonials_title_2" defaultText="clientes" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => {
                        if (t.visible === false) return null;
                        return (
                            <div key={t.id || idx} className="rounded-2xl p-8 border" style={{ backgroundColor: sectionColors.featuresCardBackground, borderColor: sectionColors.featuresCardBorder }}>
                                <div className="flex mb-4">
                                    {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <p className="text-lg italic mb-6" style={{ color: sectionColors.bodyTextColor }}>"{t.content}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>{t.image}</div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold" style={{ color: sectionColors.featuresTitleColor }}>{t.name}</h4>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CateringTestimonials;