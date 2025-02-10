export function ContactBook({
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
      viewBox="0 0 95 94"
      fill = {color}
    >
      <path
        d="M90.25 0H19C16.4804 0 14.0641 0.990354 12.2825 2.7532C10.5009 4.51604 9.5 6.90696 9.5 9.4V23.5H0V32.9H9.5V42.3H0V51.7H9.5V61.1H0V70.5H9.5V84.6C9.5 87.093 10.5009 89.484 12.2825 91.2468C14.0641 93.0096 16.4804 94 19 94H90.25C91.5098 94 92.718 93.5048 93.6088 92.6234C94.4996 91.742 95 90.5465 95 89.3V4.7C95 3.45348 94.4996 2.25802 93.6088 1.3766C92.718 0.495177 91.5098 0 90.25 0ZM52.25 14.0953C60.078 14.0953 66.5 20.445 66.5 28.1953C66.4862 31.9311 64.9806 35.5101 62.3114 38.1521C59.6421 40.7942 56.0255 42.2851 52.25 42.3C44.4268 42.3 38 35.9409 38 28.1953C38 20.445 44.4268 14.0953 52.25 14.0953ZM80.75 75.2H23.75V71.675C23.75 61.2457 36.5988 50.525 52.25 50.525C67.9013 50.525 80.75 61.2457 80.75 71.675V75.2Z"
        fill={color}
        fill-opacity="0.44"
      />
    </svg>
  );
}
