import { Heart, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const BakeryProducts: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#9f1239',
    };
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Todos', nameId: 'bk_cat_all' },
        { id: 'bread', name: 'Panes', nameId: 'bk_cat_bread' },
        { id: 'pastries', name: 'Facturas', nameId: 'bk_cat_pastries' },
        { id: 'cakes', name: 'Tortas', nameId: 'bk_cat_cakes' },
        { id: 'cookies', name: 'Galletitas', nameId: 'bk_cat_cookies' },
    ];

    const products = [
        { id: 'prod_1', category: 'bread', nameId: 'bk_prod_1_name', nameDefault: 'Pan de campo', descId: 'bk_prod_1_desc', descDefault: 'Pan rústico de masa madre, corteza crujiente y miga esponjosa.', priceId: 'bk_prod_1_price', priceDefault: '$650', rating: 4.9, imageId: 'bk_prod_1_image' },
        { id: 'prod_2', category: 'bread', nameId: 'bk_prod_2_name', nameDefault: 'Baguette', descId: 'bk_prod_2_desc', descDefault: 'Pan francés tradicional, ideal para sandwiches.', priceId: 'bk_prod_2_price', priceDefault: '$450', rating: 4.8, imageId: 'bk_prod_2_image' },
        { id: 'prod_3', category: 'bread', nameId: 'bk_prod_3_name', nameDefault: 'Pan de molde integral', descId: 'bk_prod_3_desc', descDefault: 'Pan de molde con harina integral y semillas.', priceId: 'bk_prod_3_price', priceDefault: '$550', rating: 4.7, imageId: 'bk_prod_3_image' },
        { id: 'prod_4', category: 'pastries', nameId: 'bk_prod_4_name', nameDefault: 'Medialunas de manteca', descId: 'bk_prod_4_desc', descDefault: 'Clásicas medialunas, suaves y hojaldradas.', priceId: 'bk_prod_4_price', priceDefault: '$120 (c/u)', rating: 5.0, imageId: 'bk_prod_4_image' },
        { id: 'prod_5', category: 'pastries', nameId: 'bk_prod_5_name', nameDefault: 'Sacramentos', descId: 'bk_prod_5_desc', descDefault: 'Facturas rellenas de dulce de leche y crema pastelera.', priceId: 'bk_prod_5_price', priceDefault: '$180 (c/u)', rating: 4.9, imageId: 'bk_prod_5_image' },
        { id: 'prod_6', category: 'pastries', nameId: 'bk_prod_6_name', nameDefault: 'Vigilantes', descId: 'bk_prod_6_desc', descDefault: 'Facturas con membrillo y crema pastelera.', priceId: 'bk_prod_6_price', priceDefault: '$150 (c/u)', rating: 4.8, imageId: 'bk_prod_6_image' },
        { id: 'prod_7', category: 'cakes', nameId: 'bk_prod_7_name', nameDefault: 'Torta Rogel', descId: 'bk_prod_7_desc', descDefault: 'Clásica torta de capas con dulce de leche y merengue.', priceId: 'bk_prod_7_price', priceDefault: '$3500', rating: 5.0, imageId: 'bk_prod_7_image' },
        { id: 'prod_8', category: 'cakes', nameId: 'bk_prod_8_name', nameDefault: 'Cheesecake', descId: 'bk_prod_8_desc', descDefault: 'Torta de queso con salsa de frutos rojos.', priceId: 'bk_prod_8_price', priceDefault: '$2800', rating: 4.9, imageId: 'bk_prod_8_image' },
        { id: 'prod_9', category: 'cakes', nameId: 'bk_prod_9_name', nameDefault: 'Torta de chocolate', descId: 'bk_prod_9_desc', descDefault: 'Torta húmeda de chocolate con cobertura ganache.', priceId: 'bk_prod_9_price', priceDefault: '$3000', rating: 5.0, imageId: 'bk_prod_9_image' },
        { id: 'prod_10', category: 'cookies', nameId: 'bk_prod_10_name', nameDefault: 'Alfajores de maicena', descId: 'bk_prod_10_desc', descDefault: 'Alfajores suaves con dulce de leche y coco rallado.', priceId: 'bk_prod_10_price', priceDefault: '$250 (c/u)', rating: 4.9, imageId: 'bk_prod_10_image' },
        { id: 'prod_11', category: 'cookies', nameId: 'bk_prod_11_name', nameDefault: 'Cookies con chips', descId: 'bk_prod_11_desc', descDefault: 'Galletitas con chips de chocolate y nueces.', priceId: 'bk_prod_11_price', priceDefault: '$300 (x6)', rating: 4.8, imageId: 'bk_prod_11_image' },
        { id: 'prod_12', category: 'cookies', nameId: 'bk_prod_12_name', nameDefault: 'Pastafrola', descId: 'bk_prod_12_desc', descDefault: 'Tarta de membrillo con masa crocante.', priceId: 'bk_prod_12_price', priceDefault: '$800', rating: 4.7, imageId: 'bk_prod_12_image' },
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <section id="products" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-rose-900 dark:text-rose-100">
                        <EditableText elementId="bk_products_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="bk_products_title_2" defaultText="productos" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-rose-700 dark:text-rose-300">
                        <EditableText elementId="bk_products_description" defaultText="Toda nuestra variedad de panes, facturas, tortas y galletitas hechas con recetas tradicionales." tag="span" />
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.id
                                    ? 'text-white'
                                    : 'bg-rose-100 dark:bg-rose-800/50 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-700'
                                }`}
                            style={selectedCategory === cat.id ? { background: colors.primary } : {}}
                        >
                            <EditableText elementId={cat.nameId} defaultText={cat.name} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Grid de productos */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group bg-rose-50 dark:bg-rose-900/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                            <div className="relative h-48 overflow-hidden">
                                <EditableImage elementId={product.imageId} defaultImage="" alt={product.nameDefault} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" category="bakery" />
                                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                                    <Heart className="w-4 h-4 text-rose-500" />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-rose-900 dark:text-rose-100 mb-1">
                                    <EditableText elementId={product.nameId} defaultText={product.nameDefault} tag="span" />
                                </h3>
                                <p className="text-sm text-rose-600 dark:text-rose-400 mb-2">
                                    <EditableText elementId={product.descId} defaultText={product.descDefault} tag="span" />
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-transparent bg-clip-text"
                                        style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText elementId={product.priceId} defaultText={product.priceDefault} tag="span" />
                                    </span>
                                    <button className="p-2 bg-rose-100 dark:bg-rose-700 rounded-full hover:bg-rose-200 dark:hover:bg-rose-600 transition-colors">
                                        <ShoppingCart className="w-4 h-4" style={{ color: colors.primary }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BakeryProducts;