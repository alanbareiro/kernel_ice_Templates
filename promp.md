
"Hola, tengo una app React+TS+Tailwind con backend Node+Express+Prisma y MySql.
El usuario selecciona un template de una lista, lo abre en un editor donde puede cambiar textos e imágenes, y al guardar se almacena en DB.
// src/assets/default-images.ts - VERSIÓN COMPLETA
export const defaultImages = {
    consulting: {
        logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200',
        hero: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        team: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        testimonial1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
        testimonial2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
        testimonial3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    },
    catering: {
        logo: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200',
        hero: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
        about: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        chef: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800',
        buffet: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
        plato1: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
        plato2: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
        plato3: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
    },
    accounting: {
        logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200',
        hero: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
        about: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
        office: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
        team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        testimonial1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
        testimonial2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
        testimonial3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    },
    restaurant: {
        logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200',
        hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        chef: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800',
        interior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        plato1: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
        plato2: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
        plato3: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
        terraza: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
        about: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
        wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
        terrace: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
    },
    lawFirm: {
        logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200',
        hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
        about: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        attorney1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
        attorney2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        attorney3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
        attorney4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
    },
    medical: {
        logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200',
        hero: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        about: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
        doctor1: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
        doctor2: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
        doctor3: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800',
        doctor4: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800',
    },
    architecture: {
        logo: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=200',
        hero: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
        about: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        project1: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        project2: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
        project3: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
        team1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
        team2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        team3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
        team4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
    },
    marketing: {
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200',
        hero: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        case1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        case2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        case3: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800',
        team1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
        team2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        team3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
        team4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
    },
    coffee: {
        logo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200',
        hero: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
        about: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
        gallery1: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        gallery2: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
        gallery3: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
        event1: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
        event2: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
        event3: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    },
    bakery: {
        logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
        hero: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        about: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800',
        product1: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800',
        product2: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        product3: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800',
        product4: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
        product5: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
        product6: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800',
        gallery1: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        gallery2: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800',
        gallery3: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
    },
    // src/assets/default-images.ts - Verificar sección de foodtruck
    foodtruck: {
        logo: 'https://images.unsplash.com/photo-1565125719084-5d5466b5c5a2?w=200',
        hero: 'https://images.unsplash.com/photo-1565125719084-5d5466b5c5a2?w=800',
        about: 'https://images.unsplash.com/photo-1565125719084-5d5466b5c5a2?w=800',
        burger1: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
        burger2: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
        burger3: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
        taco1: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800',
        taco2: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa7f?w=800',
        side1: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800',
        drink1: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800',
    },
    beauty: {
        logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200',
        hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        about: 'https://images.unsplash.com/photo-1522337360782-6d4b9c5b4b5a?w=800',
        service1: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
        service2: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        service3: 'https://images.unsplash.com/photo-1522337360782-6d4b9c5b4b5a?w=800',
        team1: 'https://images.unsplash.com/photo-1487412947146-5cebf100ffc2?w=800',
        team2: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
        team3: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800',
        team4: 'https://images.unsplash.com/photo-1522337360782-6d4b9c5b4b5a?w=800',
    },
    gym: {
        logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200',
        hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
        class1: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
        class2: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800',
        trainer1: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        trainer2: 'https://images.unsplash.com/photo-1571019614242-83f2850e3d4e?w=800',
    },
    realestate: {
        logo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200',
        hero: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        about: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        property1: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        property2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        property3: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        agent1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
        agent2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        agent3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
        agent4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
    },
    fashion: {
        logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200',
        hero: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
        about: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
        product1: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
        product2: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
        product3: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
        look1: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
        look2: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
        look3: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    },
    cleaning: {
        logo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200',
        hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        about: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800',
        service1: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        service2: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        service3: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800',
    },
    saas: {
        logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200',
        hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    },
    digital: {
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200',
        hero: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        project1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        project2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        project3: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800',
    },
    startup: {
        logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200',
        hero: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
        team1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
        team2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        team3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
        team4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
    },
};

