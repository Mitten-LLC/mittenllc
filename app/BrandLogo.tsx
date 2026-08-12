export function BrandLogo({ reversed = false }: { reversed?: boolean }) {
  return (
    <img
      className="mitten-logo"
      src={`/brand/mitten-logo-kit/web/mitten-wordmark-${reversed ? "reversed" : "primary"}.svg`}
      alt="Mitten"
      width="170"
      height="44"
    />
  );
}
