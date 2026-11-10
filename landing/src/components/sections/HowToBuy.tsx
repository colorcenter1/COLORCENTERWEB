const STEPS = [
  {
    title: 'Consulta por WhatsApp',
    text: 'Escríbenos qué necesitas: categoría, producto, color o la foto de la pieza.',
  },
  {
    title: 'Confirma precio y disponibilidad',
    text: 'Un asesor te responde con las opciones, el precio y si el producto está disponible.',
  },
  {
    title: 'Recoge en la sede',
    text: 'Pasa por Cl. 21 #17-96, Valledupar, cuando te confirmemos que tu pedido está listo.',
  },
];

export function HowToBuy() {
  return (
    <section id="como-comprar" className="section how" aria-labelledby="como-comprar-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="como-comprar-title">Cómo comprar</h2>
          <p className="lede">Tres pasos, sin pagos en la página.</p>
        </div>
        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