export type ImageCategory = keyof typeof defaultImages;
export type ImageKey = string;
// src/components/Editor/ColorPicker.tsx - Versión compacta
import { Check, Copy, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import type { TemplateColors } from '../../types/template.types';

type ColorKey = keyof TemplateColors;

interface ColorPickerProps {
    colorKey: ColorKey;
    label: string;
    defaultColor: string;
    compact?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    colorKey,
    label,
    defaultColor,
    compact = false
}) => {
    const { template, updateColors } = useTemplate();
    const { config } = useTemplateEditor();
    const [copied, setCopied] = useState(false);
    const [localColor, setLocalColor] = useState<string>(defaultColor);
    let timeoutId: ReturnType<typeof setTimeout>;

    // Actualizar color local cuando cambia el template
    useEffect(() => {
        const currentColor = template?.colors?.[colorKey] || defaultColor;
        setLocalColor(currentColor);
    }, [template, colorKey, defaultColor]);

    if (!config.isEditing) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(localColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleColorChange = (newColor: string) => {
        setLocalColor(newColor);

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            updateColors({ [colorKey]: newColor } as Partial<TemplateColors>);
        }, 150);
    };

    const handleReset = () => {
        handleColorChange(defaultColor);
    };

    if (compact) {
        return (
            <div className="flex items-center justify-between py-1">
                <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400 w-16">
                    {label}
                </label>
                <div className="flex items-center gap-1.5">
                    <input
                        type="color"
                        value={localColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    />
                    <input
                        type="text"
                        value={localColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-20 px-1.5 py-0.5 text-[10px] border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800 font-mono"
                        pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    <button
                        onClick={handleCopy}
                        className="p-0.5 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copiar color"
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Restablecer"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                </div>
            </div>
        );
    }

    // Versión normal (más grande) - mantén el original si es necesario
    return (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                <button
                    onClick={handleReset}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
                >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Reset
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="color"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                />
                <input
                    type="text"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:text-white font-mono text-sm"
                />
                <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors bg-white dark:bg-neutral-900 rounded-md border border-gray-300 dark:border-gray-600"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default ColorPicker;

// src/components/Editor/EditableImage.tsx - Versión con estilos mejorados

import { Edit2, Image as ImageIcon, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface EditableImageProps {
    elementId: string;
    defaultImage: string;
    alt?: string;
    className?: string;
    aspectRatio?: string;
    category?: 'consulting' | 'catering' | 'accounting' | 'restaurant' | 'lawFirm' | 'medical' | 'architecture' | 'marketing' | 'coffee' | 'bakery' | 'foodtruck' | 'beauty' | 'gym' | 'realestate' | 'fashion' | 'cleaning' | 'saas' | 'digital' | 'startup';
}

const FALLBACK_IMAGES: Record<string, string> = {
    consulting: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
    accounting: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    lawFirm: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    medical: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    architecture: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
    marketing: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    coffee: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
    bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    foodtruck: 'https://images.unsplash.com/photo-1565125719084-5d5466b5c5a2?w=800',
    beauty: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    realestate: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    digital: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    startup: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
};

const EditableImage: React.FC<EditableImageProps> = ({
    elementId,
    defaultImage,
    alt = '',
    className = '',
    aspectRatio = 'aspect-auto',
    category = 'consulting'
}) => {
    const { config } = useTemplateEditor();
    const { template, updateImage } = useTemplate();
    const [isHovering, setIsHovering] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const savedImage = template?.images?.[elementId];

    const getImageUrl = () => {
        if (imageError) {
            return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
        }
        if (savedImage && savedImage !== 'undefined' && savedImage !== 'null') {
            return savedImage;
        }
        if (defaultImage && defaultImage !== 'undefined' && defaultImage !== 'null' && defaultImage.includes('http')) {
            return defaultImage;
        }
        const categoryImages = defaultImages[category as keyof typeof defaultImages];
        if (categoryImages && categoryImages.hero) {
            return categoryImages.hero;
        }
        return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
    };

    const imageUrl = getImageUrl();

    const categoryImages = defaultImages[category as keyof typeof defaultImages] || {};
    const galleryImages = Object.entries(categoryImages)
        .filter(([_, url]) => url && typeof url === 'string' && url.includes('http'))
        .map(([key, url]) => ({
            id: key,
            url: url as string,
            name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
        }));

    if (galleryImages.length === 0) {
        galleryImages.push({
            id: 'fallback',
            url: FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting,
            name: 'Imagen por defecto'
        });
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                await updateImage(elementId, file);
                setImageError(false);
                setShowSelector(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectFromGallery = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `gallery-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
            await updateImage(elementId, file);
            setImageError(false);
            setShowGallery(false);
            setShowSelector(false);
        } catch (error) {
            console.error('Error al cargar imagen de galería:', error);
            await updateImage(elementId, new File([], ''));
            setImageError(false);
            setShowGallery(false);
            setShowSelector(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            await updateImage(elementId, file);
            setImageError(false);
            setShowSelector(false);
        }
    };

    const handleImageClick = () => {
        if (config.isEditing) {
            console.log('🖱️ Imagen clickeada:', elementId);
            setShowSelector(true);
        }
    };

    const handleImageError = () => {
        console.warn(`Error loading image for ${elementId}, using fallback`);
        setImageError(true);
    };

    // Modo no edición
    if (!config.isEditing) {
        return (
            <img
                src={imageUrl}
                alt={alt}
                className={className}
                onError={handleImageError}
            />
        );
    }

    // Modo edición - con overlay visible
    return (
        <div
            className={`relative group ${aspectRatio}`}
            onMouseEnter={() => {
                console.log('🐭 Mouse entró a la imagen:', elementId);
                setIsHovering(true);
            }}
            onMouseLeave={() => {
                console.log('🐭 Mouse salió de la imagen:', elementId);
                setIsHovering(false);
            }}
            onClick={handleImageClick}
            style={{
                position: 'relative',
                cursor: 'pointer',
                outline: isHovering ? '3px solid #3b82f6' : 'none',
                outlineOffset: '2px'
            }}
        >
            <img
                src={imageUrl}
                alt={alt}
                className={`${className} ${isHovering ? 'opacity-75' : ''} transition-opacity`}
                onError={handleImageError}
                style={{ display: 'block', width: '50%', height: '50%', objectFit: 'cover' }}
            />

            {/* Overlay de edición - SIEMPRE visible en hover */}
            {isHovering && !showSelector && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg"
                    style={{
                        zIndex: 50,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                >
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log('🎯 Botón de edición clickeado para:', elementId);
                            setShowSelector(true);
                        }}
                        type="button"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span>Cambiar imagen</span>
                    </button>
                </div>
            )}

            {/* Selector modal */}
            {showSelector && (
                <div
                    className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-lg p-4 flex flex-col border-2 border-blue-500"
                    style={{
                        zIndex: 100,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        minHeight: '300px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">Seleccionar imagen</h4>
                        <button
                            onClick={() => setShowSelector(false)}
                            className="p-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex space-x-2 mb-3">
                        <button
                            onClick={() => {
                                setShowGallery(true);
                                setShowSelector(false);
                            }}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Galería
                        </button>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Subir
                        </button>
                    </div>

                    <div
                        className="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                            Arrastrá una imagen o hacé clic en "Subir"
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            )}

            {/* Galería modal */}
            {showGallery && (
                <div
                    className="fixed inset-0 bg-black/75 flex items-center justify-center z-[200] p-4"
                    onClick={() => setShowGallery(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Galería de imágenes</h3>
                            <button
                                onClick={() => setShowGallery(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {galleryImages.map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => handleSelectFromGallery(img.url)}
                                        className="group relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all"
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">{img.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <button
                                onClick={() => setShowGallery(false)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    setShowGallery(false);
                                    setShowSelector(true);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditableImage;

// src/components/common/EditableText.tsx
import { Check, Edit2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface EditableTextProps {
  elementId: string;
  defaultText: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

const EditableText: React.FC<EditableTextProps> = ({
  elementId,
  defaultText,
  tag: Tag = 'span',
  className = '',
  placeholder = 'Escribe aquí...',
  maxLength = 100
}) => {
  const { config } = useTemplateEditor();
  const { template, updateText, /*hasUnsavedChanges, saveDraft*/ } = useTemplate();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [tempText, setTempText] = useState(defaultText);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [inputWidth, setInputWidth] = useState(200);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Cargar texto guardado del contexto
  useEffect(() => {
    const savedText = template?.texts?.[elementId];
    if (savedText) {
      setText(savedText);
      setTempText(savedText);
    } else {
      setText(defaultText);
      setTempText(defaultText);
    }
    setHasLocalChanges(false);
  }, [template, elementId, defaultText]);

  // Medir ancho del texto
  useEffect(() => {
    if (isEditing && measureRef.current) {
      const width = measureRef.current.offsetWidth + 32;
      setInputWidth(Math.max(width, 250));
    }
  }, [tempText, isEditing]);

  // Focus automático al editar
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (config.isEditing) {
      setIsEditing(true);
      setTempText(text);
      setHasLocalChanges(false);
    }
  };

  const handleSave = () => {
    const newText = tempText.trim();
    if (newText !== '') {
      setText(newText);
      updateText(elementId, newText);
      setHasLocalChanges(false);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
    setHasLocalChanges(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    setTempText(newValue);
    setHasLocalChanges(newValue !== text);
  };

  // Modo edición (inactivo pero seleccionable)
  if (config.isEditing && !isEditing) {
    return (
      <Tag
        id={`editable-${elementId}`}
        data-element-id={elementId}
        onClick={handleClick}
        className={`
          relative group cursor-pointer
          hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 
          hover:bg-blue-50 dark:hover:bg-blue-900/20
          rounded px-1 transition-all
          ${className}
        `}
        title="Click para editar"
      >
        {text}
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
          <Edit2 className="w-3 h-3 inline mr-1" />
          Click para editar
        </span>
      </Tag>
    );
  }

  // Modo edición activo
  if (isEditing) {
    return (
      <span className="relative inline-block">
        <span
          ref={measureRef}
          className="absolute invisible whitespace-nowrap text-lg"
          style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
        >
          {tempText || placeholder}
        </span>

        <input
          ref={inputRef}
          type="text"
          value={tempText}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`
            bg-white dark:bg-neutral-800 
            border-2 border-blue-500 rounded-lg 
            px-3 py-1 
            focus:outline-none 
            shadow-lg
            relative
            z-10
            text-gray-900 dark:text-gray-100
            ${className}
          `}
          style={{ width: inputWidth }}
        />

        <div className="absolute -bottom-12 left-0 flex items-center space-x-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 p-1.5 z-20">
          <div className="text-xs text-gray-500 px-2">
            {tempText.length}/{maxLength}
          </div>
          {hasLocalChanges && (
            <div className="text-xs text-yellow-500 flex items-center gap-1 px-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Sin guardar
            </div>
          )}
          <button
            onClick={handleSave}
            className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            title="Guardar (Enter)"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Cancelar (Escape)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-500 rotate-45 transform origin-center z-0"></div>
      </span>
    );
  }

  // Modo normal
  return <Tag className={className}>{text}</Tag>;
};

export default EditableText;

import { Edit3, Eye } from 'lucide-react';
import React from 'react';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

const EditModeToggle: React.FC = () => {
    const { config, toggleEditing } = useTemplateEditor();

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleEditing}
                className={`group relative flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 ${config.isEditing
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
            >
                {config.isEditing ? (
                    <>
                        <Eye className="w-5 h-5" />
                        <span className="font-medium">Modo edición activado</span>
                    </>
                ) : (
                    <>
                        <Edit3 className="w-5 h-5" />
                        <span className="font-medium">Activar modo edición</span>
                    </>
                )}

                {/* Tooltip */}
                <span className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {config.isEditing
                        ? 'Hacé clic en cualquier texto para editarlo'
                        : 'Activá para poder modificar los textos'}
                </span>
            </button>
        </div>
    );
};

export default EditModeToggle;

// src/components/Editor/EditorDashboard.tsx - VERSIÓN COMPLETA CORREGIDA
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Home,
  Info,
  LogOut,
  Palette,
  Save,
  Sparkles,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { useTutorial } from '../../hooks/useTutorial';
import { colorPresets } from '../../types/template.types';
import TutorialOverlay from './TutorialOverlay';
import { VisualEditorPanel } from './VisualEditorPanel';

// Definir los tabs disponibles
type EditorTab = 'visual' | 'presets' | 'texts';

interface EditorDashboardProps {
  onHomeClick?: () => void;
  userLoggedIn?: boolean;
}

const EditorDashboard: React.FC<EditorDashboardProps> = ({
  onHomeClick,
  userLoggedIn = false,
}) => {
  const {
    template,
    resetTemplate,
    hasUnsavedChanges,
    undo,
    redo,
    canUndo,
    canRedo,
    applyPreset,
    saveToBackend,
    setEditorConfig
  } = useTemplate();

  const { config, toggleEditing } = useTemplateEditor();
  const [activeTab, setActiveTab] = useState<EditorTab>('visual');
  const [isSaving, setIsSaving] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Tutorial
  const tutorial = useTutorial();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToBackend();
      setEditorConfig({
        notifications: {
          show: true,
          message: 'Cambios guardados exitosamente',
          type: 'success'
        }
      });
    } catch (error) {
      setEditorConfig({
        notifications: {
          show: true,
          message: 'Error al guardar cambios',
          type: 'error'
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFinishEditing = async () => {
    if (hasUnsavedChanges) {
      await handleSave();
    }
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handleSaveToAccount = async () => {
    setIsSaving(true);
    try {
      await saveToBackend();
      setEditorConfig({
        notifications: {
          show: true,
          message: 'Template guardado en tu cuenta',
          type: 'success'
        }
      });
    } catch (error) {
      setEditorConfig({
        notifications: {
          show: true,
          message: 'Error al guardar',
          type: 'error'
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Tutorial Overlay */}
      {tutorial.showTutorial && tutorial.currentStepData && (
        <TutorialOverlay
          targetElementId={tutorial.currentStepData.targetElement}
          step={tutorial.currentStep}
          onNext={tutorial.nextStep}
          onPrevious={tutorial.previousStep}
          onSkip={tutorial.skipTutorial}
          onClose={tutorial.skipTutorial}
          title={tutorial.currentStepData.title}
          description={tutorial.currentStepData.description}
          position={tutorial.currentStepData.position}
          showSkip={tutorial.currentStepData.showSkip}
          totalSteps={tutorial.totalSteps}
          currentStep={tutorial.currentStep}
        />
      )}

      {/* Notificaciones */}
      {config.notifications && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] animate-slideDown">
          <div className={`
            flex items-center space-x-2 px-4 py-2.5 rounded-lg shadow-lg text-sm
            ${config.notifications.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : ''}
            ${config.notifications.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' : ''}
            ${config.notifications.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : ''}
            ${config.notifications.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : ''}
          `}>
            {config.notifications.type === 'success' && <Check className="w-4 h-4" />}
            {config.notifications.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'warning' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'info' && <Info className="w-4 h-4" />}
            <span>{config.notifications.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar fijo a la izquierda */}
      <div
        id="editor-sidebar"
        className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white dark:bg-neutral-900 shadow-2xl border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 z-40 flex flex-col
        ${isCollapsed ? 'w-12' : 'w-80'}`}>

        {/* Header del sidebar */}
        <div className={`px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white flex items-center justify-between
          ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-xs">Personalizador</h4>
              {hasUnsavedChanges && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></span>
                  <p className="text-[10px] opacity-90">Sin guardar</p>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-white/20 transition-colors"
            title={isCollapsed ? 'Expandir editor' : 'Colapsar editor'}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Contenido del sidebar */}
        {!isCollapsed && (
          <>
            {/* Modo edición toggle con botón de tutorial */}
            <div id="edit-mode-button" className="p-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex gap-2">
                <button
                  onClick={toggleEditing}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2
                    ${config.isEditing
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-2 ring-green-300'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {config.isEditing ? "✓ Modo edición activo" : "Activar modo edición"}
                </button>

                {/* Botón para ver tutorial otra vez */}
                <button
                  onClick={tutorial.startTutorial}
                  className="px-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium transition-all hover:bg-blue-200 dark:hover:bg-blue-800/30 flex items-center gap-1"
                  title="Ver tutorial otra vez"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ayuda</span>
                </button>
              </div>
              {config.isEditing && (
                <p className="text-[10px] text-green-600 dark:text-green-400 text-center mt-1.5">
                  ✨ Ahora podés hacer doble clic en cualquier texto para editarlo
                </p>
              )}
            </div>

            {/* Tabs reorganizados */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800">
              <button
                id="visual-tab"
                onClick={() => setActiveTab('visual')}
                className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
                  ${activeTab === 'visual'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
              >
                <Palette className="w-3 h-3" />
                Diseño visual
              </button>
              <button
                id="presets-tab"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
                  ${activeTab === 'presets'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
              >
                <Sparkles className="w-3 h-3" />
                Presets
              </button>
              <button
                id="texts-tab"
                onClick={() => setActiveTab('texts')}
                className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
                  ${activeTab === 'texts'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
              >
                <Edit3 className="w-3 h-3" />
                Textos
              </button>
            </div>

            {/* Contenido scrollable */}
            <div className="flex-1 overflow-y-auto p-3">
              {/* Tab de Diseño Visual */}
              {activeTab === 'visual' && template && (
                <VisualEditorPanel />
              )}

              {/* Tab de Presets - CORREGIDO: con type assertion para evitar error de índice */}
              {activeTab === 'presets' && template && (
                <div className="space-y-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-3">
                    <p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
                      <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>Combinaciones de colores predefinidas para tu template</span>
                    </p>
                  </div>

                  <div id="presets-section">
                    <div className="grid grid-cols-2 gap-2">
                      {/* CORREGIDO: Usar type assertion para acceder a colorPresets */}
                      {(colorPresets[template.type as keyof typeof colorPresets] || []).map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => applyPreset(preset.name)}
                          className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all text-left group"
                        >
                          <div className="flex flex-wrap gap-1 mb-2">
                            {Object.values(preset.colors).map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-600 shadow-sm"
                                style={{ backgroundColor: color as string }}
                                title={color as string}
                              />
                            ))}
                          </div>
                          <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 truncate">
                            {preset.name}
                          </p>
                          <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Click para aplicar
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensaje si no hay presets */}
                  {(!colorPresets[template.type as keyof typeof colorPresets] ||
                    colorPresets[template.type as keyof typeof colorPresets]?.length === 0) && (
                      <div className="text-center py-8">
                        <p className="text-xs text-neutral-500">
                          No hay presets disponibles para este template
                        </p>
                      </div>
                    )}
                </div>
              )}

              {/* Tab de Textos */}
              {activeTab === 'texts' && (
                <div className="space-y-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
                      <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>Doble clic en cualquier texto de la página para editarlo</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Títulos principales</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                    </div>
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Descripciones</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                    </div>
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Botones CTA</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                    </div>
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Secciones completas</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-[9px] text-neutral-400 text-center">
                      También puedes editar textos desde el panel visual en "Diseño visual"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Acciones del sidebar */}
            <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
              {/* Botón Guardar */}
              <button
                id="save-button"
                onClick={handleSave}
                disabled={isSaving}
                className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 mb-1.5
                  ${hasUnsavedChanges
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md animate-pulse'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'}`}
              >
                {isSaving ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {isSaving ? "Guardando..." : (hasUnsavedChanges ? "¡Guardar cambios!*" : "Guardar cambios")}
              </button>

              {/* Botones deshacer/rehacer */}
              <div id="undo-redo-buttons" className="flex gap-1.5 mb-1.5">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1
                    ${canUndo
                      ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7v6h6" />
                    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                  </svg>
                  Deshacer
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1
                    ${canRedo
                      ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 7v6h-6" />
                    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                  </svg>
                  Rehacer
                </button>
              </div>

              {/* Botón Restablecer */}
              <button
                onClick={() => resetTemplate(template?.type || 'consulting')}
                className="w-full py-1.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-[10px] font-medium text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-center gap-1 mb-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Restablecer todo
              </button>

              {/* Botones de navegación */}
              <div className="flex gap-1.5">
                <button
                  onClick={onHomeClick}
                  className="flex-1 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"
                >
                  <Home className="w-3 h-3" />
                  Inicio
                </button>
                <button
                  id="finish-button"
                  onClick={handleFinishEditing}
                  disabled={isSaving}
                  className="flex-1 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  {isSaving ? "Guardando..." : "Finalizar edición"}
                </button>
              </div>

              {/* Soporte */}
              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full mt-1.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-[10px] font-medium text-neutral-600 dark:text-neutral-400 transition-all flex items-center justify-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Soporte
              </button>

              {userLoggedIn && (
                <button
                  onClick={handleSaveToAccount}
                  disabled={isSaving}
                  className="w-full mt-1.5 py-1 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                  {isSaving ? "Guardando..." : "Guardar en cuenta"}
                </button>
              )}
            </div>
          </>
        )}

        {/* Versión colapsada */}
        {isCollapsed && (
          <div className="flex-1 flex flex-col items-center py-3 gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white text-[10px] font-bold">
              E
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('visual')}
                className={`p-1.5 rounded-lg transition-all ${activeTab === 'visual' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-neutral-500 hover:text-primary-600'}`}
                title="Diseño visual"
              >
                <Palette className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('presets')}
                className={`p-1.5 rounded-lg transition-all ${activeTab === 'presets' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-neutral-500 hover:text-primary-600'}`}
                title="Presets"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('texts')}
                className={`p-1.5 rounded-lg transition-all ${activeTab === 'texts' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-neutral-500 hover:text-primary-600'}`}
                title="Textos"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              {hasUnsavedChanges && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-1.5 rounded-lg transition-all text-amber-500"
                  title="Guardar cambios"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={onHomeClick}
                className="p-1.5 rounded-lg transition-all text-neutral-500 hover:text-primary-600"
                title="Inicio"
              >
                <Home className="w-4 h-4" />
              </button>
              <button
                onClick={handleFinishEditing}
                disabled={isSaving}
                className="p-1.5 rounded-lg transition-all text-neutral-500 hover:text-green-600"
                title="Finalizar edición"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Soporte */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold mb-2">Soporte</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
              ¿Necesitas ayuda con la edición de tu template?
            </p>
            <div className="space-y-2 mb-4">
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">📧 Email</p>
                <p className="text-xs text-neutral-500">soporte@kernelice.com</p>
              </div>
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">💬 WhatsApp</p>
                <p className="text-xs text-neutral-500">+54 9 11 1234-5678</p>
              </div>
              <button
                onClick={() => {
                  setShowSupportModal(false);
                  tutorial.startTutorial();
                }}
                className="w-full mt-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
              >
                <Info className="w-3 h-3" />
                Ver tutorial otra vez
              </button>
            </div>
            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-1.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-xs font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorDashboard;

// src/components/Editor/EditorPanel.tsx - CORREGIDO
import {
    AlertCircle,
    AlertTriangle,
    Check,
    Copy,
    Download,
    Edit3,
    Eye,
    Image,
    Info,
    Mail,
    Palette,
    Redo,
    RefreshCw,
    RotateCcw,
    Save,
    Sparkles,
    Type,
    Undo,
    User,
    X
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { templateService } from '../../services/templateService';
import { colorPresets } from '../../types/template.types';
import ColorPicker from './ColorPicker';

interface EditorPanelProps {
    onSendEmail?: () => void;
    onSaveToUser?: () => void;
    userLoggedIn?: boolean;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
    onSaveToUser,
    userLoggedIn = false
}) => {
    const {
        template,
        resetTemplate,
        saveDraft,
        exportTemplate,
        hasUnsavedChanges,
        undo,
        redo,
        canUndo,
        canRedo,
        applyPreset,
        setEditorConfig
    } = useTemplate();

    const { config, toggleEditing, toggleEditor } = useTemplateEditor();
    const [activeTab, setActiveTab] = useState<'colors' | 'texts' | 'images' | 'presets'>('colors');
    const [email, setEmail] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);

    if (!config.showEditor) return null;

    const handleSendEmail = async () => {
        if (!template || !email) return;

        try {
            await templateService.sendTemplateByEmail(template, email);
            setShowEmailModal(false);
            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Template enviado por email',
                    type: 'success'
                }
            });
        } catch (error) {
            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Error al enviar el email',
                    type: 'error'
                }
            });
        }
    };

    const handleCopyTemplate = () => {
        if (!template) return;

        navigator.clipboard.writeText(JSON.stringify(template, null, 2));
        setEditorConfig({
            notifications: {
                show: true,
                message: 'Template copiado al portapapeles',
                type: 'success'
            }
        });
    };

    return (
        <>
            {/* Notificaciones */}
            {config.notifications && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] animate-slideDown">
                    <div className={`
                        flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg
                        ${config.notifications.type === 'success' ? 'bg-green-500 text-white' : ''}
                        ${config.notifications.type === 'error' ? 'bg-red-500 text-white' : ''}
                        ${config.notifications.type === 'warning' ? 'bg-yellow-500 text-white' : ''}
                        ${config.notifications.type === 'info' ? 'bg-blue-500 text-white' : ''}
                    `}>
                        {config.notifications.type === 'success' && <Check className="w-5 h-5" />}
                        {config.notifications.type === 'error' && <AlertCircle className="w-5 h-5" />}
                        {config.notifications.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                        {config.notifications.type === 'info' && <Info className="w-5 h-5" />}
                        <span>{config.notifications.message}</span>
                    </div>
                </div>
            )}

            {/* Botones flotantes */}
            <div className="fixed right-4 top-24 z-50 flex flex-col space-y-2">
                {/* Indicador de cambios no guardados */}
                {hasUnsavedChanges && (
                    <div className="bg-yellow-500 text-white px-3 py-2 rounded-full text-sm flex items-center shadow-lg animate-pulse">
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Guardando...
                    </div>
                )}

                <button
                    onClick={toggleEditor}
                    className={`p-3 rounded-full shadow-lg transition-all hover:scale-110 ${config.showEditor
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                        } text-white`}
                    title={config.showEditor ? 'Cerrar editor' : 'Abrir editor'}
                >
                    {config.showEditor ? <X className="w-6 h-6" /> : <Edit3 className="w-6 h-6" />}
                </button>

                <button
                    onClick={toggleEditing}
                    className={`p-3 rounded-full shadow-lg transition-all hover:scale-110 ${config.isEditing
                            ? 'bg-green-600 hover:bg-green-700 ring-4 ring-green-300'
                            : 'bg-gray-600 hover:bg-gray-700'
                        } text-white`}
                    title={config.isEditing ? 'Modo edición activado' : 'Activar modo edición'}
                >
                    <Eye className="w-6 h-6" />
                </button>

                {/* Botones de deshacer/rehacer */}
                {config.isEditing && (
                    <>
                        <button
                            onClick={undo}
                            disabled={!canUndo}
                            className={`p-3 rounded-full shadow-lg transition-all ${canUndo
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                } text-white`}
                            title="Deshacer"
                        >
                            <Undo className="w-6 h-6" />
                        </button>
                        <button
                            onClick={redo}
                            disabled={!canRedo}
                            className={`p-3 rounded-full shadow-lg transition-all ${canRedo
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                } text-white`}
                            title="Rehacer"
                        >
                            <Redo className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Panel de edición */}
            <div className={`fixed right-4 top-48 w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 z-40 ${config.showEditor ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">Personalizar Template</h3>
                            <p className="text-sm opacity-90">Modifica colores, textos e imágenes</p>
                        </div>
                        {hasUnsavedChanges && (
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                Sin guardar
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <TabButton
                        active={activeTab === 'colors'}
                        onClick={() => setActiveTab('colors')}
                        icon={<Palette className="w-4 h-4" />}
                        label="Colores"
                    />
                    <TabButton
                        active={activeTab === 'presets'}
                        onClick={() => setActiveTab('presets')}
                        icon={<Sparkles className="w-4 h-4" />}
                        label="Presets"
                    />
                    <TabButton
                        active={activeTab === 'texts'}
                        onClick={() => setActiveTab('texts')}
                        icon={<Type className="w-4 h-4" />}
                        label="Textos"
                    />
                    <TabButton
                        active={activeTab === 'images'}
                        onClick={() => setActiveTab('images')}
                        icon={<Image className="w-4 h-4" />}
                        label="Imágenes"
                    />
                </div>

                {/* Contenido */}
                <div className="p-4 max-h-96 overflow-y-auto">
                    {activeTab === 'colors' && (
                        <div className="space-y-4">
                            <ColorPicker colorKey="primary" label="Color Principal" defaultColor="#2563eb" />
                            <ColorPicker colorKey="secondary" label="Color Secundario" defaultColor="#475569" />
                            <ColorPicker colorKey="accent" label="Color de Acento" defaultColor="#1e293b" />
                            <ColorPicker colorKey="background" label="Color de Fondo" defaultColor="#ffffff" />
                            <ColorPicker colorKey="text" label="Color de Texto" defaultColor="#0f172a" />
                        </div>
                    )}

                    {activeTab === 'presets' && template && (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Selecciona una combinación de colores predefinida:
                            </p>
                            {colorPresets[template.type as keyof typeof colorPresets]?.map((preset, index) => (
                                <button
                                    key={index}
                                    onClick={() => applyPreset(preset.name)}
                                    className="w-full p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:shadow-md transition-all text-left group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {preset.name}
                                        </span>
                                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <div className="flex space-x-2">
                                        {Object.values(preset.colors).map((color, i) => (
                                            <div
                                                key={i}
                                                className="w-6 h-6 rounded-full border border-gray-300"
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {activeTab === 'texts' && (
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start">
                                    <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>
                                        Hacé <strong>doble clic</strong> sobre cualquier texto en la página para editarlo.
                                        Los textos editables tienen un borde azul al pasar el mouse.
                                    </span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <TextElementGuide element="hero_badge" label="Badge" />
                                <TextElementGuide element="hero_title" label="Título principal" />
                                <TextElementGuide element="hero_description" label="Descripción" />
                                <TextElementGuide element="features_title" label="Título servicios" />
                                <TextElementGuide element="cta_button" label="Botón CTA" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'images' && (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg text-center">
                                <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Subí tus propias imágenes
                                </p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                    Seleccionar imagen
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                                Próximamente: subí imágenes para hero, about y más secciones
                            </p>
                        </div>
                    )}
                </div>

                {/* Acciones */}
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <ActionButton
                            onClick={saveDraft}
                            icon={<Save className="w-4 h-4" />}
                            label="Guardar"
                            color="blue"
                        />
                        <ActionButton
                            onClick={exportTemplate}
                            icon={<Download className="w-4 h-4" />}
                            label="Exportar"
                            color="gray"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <ActionButton
                            onClick={() => resetTemplate(template?.type || 'consulting')}
                            icon={<RotateCcw className="w-4 h-4" />}
                            label="Restablecer"
                            color="yellow"
                        />
                        <ActionButton
                            onClick={handleCopyTemplate}
                            icon={<Copy className="w-4 h-4" />}
                            label="Copiar"
                            color="purple"
                        />
                    </div>

                    {userLoggedIn ? (
                        <ActionButton
                            onClick={() => {
                                if (onSaveToUser) {
                                    onSaveToUser();
                                } else {
                                    setEditorConfig({
                                        notifications: {
                                            show: true,
                                            message: 'Función no implementada',
                                            type: 'warning'
                                        }
                                    });
                                }
                            }}
                            icon={<User className="w-4 h-4" />}
                            label="Guardar en cuenta"
                            color="green"
                            fullWidth
                        />
                    ) : (
                        <ActionButton
                            onClick={() => setShowEmailModal(true)}
                            icon={<Mail className="w-4 h-4" />}
                            label="Enviar por email"
                            color="purple"
                            fullWidth
                        />
                    )}
                </div>
            </div>

            {/* Modal de email */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Enviar template</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Ingresá tu email y te enviaremos el template personalizado en formato JSON.
                        </p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleSendEmail}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all"
                            >
                                Enviar
                            </button>
                            <button
                                onClick={() => setShowEmailModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Componente auxiliar para tabs
export const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${active
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

// Componente auxiliar para botones de acción
export const ActionButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    color: 'blue' | 'gray' | 'yellow' | 'purple' | 'green';
    fullWidth?: boolean;
}> = ({ onClick, icon, label, color, fullWidth = false }) => {
    const colorClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        gray: 'bg-gray-600 hover:bg-gray-700 text-white',
        yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        purple: 'bg-purple-600 hover:bg-purple-700 text-white',
        green: 'bg-green-600 hover:bg-green-700 text-white'
    };

    return (
        <button
            onClick={onClick}
            className={`${fullWidth ? 'w-full' : 'flex-1'} px-4 py-2 ${colorClasses[color]} rounded-lg transition-colors flex items-center justify-center space-x-2`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

// Componente guía para elementos de texto
export const TextElementGuide: React.FC<{ element: string; label: string }> = ({ element, label }) => (
    <div className="p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg text-xs">
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-gray-500 dark:text-gray-400 truncate">{element}</div>
    </div>
);

export default EditorPanel;

import React from 'react';
import { LogIn, User, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full shadow-2xl animate-slideDown">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Iniciar sesión requerido</h3>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                        </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-center mb-2">
                        ¡Necesitas una cuenta!
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                        {message || 'Para guardar este template en tu cuenta necesitas iniciar sesión o registrarte.'}
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Si ya tienes una cuenta, inicia sesión ahora. Si no, puedes crear una gratis en menos de un minuto.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                onClose();
                                sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
                                navigate('/login');
                            }}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/register');
                            }}
                            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <User className="w-4 h-4 mr-2" />
                            Registrarse
                        </button>
                    </div>
                    
                    <button
                        onClick={onClose}
                        className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm"
                    >
                        Seguir editando sin guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;

import React from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface TemplateSelectorProps {
    onSelect: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
    const { template, resetTemplate } = useTemplate();
    const { toggleEditing } = useTemplateEditor();

    const templates = [
        { id: 'consulting', name: 'Consultoría', icon: '📊', color: 'blue' },
        { id: 'catering', name: 'Catering', icon: '🍽️', color: 'amber' },
        { id: 'accounting', name: 'Contaduría', icon: '🧾', color: 'emerald' },
        { id: 'restaurant', name: 'Restaurant', icon: '🍝', color: 'red' },
    ];

    const handleSelectTemplate = (templateId: string) => {
        resetTemplate(templateId);
        onSelect();
        // Activar modo edición automáticamente
        setTimeout(() => toggleEditing(), 100);
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Seleccionar Template</h3>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => handleSelectTemplate(t.id)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${template?.type === t.id
                                ? `border-${t.color}-500 bg-${t.color}-50 dark:bg-${t.color}-900/30`
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <div className="text-3xl mb-2">{t.icon}</div>
                        <div className="font-medium">{t.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;

import { RotateCcw, Save } from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface TextEditorProps {
    elementId: string;
    currentText: string;
    onClose: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ elementId, currentText, onClose }) => {
    const { updateText } = useTemplate();
    const { config } = useTemplateEditor();
    const [text, setText] = useState(currentText);

    const handleSave = () => {
        if (text.trim()) {
            updateText(elementId, text);
        }
        onClose();
    };

    if (!config.isEditing) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Editar texto</h3>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
                    rows={4}
                    autoFocus
                />
                <div className="flex space-x-3">
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;

// src/components/Editor/TutorialOverlay.tsx
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TutorialOverlayProps {
    targetElementId: string;
    step: number;
    onNext: () => void;
    onPrevious: () => void;
    onSkip: () => void;
    onClose: () => void;
    title: string;
    description: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
    totalSteps: number;
    currentStep: number;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
    targetElementId,
    step,
    onNext,
    onPrevious,
    onSkip,
    onClose,
    title,
    description,
    position,
    showSkip = true,
    totalSteps,
    currentStep
}) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const target = document.getElementById(targetElementId);
        if (target) {
            setTargetRect(target.getBoundingClientRect());
        }
    }, [targetElementId, step]);

    const getPositionStyle = (): React.CSSProperties => {
        if (!targetRect) return { display: 'none' };

        const baseStyle: React.CSSProperties = {
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '10px',
            maxWidth: '320px',
            border: '2px solid #3b82f6'
        };

        switch (position) {
            case 'right':
                return {
                    ...baseStyle,
                    left: targetRect.right + 16,
                    top: targetRect.top + (targetRect.height / 2) - 140
                };
            case 'left':
                return {
                    ...baseStyle,
                    right: window.innerWidth - targetRect.left + 16,
                    top: targetRect.top + (targetRect.height / 2) - 60
                };
            case 'top':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    bottom: window.innerHeight - targetRect.top + 16
                };
            case 'bottom':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    top: targetRect.bottom + 16
                };
            default:
                return baseStyle;
        }
    };

    // Crear overlay para resaltar el elemento
    useEffect(() => {
        if (targetRect) {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = `${targetRect.top - 4}px`;
            overlay.style.left = `${targetRect.left - 4}px`;
            overlay.style.width = `${targetRect.width + 8}px`;
            overlay.style.height = `${targetRect.height + 8}px`;
            overlay.style.borderRadius = '12px';
            overlay.style.border = '3px solid #3b82f6';
            overlay.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            overlay.style.zIndex = '999';
            overlay.style.pointerEvents = 'none';
            overlay.id = 'tutorial-highlight';

            document.body.appendChild(overlay);

            return () => {
                const existing = document.getElementById('tutorial-highlight');
                if (existing) existing.remove();
            };
        }
    }, [targetRect]);

    return (
        <>
            {/* Fondo semi-transparente */}
            <div className="fixed inset-0 bg-black/50 z-[998]" onClick={onClose} />

            {/* Tarjeta del tutorial */}
            <div style={getPositionStyle()} className="animate-fadeIn">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Paso {currentStep + 1}/{totalSteps}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={onPrevious}
                            disabled={currentStep === 0}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onNext}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                            {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {showSkip && (
                        <button
                            onClick={onSkip}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            Omitir tutorial
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TutorialOverlay;

// src/components/Editor/VisualEditorPanel.tsx - VERSIÓN CORREGIDA CON FALLBACKS
import {
    ChevronDown, ChevronRight, Eye,
    Layout, Link,
    Palette,
    Type
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography, defaultUI } from '../../types/template.types';

type EditorSection = 'hero' | 'buttons' | 'header' | 'typography' | 'ui' | 'global';

export const VisualEditorPanel: React.FC = () => {
    const { template, updateSectionColors, updateTypography, updateUI, updateButtons } = useTemplate();
    const [expandedSection, setExpandedSection] = useState<EditorSection>('hero');

    // const sections = [
    //     { id: 'hero' as EditorSection, label: '🎨 Hero (Sección principal)', icon: Eye },
    //     { id: 'buttons' as EditorSection, label: '🔘 Botones', icon: Link },
    //     { id: 'header' as EditorSection, label: '📋 Header (Barra superior)', icon: Layout },
    //     { id: 'typography' as EditorSection, label: '✏️ Tipografía', icon: Type },
    //     { id: 'ui' as EditorSection, label: '🎨 Bordes y sombras', icon: Palette },
    //     { id: 'global' as EditorSection, label: '🌍 Configuración global', icon: Sparkles },
    // ];

    const SectionHeader = ({ section, label, icon: Icon }: { section: EditorSection; label: string; icon: React.ElementType }) => (
        <button
            onClick={() => setExpandedSection(expandedSection === section ? 'hero' : section)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl mb-2"
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
            </div>
            {expandedSection === section ?
                <ChevronDown className="w-5 h-5" /> :
                <ChevronRight className="w-5 h-5" />
            }
        </button>
    );

    if (!template) return null;

    // Valores por defecto para evitar undefined
    const sectionColors = template.sectionColors || defaultSectionColors;
    const typography = template.typography || defaultTypography;
    const ui = template.ui || defaultUI;
    const buttons = template.buttons || defaultButtons;

    return (
        <div className="space-y-3">
            {/* Hero Section */}
            <div>
                <SectionHeader section="hero" label="Hero (Sección principal)" icon={Eye} />
                {expandedSection === 'hero' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <h4 className="text-sm font-semibold mb-3">🎨 Colores del Hero</h4>

                        <ColorInput
                            label="Fondo del Hero"
                            value={sectionColors.heroBackground}
                            onChange={(color: string) => updateSectionColors({ heroBackground: color })}
                            description="Color de fondo de la sección principal"
                        />

                        <ColorInput
                            label="Color del título"
                            value={sectionColors.heroTitleColor}
                            onChange={(color: string) => updateSectionColors({ heroTitleColor: color })}
                            description="Color del texto principal"
                        />

                        <ColorInput
                            label="Color de la descripción"
                            value={sectionColors.heroDescriptionColor}
                            onChange={(color: string) => updateSectionColors({ heroDescriptionColor: color })}
                            description="Color del texto secundario"
                        />

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">✨ Badge (Etiqueta destacada)</h4>
                            <ColorInput
                                label="Fondo del badge"
                                value={sectionColors.heroBadgeBackground}
                                onChange={(color: string) => updateSectionColors({ heroBadgeBackground: color })}
                            />
                            <ColorInput
                                label="Texto del badge"
                                value={sectionColors.heroBadgeTextColor}
                                onChange={(color: string) => updateSectionColors({ heroBadgeTextColor: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">📏 Tamaños del Hero</h4>
                            <SizeInput
                                label="Tamaño del título"
                                value={typography.heroTitleSize}
                                onChange={(size: string) => updateTypography({ heroTitleSize: size })}
                                options={['2rem', '2.5rem', '3rem', '3.5rem', '4rem']}
                            />
                            <SizeInput
                                label="Tamaño de la descripción"
                                value={typography.heroDescriptionSize}
                                onChange={(size: string) => updateTypography({ heroDescriptionSize: size })}
                                options={['0.875rem', '1rem', '1.125rem', '1.25rem']}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Botones Section */}
            <div>
                <SectionHeader section="buttons" label="Botones" icon={Link} />
                {expandedSection === 'buttons' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-4">
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold">🔵 Botón principal</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.primary.text}
                                onChange={(text: string) => updateButtons({ primary: { ...buttons.primary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.primary.url}
                                onChange={(url: string) => updateButtons({ primary: { ...buttons.primary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonPrimaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonPrimaryText}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryText: color })}
                            />
                            <ColorInput
                                label="Color al pasar el mouse"
                                value={sectionColors.buttonPrimaryHoverBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryHoverBackground: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold mb-3">⚪ Botón secundario</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.secondary.text}
                                onChange={(text: string) => updateButtons({ secondary: { ...buttons.secondary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.secondary.url}
                                onChange={(url: string) => updateButtons({ secondary: { ...buttons.secondary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonSecondaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonSecondaryText}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryText: color })}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Header Section */}
            <div>
                <SectionHeader section="header" label="Header (Barra superior)" icon={Layout} />
                {expandedSection === 'header' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <ColorInput
                            label="Fondo del header"
                            value={sectionColors.headerBackground}
                            onChange={(color: string) => updateSectionColors({ headerBackground: color })}
                        />
                        <ColorInput
                            label="Color del texto"
                            value={sectionColors.headerTextColor}
                            onChange={(color: string) => updateSectionColors({ headerTextColor: color })}
                        />
                        <ColorInput
                            label="Color de los enlaces"
                            value={sectionColors.headerLinkColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkColor: color })}
                        />
                        <ColorInput
                            label="Color de enlaces al pasar mouse"
                            value={sectionColors.headerLinkHoverColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkHoverColor: color })}
                        />
                    </div>
                )}
            </div>

            {/* Tipografía Section */}
            <div>
                <SectionHeader section="typography" label="Tipografía" icon={Type} />
                {expandedSection === 'typography' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <FontSelect
                            label="Fuente de títulos"
                            value={typography.headingFont}
                            onChange={(font: string) => updateTypography({ headingFont: font })}
                        />
                        <FontSelect
                            label="Fuente de textos"
                            value={typography.bodyFont}
                            onChange={(font: string) => updateTypography({ bodyFont: font })}
                        />
                        <SizeInput
                            label="Tamaño de títulos de sección"
                            value={typography.sectionTitleSize}
                            onChange={(size: string) => updateTypography({ sectionTitleSize: size })}
                            options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']}
                        />
                        <SizeInput
                            label="Tamaño de texto general"
                            value={typography.bodyTextSize}
                            onChange={(size: string) => updateTypography({ bodyTextSize: size })}
                            options={['0.875rem', '1rem', '1.125rem']}
                        />
                    </div>
                )}
            </div>

            {/* UI Section */}
            <div>
                <SectionHeader section="ui" label="Bordes y sombras" icon={Palette} />
                {expandedSection === 'ui' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <BorderRadiusSelect
                            label="Bordes de botones"
                            value={ui.borderRadius.medium}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, medium: radius } })}
                        />
                        <BorderRadiusSelect
                            label="Bordes de tarjetas"
                            value={ui.borderRadius.large}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, large: radius } })}
                        />
                        <ShadowSelect
                            label="Sombra de tarjetas"
                            value={ui.boxShadow.medium}
                            onChange={(shadow: string) => updateUI({ boxShadow: { ...ui.boxShadow, medium: shadow } })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// Componentes auxiliares con tipado correcto
const ColorInput = ({ label, value, onChange, description }: {
    label: string;
    value: string;
    onChange: (color: string) => void;
    description?: string;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-lg font-mono"
            />
        </div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
);

const SizeInput = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (size: string) => void;
    options: string[];
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const TextInput = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (text: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
        />
    </div>
);

const UrlInput = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (url: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="/ruta o https://..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg"
            />
        </div>
    </div>
);

const FontSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (font: string) => void;
}) => {
    const fonts = [
        { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
        { value: 'Roboto, system-ui, sans-serif', label: 'Roboto' },
        { value: 'Poppins, system-ui, sans-serif', label: 'Poppins' },
        { value: 'Montserrat, system-ui, sans-serif', label: 'Montserrat' },
        { value: 'Open Sans, system-ui, sans-serif', label: 'Open Sans' },
        { value: 'system-ui, -apple-system, sans-serif', label: 'Sistema' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
                style={{ fontFamily: value }}
            >
                {fonts.map(font => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                        {font.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const BorderRadiusSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (radius: string) => void;
}) => {
    const radii = [
        { value: '0.25rem', label: 'Pequeño (4px)' },
        { value: '0.5rem', label: 'Mediano (8px)' },
        { value: '0.75rem', label: 'Grande (12px)' },
        { value: '1rem', label: 'Extra grande (16px)' },
        { value: '9999px', label: 'Completamente redondo' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {radii.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2"
                style={{ borderRadius: value }}
            />
        </div>
    );
};

const ShadowSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (shadow: string) => void;
}) => {
    const shadows = [
        { value: 'none', label: 'Sin sombra' },
        { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', label: 'Sutil' },
        { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', label: 'Mediana' },
        { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', label: 'Fuerte' },
        { value: '0 20px 25px -5px rgb(0 0 0 / 0.1)', label: 'Extra fuerte' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {shadows.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs"
                style={{ boxShadow: value }}
            >
                Vista previa
            </div>
        </div>
    );
};
// src/contexts/AuthContext.tsx - VERSIÓN CORREGIDA
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  AuthResponse,
  LoginCredentials,
  Order,
  RegisterData,
  User
} from '../services/api/auth.service';
import * as authService from '../services/api/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
  getUserOrders: () => Promise<Order[]>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        // Verificar si el token es válido
        if (!authService.isAuthenticated()) {
          // Intentar refrescar el token
          try {
            const refreshResult = await authService.refreshToken();
            // Actualizar token con el nuevo
            setToken(refreshResult.token);
            localStorage.setItem('token', refreshResult.token);
          } catch (refreshError) {
            console.log('Token expirado, limpiando datos');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            setIsLoading(false);
            return;
          }
        }

        // Obtener perfil actualizado
        const profile = await authService.getProfile();
        setUser(profile);
        setToken(storedToken);

        // Actualizar localStorage con perfil actualizado
        localStorage.setItem('user', JSON.stringify(profile));
      } catch (error) {
        console.error('Error cargando perfil:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // ✅ Función para refrescar datos del usuario - CORREGIDA
  const refreshUser = async () => {
    setIsRefreshing(true);
    try {
      // Obtener el token actual
      const currentToken = localStorage.getItem('token');
      
      // Obtener el perfil actualizado
      const profile = await authService.getProfile();
      
      // Actualizar estado y localStorage
      setUser(profile);
      setToken(currentToken);
      localStorage.setItem('user', JSON.stringify(profile));
      
      console.log('✅ Usuario refrescado correctamente', { 
        profile, 
        hasToken: !!currentToken,
        isAuthenticated: !!currentToken && !!profile
      });
    } catch (error: any) {
      console.error('Error refrescando usuario:', error);
      // Si es error de conexión, no limpiar la sesión
      if (error.errorCode !== 'CONNECTION_ERROR') {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
      }
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('refreshToken', response.refreshToken);

      return response;
    } catch (error: any) {
      const message = error.message || 'Error al iniciar sesión';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);

      if (response.token) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      }

      return response;
    } catch (error: any) {
      const message = error.message || 'Error al registrarse';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      const message = error.message || 'Error actualizando perfil';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserOrders = async (): Promise<Order[]> => {
    try {
      const orders = await authService.getUserOrders();
      return orders;
    } catch (error: any) {
      const message = error.message || 'Error obteniendo pedidos';
      setError(message);
      throw error;
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user && authService.isAuthenticated(),
    isLoading,
    isRefreshing,
    error,
    login,
    register,
    logout,
    updateProfile,
    getUserOrders,
    clearError,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// src/contexts/TemplateContext.tsx - VERSIÓN CORREGIDA
import React, { createContext, useContext, useState } from 'react';
import { getDefaultTemplateColors } from '../data/types/templateDefaultColors';
import { templateApi } from '../services/api/templateApi.service';
import { storageService } from '../services/storageService';
import type {
    ButtonConfig,
    EditorConfig,
    SectionColors,
    Template,
    TemplateColors,
    TypographyConfig,
    UIConfig
} from '../types/template.types';
import {
    colorPresets,
    defaultButtons,
    defaultSectionColors,
    defaultTypography,
    defaultUI
} from '../types/template.types';
import { useAuth } from './AuthContext';

interface TemplateContextType {
    template: Template | null;
    setTemplate: (template: Template) => void;
    updateColors: (colors: Partial<TemplateColors>) => void;
    updateSectionColors: (colors: Partial<SectionColors>) => void;
    updateTypography: (typography: Partial<TypographyConfig>) => void;
    updateUI: (ui: Partial<UIConfig>) => void;
    updateButtons: (buttons: Partial<ButtonConfig>) => void;
    updateText: (key: string, value: string) => void;
    updateImage: (key: string, file: File) => Promise<void>;
    resetTemplate: (type: string) => void;
    applyPreset: (presetName: string) => void;
    saveDraft: () => void;
    loadDraft: () => void;
    exportTemplate: () => void;
    saveToBackend: () => Promise<any>;
    loadFromBackend: (templateId: string) => Promise<void>;
    getUserTemplates: () => Promise<any>;
    hasUnsavedChanges: boolean;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    editorConfig: EditorConfig;
    setEditorConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    const [template, setTemplateState] = useState<Template | null>(null);
    const [history, setHistory] = useState<Template[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [editorConfig, setEditorConfigState] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null
    });

    const setTemplate = (newTemplate: Template) => {
        setTemplateState(newTemplate);
        setHistory([newTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(false);
    };

    const addToHistory = (newTemplate: Template) => {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newTemplate]);
        setHistoryIndex(prev => prev + 1);
    };

    // Actualizar colores básicos (mantener para compatibilidad)
    const updateColors = (colors: Partial<TemplateColors>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            colors: { ...template.colors, ...colors },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar colores por sección
    const updateSectionColors = (colors: Partial<SectionColors>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            sectionColors: { ...template.sectionColors, ...colors },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar tipografía
    const updateTypography = (typography: Partial<TypographyConfig>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            typography: { ...template.typography, ...typography },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar configuración de UI
    const updateUI = (ui: Partial<UIConfig>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            ui: { ...template.ui, ...ui },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar configuración de botones
    const updateButtons = (buttons: Partial<ButtonConfig>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            buttons: { ...template.buttons, ...buttons },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    const updateText = (key: string, value: string) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            texts: { ...template.texts, [key]: value },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    const updateImage = async (key: string, file: File) => {
        if (!template) return;

        return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedTemplate = {
                    ...template,
                    images: { ...template.images, [key]: reader.result as string },
                    updatedAt: new Date()
                };

                setTemplateState(updatedTemplate);
                addToHistory(updatedTemplate);
                setHasUnsavedChanges(true);
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    // Reset template con la nueva estructura
    const resetTemplate = (type: string) => {
        const defaultColors = getDefaultTemplateColors(type);

        const newTemplate: Template = {
            id: Date.now().toString(),
            name: `Mi ${type} template`,
            type: type as any,
            colors: defaultColors,
            sectionColors: defaultSectionColors,
            typography: defaultTypography,
            ui: defaultUI,
            buttons: defaultButtons,
            texts: {},
            images: {},
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        };

        setTemplateState(newTemplate);
        setHistory([newTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(true);
    };

    const applyPreset = (presetName: string) => {
        if (!template) return;

        const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
        const preset = categoryPresets?.find(p => p.name === presetName);

        if (preset) {
            // Actualizar colores básicos
            updateColors(preset.colors);
            // También actualizar sectionColors basado en los nuevos colores
            updateSectionColors({
                buttonPrimaryBackground: preset.colors.primary,
                heroTitleColor: preset.colors.text,
                headerTextColor: preset.colors.text,
                bodyTextColor: preset.colors.text,
                heroBadgeBackground: preset.colors.primary,
            });
        }
    };

    const saveDraft = () => {
        if (template) {
            storageService.saveDraft(template);
            setHasUnsavedChanges(false);

            window.dispatchEvent(new CustomEvent('template-saved', {
                detail: {
                    message: 'Borrador guardado',
                    type: 'success',
                    template: template
                }
            }));

            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Borrador guardado',
                    type: 'success'
                }
            });
        }
    };

    const loadDraft = () => {
        const draft = storageService.loadDraft();
        if (draft) {
            setTemplateState(draft);
            addToHistory(draft);
        }
    };

    const exportTemplate = () => {
        if (!template) return;

        const dataStr = JSON.stringify(template, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `template-${template.type}-${Date.now()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // const saveToBackend = async () => {
    //     if (!template || !isAuthenticated) return;

    //     try {
    //         const typeUpper = template.type.toUpperCase();

    //         const result = await templateApi.saveTemplate({
    //             name: template.name,
    //             type: typeUpper,
    //             colors: template.colors,
    //             sectionColors: template.sectionColors,
    //             typography: template.typography,
    //             ui: template.ui,
    //             buttons: template.buttons,
    //             texts: template.texts || {},
    //             images: template.images || {}
    //         });

    //         if (result.template?.id) {
    //             const updatedTemplate = {
    //                 ...template,
    //                 id: result.template.id,
    //                 updatedAt: new Date()
    //             };
    //             setTemplateState(updatedTemplate);

    //             window.dispatchEvent(new CustomEvent('template-saved', {
    //                 detail: {
    //                     templateId: result.template.id,
    //                     success: true,
    //                     template: updatedTemplate
    //                 }
    //             }));
    //         }

    //         return result;
    //     } catch (error) {
    //         console.error('Error guardando template:', error);
    //     }
    // };

    // const saveToBackend = async () => {
    //     if (!template || !isAuthenticated) return;

    //     try {
    //         const typeUpper = template.type.toUpperCase();

    //         // CORREGIDO: Convertir TemplateColors a Record<string, string>
    //         const colorsToSend: Record<string, string> = {
    //             primary: template.colors.primary,
    //             secondary: template.colors.secondary,
    //             accent: template.colors.accent,
    //             background: template.colors.background,
    //             text: template.colors.text,
    //         };

    //         const result = await templateApi.saveTemplate({
    //             name: template.name,
    //             type: typeUpper,
    //             colors: colorsToSend,  // Ahora es Record<string, string>
    //             sectionColors: template.sectionColors as Record<string, string>,
    //             typography: template.typography as Record<string, string>,
    //             ui: template.ui as Record<string, any>,
    //             buttons: template.buttons as Record<string, any>,
    //             texts: template.texts || {},
    //             images: template.images || {}
    //         });

    //         if (result.template?.id) {
    //             const updatedTemplate = {
    //                 ...template,
    //                 id: result.template.id,
    //                 updatedAt: new Date()
    //             };
    //             setTemplateState(updatedTemplate);

    //             window.dispatchEvent(new CustomEvent('template-saved', {
    //                 detail: {
    //                     templateId: result.template.id,
    //                     success: true,
    //                     template: updatedTemplate
    //                 }
    //             }));
    //         }

    //         return result;
    //     } catch (error) {
    //         console.error('Error guardando template:', error);
    //     }
    // };

    // src/contexts/TemplateContext.tsx - SOLO la parte de saveToBackend modificada

    const saveToBackend = async () => {
        if (!template || !isAuthenticated) return;

        try {
            const typeUpper = template.type.toUpperCase();

            // Convertir TemplateColors a Record<string, string>
            const colorsToSend: Record<string, string> = {
                primary: template.colors.primary,
                secondary: template.colors.secondary,
                accent: template.colors.accent,
                background: template.colors.background,
                text: template.colors.text,
            };

            // Usar 'as any' para evitar el error de TypeScript temporalmente
            const result = await templateApi.saveTemplate({
                name: template.name,
                type: typeUpper,
                colors: colorsToSend,
                sectionColors: template.sectionColors,
                typography: template.typography,
                ui: template.ui,
                buttons: template.buttons,
                texts: template.texts || {},
                images: template.images || {}
            } as any);

            if (result.template?.id) {
                const updatedTemplate = {
                    ...template,
                    id: result.template.id,
                    updatedAt: new Date()
                };
                setTemplateState(updatedTemplate);

                window.dispatchEvent(new CustomEvent('template-saved', {
                    detail: {
                        templateId: result.template.id,
                        success: true,
                        template: updatedTemplate
                    }
                }));
            }

            return result;
        } catch (error) {
            console.error('Error guardando template:', error);
        }
    };

    const loadFromBackend = async (templateId: string) => {
        if (!isAuthenticated) return;

        try {
            const result = await templateApi.getTemplate(templateId);
            if (result.template) {
                const templateData: Template = {
                    id: result.template.id,
                    name: result.template.name,
                    type: result.template.type.toLowerCase(),
                    colors: result.template.colors || getDefaultTemplateColors(result.template.type.toLowerCase()),
                    sectionColors: result.template.sectionColors || defaultSectionColors,
                    typography: result.template.typography || defaultTypography,
                    ui: result.template.ui || defaultUI,
                    buttons: result.template.buttons || defaultButtons,
                    texts: result.template.texts || {},
                    images: result.template.images || {},
                    createdAt: new Date(result.template.createdAt),
                    updatedAt: new Date(result.template.updatedAt),
                    version: result.template.version || 1
                };
                setTemplateState(templateData);
                addToHistory(templateData);
            }
        } catch (error) {
            console.error('Error cargando template:', error);
        }
    };

    const getUserTemplates = async () => {
        if (!isAuthenticated) return [];
        try {
            const result = await templateApi.getUserTemplates();
            return result.templates || [];
        } catch (error) {
            console.error('Error obteniendo templates:', error);
            return [];
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setTemplateState(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setTemplateState(history[historyIndex + 1]);
        }
    };

    const setEditorConfig = (config: Partial<EditorConfig>) => {
        setEditorConfigState(prev => ({ ...prev, ...config }));
    };

    return (
        <TemplateContext.Provider value={{
            template,
            setTemplate,
            updateColors,
            updateSectionColors,
            updateTypography,
            updateUI,
            updateButtons,
            updateText,
            updateImage,
            resetTemplate,
            applyPreset,
            saveDraft,
            loadDraft,
            exportTemplate,
            saveToBackend,
            loadFromBackend,
            getUserTemplates,
            hasUnsavedChanges,
            undo,
            redo,
            canUndo: historyIndex > 0,
            canRedo: historyIndex < history.length - 1,
            editorConfig,
            setEditorConfig
        }}>
            {children}
        </TemplateContext.Provider>
    );
};

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplate must be used within TemplateProvider');
    }
    return context;
};
import React, { createContext, useContext, useState } from 'react';
import type { EditorConfig } from '../types/template.types';

interface TemplateEditorContextType {
    config: EditorConfig;
    toggleEditing: () => void;
    selectElement: (elementId: string | null) => void;
    toggleEditor: () => void;
    setConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateEditorContext = createContext<TemplateEditorContextType | undefined>(undefined);

export const TemplateEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null  // <-- Agregar esta línea
    });

    const toggleEditing = () => {
        setConfig(prev => ({ ...prev, isEditing: !prev.isEditing }));
    };

    const selectElement = (elementId: string | null) => {
        setConfig(prev => ({ ...prev, selectedElement: elementId }));
    };

    const toggleEditor = () => {
        setConfig(prev => ({ ...prev, showEditor: !prev.showEditor }));
    };

    const updateConfig = (newConfig: Partial<EditorConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    return (
        <TemplateEditorContext.Provider value={{
            config,
            toggleEditing,
            selectElement,
            toggleEditor,
            setConfig: updateConfig
        }}>
            {children}
        </TemplateEditorContext.Provider>
    );
};

export const useTemplateEditor = () => {
    const context = useContext(TemplateEditorContext);
    if (!context) {
        throw new Error('useTemplateEditor must be used within TemplateEditorProvider');
    }
    return context;
};

// src/data/templateDefaultColors.ts
import type { TemplateColors } from "../../types/template.types";

// Colores por defecto para cada tipo de template
export const templateDefaultColors: Record<string, TemplateColors> = {
    consulting: {
        primary: '#2563eb',
        secondary: '#4b5563',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#111827'
    },
    catering: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
        background: '#fffbeb',
        text: '#78350f'
    },
    accounting: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
        background: '#f0fdf4',
        text: '#022c22'
    },
    restaurant: {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#991b1b',
        background: '#fef2f2',
        text: '#450a0a'
    },
    lawFirm: {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
        background: '#faf7f2',
        text: '#292524'
    },
    medical: {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
        background: '#f0fdfa',
        text: '#042f2e'
    },
    architecture: {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
        background: '#fafaf9',
        text: '#1c1917'
    },
    marketingAgency: {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
        background: '#faf5ff',
        text: '#4a044e'
    },
    coffeeShop: {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
        background: '#fef3c7',
        text: '#422006'
    },
    bakery: {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#9f1239',
        background: '#fff1f2',
        text: '#4c0519'
    },
    foodTruck: {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
        background: '#fef3c7',
        text: '#5d3a1a'
    },
    beautySalon: {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
        background: '#fdf2f8',
        text: '#831843'
    },
    gym: {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
        background: '#f5f5f4',
        text: '#1c1917'
    },
    realEstate: {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
        background: '#f8fafc',
        text: '#081c15'
    },
    fashion: {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
        background: '#ffffff',
        text: '#111827'
    },
    cleaning: {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
        background: '#f0f9ff',
        text: '#0c4a6e'
    },
    saas: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
        background: '#f5f3ff',
        text: '#1e1e3f'
    },
    digitalAgency: {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
        background: '#ecfeff',
        text: '#164e63'
    },
    startup: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
        background: '#ecfdf5',
        text: '#064e3b'
    },
};

// src/hooks/useAuthHandler.ts
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useAuthHandler = () => {
    const { user, isAuthenticated, isLoading: authLoading, isRefreshing, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get('token');

    const hasProcessedToken = useRef(false);
    const redirectAttempted = useRef(false);
    const authCheckInterval = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [processingToken, setProcessingToken] = useState(false);
    const [authReady, setAuthReady] = useState(false);

    // Procesar token de URL
    useEffect(() => {
        const processToken = async () => {
            if (hasProcessedToken.current || !tokenFromUrl || processingToken) return;

            hasProcessedToken.current = true;
            setProcessingToken(true);
            setAuthReady(false);

            try {
                localStorage.setItem('token', tokenFromUrl);
                await refreshUser();
                window.history.replaceState({}, document.title, window.location.pathname);
                await new Promise(resolve => setTimeout(resolve, 300));
                setAuthReady(true);
            } catch (error) {
                console.error('❌ Error procesando token:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('refreshToken');
                hasProcessedToken.current = false;
                setAuthReady(true);
            } finally {
                setProcessingToken(false);
            }
        };

        processToken();
    }, [tokenFromUrl, refreshUser, processingToken]);

    // Redirección a login
    useEffect(() => {
        if (authCheckInterval.current) {
            clearInterval(authCheckInterval.current);
            authCheckInterval.current = null;
        }

        if (isAuthenticated) {
            redirectAttempted.current = false;
            return;
        }

        if (processingToken || isRefreshing || authLoading || (tokenFromUrl && !authReady)) return;
        if (redirectAttempted.current) return;

        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser && !isAuthenticated && !processingToken && !isRefreshing) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
        }

        if (!storedToken && !tokenFromUrl && !isAuthenticated) {
            redirectAttempted.current = true;
            navigate('/login', { replace: true });
        } else if (tokenFromUrl && authReady && !isAuthenticated) {
            let attempts = 0;
            const maxAttempts = 10;

            authCheckInterval.current = setInterval(() => {
                attempts++;
                if (isAuthenticated) {
                    if (authCheckInterval.current) clearInterval(authCheckInterval.current);
                    redirectAttempted.current = false;
                } else if (attempts >= maxAttempts) {
                    if (authCheckInterval.current) clearInterval(authCheckInterval.current);
                    redirectAttempted.current = true;
                    navigate('/login', { replace: true });
                }
            }, 300);

            return () => {
                if (authCheckInterval.current) clearInterval(authCheckInterval.current);
            };
        }
    }, [isAuthenticated, processingToken, isRefreshing, authLoading, navigate, tokenFromUrl, authReady]);

    useEffect(() => {
        if (isAuthenticated) {
            redirectAttempted.current = false;
            if (authCheckInterval.current) {
                clearInterval(authCheckInterval.current);
                authCheckInterval.current = null;
            }
        }
    }, [isAuthenticated]);

    const isLoading = processingToken || isRefreshing || authLoading || (tokenFromUrl && !authReady);

    const getLoadingMessage = () => {
        if (processingToken) return 'Procesando acceso...';
        if (isRefreshing) return 'Cargando tus datos...';
        if (tokenFromUrl && !authReady) return 'Configurando tu cuenta...';
        if (authLoading) return 'Verificando acceso...';
        return 'Cargando...';
    };

    return {
        isLoading,
        getLoadingMessage,
        isAuthenticated,
        user,
        tokenFromUrl: !!tokenFromUrl
    };
};

// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Hook personalizado para debounce de valores
 * @param value - El valor que queremos debounce
 * @param delay - Tiempo de espera en milisegundos
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Configurar timer para actualizar después del delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpiar timer si el valor cambia antes del delay
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
// src/hooks/useTutorial.ts
import { useEffect, useState } from 'react';

interface TutorialStep {
    id: string;
    title: string;
    description: string;
    targetElement: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
}

export const tutorialSteps: TutorialStep[] = [
    {
        id: 'welcome',
        title: '🎨 ¡Bienvenido al Editor de Templates!',
        description: 'Aquí puedes personalizar completamente el diseño de tu sitio web. Cambia colores, edita textos y mucho más.',
        targetElement: 'editor-sidebar',
        position: 'right',
        showSkip: true
    },
    {
        id: 'edit-mode',
        title: '✏️ Modo Edición',
        description: 'Activa el modo edición haciendo clic en el botón "Activar modo edición". Verás que los textos se vuelven editables con doble clic.',
        targetElement: 'edit-mode-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'colors',
        title: '🎨 Paleta de Colores',
        description: 'Selecciona un color para personalizar cada elemento de tu sitio. Los cambios se ven en tiempo real.',
        targetElement: 'colors-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'presets',
        title: '✨ Presets de Colores',
        description: 'Prueba combinaciones de colores predefinidas con un solo clic. ¡Encuentra la combinación perfecta!',
        targetElement: 'presets-section',
        position: 'right',
        showSkip: true
    },
    {
        id: 'text-editing',
        title: '📝 Editar Textos',
        description: 'Hacé doble clic en cualquier texto de la página para editarlo. Podés cambiar títulos, descripciones y más.',
        targetElement: 'texts-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'save',
        title: '💾 Guardar Cambios',
        description: 'No olvides guardar tus cambios. El botón "Guardar cambios" se ilumina cuando hay modificaciones pendientes.',
        targetElement: 'save-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'undo-redo',
        title: '↩️ Deshacer / Rehacer',
        description: 'Si te equivocaste, podés deshacer o rehacer tus últimos cambios con estos botones.',
        targetElement: 'undo-redo-buttons',
        position: 'right',
        showSkip: true
    },
    {
        id: 'finish',
        title: '🏁 Finalizar Edición',
        description: 'Cuando termines, hacé clic en "Finalizar edición". Se guardarán automáticamente todos los cambios.',
        targetElement: 'finish-button',
        position: 'right',
        showSkip: false
    }
];

const TUTORIAL_KEY = 'kernelize_tutorial_completed';
const TUTORIAL_SKIPPED_KEY = 'kernelize_tutorial_skipped';

export const useTutorial = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(true);
    const [hasSkipped, setHasSkipped] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem(TUTORIAL_KEY) === 'true';
        const skipped = localStorage.getItem(TUTORIAL_SKIPPED_KEY) === 'true';
        setHasCompleted(completed);
        setHasSkipped(skipped);

        // Mostrar tutorial si no está completado ni saltado
        if (!completed && !skipped) {
            setShowTutorial(true);
        }
    }, []);

    const startTutorial = () => {
        setShowTutorial(true);
        setCurrentStep(0);
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    const nextStep = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeTutorial();
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const completeTutorial = () => {
        localStorage.setItem(TUTORIAL_KEY, 'true');
        setShowTutorial(false);
        setHasCompleted(true);
    };

    const skipTutorial = () => {
        localStorage.setItem(TUTORIAL_SKIPPED_KEY, 'true');
        setShowTutorial(false);
        setHasSkipped(true);
    };

    const resetTutorial = () => {
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setShowTutorial(true);
        setCurrentStep(0);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    return {
        showTutorial,
        currentStep,
        currentStepData: tutorialSteps[currentStep],
        hasCompleted,
        hasSkipped,
        startTutorial,
        nextStep,
        previousStep,
        completeTutorial,
        skipTutorial,
        resetTutorial,
        totalSteps: tutorialSteps.length
    };
};
// src/hooks/useUserTemplates.ts
import { useEffect, useState } from 'react';
import { templateApi } from '../services/api/templateApi.service';

export const useUserTemplates = (isAuthenticated: boolean, user: any) => {
    const [userTemplate, setUserTemplate] = useState<any>(null);
    const [userTemplatesList, setUserTemplatesList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);


    const saveNewTemplate = async (templateData: any) => {
        setLoading(true);
        try {
            const result = await templateApi.saveTemplate({
                name: templateData.name,
                type: templateData.type.toUpperCase(),
                colors: templateData.colors,
                texts: templateData.texts || {},
                images: templateData.images || {}
            });

            if (result.template) {
                await loadUserTemplates(); // Recargar la lista
                return result.template;
            }
        } catch (error) {
            console.error('Error guardando nuevo template:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const loadUserTemplates = async () => {
        if (!isAuthenticated || !user) {
            setUserTemplate(null);
            setUserTemplatesList([]);
            return;
        }

        setLoading(true);
        try {
            const response = await templateApi.getUserTemplates();
            console.log('📦 Templates cargados desde backend:', response.templates);

            if (response.templates && response.templates.length > 0) {
                setUserTemplatesList(response.templates);
                // Tomar el template más reciente (por fecha de edición)
                const latestTemplate = response.templates.sort((a: any, b: any) =>
                    new Date(b.lastEdited || b.updatedAt).getTime() - new Date(a.lastEdited || a.updatedAt).getTime()
                )[0];
                setUserTemplate(latestTemplate);
                console.log('📌 Template principal actualizado:', latestTemplate);
                console.log('🎨 Colores del template principal:', latestTemplate.colors);
            } else {
                setUserTemplate(null);
                setUserTemplatesList([]);
            }
        } catch (error) {
            console.error('Error cargando templates:', error);
            setUserTemplate(null);
            setUserTemplatesList([]);
        } finally {
            setLoading(false);
        }
    };

    const reloadUserTemplates = async () => {
        console.log('🔄 Recargando templates del usuario...');
        await loadUserTemplates();
    };

    const loadTemplateForEdit = async (templateId: string) => {
        setLoading(true);
        try {
            console.log('📥 Cargando template para editar, ID:', templateId);
            const response = await templateApi.getTemplate(templateId);
            console.log('📦 Template recibido del backend:', response.template);

            if (response.template) {
                // ✅ IMPORTANTE: Mantener los colores y textos exactamente como vienen del backend
                const templateData = {
                    id: response.template.id,
                    name: response.template.name,
                    type: response.template.type?.toLowerCase() || 'consulting',
                    colors: response.template.colors,
                    texts: response.template.texts || {},
                    images: response.template.images || {},
                    createdAt: new Date(response.template.createdAt),
                    updatedAt: new Date(response.template.updatedAt),
                    version: response.template.version || 1
                };
                console.log('✅ Template preparado para editar:', templateData);
                console.log('🎨 Colores del template para editar:', templateData.colors);
                return templateData;
            }
        } catch (error) {
            console.error('Error cargando template para editar:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    useEffect(() => {
        loadUserTemplates();
    }, [isAuthenticated, user]);

    // Escuchar evento de template guardado para recargar inmediatamente
    useEffect(() => {
        const handleTemplateSaved = async (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log('📢 Evento template-saved recibido:', customEvent.detail);
            // ✅ Recargar templates después de guardar
            await loadUserTemplates();
        };

        window.addEventListener('template-saved', handleTemplateSaved);
        return () => window.removeEventListener('template-saved', handleTemplateSaved);
    }, []);

    return {
        userTemplate,
        userTemplatesList,
        loading,
        loadUserTemplates,
        reloadUserTemplates,
        loadTemplateForEdit,
        saveNewTemplate
    };
};
import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, className = '' }) => {
  // const { resolvedTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <main className="flex-grow">
        {/* dentro de este main van los componentes que el cliente quiera colocar */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;

// src/layouts/EditorLayout.tsx
import { useEffect, useRef } from 'react';
// import EditorDashboard from '../components/Editor/EditorDashboard';
import { TemplateProvider, useTemplate } from '../contexts/TemplateContext';
import { TemplateEditorProvider } from '../contexts/TemplateEditorContext';

interface EditorLayoutProps {
    templateData: any;
    onClose: () => void;
    children: React.ReactNode;
    isPreview?: boolean;
}

// Componente interno que usa el contexto
const EditorContent = ({ templateData, children }: { templateData: any; onClose: () => void; children: React.ReactNode; isPreview?: boolean }) => {
    const { setTemplate/*, template*/ } = useTemplate();
    const initialized = useRef(false);
    const lastTemplateId = useRef<string | null>(null);

    // Solo inicializar una vez cuando se monta el componente
    useEffect(() => {
        if (templateData && !initialized.current) {
            console.log('🔄 Inicializando template en el editor (una sola vez):', templateData.id);
            setTemplate(templateData);
            initialized.current = true;
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    // Solo actualizar si el ID del template cambió
    useEffect(() => {
        if (templateData && initialized.current && lastTemplateId.current !== templateData.id) {
            console.log('🔄 Template diferente detectado, actualizando:', templateData.id);
            setTemplate(templateData);
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    return (
        <>
            {children}
            {/* En modo preview, no mostrar el dashboard de edición */}
            {/* {!isPreview && <EditorDashboard onHomeClick={onClose} />} */}
        </>
    );
};

export const EditorLayout = ({ templateData, onClose, children, isPreview = false }: EditorLayoutProps) => {
    // Si no hay templateData, no renderizar
    if (!templateData) {
        return <div className="min-h-screen flex items-center justify-center">Cargando editor...</div>;
    }

    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <EditorContent templateData={templateData} onClose={onClose} isPreview={isPreview}>
                    {children}
                </EditorContent>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};
// src/layouts/GalleryLayout.tsx
import { ArrowRight, Eye, Heart, Package, Search, Sparkles, Star, X } from 'lucide-react';
import { useState } from 'react';
import { UserHeader } from './UserHeader';

type TemplateCategory = 'todos' | 'landing' | 'ecommerce' | 'enterprise' | 'custom';

interface GalleryLayoutProps {
    templates: any[];
    categories: Array<{ id: string; label: string; icon: any }>;
    onSelectTemplate: (templateId: string) => void;  // ← Cambiado de onViewTemplate
    onBackToOwn: () => void;
    onBackToMyTemplates: () => void;
    onLogout: () => void;
    onLogin: () => void;
    user: any;
    isAuthenticated: boolean;
    favorites: string[];
    onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
}

export const GalleryLayout = ({
    templates,
    categories,
    onSelectTemplate,
    onBackToOwn,
    onBackToMyTemplates,
    /*user,
    isAuthenticated,*/
    favorites,
    onToggleFavorite
}: GalleryLayoutProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('todos');
    const [showFavorites, setShowFavorites] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = searchTerm === '' ||
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'todos' || template.category.includes(selectedCategory);
        const matchesFavorites = !showFavorites || favorites.includes(template.id);
        return matchesSearch && matchesCategory && matchesFavorites;
    });

    const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
    const currentTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

            <div className="text-center pt-32 pb-16 px-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-6 border border-amber-500/20">
                    <Eye className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        Modo vista previa
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    Explora nuestras
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent ml-3">
                        plantillas
                    </span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg mb-4">
                    Visualiza nuestras plantillas profesionales. Para editar, regresa a tu plantilla principal.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onBackToOwn}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Package className="w-5 h-5" />
                        Ver mi plantilla
                    </button>
                    <button
                        onClick={onBackToMyTemplates}
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Mis plantillas
                    </button>
                </div>
            </div>

            {/* Barra de filtros */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-4">
                <div className="container-custom flex flex-col lg:flex-row gap-4 items-center justify-between px-4">
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar plantillas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto justify-center">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as TemplateCategory)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${showFavorites
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${showFavorites ? 'fill-white' : ''}`} />
                        Favoritos
                        {favorites.length > 0 && (
                            <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {favorites.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Grid de plantillas */}
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentTemplates.map(template => (
                        <div
                            key={template.id}
                            onClick={() => onSelectTemplate(template.id)}
                            className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
                        >
                            {template.popular && (
                                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                                    <Star className="w-3 h-3 text-white" />
                                    <span className="text-xs font-medium text-white">Popular</span>
                                </div>
                            )}

                            {template.featured && !template.popular && (
                                <div className="absolute top-4 left-4 z-10 bg-primary-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-primary-500/20">
                                    <Sparkles className="w-3 h-3 text-white" />
                                    <span className="text-xs font-medium text-white">Destacado</span>
                                </div>
                            )}

                            <div className="relative h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                <img
                                    src={template.images.previews[0]}
                                    alt={template.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <button
                                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(template.id, e); }}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full backdrop-blur-md shadow-sm hover:scale-110 transition-transform"
                                >
                                    <Heart className={`w-4 h-4 ${favorites.includes(template.id) ? 'fill-red-500 text-red-500' : 'text-neutral-600 dark:text-neutral-400'}`} />
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                        {template.title}
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500 dark:text-neutral-400">
                                        {template.category[0]}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                                    {template.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags?.slice(0, 2).map((tag: string, i: number) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onSelectTemplate(template.id); }}
                                        className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                    >
                                        <span>Ver demo</span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <span className="text-xs text-neutral-400">
                                        {template.category.includes('ecommerce') ? '🛒 Con tienda' : '📄 Landing'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje informativo */}
                <div className="mt-8 text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        💡 Estás en modo vista previa. Para editar una plantilla, ve a <strong>"Mis plantillas"</strong> o <strong>"Mi plantilla"</strong>.
                    </p>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                            className="px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Anterior
                        </button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                                        className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === pageNum
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                                            : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:text-white'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                            className="px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            Siguiente
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                        <p className="text-neutral-500 mb-6">
                            No hay plantillas que coincidan con "{searchTerm}"
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); setShowFavorites(false); }}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
// src/layouts/MyTemplatesLayout.tsx
import { ArrowRight, Edit3, Lock, Package, Sparkles } from 'lucide-react';
import { UserHeader } from './UserHeader';

interface MyTemplatesLayoutProps {
    templates: any[];
    onEditTemplate: (templateId: string) => void;
    onBackToOwn: () => void;
    onExploreGallery: () => void;
    onLogout: () => void;
    onLogin: () => void;
    user: any;
    isAuthenticated: boolean;
}

export const MyTemplatesLayout = ({
    templates,
    onEditTemplate,
    onBackToOwn,
    onExploreGallery,
    /* user,
     isAuthenticated*/
}: MyTemplatesLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

            <div className="text-center pt-32 pb-16 px-4">
                <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6 border border-purple-500/20">
                    <Package className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Mis plantillas
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    Tus plantillas
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent ml-3">
                        personalizadas
                    </span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg mb-4">
                    Aquí están todas las plantillas que has guardado en tu cuenta.
                </p>

                <button
                    onClick={onBackToOwn}
                    className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Volver a mi plantilla principal
                </button>
            </div>

            <div className="container-custom px-4 py-12">
                {templates.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No tienes plantillas guardadas</h3>
                        <p className="text-neutral-500 mb-6">
                            Personaliza una plantilla y guárdala en tu cuenta para verla aquí.
                        </p>
                        <button
                            onClick={onExploreGallery}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Explorar plantillas
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="card active group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
                                onClick={() => onEditTemplate(template.id)}
                            >
                                <div className="relative h-48 bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-white text-4xl mb-2">📄</div>
                                        <div className="text-white font-semibold">{template.name}</div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                            {template.name}
                                        </h3>
                                        <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                                            v{template.version || 1}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                                        Última edición: {new Date(template.lastEdited || template.createdAt).toLocaleDateString('es-ES')}
                                    </p>
                                    <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEditTemplate(template.id); }}
                                            className="btn-primary text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Editar
                                        </button>
                                        <span className="text-xs text-neutral-400">
                                            {template.type?.toLowerCase() || 'Personalizado'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div

                            className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"

                        >
                            <div className="relative h-48 bg-gradient-to-r from-primary-200 to-accent-500 flex items-center justify-center">
                                {/* No disponible */}
                                <div className="text-center">
                                    <div className="text-white text-4xl mb-2">➕</div>
                                    <div className="text-white font-semibold">No disponible </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                       Mi Nuevo template 
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">

                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">

                                </p>
                                <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                    <button

                                        className="btn-light text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                    >
                                        <Lock className="w-4 h-4" />
                                        Crear
                                    </button>
                                    <span className="text-xs text-neutral-400">
                                        Nuevo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    // nueva


                )}

                <div className="text-center mt-12">
                    <button
                        onClick={onExploreGallery}
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Explorar más plantillas
                    </button>
                </div>
            </div>
        </div>
    );
};
// src/layouts/OwnTemplateLayout.tsx
import { ArrowRight, CheckCircle, Clock, Edit3, Package, Sparkles, Type } from 'lucide-react';
import { UserHeader } from './UserHeader';
import { useEffect } from 'react';

interface OwnTemplateLayoutProps {
    userTemplate: any;
    onEdit: () => void;
    onViewMyTemplates: () => void;
    onExploreGallery: () => void;
    onLogout: () => void;
    onLogin: () => void;
    isAuthenticated: boolean;
    user: any;
}

export const OwnTemplateLayout = ({
    userTemplate,
    onEdit,
    onViewMyTemplates,
    onExploreGallery
}: OwnTemplateLayoutProps) => {

    // Agregar logs para verificar
    useEffect(() => {
        console.log('🎨 OwnTemplateLayout - userTemplate actualizado:', userTemplate);
        console.log('🎨 Colors:', userTemplate?.colors);
    }, [userTemplate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

            {/* Previsualización */}
            <div className="container-custom px-4 pt-32 pb-16 ">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                        <h2 className="text-2xl font-bold mb-2">Previsualización de tu plantilla</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Así se verá tu sitio web con los colores y textos que seleccionaste
                        </p>
                        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex flex-wrap justify-center gap-4">
                            <button
                                onClick={onEdit}
                                className="btn-primary px-8 py-3 flex items-center gap-2"
                            >
                                <Edit3 className="w-5 h-5" />
                                Seguir editando
                            </button>
                            <button
                                onClick={onViewMyTemplates}
                                className="btn-secondary px-8 py-3 flex items-center gap-2"
                            >
                                <Package className="w-5 h-5" />
                                Ver mis plantillas
                            </button>
                        </div>
                    </div>

                    <div className="text-center px-4">
                        {/* <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full mb-6 border border-green-500/20">
                            <Sparkles className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                Tu template personalizado
                            </span>
                        </div> */}
                        {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    {userTemplate?.name || 'Mi plantilla personalizada'}
                </h1> */}
                        <p className="text-neutral-600 mt-10  dark:text-neutral-400 max-w-2xl mx-auto text-md mb-4">
                            ¡Excelente elección! Hemos guardado tu plantilla con todas tus personalizaciones.
                        </p>

                        {/* Información de tiempos */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-6 h-6 text-blue-500" />
                                    <span className="font-semibold text-lg">Tiempo de revisión</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24-48 horas</p>
                                <p className="text-sm text-neutral-500 mt-1">Nuestro equipo revisará tus cambios</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="font-semibold text-lg">Correcciones</span>
                                </div>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">2-3 días hábiles</p>
                                <p className="text-sm text-neutral-500 mt-1">Tiempo estimado de implementación</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Edit3 className="w-6 h-6 text-purple-500" />
                                    <span className="font-semibold text-lg">Estado</span>
                                </div>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">En revisión</p>
                                <p className="text-sm text-neutral-500 mt-1">Te notificaremos cuando esté listo</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">

                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6">
                            <div
                                className="p-8 rounded-xl transition-all"
                                style={{
                                    backgroundColor: userTemplate?.colors?.background || '#ffffff',
                                    color: userTemplate?.colors?.text || '#0f172a'
                                }}
                            >
                                <div className="text-center mb-8">
                                    <div
                                        className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                        style={{
                                            backgroundColor: `${userTemplate?.colors?.primary || '#2563eb'}20`,
                                            color: userTemplate?.colors?.primary || '#2563eb'
                                        }}
                                    >
                                        Tu sitio personalizado
                                    </div>
                                    <h1
                                        className="text-4xl font-bold mb-4"
                                        style={{ color: userTemplate?.colors?.primary || '#2563eb' }}
                                    >
                                        {userTemplate?.name || 'Mi sitio web'}
                                    </h1>
                                    <p className="text-lg max-w-2xl mx-auto">
                                        Sitio web diseñado especialmente para ti con los colores y estilo que elegiste.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${userTemplate?.colors?.primary || '#2563eb'}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: userTemplate?.colors?.primary || '#2563eb' }}
                                        >
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Diseño personalizado</h3>
                                        <p className="text-sm opacity-80">Con los colores que seleccionaste</p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${userTemplate?.colors?.secondary || '#475569'}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: userTemplate?.colors?.secondary || '#475569' }}
                                        >
                                            <Type className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Textos personalizados</h3>
                                        <p className="text-sm opacity-80">Adaptados a tu negocio</p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${userTemplate?.colors?.accent || '#1e293b'}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: userTemplate?.colors?.accent || '#1e293b' }}
                                        >
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Listo para publicar</h3>
                                        <p className="text-sm opacity-80">Revisión en curso</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>



            {/* CTA */}
            <div className="gradient-bg rounded-3xl mx-4 sm:mx-6 lg:mx-auto container-custom mb-16 p-6 md:p-8 text-center">
                <h3 className="heading-3 text-gradient mb-4">¿Quieres explorar más plantillas?</h3>
                <p className="text-neutral-600 dark:text-primary-400 max-w-2xl mx-auto mb-6">
                    Visualiza nuestras plantillas profesionales y encuentra inspiración para tu próximo proyecto.
                </p>
                <button
                    onClick={onExploreGallery}
                    className="btn-primary inline-flex items-center gap-2 group"
                >
                    <Sparkles className="w-5 h-5" />
                    Explorar plantillas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};
// src/layouts/UserHeader.tsx
import Header from '../components/Header/Header';


export const UserHeader = () => {
    // const { user, isAuthenticated } = useAuth();

    return (
        <>
        <Header/>
        </>
        // <div className="fixed top-6 right-6 z-50">
        //     {isAuthenticated && user ? (
        //         <div className="flex items-center gap-3 bg-white/90 dark:bg-neutral-800/90 p-2 pl-4 rounded-full shadow-lg backdrop-blur-md border border-neutral-200 dark:border-neutral-700">
        //             <span className="text-sm font-medium dark:text-white">{user.name || user.email}</span>
        //             <button
        //                 onClick={onLogout}
        //                 className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-4 py-1.5 rounded-full hover:shadow-md transition-all"
        //             >
        //                 Salir
        //             </button>
        //         </div>
        //     ) : (
        //         <button
        //             onClick={onLogin}
        //             className="btn-primary text-sm px-5 py-2 flex items-center gap-2 shadow-lg"
        //         >
        //             <span>Iniciar sesión</span>
        //             <ArrowRight className="w-4 h-4" />
        //         </button>
        //     )}
        // </div>
    );
};
// src/types/template.types.ts - VERSIÓN COMPLETA Y CORREGIDA

// Tipos para colores personalizables (versión simple)
export interface TemplateColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

// Textos editables
export interface EditableTexts {
    [key: string]: string;
}

// Configuración de edición
export interface EditorConfig {
    isEditing: boolean;
    selectedElement: string | null;
    showEditor: boolean;
    notifications: {
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null;
}

// Colores por sección
export interface SectionColors {
    heroBackground: string;
    heroTitleColor: string;
    heroDescriptionColor: string;
    heroBadgeBackground: string;
    heroBadgeTextColor: string;

    buttonPrimaryBackground: string;
    buttonPrimaryText: string;
    buttonPrimaryHoverBackground: string;
    buttonSecondaryBackground: string;
    buttonSecondaryText: string;
    buttonSecondaryHoverBackground: string;

    headerBackground: string;
    headerTextColor: string;
    headerLinkColor: string;
    headerLinkHoverColor: string;

    featuresBackground: string;
    featuresTitleColor: string;
    featuresCardBackground: string;
    featuresCardBorder: string;

    footerBackground: string;
    footerTextColor: string;
    footerLinkColor: string;
    footerHeadingColor: string;

    bodyBackground: string;
    bodyTextColor: string;
}

// Configuración de tipografía
export interface TypographyConfig {
    heroTitleSize: string;
    heroDescriptionSize: string;
    sectionTitleSize: string;
    bodyTextSize: string;
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;
}

// Configuración de UI
export interface UIConfig {
    borderRadius: {
        small: string;
        medium: string;
        large: string;
        full: string;
    };
    boxShadow: {
        small: string;
        medium: string;
        large: string;
        none: string;
    };
    spacing: {
        sectionPadding: string;
        elementGap: string;
    };
}

// Configuración de botones
export interface ButtonConfig {
    primary: {
        text: string;
        url: string;
        openInNewTab: boolean;
    };
    secondary: {
        text: string;
        url: string;
        openInNewTab: boolean;
    };
    ctaButtons?: Record<string, {
        text: string;
        url: string;
        openInNewTab: boolean;
    }>;
}

// Template completo
export interface Template {
    id: string;
    name: string;
    type: string;
    colors: TemplateColors;
    sectionColors: SectionColors;
    typography: TypographyConfig;
    ui: UIConfig;
    buttons: ButtonConfig;
    texts: Record<string, string>;
    images?: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    version?: number;
}

// Tipo para almacenamiento
export interface StoredTemplate extends Omit<Template, 'createdAt' | 'updatedAt'> {
    createdAt: string;
    updatedAt: string;
    lastSaved?: string;
}

// Presets de colores
export const colorPresets = {
    consulting: [
        {
            name: 'Profesional Azul',
            colors: {
                primary: '#2563eb',
                secondary: '#4b5563',
                accent: '#1e293b',
                background: '#ffffff',
                text: '#111827'
            }
        },
        {
            name: 'Ejecutivo Oscuro',
            colors: {
                primary: '#1e40af',
                secondary: '#374151',
                accent: '#0f172a',
                background: '#f3f4f6',
                text: '#030712'
            }
        },
        {
            name: 'Minimalista Gris',
            colors: {
                primary: '#4b5563',
                secondary: '#6b7280',
                accent: '#374151',
                background: '#f9fafb',
                text: '#1f2937'
            }
        },
        {
            name: 'Corporativo Verde',
            colors: {
                primary: '#047857',
                secondary: '#065f46',
                accent: '#064e3b',
                background: '#ecfdf5',
                text: '#022c22'
            }
        },
        {
            name: 'Moderno Púrpura',
            colors: {
                primary: '#7c3aed',
                secondary: '#6d28d9',
                accent: '#5b21b6',
                background: '#f5f3ff',
                text: '#2e1065'
            }
        },
    ],
    catering: [
        {
            name: 'Cálido Ámbar',
            colors: {
                primary: '#f59e0b',
                secondary: '#d97706',
                accent: '#b45309',
                background: '#fffbeb',
                text: '#78350f'
            }
        },
        {
            name: 'Elegante Naranja',
            colors: {
                primary: '#ea580c',
                secondary: '#c2410c',
                accent: '#9a3412',
                background: '#fff7ed',
                text: '#431407'
            }
        },
    ],
    accounting: [
        {
            name: 'Formal Esmeralda',
            colors: {
                primary: '#059669',
                secondary: '#047857',
                accent: '#064e3b',
                background: '#f0fdf4',
                text: '#022c22'
            }
        },
    ],
    restaurant: [
        {
            name: 'Apetitoso Rojo',
            colors: {
                primary: '#dc2626',
                secondary: '#b91c1c',
                accent: '#991b1b',
                background: '#fef2f2',
                text: '#450a0a'
            }
        },
    ]
};

// Valores por defecto
export const defaultSectionColors: SectionColors = {
    heroBackground: '#f8fafc',
    heroTitleColor: '#1e293b',
    heroDescriptionColor: '#475569',
    heroBadgeBackground: '#2563eb',
    heroBadgeTextColor: '#ffffff',
    buttonPrimaryBackground: '#2563eb',
    buttonPrimaryText: '#ffffff',
    buttonPrimaryHoverBackground: '#1d4ed8',
    buttonSecondaryBackground: '#ffffff',
    buttonSecondaryText: '#1e293b',
    buttonSecondaryHoverBackground: '#f1f5f9',
    headerBackground: '#ffffff',
    headerTextColor: '#1e293b',
    headerLinkColor: '#475569',
    headerLinkHoverColor: '#2563eb',
    featuresBackground: '#ffffff',
    featuresTitleColor: '#1e293b',
    featuresCardBackground: '#ffffff',
    featuresCardBorder: '#e2e8f0',
    footerBackground: '#0f172a',
    footerTextColor: '#94a3b8',
    footerLinkColor: '#cbd5e1',
    footerHeadingColor: '#ffffff',
    bodyBackground: '#ffffff',
    bodyTextColor: '#334155',
};

export const defaultTypography: TypographyConfig = {
    heroTitleSize: '3rem',
    heroDescriptionSize: '1.125rem',
    sectionTitleSize: '2rem',
    bodyTextSize: '1rem',
    headingFont: 'Inter, system-ui, sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',
};

export const defaultUI: UIConfig = {
    borderRadius: {
        small: '0.375rem',
        medium: '0.5rem',
        large: '0.75rem',
        full: '9999px',
    },
    boxShadow: {
        small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        none: 'none',
    },
    spacing: {
        sectionPadding: '4rem',
        elementGap: '1.5rem',
    },
};

export const defaultButtons: ButtonConfig = {
    primary: {
        text: 'Solicitar consultoría',
        url: '/contacto',
        openInNewTab: false,
    },
    secondary: {
        text: 'Conocer metodología',
        url: '#metodologia',
        openInNewTab: false,
    },
};
// src/utils/imagePlaceholder.ts
// Función para generar placeholders en base64 (no requiere internet)
export const getPlaceholder = (text: string, width: number = 800, height: number = 600): string => {
    // Crear un canvas en memoria para generar la imagen
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        // Fondo gris claro
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);

        // Borde gris oscuro
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, width - 2, height - 2);

        // Texto
        ctx.fillStyle = '#999999';
        ctx.font = `bold ${Math.floor(width / 20)}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dividir texto en líneas si es muy largo
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > width * 0.8 && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        if (currentLine) {
            lines.push(currentLine);
        }

        // Dibujar líneas
        const lineHeight = parseInt(ctx.font) * 1.2;
        const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

        lines.forEach((line, i) => {
            ctx.fillText(line, width / 2, startY + i * lineHeight);
        });
    }

    return canvas.toDataURL('image/png');
};

// Placeholders predefinidos para usar como fallback
export const PLACEHOLDERS = {
    team: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'400\' y=\'300\' font-family=\'Arial\' font-size=\'40\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EEquipo%3C/text%3E%3C/svg%3E',
    project: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'400\' y=\'300\' font-family=\'Arial\' font-size=\'40\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EProyecto%3C/text%3E%3C/svg%3E',
    logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'100\' y=\'100\' font-family=\'Arial\' font-size=\'24\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ELogo%3C/text%3E%3C/svg%3E',
};
import type { CSSProperties } from "react";

export const getFocusRingStyle = (color: string): React.CSSProperties => ({
    '--tw-ring-color': color,
    outlineColor: color,
} as React.CSSProperties);

export const getInputStyles = (color: string, hasError?: boolean): CSSProperties => ({
    borderColor: hasError ? '#ef4444' : `${color}40`,
    ...getFocusRingStyle(color),
} as CSSProperties);

// Helper para obtener colores por defecto de un template
export const getDefaultTemplateColors = (type: string): TemplateColors => {
    return templateDefaultColors[type] || templateDefaultColors.consulting;
};

// src/App.tsx - Versión optimizada con useRef para evitar bucles
import { Grid3X3, Heart, LayoutGrid, Sparkles, Star } from 'lucide-react';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { useAuth } from './contexts/AuthContext';
import { templateImages } from './data/templateImages';
import { templateDefaultColors } from './data/types/templateDefaultColors';
import { useAuthHandler } from './hooks/useAuthHandler';
import { useUserTemplates } from './hooks/useUserTemplates';
import './index.css';
import { EditorLayout } from './layouts/EditorLayout';
import { GalleryLayout } from './layouts/GalleryLayout';
import { MyTemplatesLayout } from './layouts/MyTemplatesLayout';
import { OwnTemplateLayout } from './layouts/OwnTemplateLayout';
import LoginPage from './pages/LoginPage';
// import Header from './components/Header/Header';

// Lazy loading de templates
const AccountingLanding = lazy(() => import('./templates/Accounting/AccountingLanding'));
const ArchitectureLanding = lazy(() => import('./templates/Architecture/ArchitectureLanding'));
const BakeryLanding = lazy(() => import('./templates/Bakery/BakeryLanding'));
const BeautySalonLanding = lazy(() => import('./templates/BeautySalon/SalonLanding'));
const CateringLanding = lazy(() => import('./templates/Catering/CateringLanding'));
const CleaningServiceLanding = lazy(() => import('./templates/CleaningService/CleaningLanding'));
const CoffeeShopLanding = lazy(() => import('./templates/CoffeeShop/CoffeeLanding'));
const ConsultingLanding = lazy(() => import('./templates/Consulting/ConsultingLanding'));
const DigitalAgencyLanding = lazy(() => import('./templates/DigitalAgency/DigitalLanding'));
const FashionStoreLanding = lazy(() => import('./templates/FashionStore/FashionLanding'));
const FoodTruckLanding = lazy(() => import('./templates/FoodTruck/FoodTruckLanding'));
const GymLanding = lazy(() => import('./templates/Gym/GymLanding'));
const LawFirmLanding = lazy(() => import('./templates/LawFirm/LawFirmLanding'));
const MarketingAgencyLanding = lazy(() => import('./templates/MarketingAgency/AgencyLanding'));
const MedicalClinicLanding = lazy(() => import('./templates/MedicalClinic/MedicalLanding'));
const RealEstateLanding = lazy(() => import('./templates/RealEstate/RealEstateLanding'));
const RestaurantLanding = lazy(() => import('./templates/Restaurant/RestaurantLanding'));
const SaaSlanding = lazy(() => import('./templates/SaaS/SaaSlanding'));
const StartupLanding = lazy(() => import('./templates/Startup/StartupLanding'));

// Tipos
type ViewMode = 'ownTemplate' | 'myTemplates' | 'gallery' | 'editor';

// Plantillas públicas para la galería
const templatesInfo = [
  { id: 'consulting', title: 'Consultoría', description: 'Diseño profesional para servicios de consultoría.', icon: '📊', gradient: 'from-blue-500 to-blue-600', color: 'blue', category: ['landing'], tags: ['negocios', 'profesional'], featured: true, popular: true, images: templateImages.consulting },
  { id: 'catering', title: 'Catering', description: 'Estilo vibrante para servicios gastronómicos.', icon: '🍽️', gradient: 'from-amber-500 to-orange-500', color: 'amber', category: ['landing'], tags: ['gastronomía', 'eventos'], featured: true, popular: true, images: templateImages.catering },
  { id: 'accounting', title: 'Contaduría', description: 'Diseño formal para estudios contables.', icon: '🧾', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['finanzas', 'contable'], featured: false, popular: false, images: templateImages.accounting },
  { id: 'restaurant', title: 'Restaurant', description: 'Diseño cálido para restaurantes.', icon: '🍝', gradient: 'from-red-500 to-red-600', color: 'red', category: ['landing'], tags: ['gastronomía', 'comida'], featured: true, popular: true, images: templateImages.restaurant },
  { id: 'lawFirm', title: 'Bufete de Abogados', description: 'Diseño elegante para estudios jurídicos.', icon: '⚖️', gradient: 'from-stone-600 to-stone-700', color: 'stone', category: ['landing'], tags: ['legal', 'derecho'], featured: false, popular: false, images: templateImages.lawFirm },
  { id: 'medical', title: 'Clínica Médica', description: 'Diseño limpio para centros de salud.', icon: '🏥', gradient: 'from-teal-500 to-teal-600', color: 'teal', category: ['landing'], tags: ['salud', 'médico'], featured: true, popular: false, images: templateImages.medical },
  { id: 'architecture', title: 'Arquitectura', description: 'Diseño moderno para estudios de arquitectura.', icon: '🏛️', gradient: 'from-stone-500 to-stone-600', color: 'stone', category: ['landing'], tags: ['arquitectura', 'diseño'], featured: false, popular: false, images: templateImages.architecture },
  { id: 'marketingAgency', title: 'Agencia de Marketing', description: 'Diseño creativo para agencias.', icon: '📈', gradient: 'from-purple-500 to-purple-600', color: 'purple', category: ['landing'], tags: ['marketing', 'publicidad'], featured: true, popular: true, images: templateImages.marketingAgency },
  { id: 'bakery', title: 'Panadería', description: 'Diseño dulce para panaderías.', icon: '🥐', gradient: 'from-rose-500 to-rose-600', color: 'rose', category: ['landing'], tags: ['panadería', 'dulces'], featured: false, popular: false, images: templateImages.bakery },
  { id: 'foodTruck', title: 'Food Truck', description: 'Diseño urbano para food trucks.', icon: '🚚', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing'], tags: ['comida callejera', 'rápido'], featured: false, popular: false, images: templateImages.foodTruck },
  { id: 'beautySalon', title: 'Salón de Belleza', description: 'Diseño elegante para salones.', icon: '💅', gradient: 'from-pink-500 to-pink-600', color: 'pink', category: ['landing'], tags: ['belleza', 'spa'], featured: true, popular: false, images: templateImages.beautySalon },
  { id: 'gym', title: 'Gimnasio', description: 'Diseño motivador para gimnasios.', icon: '💪', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing'], tags: ['fitness', 'entrenamiento'], featured: false, popular: false, images: templateImages.gym },
  { id: 'realEstate', title: 'Inmobiliaria', description: 'Diseño profesional para bienes raíces.', icon: '🏢', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['propiedades', 'inmuebles'], featured: true, popular: true, images: templateImages.realEstate },
  { id: 'fashion', title: 'Tienda de Moda', description: 'Diseño moderno para tiendas de ropa.', icon: '👗', gradient: 'from-fuchsia-500 to-fuchsia-600', color: 'fuchsia', category: ['landing'], tags: ['moda', 'ropa'], featured: true, popular: true, images: templateImages.fashion },
  { id: 'cleaning', title: 'Limpieza', description: 'Diseño para servicios de limpieza.', icon: '🧹', gradient: 'from-sky-500 to-sky-600', color: 'sky', category: ['landing'], tags: ['servicios', 'limpieza'], featured: false, popular: false, images: templateImages.cleaning },
  { id: 'saas', title: 'SaaS', description: 'Diseño para software como servicio.', icon: '☁️', gradient: 'from-violet-500 to-violet-600', color: 'violet', category: ['landing'], tags: ['software', 'tecnología'], featured: true, popular: true, images: templateImages.saas },
  { id: 'digitalAgency', title: 'Agencia Digital', description: 'Diseño innovador para agencias digitales.', icon: '💻', gradient: 'from-cyan-500 to-cyan-600', color: 'cyan', category: ['landing'], tags: ['digital', 'tecnología'], featured: false, popular: false, images: templateImages.digitalAgency },
  { id: 'startup', title: 'Startup', description: 'Diseño disruptivo para startups.', icon: '🚀', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['startup', 'innovación'], featured: true, popular: true, images: templateImages.startup },
  { id: 'coffeeShop', title: 'Coffee Shop', description: 'Diseño acogedor para cafeterías.', icon: '☕', gradient: 'from-amber-600 to-amber-700', color: 'amber', category: ['landing', 'ecommerce'], tags: ['café', 'desayunos'], featured: true, popular: true, images: templateImages.coffeeShop }, // ← AGREGAR
];

// Categorías
const categories = [
  { id: 'todos', label: 'Todos', icon: (props: any) => <Grid3X3 {...props} /> },
  { id: 'landing', label: 'Landing Pages', icon: (props: any) => <LayoutGrid {...props} /> },
  { id: 'ecommerce', label: 'E-commerce', icon: (props: any) => <Sparkles {...props} /> },
  { id: 'enterprise', label: 'Enterprise', icon: (props: any) => <Star {...props} /> },
  { id: 'custom', label: 'Custom', icon: (props: any) => <Heart {...props} /> }
];

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isLoading, getLoadingMessage, tokenFromUrl } = useAuthHandler();
  const { userTemplate, userTemplatesList, loading: loadingTemplates, loadTemplateForEdit, reloadUserTemplates } = useUserTemplates(isAuthenticated, user);
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  // ✅ useRef para evitar múltiples ejecuciones
  const hasProcessedUrlParams = useRef(false);

  // Leer parámetros de URL
  const templateIdFromUrl = searchParams.get('templateId');
  const previewMode = searchParams.get('preview') === 'true';
  const viewFromUrl = searchParams.get('view');

  const [viewMode, setViewMode] = useState<ViewMode>('ownTemplate');
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteTemplates');
    return saved ? JSON.parse(saved) : [];
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  // ✅ Efecto para manejar parámetros de URL - SOLO UNA VEZ
  useEffect(() => {
    const handleUrlParams = async () => {
      // Evitar múltiples ejecuciones
      if (hasProcessedUrlParams.current) {
        return;
      }

      // Si hay un templateId en la URL y estamos autenticados
      if (templateIdFromUrl && isAuthenticated) {
        hasProcessedUrlParams.current = true;
        setIsLoadingTemplate(true);

        console.log('📝 Cargando template desde URL:', templateIdFromUrl);

        if (previewMode) {
          setIsPreviewMode(true);
        }

        const templateData = await loadTemplateForEdit(templateIdFromUrl);
        if (templateData) {
          setSelectedTemplateForEdit(templateData);
          setViewMode('editor');
        }
        setIsLoadingTemplate(false);

        // Limpiar URL después de procesar
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      // Si hay vista "my-templates" en la URL
      else if (viewFromUrl === 'my-templates') {
        hasProcessedUrlParams.current = true;
        console.log('📁 Mostrando vista de mis plantillas');
        setViewMode('myTemplates');
        // Limpiar URL después de procesar
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      // Si no hay template guardado, mostrar galería
      else if (!loadingTemplates && !userTemplate && viewMode === 'ownTemplate') {
        setViewMode('gallery');
      }
    };

    handleUrlParams();
  }, [templateIdFromUrl, previewMode, viewFromUrl, isAuthenticated, loadingTemplates, userTemplate, viewMode, loadTemplateForEdit]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleLogin = () => window.location.href = '/login';

  const handleToggleFavorite = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(templateId)
      ? favorites.filter(id => id !== templateId)
      : [...favorites, templateId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTemplates', JSON.stringify(newFavorites));
  };

  const handleSelectTemplateFromGallery = (templateId: string) => {
    console.log('📝 Seleccionando plantilla de galería:', templateId);

    const defaultColors = templateDefaultColors[templateId as keyof typeof templateDefaultColors] || templateDefaultColors.consulting;

    const newTemplate = {
      id: `temp-${Date.now()}`,
      name: `Mi template de ${templateId}`,
      type: templateId,
      colors: defaultColors,
      texts: {},
      images: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    };

    setSelectedTemplateForEdit(newTemplate);
    setViewMode('editor');
  };

  const handleBackToOwn = () => {
    reloadUserTemplates();
    setViewMode('ownTemplate');
    setIsPreviewMode(false);
  };

  const handleEditTemplate = async (templateId: string) => {
    console.log('📝 Editando template con ID:', templateId);
    const templateData = await loadTemplateForEdit(templateId);
    if (templateData) {
      setSelectedTemplateForEdit(templateData);
      setViewMode('editor');
    }
  };

  const handleBackToMyTemplates = () => setViewMode('myTemplates');
  const handleExploreGallery = () => setViewMode('gallery');

  // Mostrar loading
  if (isLoading || loadingTemplates || isLoadingTemplate || (tokenFromUrl && !isAuthenticated)) {
    return <LoadingScreen message={isLoadingTemplate ? "Cargando template..." : getLoadingMessage()} />;
  }

  if (!isAuthenticated) return null;

  // Si no hay template guardado y estamos en ownTemplate, mostrar galería
  if (!userTemplate && viewMode === 'ownTemplate') {
    return (
      <GalleryLayout
        templates={templatesInfo}
        categories={categories}
        onSelectTemplate={handleSelectTemplateFromGallery}
        onBackToOwn={handleBackToOwn}
        onBackToMyTemplates={handleBackToMyTemplates}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  // Modo editor
  if (viewMode === 'editor' && selectedTemplateForEdit) {
    const TemplateComponent = (() => {
      switch (selectedTemplateForEdit.type) {
        case 'consulting': return ConsultingLanding;
        case 'catering': return CateringLanding;
        case 'accounting': return AccountingLanding;
        case 'restaurant': return RestaurantLanding;
        case 'lawFirm': return LawFirmLanding;
        case 'medical': return MedicalClinicLanding;
        case 'architecture': return ArchitectureLanding;
        case 'marketingAgency': return MarketingAgencyLanding;
        case 'coffeeShop': return CoffeeShopLanding;
        case 'bakery': return BakeryLanding;
        case 'foodTruck': return FoodTruckLanding;
        case 'beautySalon': return BeautySalonLanding;
        case 'gym': return GymLanding;
        case 'realEstate': return RealEstateLanding;
        case 'fashion': return FashionStoreLanding;
        case 'cleaning': return CleaningServiceLanding;
        case 'saas': return SaaSlanding;
        case 'digitalAgency': return DigitalAgencyLanding;
        case 'startup': return StartupLanding;
        default: return ConsultingLanding;
      }
    })();

    return (
      <EditorLayout
        templateData={selectedTemplateForEdit}
        onClose={handleBackToOwn}
        isPreview={isPreviewMode}
      >
        <Suspense fallback={<LoadingScreen message={isPreviewMode ? "Cargando previsualización..." : "Cargando template..."} />}>
          <TemplateComponent onHomeClick={handleBackToOwn} />
        </Suspense>
      </EditorLayout>
    );
  }

  // Modo mis plantillas
  if (viewMode === 'myTemplates') {
    return (
      <MyTemplatesLayout
        templates={userTemplatesList}
        onEditTemplate={handleEditTemplate}
        onBackToOwn={handleBackToOwn}
        onExploreGallery={handleExploreGallery}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  // Modo galería
  if (viewMode === 'gallery') {
    return (
      <GalleryLayout
        templates={templatesInfo}
        categories={categories}
        onSelectTemplate={handleSelectTemplateFromGallery}
        onBackToOwn={handleBackToOwn}
        onBackToMyTemplates={handleBackToMyTemplates}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  // Modo plantilla principal
  if (userTemplate) {
    return (
      <OwnTemplateLayout
        userTemplate={userTemplate}
        onEdit={() => userTemplate && handleEditTemplate(userTemplate.id)}
        onViewMyTemplates={handleBackToMyTemplates}
        onExploreGallery={handleExploreGallery}
        onLogout={handleLogout}
        onLogin={handleLogin}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  }

  // Fallback: mostrar galería
  return (
    <GalleryLayout
      templates={templatesInfo}
      categories={categories}
      onSelectTemplate={handleSelectTemplateFromGallery}
      onBackToOwn={handleBackToOwn}
      onBackToMyTemplates={handleBackToMyTemplates}
      onLogout={handleLogout}
      onLogin={handleLogin}
      user={user}
      isAuthenticated={isAuthenticated}
      favorites={favorites}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <ThemeProvider> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    {/* </ThemeProvider> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
me gustaria analices como funciona el dashboard de modificacion de template. quiero hacer unos cambios de ui ux en el dashboard de modficiacion de mi tempate. Por el momento no generes codigo solo analiza como funciona el codigo y el flujo. Si necesitas que te pase mas info me la pedis no des nada por sentado si no lo contrarestas con informacion o archivos. Hay varios cambios que hacer y mejoras. tomate el tiempo para analizar todo antes de sugerirme cambios.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Que es lo que se mejoro?

01) Se saco el EditorPanel que no se utilizaba
02) Se saco el themeprovider para dark/light mode
03) Se saco los providers desde cada template ahora renderizand desde EditorLayout pasandole los providers
04) Se comento el editor fijo de la derecha que se renderizaba en cada template

Como seguimos?

Ahora me gustaria me propongas mejoras en el ux/ui de mi EditorDashboard , como primera peticion me gustaria antes que tocar muchas cosas ir paso a paso asi no nos 
perdemos ni confundimos con los cambios que hay que realizar que son muchos.


01) Me gustaria poder dejar el EditorDashboard fijo y que la pagina se adapte al tamaño que le resta con el sidebar fijo.

sidebar | header        |
        |-------------- |
        | pagina        |
        |               |
        |               |
        |               |
        |----------------
        | footer        |

La sidebar siempre fija y desplazar el template hacia el costado para que a medida que vaya editando el usuario pueda ver reflejado los cambios y modificaelos todo el tiempo
sin tener que agrandar o achicar la barra lateral.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Que es lo que se mejoro?

1. ConsultingLanding.tsx – estructura flex con sidebar y contenido.

2. EditorDashboard.tsx – sidebar fija, redimensionable, sin colapso.

Como seguimos?

1. Ahora nos vamos a centrar mas en la ux/ui del Sidebar. Uno de los principales cambios quiero que sea que una vez que llegamos al final de nuestra sidebar es decir donde se ve sopoerte, si seguimos haciendo scroll hacia abajo la sidebar no baja mas ( es decir no queda en blanco ). 

2. Los expnasores deben aparecer primeramente colapsables con un icono de Informacion y un tooltip donde le diga al usuario que es lo que significa cada expnasor.

3. Me gustaria tambien poder dividir la pagina en varias secciones, dentro de esas secciones se tiene que poder modificar:
    *  Barra  Superiro de Navegacion/Header
    *  Seccion Principal/Heroe
    *  Seccion de tarjetas
    *  Seccion personalizada + Imagen
    * Iconos 
    * Clientes 
    * Contacto 
    * Formularios
    * Footer
    * Redes Sociales
    * Enlaces
    * Tamaño de texto por secciones
    * Fondos 
    * Colores 
    * Hovers
    * Mas elemento

    El usuario tiene que poder personalizar lo maximo posible su pagina web. 
    Me gustaria cambiar como se ven  y seleccionan los colores ahora ya que creo que son demasiado grandes los input y teto de los colores, deberia ser mas delicado y profesional.

4. Sugerime cambios generales para mi sidebar que mejoren la experiencia de usaurio y sea muy intuitivo todo como, sin tener que utilizar lenguaje pura y exclusivamente
   tecnico.


Segun lo sugerio vamos a proseguir punto a punto, iteracion a iteracion con los siguientes puntos: (en orden)


01. Ajustar el scroll infinito (punto 1) – es rápido y soluciona un problema molesto.

    -Se realizo el paso 1 exitosamente modificando el ancho maximo del contenedor del editordashboard-
    El sidebar ahora permanece fijo en su posición (no scrollea con la página), mientras que el contenido del template (incluyendo el footer) se desplaza normalmente. Esto es correcto para editar cómodamente: puedes modificar el footer y ver los cambios sin perder de vista el sidebar.

02. Implementar los expansores colapsables (punto 2) – reestructurar el contenido actual de EditorDashboard en secciones.

 Para la implementacion del punto 2 se sufiere una serie de cambios en los siguientes archivos: 

        <!-- //* src/components/Editor/EditorDashboard.tsx – Principal modificado. */ -->
        <!-- * src/components/Editor/VisualEditorPanel.tsx – Ya no se usará (opcional: eliminarlo o mantenerlo como respaldo). */ -->
        <!-- * Crear src/components/Editor/SectionAccordion.tsx (nuevo). */ -->

       a) Se pone como backup VisualEditorPanel

03. Rediseñar los selectores de color (punto 3) – hacerlos compactos y reutilizables.
    * Nuevo componente CompactColorInput: ocupa una sola línea, incluye círculo de color, campo hexadecimal, botón copiar y reset (con valor por defecto).
    * Reemplazo en EditorDashboard: todos los ColorInput antiguos fueron sustituidos por CompactColorInput, con sus respectivos defaultValue obtenidos de defaultSectionColors.
    * Presets: siguen funcionando igual (aplican combinaciones predefinidas). Si deseas mejorar su alcance, podemos hacerlo en el Paso 4.
        
04. Añadir las nuevas secciones de personalización (punto 4) – ampliar tipos y crear los controles correspondientes.

    * Ampliar SectionColors y defaultSectionColors con las nuevas propiedades.
    * Crear los expansores en EditorDashboard (usando SectionAccordion y CompactColorInput).
    * Modificar los componentes del template (ConsultingFooter, ConsultingFeatures, ConsultingHero, etc.) para que lean las nuevas propiedades en lugar de valores fijos.
    * Probar que al cambiar colores/hovers en el sidebar, el template se actualice correctamente.

05. Incorporar mejoras generales (punto 5) – elegir las más valiosas (ej. búsqueda, guardado automático).

-------------------------------------------------------------------

Se solicito cambios en el EditoDahboard.

Resumen de lo solicitado:

Reorganización completa con nueva sección Header


01) Header / Navegación (nuevo, con controles para fondo, colores, textos de los enlaces, sus destinos y el botón CTA)

02) Hero (Sección principal) (existente, con sus botones)

03) Contenido principal (agrupa Features, About, Testimonios, Contacto – ya existentes)

04) Footer (existente)

05) Redes Sociales (existente)

06) Opciones globales (Tipografía, Bordes y sombras, Enlaces globales, Fondos, Hovers, Iconos)

 Header los siguientes controles:

Fondo del header (color)

Color del texto (color)

Color de los enlaces (color)

Color de enlaces al pasar el mouse (color)

Lista de enlaces de navegación (cada uno con texto editable y selector de enlace)

Botón CTA del header (texto, enlace, colores de fondo, texto y hover)


