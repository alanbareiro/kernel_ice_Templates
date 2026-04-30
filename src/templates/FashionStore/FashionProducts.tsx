// src/templates/FashionStore/FashionProducts.tsx
import { Heart, ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const FashionProducts: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Todos', nameId: 'fa_cat_all' },
        { id: 'dresses', name: 'Vestidos', nameId: 'fa_cat_dresses' },
        { id: 'tops', name: 'Remeras', nameId: 'fa_cat_tops' },
        { id: 'pants', name: 'Pantalones', nameId: 'fa_cat_pants' },
        { id: 'jackets', name: 'Camperas', nameId: 'fa_cat_jackets' },
    ];

    const products = [
        { id: 'prod_1', category: 'dresses', nameId: 'fa_prod_1_name', nameDefault: 'Vestido Negro', priceId: 'fa_prod_1_price', priceDefault: '$12.500', imageId: 'fa_prod_1_image' },
        { id: 'prod_2', category: 'dresses', nameId: 'fa_prod_2_name', nameDefault: 'Vestido Estampado', priceId: 'fa_prod_2_price', priceDefault: '$14.800', imageId: 'fa_prod_2_image' },
        { id: 'prod_3', category: 'tops', nameId: 'fa_prod_3_name', nameDefault: 'Remera Básica', priceId: 'fa_prod_3_price', priceDefault: '$4.500', imageId: 'fa_prod_3_image' },
        { id: 'prod_4', category: 'tops', nameId: 'fa_prod_4_name', nameDefault: 'Blusa Seda', priceId: 'fa_prod_4_price', priceDefault: '$8.900', imageId: 'fa_prod_4_image' },
        { id: 'prod_5', category: 'pants', nameId: 'fa_prod_5_name', nameDefault: 'Pantalón de Vestir', priceId: 'fa_prod_5_price', priceDefault: '$9.500', imageId: 'fa_prod_5_image' },
        { id: 'prod_6', category: 'pants', nameId: 'fa_prod_6_name', nameDefault: 'Jeans', priceId: 'fa_prod_6_price', priceDefault: '$7.500', imageId: 'fa_prod_6_image' },
        { id: 'prod_7', category: 'jackets', nameId: 'fa_prod_7_name', nameDefault: 'Campera de Cuero', priceId: 'fa_prod_7_price', priceDefault: '$22.000', imageId: 'fa_prod_7_image' },
        { id: 'prod_8', category: 'jackets', nameId: 'fa_prod_8_name', nameDefault: 'Saco de Lana', priceId: 'fa_prod_8_price', priceDefault: '$18.500', imageId: 'fa_prod_8_image' },
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <section
            id="products"
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
                        <EditableText elementId="fa_products_title_1" defaultText="Productos" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="fa_products_title_2" defaultText="destacados" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.id ? 'text-white' : ''
                                }`}
                            style={
                                selectedCategory === cat.id
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((prod) => (
                        <div key={prod.id} className="group">
                            <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl" style={{ backgroundColor: sectionColors.featuresCardBackground }}>
                                <EditableImage elementId={prod.imageId} defaultImage="" alt={prod.nameDefault} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" category="fashion" />
                                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                                    <Heart className="w-4 h-4" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                </button>
                                <button className="absolute bottom-3 left-3 right-3 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                                    <ShoppingBag className="w-4 h-4 inline mr-2" />
                                    Agregar al carrito
                                </button>
                            </div>
                            <h3 className="font-medium" style={{ color: sectionColors.featuresTitleColor }}>
                                <EditableText elementId={prod.nameId} defaultText={prod.nameDefault} tag="span" />
                            </h3>
                            <p className="text-lg font-bold mt-1" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                <EditableText elementId={prod.priceId} defaultText={prod.priceDefault} tag="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FashionProducts;