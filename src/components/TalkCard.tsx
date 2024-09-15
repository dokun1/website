import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import Date from "./Date";
import Links from "./Links";
import Location from "./Location"
import type { CollectionEntry } from "astro:content";

export interface Props {
  frontmatter: CollectionEntry<"talks">["data"];
}

export default function TalkCard({ frontmatter }: Props) {
  const headerProps = {
    style: { viewTransitionName: slugifyStr(frontmatter.title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <p>{frontmatter.title}</p>
      <Date date={frontmatter.date}/> 
      <Location geo={frontmatter.geo} location={frontmatter.location}/>
      <p>Abstract: {frontmatter.abstract}</p>
      <Links 
        slide_url={frontmatter.slide_url}
        video_url={frontmatter.video_url}
        location_url={frontmatter.location_url}
      />
    </li>
  );
}
