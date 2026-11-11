import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

const AUTOPLAY_MS = 20_000;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Carrusel accesible: avanza un testimonio cada 20 s, se pausa al pasar el cursor
 * o al enfocar con teclado, tiene botón de pausa (WCAG 2.2.2) y no avanza solo si
 * el visitante prefiere movimiento reducido.
 */
export function Testimonials() {
  const total = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    setIsReduced(prefersReducedMotion());
  }, []);

  const isAutoplaying = !isPaused && !isHovered && !isReduced;

  useEffect(() => {
    if (!isAutoplaying) return undefined;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [isAutoplaying, index, total]);

  const goTo = (next: number) => setIndex(((next % total) + total) % total);

  return (
    <section id="testimonios" className="section testimonials" aria-labelledby="testimonios-title">
      <div className="wrap testimonials-grid">
        <div className="section-head">
          <h2 id="testimonios-title">Lo que dicen nuestros clientes</h2>
          <p className="lede">Experiencias de quienes compran sus pinturas e insumos en Color Center.</p>
        </div>

        <div
          className="carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Testimonios de clientes"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsHovered(false);
          }}
        >
          <div className="carousel-viewport" aria-live={isAutoplaying ? 'off' : 'polite'}>
            <ul className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {TESTIMONIALS.map((item, i) => (
                <li
                  key={item.id}
                  className="carousel-slide"
                  role="group"
                  aria-roledescription="testimonio"
                  aria-label={`${i + 1} de ${total}`}
                  aria-hidden={i !== index}
                >
                  <figure>
                    <Quote className="quote-mark" size={36} aria-hidden="true" />
                    <blockquote>
                      <p>{item.quote}</p>
                    </blockquote>
                    <figcaption>
                      <strong>{item.name}</strong>
                      <span>{item.detail}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              aria-label={isPaused ? 'Reanudar el carrusel' : 'Pausar el carrusel'}
              onClick={() => setIsPaused((paused) => !paused)}
            >
              {isPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
            </button>
            <div className="carousel-dots">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className="carousel-dot"
                  aria-label={`Ver testimonio ${i + 1} de ${total}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className="carousel-arrows">
              <button type="button" className="carousel-btn" aria-label="Testimonio anterior" onClick={() => goTo(index - 1)}>
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button type="button" className="carousel-btn" aria-label="Testimonio siguiente" onClick={() => goTo(index + 1)}>
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
