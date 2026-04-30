// src/templates/Architecture/ArchitectureProjects.tsx
import { ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const ArchitectureProjects: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [activeCategory, setActiveCategory] = useState('todos');

    const categories = [
        { id: 'todos', name: 'Todos', nameId: 'ar_cat_todos' },
        { id: 'residencial', name: 'Residencial', nameId: 'ar_cat_residencial' },
        { id: 'comercial', name: 'Comercial', nameId: 'ar_cat_comercial' },
        { id: 'corporativo', name: 'Corporativo', nameId: 'ar_cat_corporativo' },
    ];

    const projectImages = {
        project_1: defaultImages.architecture.project1,
        project_2: defaultImages.architecture.project2,
        project_3: defaultImages.architecture.project3,
        project_4: defaultImages.architecture.project2,
        project_5: defaultImages.architecture.project1,
        project_6: defaultImages.architecture.project3,
    };

    const projects = [
        {
            id: 'project_1',
            category: 'residencial',
            titleId: 'ar_project_1_title',
            titleDefault: 'Casa Mirador',
            descId: 'ar_project_1_desc',
            descDefault: 'Vivienda unifamiliar con vistas panorámicas, integración de espacios interiores y exteriores.',
            locationId: 'ar_project_1_location',
            locationDefault: 'Bariloche, Argentina',
            yearId: 'ar_project_1_year',
            yearDefault: '2023',
            imageId: 'ar_project_1_image',
            defaultImage: projectImages.project_1,
        },
        // ... otros proyectos
    ];

    const filteredProjects = activeCategory === 'todos'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section
            id="projects"
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
                        <EditableText
                            elementId="ar_projects_title_1"
                            defaultText="Nuestros"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="ar_projects_title_2"
                                defaultText="Proyectos"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="ar_projects_description"
                            defaultText="Explorá algunos de nuestros trabajos más destacados."
                            tag="span"
                        />
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat.id ? 'text-white' : ''
                                }`}
                            style={
                                activeCategory === cat.id
                                    ? { background: sectionColors.buttonPrimaryBackground }
                                    : {
                                        backgroundColor: sectionColors.featuresCardBackground,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            <EditableText elementId={cat.nameId} defaultText={cat.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Grid de proyectos */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <EditableImage
                                    elementId={project.imageId}
                                    defaultImage={project.defaultImage}
                                    alt={project.titleDefault}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    category="architecture"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                                    <div className="text-white">
                                        <p className="text-sm opacity-90">
                                            <EditableText elementId={project.locationId} defaultText={project.locationDefault} tag="span" />
                                        </p>
                                        <p className="text-xs opacity-75">
                                            <EditableText elementId={project.yearId} defaultText={project.yearDefault} tag="span" />
                                        </p>
                                    </div>
                                    <a href="#" className="text-white hover:text-stone-300 transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3
                                    className="text-xl font-bold mb-2"
                                    style={{ color: sectionColors.featuresTitleColor }}
                                >
                                    <EditableText elementId={project.titleId} defaultText={project.titleDefault} tag="span" />
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: sectionColors.bodyTextColor }}
                                >
                                    <EditableText elementId={project.descId} defaultText={project.descDefault} tag="span" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArchitectureProjects;