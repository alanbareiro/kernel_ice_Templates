import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RestaurantHero = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
    };

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
                <EditableImage
                    elementId="r_hero_image"
                    defaultImage={defaultImages.restaurant.hero}
                    alt="Restaurante ambiente"
                    className="w-full h-full object-cover"
                    category="restaurant"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
            </div>

            {/* Contenido */}
            <div className="container-custom relative z-10 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/30">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                            <EditableText
                                elementId="r_hero_badge"
                                defaultText="Desde 1985 • Cocina Tradicional"
                                tag="span"
                            />
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <EditableText
                            elementId="r_hero_title_1"
                            defaultText="Sabores que"
                            tag="span"
                        />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 block"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="r_hero_title_2"
                                defaultText="enamoran los sentidos"
                                tag="span"
                            />
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
                        <EditableText
                            elementId="r_hero_description"
                            defaultText="Descubre una experiencia gastronómica única donde la tradición y la innovación se encuentran en cada plato."
                            tag="span"
                        />
                    </p>

                    {/* Botones CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button
                            className="group text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                        >
                            <EditableText
                                elementId="r_cta_primary"
                                defaultText="Ver nuestro menú"
                                tag="span"
                            />
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="group bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center text-lg">
                            <EditableText
                                elementId="r_cta_secondary"
                                defaultText="Reservar mesa"
                                tag="span"
                            />
                        </button>
                    </div>

                    {/* Info adicional */}
                    <div className="flex flex-wrap justify-center gap-8 text-white/80">
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                            <span>
                                <EditableText
                                    elementId="r_hero_hours"
                                    defaultText="Martes a Domingo 12:00 - 00:00"
                                    tag="span"
                                />
                            </span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                            <span>
                                <EditableText
                                    elementId="r_hero_location"
                                    defaultText="Palermo, Buenos Aires"
                                    tag="span"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default RestaurantHero;