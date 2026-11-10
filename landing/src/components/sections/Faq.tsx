import { Plus } from 'lucide-react';
import { FAQ } from '../../data/catalog';

export function Faq() {
  return (
    <section id="preguntas" className="section faq" aria-labelledby="preguntas-title">
      <div className="wrap faq-grid">
        <div className="section-head">
          <h2 id="preguntas-title">Preguntas frecuentes</h2>
          <p className="lede">Si tu duda no está aquí, escríbenos por WhatsApp.</p>
        </div>
        <div className="faq-list">
          {FAQ.map((item) => (
            <details key={item.id} className="faq-item">
              <summary>
                {item.question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
