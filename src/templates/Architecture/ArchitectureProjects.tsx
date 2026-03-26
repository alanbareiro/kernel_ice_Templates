import { ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const ArchitectureProjects: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
    };
    const [activeCategory, setActiveCategory] = useState('todos');

    const categories = [
        { id: 'todos', name: 'Todos', nameId: 'ar_cat_todos' },
        { id: 'residencial', name: 'Residencial', nameId: 'ar_cat_residencial' },
        { id: 'comercial', name: 'Comercial', nameId: 'ar_cat_comercial' },
        { id: 'corporativo', name: 'Corporativo', nameId: 'ar_cat_corporativo' },
    ];

    // Mapeo de imágenes para cada proyecto
    const projectImages = {
        project_1: defaultImages.architecture.project1,
        project_2: defaultImages.architecture.project2,
        project_3: defaultImages.architecture.project3,
        project_4: defaultImages.architecture.project2, // Reutilizamos imágenes disponibles
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
        {
            id: 'project_2',
            category: 'comercial',
            titleId: 'ar_project_2_title',
            titleDefault: 'Espacio Comercial Centro',
            descId: 'ar_project_2_desc',
            descDefault: 'Local comercial con fachada de vidrio y diseño interior moderno y funcional.',
            locationId: 'ar_project_2_location',
            locationDefault: 'Buenos Aires, Argentina',
            yearId: 'ar_project_2_year',
            yearDefault: '2022',
            imageId: 'ar_project_2_image',
            defaultImage: projectImages.project_2,
        },
        {
            id: 'project_3',
            category: 'corporativo',
            titleId: 'ar_project_3_title',
            titleDefault: 'Oficinas TechCorp',
            descId: 'ar_project_3_desc',
            descDefault: 'Diseño de oficinas corporativas con espacios colaborativos y áreas de descanso.',
            locationId: 'ar_project_3_location',
            locationDefault: 'Córdoba, Argentina',
            yearId: 'ar_project_3_year',
            yearDefault: '2023',
            imageId: 'ar_project_3_image',
            defaultImage: projectImages.project_3,
        },
        {
            id: 'project_4',
            category: 'residencial',
            titleId: 'ar_project_4_title',
            titleDefault: 'Edificio Portal del Sol',
            descId: 'ar_project_4_desc',
            descDefault: 'Complejo de departamentos con amenities y diseño sustentable.',
            locationId: 'ar_project_4_location',
            locationDefault: 'Mendoza, Argentina',
            yearId: 'ar_project_4_year',
            yearDefault: '2024',
            imageId: 'ar_project_4_image',
            defaultImage: projectImages.project_4,
        },
        {
            id: 'project_5',
            category: 'comercial',
            titleId: 'ar_project_5_title',
            titleDefault: 'Restaurante La Mesa',
            descId: 'ar_project_5_desc',
            descDefault: 'Remodelación de restaurante con diseño industrial y acogedor.',
            locationId: 'ar_project_5_location',
            locationDefault: 'Rosario, Argentina',
            yearId: 'ar_project_5_year',
            yearDefault: '2022',
            imageId: 'ar_project_5_image',
            defaultImage: projectImages.project_5,
        },
        {
            id: 'project_6',
            category: 'corporativo',
            titleId: 'ar_project_6_title',
            titleDefault: 'Banco Regional',
            descId: 'ar_project_6_desc',
            descDefault: 'Sucursal bancaria con diseño moderno, seguridad y accesibilidad.',
            locationId: 'ar_project_6_location',
            locationDefault: 'La Plata, Argentina',
            yearId: 'ar_project_6_year',
            yearDefault: '2023',
            imageId: 'ar_project_6_image',
            defaultImage: projectImages.project_6,
        },
    ];

    const filteredProjects = activeCategory === 'todos'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                        <EditableText
                            elementId="ar_projects_title_1"
                            defaultText="Nuestros"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="ar_projects_title_2"
                                defaultText="Proyectos"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400">
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
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat.id
                                ? 'text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                }`}
                            style={activeCategory === cat.id ? { background: colors.primary } : {}}
                        >
                            <EditableText elementId={cat.nameId} defaultText={cat.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Grid de proyectos */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group bg-stone-50 dark:bg-stone-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
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
                                <h3 className="text-xl font-bold mb-2 text-stone-900 dark:text-stone-100">
                                    <EditableText elementId={project.titleId} defaultText={project.titleDefault} tag="span" />
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm">
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