// import { CLEANING_IMAGES } from './fashion-texts';
// src/data/templateImages.ts
import { ACCOUNTING_IMAGES } from './accounting-texts';
import { AGENCY_IMAGES } from './agency-texts';
import { ARCHITECTURE_IMAGES } from './architecture-texts';
import { BAKERY_IMAGES } from './bakery-texts';
import { CATERING_IMAGES } from './catering-texts';
import { CLEANING_IMAGES } from './cleaning-texts';
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


// Función para extraer URLs de imágenes de cada template
const extractImageUrls = (images: any[]) => {
    const hero = images.find(img => img.id.includes('hero') || img.id.includes('main'))?.defaultImage || '';
    const previews = images
        .filter(img => img.id.includes('gallery') || img.id.includes('about') || img.id.includes('chef'))
        .slice(0, 3)
        .map(img => img.defaultImage);

    return {
        hero,
        previews: previews.length ? previews : [hero, hero, hero] // Si no hay suficientes, repetir hero
    };
};

export const templateImages = {
    consulting: extractImageUrls(CONSULTING_IMAGES),
    catering: extractImageUrls(CATERING_IMAGES),
    accounting: extractImageUrls(ACCOUNTING_IMAGES),
    restaurant: extractImageUrls(RESTAURANT_IMAGES),
    lawFirm: extractImageUrls(LAW_FIRM_IMAGES),
    medical: extractImageUrls(MEDICAL_IMAGES),
    architecture: extractImageUrls(ARCHITECTURE_IMAGES),
    marketingAgency: extractImageUrls(AGENCY_IMAGES),
    coffeeShop: extractImageUrls(CATERING_IMAGES), // Usamos imágenes de catering como placeholder
    bakery: extractImageUrls(BAKERY_IMAGES),
    foodTruck: extractImageUrls(FOOD_TRUCK_IMAGES),
    beautySalon: extractImageUrls(SALON_IMAGES),
    gym: extractImageUrls(GYM_IMAGES),
    realEstate: extractImageUrls(REAL_ESTATE_IMAGES),
    fashion: extractImageUrls(FASHION_IMAGES),
    cleaning: extractImageUrls(CLEANING_IMAGES),
    saas: extractImageUrls(SAAS_IMAGES),
    digitalAgency: extractImageUrls(DIGITAL_AGENCY_IMAGES),
    startup: extractImageUrls(STARTUP_IMAGES)
};

export type TemplateId = keyof typeof templateImages;