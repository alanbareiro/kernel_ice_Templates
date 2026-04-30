// src/templates/DigitalAgency/DigitalPortfolio.tsx
import { ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const DigitalPortfolio: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', name: 'Todos', nameId: 'di_filter_all' },
        { id: 'web', name: 'Web', nameId: 'di_filter_web' },
        { id: 'app', name: 'Apps', nameId: 'di_filter_app' },
        { id: 'branding', name: 'Branding', nameId: 'di_filter_branding' },
    ];

    const projects = [
        {
            id: 'proj_1', category: 'web',
            titleId: 'di_proj_1_title', titleDefault: 'E-commerce Moda',
            descId: 'di_proj_1_desc', descDefault: 'Tienda online con catálogo, carrito y pasarela de pagos.',
            clientId: 'di_proj_1_client', clientDefault: 'Fashion Store',
            imageId: 'di_proj_1_image',
        },
        {
            id: 'proj_2', category: 'web',
            titleId: 'di_proj_2_title', titleDefault: 'Landing Page',
            descId: 'di_proj_2_desc', descDefault: 'Landing page de alta conversión para campaña de lanzamiento.',
            clientId: 'di_proj_2_client', clientDefault: 'Tech Startup',
            imageId: 'di_proj_2_image',
        },
        {
            id: 'proj_3', category: 'app',
            titleId: 'di_proj_3_title', titleDefault: 'App de Fitness',
            descId: 'di_proj_3_desc', descDefault: 'App para seguimiento de entrenamientos y nutrición.',
            clientId: 'di_proj_3_client', clientDefault: 'Gym App',
            imageId: 'di_proj_3_image',
        },
        {
            id: 'proj_4', category: 'app',
            titleId: 'di_proj_4_title', titleDefault: 'App de Delivery',
            descId: 'di_proj_4_desc', descDefault: 'App para pedidos de comida con geolocalización.',
            clientId: 'di_proj_4_client', clientDefault: 'Food Delivery',
            imageId: 'di_proj_4_image',
        },
        {
            id: 'proj_5', category: 'branding',
            titleId: 'di_proj_5_title', titleDefault: 'Identidad Corporativa',
            descId: 'di_proj_5_desc', descDefault: 'Diseño de logo, papelería y manual de marca.',
            clientId: 'di_proj_5_client', clientDefault: 'Corporación ABC',
            imageId: 'di_proj_5_image',
        },
        {
            id: 'proj_6', category: 'branding',
            titleId: 'di_proj_6_title', titleDefault: 'Rediseño de Marca',
            descId: 'di_proj_6_desc', descDefault: 'Actualización completa de identidad visual.',
            clientId: 'di_proj_6_client', clientDefault: 'Bakery Shop',
            imageId: 'di_proj_6_image',
        },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section
            id="portfolio"
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        className="font-bold mb-6"
                        style={{
                            fontSize: typography.sectionTitleSize,
                            color: sectionColors.featuresTitleColor
                        }}
                    >
                        <EditableText elementId="di_portfolio_title_1" defaultText="Nuestro" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="di_portfolio_title_2" defaultText="portfolio" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="di_portfolio_description" defaultText="Algunos de nuestros trabajos recientes." tag="span" />
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeFilter === filter.id ? 'text-white' : ''
                                }`}
                            style={
                                activeFilter === filter.id
                                    ? { background: sectionColors.buttonPrimaryBackground }
                                    : {
                                        backgroundColor: sectionColors.featuresCardBackground,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            <EditableText elementId={filter.nameId} defaultText={filter.name} tag="span" />
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((proj) => (
                        <div key={proj.id} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all" style={{ backgroundColor: sectionColors.featuresCardBackground }}>
                            <div className="relative h-64 overflow-hidden">
                                <EditableImage elementId={proj.imageId} defaultImage="" alt={proj.titleDefault} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" category="digital" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                                    <a href="#" className="p-2 bg-white rounded-full">
                                        <ExternalLink className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    </a>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText elementId={proj.titleId} defaultText={proj.titleDefault} tag="span" />
                                </h3>
                                <p className="text-sm mb-2" style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText elementId={proj.descId} defaultText={proj.descDefault} tag="span" />
                                </p>
                                <p className="text-xs font-semibold" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText elementId={proj.clientId} defaultText={proj.clientDefault} tag="span" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DigitalPortfolio;