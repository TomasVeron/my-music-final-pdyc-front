const PlayIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <svg 
      viewBox="0 0 24 24"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131"
          stroke={fill}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

export default PlayIcon;
