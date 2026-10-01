type PlaceholderImageProps = {
  label: string;
  aspect?: string;
  className?: string;
};

export default function PlaceholderImage({ label, aspect = '16 / 10', className }: PlaceholderImageProps) {
  return (
    <div
      className={`placeholder-image${className ? ` ${className}` : ''}`}
      style={{ aspectRatio: aspect }}
      aria-hidden="true"
    >
      <span>{label}</span>
    </div>
  );
}
