// src/templates/Restaurant/RestaurantAbout.tsx
import { Award, ChefHat, Heart, Sparkles, Users } from 'lucide-react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const RestaurantAbout = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const stats = [
        { icon: <Heart className="w-6 h-6" />, valueId: 'r_about_stat_1_value', valueDefault: '38 años', labelId: 'r_about_stat_1_label', labelDefault: 'De historia' },
        { icon: <Users className="w-6 h-6" />, valueId: 'r_about_stat_2_value', valueDefault: '200k+', labelId: 'r_about_stat_2_label', labelDefault: 'Comensales felices' },
        { icon: <Award className="w-6 h-6" />, valueId: 'r_about_stat_3_value', valueDefault: '15', labelId: 'r_about_stat_3_label', labelDefault: 'Premios recibidos' },
        { icon: <ChefHat className="w-6 h-6" />, valueId: 'r_about_stat_4_value', valueDefault: '12', labelId: 'r_about_stat_4_label', labelDefault: 'Chefs en equipo' },
    ];

    return (
        <section
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText
                                    elementId="r_about_badge"
                                    defaultText="Nuestra Historia"
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
                                    elementId="r_about_title_1"
                                    defaultText="Tradición que se"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="r_about_title_2"
                                        defaultText="saborea"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId="r_about_desc_1"
                                    defaultText="Desde 1985, en el corazón de Palermo, venimos deleitando a generaciones con recetas que pasan de abuelos a nietos. Nuestro restaurante nació del sueño de Don Giuseppe, inmigrante italiano que trajo en su valija los secretos de la cocina tradicional."
                                    tag="span"
                                />
                            </p>

                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText
                                    elementId="r_about_desc_2"
                                    defaultText="Hoy, su legado continúa en cada plato que sale de nuestra cocina. Combinamos las recetas originales con técnicas modernas para ofrecer una experiencia única que honra el pasado pero mira al futuro."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-all duration-300"
                                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div
                                        className="text-2xl font-bold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId={stat.valueId}
                                            defaultText={stat.valueDefault}
                                            tag="span"
                                        />
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
                                        <EditableText
                                            elementId={stat.labelId}
                                            defaultText={stat.labelDefault}
                                            tag="span"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Valores */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_value_1"
                                        defaultText="Calidad"
                                        tag="span"
                                    />
                                </p>
                            </div>
                            <div className="text-center">
                                <Heart className="w-6 h-6 mx-auto mb-2" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_value_2"
                                        defaultText="Pasión"
                                        tag="span"
                                    />
                                </p>
                            </div>
                            <div className="text-center">
                                <Users className="w-6 h-6 mx-auto mb-2" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_value_3"
                                        defaultText="Familia"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Imagen con historia */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <EditableImage
                                    elementId="r_about_image_1"
                                    defaultImage={defaultImages.restaurant.about}
                                    alt="Restaurante antiguo"
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                    category="restaurant"
                                />
                                <EditableImage
                                    elementId="r_about_image_2"
                                    defaultImage={defaultImages.restaurant.interior}
                                    alt="Ambiente actual"
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                    category="restaurant"
                                />
                            </div>
                            <div className="mt-8">
                                <EditableImage
                                    elementId="r_about_image_3"
                                    defaultImage={defaultImages.restaurant.hero}
                                    alt="Plato signature"
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                    category="restaurant"
                                />
                            </div>
                        </div>

                        {/* Badge flotante */}
                        <div
                            className="absolute -bottom-4 -left-4 rounded-xl p-4 shadow-2xl"
                            style={{ backgroundColor: sectionColors.featuresCardBackground, border: `1px solid ${sectionColors.buttonPrimaryBackground}` }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="text-4xl">🇮🇹</div>
                                <div>
                                    <p className="font-bold" style={{ color: sectionColors.featuresTitleColor }}>
                                        <EditableText
                                            elementId="r_badge_title"
                                            defaultText="Cocina Italo-Argentina"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-sm" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                        <EditableText
                                            elementId="r_badge_text"
                                            defaultText="4ta generación"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RestaurantAbout;