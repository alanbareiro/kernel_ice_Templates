// src/templates/Restaurant/RestaurantContact.tsx
import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const RestaurantContact = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    return (
        <section
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
                            elementId="r_contact_title_1"
                            defaultText="Encontranos en"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="r_contact_title_2"
                                defaultText="Palermo"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="r_contact_description"
                            defaultText="En el corazón del barrio más gastronómico de Buenos Aires."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Mapa / Ubicación */}
                    <div className="space-y-6">
                        <div
                            className="aspect-video rounded-2xl overflow-hidden"
                            style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20` }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889515!2d-58.43075908477037!3d-34.58811418046233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59c771eb933%3A0x6b3113b796d2e99a!2sPalermo%2C%20CABA!5e0!3m2!1ses!2sar!4v1641234567890!5m2!1ses!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}>
                                <h4 className="font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText
                                        elementId="r_address_title"
                                        defaultText="Dirección"
                                        tag="span"
                                    />
                                </h4>
                                <p style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_address"
                                        defaultText="Av. Palermo 1234"
                                        tag="span"
                                    />
                                </p>
                                <p className="text-sm" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText
                                        elementId="r_address_city"
                                        defaultText="CABA, Argentina"
                                        tag="span"
                                    />
                                </p>
                            </div>
                            <div className="p-4 rounded-xl" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}>
                                <h4 className="font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText
                                        elementId="r_parking_title"
                                        defaultText="Estacionamiento"
                                        tag="span"
                                    />
                                </h4>
                                <p style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_parking"
                                        defaultText="Playón propio"
                                        tag="span"
                                    />
                                </p>
                                <p className="text-sm" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText
                                        elementId="r_parking_detail"
                                        defaultText="y valet parking"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}>
                                <Phone className="w-8 h-8 mb-4" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <h3 className="text-lg font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText
                                        elementId="r_contact_phone_title"
                                        defaultText="Teléfono"
                                        tag="span"
                                    />
                                </h3>
                                <p style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_contact_phone"
                                        defaultText="+54 9 11 6745-7413"
                                        tag="span"
                                    />
                                </p>
                                <p className="text-sm mt-2" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText
                                        elementId="r_contact_phone_hours"
                                        defaultText="Lun-Dom 12:00 a 00:00"
                                        tag="span"
                                    />
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}>
                                <Mail className="w-8 h-8 mb-4" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <h3 className="text-lg font-bold mb-2" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText
                                        elementId="r_contact_email_title"
                                        defaultText="Email"
                                        tag="span"
                                    />
                                </h3>
                                <p style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText
                                        elementId="r_contact_email"
                                        defaultText="contacto@kernelizeresto.com"
                                        tag="span"
                                    />
                                </p>
                                <p className="text-sm mt-2" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText
                                        elementId="r_contact_email_response"
                                        defaultText="Respuesta en 24hs"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>

                        <div
                            className="p-8 rounded-2xl text-white"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <h3 className="text-2xl font-bold mb-4">
                                <EditableText
                                    elementId="r_contact_hours_title"
                                    defaultText="Horarios"
                                    tag="span"
                                />
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>
                                        <EditableText
                                            elementId="r_contact_tue_thu"
                                            defaultText="Martes a Jueves"
                                            tag="span"
                                        />
                                    </span>
                                    <span className="font-semibold">
                                        <EditableText
                                            elementId="r_contact_tue_thu_hours"
                                            defaultText="12:00 - 00:00"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>
                                        <EditableText
                                            elementId="r_contact_fri_sat"
                                            defaultText="Viernes y Sábados"
                                            tag="span"
                                        />
                                    </span>
                                    <span className="font-semibold">
                                        <EditableText
                                            elementId="r_contact_fri_sat_hours"
                                            defaultText="12:00 - 01:00"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>
                                        <EditableText
                                            elementId="r_contact_sun"
                                            defaultText="Domingos"
                                            tag="span"
                                        />
                                    </span>
                                    <span className="font-semibold">
                                        <EditableText
                                            elementId="r_contact_sun_hours"
                                            defaultText="12:00 - 23:00"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <div className="pt-4 mt-4 border-t border-white/20">
                                    <p className="text-sm text-red-200">
                                        <EditableText
                                            elementId="r_contact_closed"
                                            defaultText="* Lunes cerrado por mantenimiento"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}>
                            <h3 className="text-lg font-bold mb-4" style={{ color: sectionColors.featuresTitleColor }}>Seguinos</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}>
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}>
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}>
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RestaurantContact;