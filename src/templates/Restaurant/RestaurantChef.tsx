// src/templates/Restaurant/RestaurantChef.tsx
import { Award, BookOpen, ChefHat, Instagram, Star } from 'lucide-react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const RestaurantChef = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    return (
        <section
            id="chef"
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen del chef */}
                    <div className="relative group order-2 lg:order-1">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="r_chef_image"
                                defaultImage={defaultImages.restaurant.chef}
                                alt="Chef ejecutivo"
                                className="w-full h-auto object-cover"
                                category="restaurant"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Award className="w-5 h-5 text-yellow-400" />
                                    <span className="text-sm">
                                        <EditableText
                                            elementId="r_chef_year"
                                            defaultText="Chef del año 2023"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold">
                                    <EditableText
                                        elementId="r_chef_name"
                                        defaultText="Martín Rossi"
                                        tag="span"
                                    />
                                </h3>
                                <p style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText
                                        elementId="r_chef_title"
                                        defaultText="Chef Ejecutivo"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>

                        {/* Logros flotantes */}
                        <div
                            className="absolute -top-4 -right-4 rounded-xl p-4 shadow-xl"
                            style={{ backgroundColor: sectionColors.featuresCardBackground, border: `1px solid ${sectionColors.buttonPrimaryBackground}` }}
                        >
                            <div className="flex items-center space-x-3">
                                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                                <div>
                                    <p className="font-bold" style={{ color: sectionColors.featuresTitleColor }}>
                                        <EditableText
                                            elementId="r_chef_michelin"
                                            defaultText="Estrella Michelin"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-xs" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                        <EditableText
                                            elementId="r_chef_michelin_years"
                                            defaultText="2022 - 2024"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <ChefHat className="w-4 h-4 inline mr-1" />
                                <EditableText
                                    elementId="r_chef_badge"
                                    defaultText="Chef Ejecutivo"
                                    tag="span"
                                />
                            </span>

                            <h2
                                className="font-bold mb-6"
                                style={{
                                    fontSize: typography.sectionTitleSize,
                                    color: sectionColors.featuresTitleColor
                                }}
                            >
                                <EditableText
                                    elementId="r_chef_name_display"
                                    defaultText="Martín Rossi"
                                    tag="span"
                                />,
                                <span
                                    className="text-transparent bg-clip-text block"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="r_chef_subtitle"
                                        defaultText="el arte de cocinar"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId="r_chef_desc_1"
                                    defaultText="Con más de 20 años de experiencia en cocinas de Argentina, Italia y España, Martín lidera nuestro equipo con la pasión y el respeto por la tradición que aprendió de su abuela piamontesa."
                                    tag="span"
                                />
                            </p>

                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText
                                    elementId="r_chef_desc_2"
                                    defaultText="Formado en el Instituto Gato Dumas y con paso por restaurantes como 'El Bulli' (España) y 'Don Julio' (Buenos Aires), hoy plasma su conocimiento en cada plato que sale de nuestra cocina, fusionando técnicas vanguardistas con sabores de la nonna."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Filosofía */}
                        <div
                            className="p-6 rounded-2xl"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}15, ${sectionColors.buttonPrimaryBackground}15)` }}
                        >
                            <h3 className="text-xl font-bold mb-4" style={{ color: sectionColors.featuresTitleColor }}>Su filosofía:</h3>
                            <p className="italic" style={{ color: sectionColors.bodyTextColor }}>
                                "<EditableText
                                    elementId="r_chef_philosophy"
                                    defaultText="Cocinar es un acto de amor. Cada ingrediente merece respeto, cada comensal merece una experiencia inolvidable. No busco recetas perfectas, busco emociones en cada bocado."
                                    tag="span"
                                />"
                            </p>
                        </div>

                        {/* Logros */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Award className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_chef_award_1"
                                        defaultText="15 premios internacionales"
                                        tag="span"
                                    />
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <BookOpen className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_chef_award_2"
                                        defaultText="2 libros publicados"
                                        tag="span"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Redes del chef */}
                        <div className="pt-6 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                            <p className="text-sm mb-3" style={{ color: sectionColors.buttonPrimaryBackground }}>Seguí al chef:</p>
                            <div className="flex space-x-4">
                                <a href="#" className="transition-colors" style={{ color: sectionColors.bodyTextColor }}>
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RestaurantChef;