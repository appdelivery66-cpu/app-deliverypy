/**
 * CONFIGURACIÓN RÁPIDA DE MARCA (BRANDING)
 * Cambie los valores a continuación para cada nuevo cliente.
 */

export const BRANDING = {
    // Identidad Visual
    name: "Duo Burger", // Nombre del Restaurante
    whatsapp: "5511999999999", // Número de WhatsApp (solo números)
    logo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80", // URL del Logo
    address: "Calle Ejemplo, 123 - Centro", // Dirección física
    pixKey: "su-email@pix.com", // Clave PIX del cliente (o método de pago digital)
    deliveryFee: 5.0, // Tarifa de entrega estándar

    // Colores (Hexadecimal)
    // CONSEJO: Cambie en src/app/globals.css para reflejar en todo el sitio
    colors: {
        primary: "#E63946", // Color principal (Botones, íconos)
        secondary: "#FFB703", // Color secundario
    },

    // Redes Sociales y Mapas
    googleMapsUrl: "https://goo.gl/maps/exemplo",
    instagramUrl: "https://instagram.com/pizzaria_exemplo",

    // Horarios de Funcionamiento (Formato 24h)
    openingHours: {
        monday: { open: "18:00", close: "23:00", closed: false },
        tuesday: { open: "18:00", close: "23:00", closed: false },
        wednesday: { open: "18:00", close: "23:00", closed: false },
        thursday: { open: "18:00", close: "23:00", closed: false },
        friday: { open: "18:00", close: "23:59", closed: false },
        saturday: { open: "18:00", close: "23:59", closed: false },
        sunday: { open: "18:00", close: "23:00", closed: false },
    }
};
