// src/data/templateImages.ts
import { ACCOUNTING_IMAGES } from './accounting-texts';
import { AGENCY_IMAGES } from './agency-texts';
import { ARCHITECTURE_IMAGES } from './architecture-texts';
import { BAKERY_IMAGES } from './bakery-texts';
import { CATERING_IMAGES } from './catering-texts';
import { CLEANING_IMAGES } from './cleaning-texts';
import { COFFEE_SHOP_IMAGES } from './coffeeShop-texts';
import { CONSULTING_IMAGES } from './consulting-texts';
import { DIGITAL_AGENCY_IMAGES } from './digitalAgency-texts';
import { FASHION_IMAGES } from './fashion-texts';
import { FOOD_TRUCK_IMAGES } from './foodTruck-texts';
import { GYM_IMAGES } from './gym-texts';
import { LAW_FIRM_IMAGES } from './lawFirm-texts';
import { MEDICAL_IMAGES } from './medical-texts';
import { REAL_ESTATE_IMAGES } from './realEstate-texts';
import { RESTAURANT_IMAGES } from './restaurant-texts';
import { SAAS_IMAGES } from './saas-texts';
import { SALON_IMAGES } from './salon-texts';
import { STARTUP_IMAGES } from './startup-texts';

// Placeholder base
const PLACEHOLDER = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800';

// Función mejorada para extraer URLs de imágenes
const extractImageUrls = (images: any[], templateName: string) => {
    // Buscar hero - más flexible
    let hero = images.find(img =>
        img.id?.toLowerCase().includes('hero') ||
        img.id?.toLowerCase().includes('main') ||
        img.id?.toLowerCase().includes('banner')
    )?.defaultImage;

    console.log(templateName);

    // Si no encuentra hero, usar la primera imagen disponible
    if (!hero && images.length > 0) {
        hero = images[0]?.defaultImage;
    }

    // Si todavía no hay hero, usar placeholder
    if (!hero) {
        hero = PLACEHOLDER;
    }

    // Buscar previews - más flexible
    let previews = images
        .filter(img =>
            img.id?.toLowerCase().includes('gallery') ||
            img.id?.toLowerCase().includes('about') ||
            img.id?.toLowerCase().includes('chef') ||
            img.id?.toLowerCase().includes('team') ||
            img.id?.toLowerCase().includes('hero')
        )
        .slice(0, 3)
        .map(img => img.defaultImage);

    // Si no hay suficientes previews, usar hero repetido
    if (previews.length < 3 && hero) {
        while (previews.length < 3) {
            previews.push(hero);
        }
    }

    // Si todavía no hay previews, usar placeholder
    if (previews.length === 0) {
        previews = [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER];
    }

    return {
        hero,
        previews
    };
};

export const templateImages = {
    consulting: extractImageUrls(CONSULTING_IMAGES, 'consulting'),
    catering: extractImageUrls(CATERING_IMAGES, 'catering'),
    accounting: extractImageUrls(ACCOUNTING_IMAGES, 'accounting'),
    restaurant: extractImageUrls(RESTAURANT_IMAGES, 'restaurant'),
    lawFirm: extractImageUrls(LAW_FIRM_IMAGES, 'lawFirm'),
    medical: extractImageUrls(MEDICAL_IMAGES, 'medical'),
    architecture: extractImageUrls(ARCHITECTURE_IMAGES, 'architecture'),
    marketingAgency: extractImageUrls(AGENCY_IMAGES, 'marketingAgency'),
    coffeeShop: extractImageUrls(COFFEE_SHOP_IMAGES, 'coffeeShop'),
    bakery: extractImageUrls(BAKERY_IMAGES, 'bakery'),
    foodTruck: extractImageUrls(FOOD_TRUCK_IMAGES, 'foodTruck'),
    beautySalon: extractImageUrls(SALON_IMAGES, 'beautySalon'),
    gym: extractImageUrls(GYM_IMAGES, 'gym'),
    realEstate: extractImageUrls(REAL_ESTATE_IMAGES, 'realEstate'),
    fashion: extractImageUrls(FASHION_IMAGES, 'fashion'),
    cleaning: extractImageUrls(CLEANING_IMAGES, 'cleaning'),
    saas: extractImageUrls(SAAS_IMAGES, 'saas'),
    digitalAgency: extractImageUrls(DIGITAL_AGENCY_IMAGES, 'digitalAgency'),
    startup: extractImageUrls(STARTUP_IMAGES, 'startup')
};

export type TemplateId = keyof typeof templateImages;