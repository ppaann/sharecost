// --- Custom SVG Icon for Badminton ---
const BadmintonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M14.5 18.5L6 10l4.5-4.5 8.5 8.5-4.5 4.5z' />
    <path d='M12 5l-5 5' />
    <path d='M15 8l7 7' />
    <path d='M8 13l-1.5 1.5' />
    <path d='M14 19l-4-4' />
  </svg>
);
export default BadmintonIcon;
