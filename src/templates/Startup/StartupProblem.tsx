import { AlertCircle, BarChart, XCircle } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const StartupProblem: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
    };

    const problems = [
        {
            id: 'prob_1',
            icon: <XCircle className="w-8 h-8" />,
            titleId: 'st_prob_1_title', titleDefault: 'Procesos ineficientes',
            descId: 'st_prob_1_desc', descDefault: 'Las empresas pierden horas en tareas manuales que podrían automatizarse.',
        },
        {
            id: 'prob_2',
            icon: <BarChart className="w-8 h-8" />,
            titleId: 'st_prob_2_title', titleDefault: 'Falta de datos',
            descId: 'st_prob_2_desc', descDefault: 'Sin información en tiempo real, es difícil tomar decisiones acertadas.',
        },
        {
            id: 'prob_3',
            icon: <AlertCircle className="w-8 h-8" />,
            titleId: 'st_prob_3_title', titleDefault: 'Altos costos',
            descId: 'st_prob_3_desc', descDefault: 'Las soluciones actuales son caras y no están al alcance de todos.',
        },
    ];

    return (
        <section id="problem" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText elementId="st_prob_title_1" defaultText="El" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="st_prob_title_2" defaultText="problema" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-emerald-700 dark:text-emerald-300">
                        <EditableText elementId="st_prob_description" defaultText="Identificamos los desafíos que enfrentan las empresas hoy." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem) => (
                        <div key={problem.id} className="p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                            <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {problem.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-emerald-900 dark:text-emerald-100">
                                <EditableText elementId={problem.titleId} defaultText={problem.titleDefault} tag="span" />
                            </h3>
                            <p className="text-emerald-700 dark:text-emerald-300">
                                <EditableText elementId={problem.descId} defaultText={problem.descDefault} tag="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StartupProblem;