// Location.tsx
import { LOCALE } from "@config";

interface Props {
  geo: string;
  location: string;
  size?: "sm" | "lg";
  className?: string;
}

export default function LocationComponent({
  geo,
  location,
  size = "sm",
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center space-x-2 opacity-80 ${className}`.trim()}
    >
      <svg
        fill="#000000"
        height="200px"
        width="200px"
        version="1.1"
        id="XMLID_171_"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-4 -4 32 32"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <path d="M12,24C5.4,24,0,18.6,0,12S5.4,0,12,0s12,5.4,12,12S18.6,24,12,24z M2.2,10C2.1,10.6,2,11.3,2,12c0,5.5,4.5,10,10,10 c0.2,0,0.3,0,0.5,0c-0.3-0.5-0.5-1.2-0.5-2.1c0-0.7-0.3-0.9-1-1.3C9.7,18,8.4,17,9.4,14.2c0-0.1-0.4-0.2-0.6-0.3 c-1.1-0.3-1.4-1.2-1.5-1.8c-0.1-0.4-0.2-0.9-0.6-1.2C6,10.2,3.7,9.9,2.2,10z M9.3,12c0.3,0.1,1.3,0.4,1.8,1.3 c0.3,0.5,0.3,1,0.1,1.6c-0.5,1.4-0.3,1.5,0.6,1.9c0.8,0.4,2.2,1.1,2.2,3.1c0,0.5,0.1,1,0.4,1.3c0.2,0.2,0.3,0.3,0.5,0.3 c0.4,0,0.4-0.5,0.4-0.7c0-1.6,0.8-2.8,1.4-3.8c0.4-0.7,0.8-1.3,0.8-1.8c0-0.7-0.4-1-1.4-1.4c-0.3-0.1-0.6-0.3-0.9-0.4 c-0.3-0.2-0.6-0.4-0.9-0.6c-0.6-0.5-1-0.8-2.3-0.8h-0.4l-0.3-0.3c-0.6-0.5-2.3-2-1.2-4.2c0.3-0.6,0.8-1,1.2-1.3 c0.7-0.5,1.1-0.8,1.1-2.1c0-1.1-1-2.1-1.5-2.1C7.3,2.4,4.2,4.7,2.8,7.9c1.5,0,4.1,0.2,5.3,1.6c0.7,0.7,0.9,1.5,1,2.1 C9.2,11.8,9.3,11.9,9.3,12z M12.4,10c1.6,0.1,2.4,0.6,3.1,1.1c0.2,0.2,0.4,0.3,0.7,0.4c0.2,0.1,0.4,0.2,0.7,0.3 c1,0.5,2.6,1.2,2.6,3.3c0,1.2-0.6,2.1-1.1,2.9c-0.5,0.8-1,1.5-1,2.4c2.7-1.7,4.6-4.8,4.6-8.4c0-4.9-3.5-8.9-8.1-9.8 c0.3,0.6,0.5,1.3,0.5,2c0,2.3-1.2,3.2-2,3.7c-0.3,0.2-0.5,0.4-0.6,0.5C11.7,8.8,11.6,9.2,12.4,10z"></path>{" "}
          </g>{" "}
        </g>
      </svg>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        {location} - {geo}
      </span>
    </div>
  );
}
