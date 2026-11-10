interface BrandMarkProps {
  href?: string;
}

/** Logo del negocio (archivo existente del proyecto) con nombre y descriptor. */
export function BrandMark({ href = '#inicio' }: BrandMarkProps) {
  return (
    <a className="brand" href={href} aria-label="Color Center, ir al inicio">
      <img src="/brand/logo-color-center.png" width={150} height={150} alt="" />
      <span className="brand-name">
        <strong>Color Center</strong>
        <span>Pinturas e insumos automotrices</span>
      </span>
    </a>
  );
}
