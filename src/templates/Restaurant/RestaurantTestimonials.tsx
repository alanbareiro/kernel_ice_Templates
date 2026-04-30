// src/templates/Restaurant/RestaurantTestimonials.tsx
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const RestaurantTestimonials = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            nameId: 'r_testimonial_1_name',
            nameDefault: 'María Fernanda López',
            roleId: 'r_testimonial_1_role',
            roleDefault: 'Comensal frecuente',
            contentId: 'r_testimonial_1_content',
            contentDefault: 'Sin duda el mejor restaurante de Buenos Aires. La atención es impecable, el ambiente cálido y la comida... simplemente espectacular. El bife de chorizo es el mejor que probé en mi vida.',
            dateId: 'r_testimonial_1_date',
            dateDefault: 'Hace 2 días',
            rating: 5,
            image: '👩‍🦰',
        },
        // ... resto de testimonios
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                    >
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2
                        className="font-bold mb-6"
                        style={{
                            fontSize: typography.sectionTitleSize,
                            color: sectionColors.featuresTitleColor
                        }}
                    >
                        <EditableText
                            elementId="r_testimonials_title_1"
                            defaultText="Lo que dicen nuestros"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="r_testimonials_title_2"
                                defaultText="comensales"
                                tag="span"
                            />
                        </span>
                    </h2>
                </div>

                {/* Carrusel */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div
                                        className="rounded-3xl p-8 md:p-12"
                                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}08` }}
                                    >
                                        {/* Rating */}
                                        <div className="flex justify-center mb-6">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>

                                        {/* Contenido */}
                                        <p
                                            className="text-xl md:text-2xl italic mb-8 text-center"
                                            style={{ color: sectionColors.bodyTextColor }}
                                        >
                                            "<EditableText
                                                elementId={testimonial.contentId}
                                                defaultText={testimonial.contentDefault}
                                                tag="span"
                                            />"
                                        </p>

                                        {/* Autor */}
                                        <div className="flex items-center justify-center">
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                            >
                                                {testimonial.image}
                                            </div>
                                            <div className="ml-4 text-left">
                                                <h4 className="text-xl font-bold" style={{ color: sectionColors.featuresTitleColor }}>
                                                    <EditableText
                                                        elementId={testimonial.nameId}
                                                        defaultText={testimonial.nameDefault}
                                                        tag="span"
                                                    />
                                                </h4>
                                                <p style={{ color: sectionColors.buttonPrimaryBackground }}>
                                                    <EditableText
                                                        elementId={testimonial.roleId}
                                                        defaultText={testimonial.roleDefault}
                                                        tag="span"
                                                    />
                                                </p>
                                                <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                                    <EditableText
                                                        elementId={testimonial.dateId}
                                                        defaultText={testimonial.dateDefault}
                                                        tag="span"
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botones de navegación */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                        style={{ backgroundColor: sectionColors.featuresCardBackground, color: sectionColors.buttonPrimaryBackground }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                        style={{ backgroundColor: sectionColors.featuresCardBackground, color: sectionColors.buttonPrimaryBackground }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicadores */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'w-8' : ''}`}
                                style={index === currentIndex ? { background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` } : { backgroundColor: `${sectionColors.buttonPrimaryBackground}40` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Puntuación general */}
                <div className="mt-16 text-center">
                    <div
                        className="inline-flex items-center space-x-4 rounded-2xl px-8 py-4"
                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}
                    >
                        <div className="text-5xl font-bold" style={{ color: sectionColors.featuresTitleColor }}>
                            <EditableText
                                elementId="r_rating_score"
                                defaultText="4.9"
                                tag="span"
                            />
                        </div>
                        <div className="text-left">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText
                                    elementId="r_rating_based"
                                    defaultText="Basado en 1,234 reseñas"
                                    tag="span"
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RestaurantTestimonials;