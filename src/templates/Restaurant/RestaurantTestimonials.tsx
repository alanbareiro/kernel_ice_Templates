import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RestaurantTestimonials = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
    };
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
        {
            nameId: 'r_testimonial_2_name',
            nameDefault: 'Juan Pablo Martínez',
            roleId: 'r_testimonial_2_role',
            roleDefault: 'Crítico gastronómico',
            contentId: 'r_testimonial_2_content',
            contentDefault: 'Un lugar que honra la tradición italiana-argentina. La pastas son artesanales, la salsa tiene ese toque de la nonna. El servicio es atento sin ser invasivo. Volveré sin dudas.',
            dateId: 'r_testimonial_2_date',
            dateDefault: 'Hace 1 semana',
            rating: 5,
            image: '👨‍🦳',
        },
        {
            nameId: 'r_testimonial_3_name',
            nameDefault: 'Carolina Rodríguez',
            roleId: 'r_testimonial_3_role',
            roleDefault: 'Celebración de aniversario',
            contentId: 'r_testimonial_3_content',
            contentDefault: 'Vinimos a celebrar nuestros 10 años de casados. El chef nos envió una degustación especial y el postre con dedicatoria. Detalles que marcan la diferencia. Gracias por todo.',
            dateId: 'r_testimonial_3_date',
            dateDefault: 'Hace 3 días',
            rating: 5,
            image: '👩‍🦱',
        },
        {
            nameId: 'r_testimonial_4_name',
            nameDefault: 'Diego Sánchez',
            roleId: 'r_testimonial_4_role',
            roleDefault: 'Turista español',
            contentId: 'r_testimonial_4_content',
            contentDefault: 'Buscaba un auténtico asado argentino y lo encontré acá. La provoleta, las empanadas, el vacío... todo perfecto. Y el malbec recomendado, espectacular. 10/10.',
            dateId: 'r_testimonial_4_date',
            dateDefault: 'Hace 5 días',
            rating: 5,
            image: '👨‍🦰',
        },
        {
            nameId: 'r_testimonial_5_name',
            nameDefault: 'Valentina Greco',
            roleId: 'r_testimonial_5_role',
            roleDefault: 'Italiana viviendo en Argentina',
            contentId: 'r_testimonial_5_content',
            contentDefault: 'Soy italiana y soy muy exigente con la comida. Este lugar me transportó a Italia. Los sorrentinos, el tiramisú... excelente. Felicitaciones al chef.',
            dateId: 'r_testimonial_5_date',
            dateDefault: 'Hace 4 días',
            rating: 5,
            image: '👩‍🦳',
        },
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
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-900 dark:text-red-100">
                        <EditableText
                            elementId="r_testimonials_title_1"
                            defaultText="Lo que dicen nuestros"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
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
                                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-3xl p-8 md:p-12">
                                        {/* Rating */}
                                        <div className="flex justify-center mb-6">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>

                                        {/* Contenido */}
                                        <p className="text-xl md:text-2xl text-red-800 dark:text-red-200 italic mb-8 text-center">
                                            "<EditableText
                                                elementId={testimonial.contentId}
                                                defaultText={testimonial.contentDefault}
                                                tag="span"
                                            />"
                                        </p>

                                        {/* Autor */}
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                                {testimonial.image}
                                            </div>
                                            <div className="ml-4 text-left">
                                                <h4 className="text-xl font-bold text-red-900 dark:text-red-100">
                                                    <EditableText
                                                        elementId={testimonial.nameId}
                                                        defaultText={testimonial.nameDefault}
                                                        tag="span"
                                                    />
                                                </h4>
                                                <p className="text-red-600 dark:text-red-400">
                                                    <EditableText
                                                        elementId={testimonial.roleId}
                                                        defaultText={testimonial.roleDefault}
                                                        tag="span"
                                                    />
                                                </p>
                                                <p className="text-sm text-red-500 dark:text-red-500">
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white dark:bg-red-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" style={{ color: colors.primary }} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white dark:bg-red-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                    >
                        <ChevronRight className="w-6 h-6" style={{ color: colors.primary }} />
                    </button>

                    {/* Indicadores */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                        ? 'w-8'
                                        : ''
                                    }`}
                                style={index === currentIndex ? { background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` } : { backgroundColor: `${colors.primary}40` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Puntuación general */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-4 rounded-2xl px-8 py-4"
                        style={{ backgroundColor: `${colors.primary}10` }}>
                        <div className="text-5xl font-bold text-red-900 dark:text-red-100">
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
                            <p className="text-sm text-red-700 dark:text-red-300">
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