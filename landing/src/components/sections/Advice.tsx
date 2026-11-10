import { Camera, ClipboardList, Droplets, Hash, MessageCircle } from 'lucide-react';
import { generalInquiry, whatsappUrl } from '../../lib/whatsapp';

const WHAT_TO_SHARE = [
  {
    icon: ClipboardList,
    title: 'Qué vas a hacer',
    text: 'Un retoque, una pieza o un trabajo más amplio. Así sabemos qué insumos sugerirte.',
  },
  {
    icon: Hash,
    title: 'El color de tu vehículo',
    text: 'El nombre del tono o el código de color si lo tienes a mano.',
  },
  {
    icon: Camera,
    title: 'Una foto de la pieza',
    text: 'Ayuda a entender el tono, el acabado y el estado de la superficie.',
  },
  {
    icon: Droplets,
    title: 'Qué productos ya tienes',
    text: 'Para no repetir compras y completar solo lo que falta.',
  },
];

export function Advice() {
  return (
    <section id="asesoria" className="section advice" aria-labelledby="asesoria-title">
      <div className="wrap advice-grid">
        <div className="section-head">
          <h2 id="asesoria-title">Te ayudamos a elegir los insumos</h2>
          <p className="lede">
            No hace falta saber el nombre técnico de cada producto. Cuéntanos tu trabajo y te orientamos sobre las
            opciones que tenemos. La aplicación depende de ti o de tu pintor de confianza.
          </p>
          <div>
            <a
              className="btn btn-light"
              href={whatsappUrl(generalInquiry())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Pedir asesoría por WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h3 className="sr-only">Qué compartir al consultar</h3>
          <ul className="advice-list">
            {WHAT_TO_SHARE.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
