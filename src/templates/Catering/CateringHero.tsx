// src/templates/Catering/CateringHero.tsx
import { ArrowRight, Clock, Star, Users } from 'lucide-react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const CateringHero = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    const buttons = template?.buttons || defaultButtons;

    return (
        <section
            className="relative section-padding overflow-hidden"
            style={{ backgroundColor: sectionColors.heroBackground }}
        >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}
                />
                <div
                    className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{
                                    backgroundColor: sectionColors.heroBadgeBackground,
                                    color: sectionColors.heroBadgeTextColor
                                }}
                            >
                                <Star className="w-4 h-4 mr-2 fill-current" />
                                <EditableText
                                    elementId="c_hero_badge"
                                    defaultText="Servicio Premium de Catering"
                                    tag="span"
                                />
                            </span>

                            <h1
                                className="font-bold leading-tight mb-6"
                                style={{
                                    fontSize: typography.heroTitleSize,
                                    color: sectionColors.heroTitleColor
                                }}
                            >
                                <EditableText
                                    elementId="c_hero_title_1"
                                    defaultText="Sabores que"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="c_hero_title_2"
                                        defaultText="enamoran"
                                        tag="span"
                                    />
                                </span>
                                , <EditableText
                                    elementId="c_hero_title_3"
                                    defaultText="eventos que perduran"
                                    tag="span"
                                />
                            </h1>

                            <p
                                className="max-w-2xl"
                                style={{
                                    fontSize: typography.heroDescriptionSize,
                                    color: sectionColors.heroDescriptionColor
                                }}
                            >
                                <EditableText
                                    elementId="c_hero_description"
                                    defaultText="Hacemos de tu evento una experiencia gastronómica inolvidable. Bodas, empresas, fiestas privadas y más."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={buttons.primary.url}
                                target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                                className="group font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{
                                    backgroundColor: sectionColors.buttonPrimaryBackground,
                                    color: sectionColors.buttonPrimaryText,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryBackground;
                                }}
                            >
                                <EditableText
                                    elementId="c_cta_primary"
                                    defaultText={buttons.primary.text}
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={buttons.secondary.url}
                                target={buttons.secondary.openInNewTab ? '_blank' : '_self'}
                                className="group font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center border-2"
                                style={{
                                    backgroundColor: sectionColors.buttonSecondaryBackground,
                                    color: sectionColors.buttonSecondaryText,
                                    borderColor: sectionColors.buttonPrimaryBackground,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonSecondaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonSecondaryBackground;
                                }}
                            >
                                <EditableText
                                    elementId="c_cta_secondary"
                                    defaultText={buttons.secondary.text}
                                    tag="span"
                                />
                            </a>
                        </div>

                        {/* Indicadores de confianza */}
                        <div className="pt-8 flex flex-wrap items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.heroDescriptionColor }}>
                                    <EditableText
                                        elementId="c_hero_exp"
                                        defaultText="15 años de experiencia"
                                        tag="span"
                                    />
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.heroDescriptionColor }}>
                                    <EditableText
                                        elementId="c_hero_events"
                                        defaultText="+500 eventos realizados"
                                        tag="span"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="c_hero_image"
                                defaultImage={defaultImages.catering.hero}
                                alt="Buffet de catering"
                                className="w-full h-auto object-cover"
                                category="catering"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <p className="text-2xl font-bold">
                                    <EditableText
                                        elementId="c_hero_image_title"
                                        defaultText="Cocina de autor"
                                        tag="span"
                                    />
                                </p>
                                <p className="text-sm opacity-90">
                                    <EditableText
                                        elementId="c_hero_image_subtitle"
                                        defaultText="Platos exclusivos para cada ocasión"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>

                        {/* Badge flotante */}
                        <div
                            className="absolute -bottom-4 -left-4 rounded-2xl shadow-xl p-4"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="text-3xl">🍽️</div>
                                <div>
                                    <p className="font-bold" style={{ color: sectionColors.heroTitleColor }}>
                                        <EditableText
                                            elementId="c_hero_badge_title"
                                            defaultText="Menús personalizados"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-sm" style={{ color: sectionColors.heroDescriptionColor }}>
                                        <EditableText
                                            elementId="c_hero_badge_text"
                                            defaultText="Adaptados a tus necesidades"
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

export default CateringHero;