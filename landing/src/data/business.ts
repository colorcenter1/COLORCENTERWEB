/**
 * Datos del negocio usados en la página.
 *
 * Estado de cada dato (ver wiki/empresa.md):
 * - name, address, mapsUrl, geo: confirmados con la ficha de Google Maps compartida por el propietario.
 * - whatsappNumber: procede del prototipo; pendiente de confirmación del propietario.
 * - Horario y teléfono fijo: no se publican porque no están confirmados.
 */
export const BUSINESS = {
  name: 'Color Center',
  category: 'Pinturas e insumos automotrices',
  streetAddress: 'Cl. 21 #17-96',
  locality: 'Valledupar',
  region: 'Cesar',
  countryCode: 'CO',
  mapsUrl: 'https://maps.app.goo.gl/p52X8eboDhx3h83GA',
  /** Mapa insertado de Google Maps (sin clave de API), centrado en la ficha del negocio. */
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Color+Center,+Cl.+21+%2317-96,+Valledupar,+Cesar&ll=10.4639894,-73.2492527&z=17&hl=es&output=embed',
  geo: { latitude: 10.4639894, longitude: -73.2492527 },
  whatsappNumber: '573004426477',
  whatsappDisplay: '+57 300 442 6477',
} as const;

export const FULL_ADDRESS = `${BUSINESS.streetAddress}, ${BUSINESS.locality}, ${BUSINESS.region}`;

export const NAV_LINKS = [
  { href: '#productos', label: 'Productos' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#como-comprar', label: 'Cómo comprar' },
  { href: '#ubicacion', label: 'Ubicación' },
] as const;
