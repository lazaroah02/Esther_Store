export function MinusIcon({
  width = 24,
  height = 24,
  color = "#fff",
  className = "",
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path d="M5 11h14v2H5z"></path>
    </svg>
  );
}
