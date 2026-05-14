import { Award, Heart, Sparkles, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { defaultImages } from '../../../assets/default-images';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = { Users, Heart, Award, Sparkles };

const DEFAULT_STATS = [
    { id: 'stat_1', icon: 'Users', value: '500+', label: 'Eventos realizados', visible: true },
    { id: 'stat_2', icon: 'Heart', value: '15', label: 'Años de experiencia', visible: true },
    { id: 'stat_3', icon: 'Award', value: '10', label: 'Premios recibidos', visible: true },
    { id: 'stat_4', icon: 'Sparkles', value: '50k+', label: 'Comensales satisfechos', visible: true }
];

const DEFAULT_VALUES = [
    { id: 'val_1', title: 'Calidad', description: 'Ingredientes frescos y seleccionados', visible: true },
    { id: 'val_2', title: 'Creatividad', description: 'Platos únicos y originales', visible: true }
];

const CateringAbout = () => {
    const { template } = useTemplate();
    const [stats, setStats] = useState(DEFAULT_STATS);
    const [values, setValues] = useState(DEFAULT_VALUES);

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    useEffect(() => {
        const storedStats = template?.texts?.['c_stat_'];
        if (storedStats) {
            try {
                const parsed = JSON.parse(storedStats);
                if (Array.isArray(parsed) && parsed.length > 0) setStats(parsed);
            } catch (e) { }
        } else setStats(DEFAULT_STATS);
    }, [template?.texts]);

    useEffect(() => {
        const storedValues = template?.texts?.['c_value_'];
        if (storedValues) {
            try {
                const parsed = JSON.parse(storedValues);
                if (Array.isArray(parsed) && parsed.length > 0) setValues(parsed);
            } catch (e) { }
        } else setValues(DEFAULT_VALUES);
    }, [template?.texts]);

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Users className="w-6 h-6" />;
    };

    return (
        <section className="section-padding" style={{ backgroundColor: sectionColors.featuresBackground }}>
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}>
                                <EditableText elementId="c_about_badge" defaultText="Nuestra Historia" tag="span" />
                            </span>
                            <h2 className="font-bold mb-6" style={{ fontSize: typography.featuresTitleSize, color: sectionColors.featuresTitleColor }}>
                                <EditableText elementId="c_about_title_1" defaultText="Pasión por la" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                                    <EditableText elementId="c_about_title_2" defaultText="buena mesa" tag="span" />
                                </span>
                            </h2>
                            <p className="text-lg mb-6" style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText elementId="c_about_desc_1" defaultText="Desde 2009, nos dedicamos a crear experiencias gastronómicas únicas que combinan la tradición culinaria con las tendencias más innovadoras..." tag="span" />
                            </p>
                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText elementId="c_about_desc_2" defaultText="Cada evento es una oportunidad para sorprender y deleitar a tus invitados. Nos adaptamos a tus necesidades, presupuesto y preferencias..." tag="span" />
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}>
                            {stats.map((stat, idx) => {
                                if (stat.visible === false) return null;
                                return (
                                    <div key={stat.id || idx} className="text-center group">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}>
                                            {getIcon(stat.icon)}
                                        </div>
                                        <div className="text-2xl font-bold group-hover:text-amber-600 transition-colors" style={{ color: sectionColors.featuresTitleColor }}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs" style={{ color: sectionColors.bodyTextColor }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {values.map((val, idx) => {
                                if (val.visible === false) return null;
                                return (
                                    <div key={val.id || idx} className="p-4 rounded-xl shadow-md" style={{ backgroundColor: sectionColors.featuresCardBackground }}>
                                        <h4 className="font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>{val.title}</h4>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>{val.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl" style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }} />
                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage elementId="c_about_image" defaultImage={defaultImages.catering.about} alt="Chef preparando plato" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" category="catering" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2"><EditableText elementId="c_chef_name" defaultText="Martín Rodríguez" tag="span" /></h3>
                                <p className="opacity-90"><EditableText elementId="c_chef_title" defaultText="Chef Ejecutivo" tag="span" /> - <EditableText elementId="c_chef_exp" defaultText="15 años de experiencia internacional" tag="span" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CateringAbout;