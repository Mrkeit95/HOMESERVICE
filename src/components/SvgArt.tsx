// Renders a raw SVG string (from makeScene/makeAvatar) into the DOM.
// The generators emit trusted, self-authored markup — no user input — so
// dangerouslySetInnerHTML is safe here.
export default function SvgArt({
  svg,
  className,
  style,
}: {
  svg: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
