// Date.tsx
import { LOCALE } from "@config";

interface Props {
  date: string | Date;
  size?: "sm" | "lg";
  className?: string;
}

export default function DateComponent({
  date,
  size = "sm",
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center space-x-2 opacity-80 ${className}`.trim()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-0.897 2-2V6c0-1.103-0.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 0.897-2 2v14c0 1.103 0.897 2 2 2zM19 8l0.001 12H5V8h14z"></path>
      </svg>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDate date={date} />
      </span>
    </div>
  );
}

const FormattedDate = ({ date }: { date: string | Date }) => {
  const myDate = new Date(date);

  const formattedDate = myDate.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <time dateTime={myDate.toISOString()}>{formattedDate}</time>;
};