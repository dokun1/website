// LinksComponent.tsx

interface Props {
  slide_url?: string;
  video_url?: string;
  location_url?: string;
  size?: "sm" | "lg";
  className?: string;
}

export default function LinksComponent({
  slide_url,
  video_url,
  location_url,
  size = "sm",
  className = "",
}: Props) {
  // Check if all props are null/undefined
  if (!slide_url && !video_url && !location_url) {
    return null; // Render nothing
  }

  // Build an array of links based on provided URLs
  const links = [];

  if (slide_url) {
    links.push({ url: slide_url, label: "Slides" });
  }
  if (video_url) {
    links.push({ url: video_url, label: "Video" });
  }
  if (location_url) {
    links.push({ url: location_url, label: "Location" });
  }

  // Helper function to intersperse elements with a separator
  function intersperse(arr: React.ReactNode[], sep: React.ReactNode) {
    return arr.flatMap((item, index) => (index > 0 ? [sep, item] : [item]));
  }

  return (
    <div
      className={`flex items-center space-x-2 opacity-80 ${className}`.trim()}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M8 6.75C5.10051 6.75 2.75 9.10051 2.75 12C2.75 14.8995 5.10051 17.25 8 17.25H9C9.41421 17.25 9.75 17.5858 9.75 18C9.75 18.4142 9.41421 18.75 9 18.75H8C4.27208 18.75 1.25 15.7279 1.25 12C1.25 8.27208 4.27208 5.25 8 5.25H9C9.41421 5.25 9.75 5.58579 9.75 6C9.75 6.41421 9.41421 6.75 9 6.75H8Z"
          ></path>{" "}
          <path
            d="M8.24991 11.9999C8.24991 11.5857 8.58569 11.2499 8.99991 11.2499H14.9999C15.4141 11.2499 15.7499 11.5857 15.7499 11.9999C15.7499 12.4142 15.4141 12.7499 14.9999 12.7499H8.99991C8.58569 12.7499 8.24991 12.4142 8.24991 11.9999Z"
          ></path>{" "}
          <path
            d="M15 5.25C14.5858 5.25 14.25 5.58579 14.25 6C14.25 6.41421 14.5858 6.75 15 6.75H16C18.8995 6.75 21.25 9.10051 21.25 12C21.25 14.8995 18.8995 17.25 16 17.25H15C14.5858 17.25 14.25 17.5858 14.25 18C14.25 18.4142 14.5858 18.75 15 18.75H16C19.7279 18.75 22.75 15.7279 22.75 12C22.75 8.27208 19.7279 5.25 16 5.25H15Z"
          ></path>{" "}
        </g>
      </svg>
      {/* Links */}
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        {intersperse(
          links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          )),
          " - "
        )}
      </span>
    </div>
  );
}
