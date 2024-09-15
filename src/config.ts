import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://david.okun.io", // replace this with your deployed domain
  author: "David Okun",
  profile: "https://github.com/dokun1/",
  desc: "My personal website and portfolio",
  title: "meus dev situs",
  ogImage: "pennyog.jpg",
  lightAndDarkMode: true,
  postPerIndex: 3,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/dokun1",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/dokun1",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/david-okun/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "StackOverflow",
    href: "https://stackoverflow.com/users/1604167/dokun1",
    linkTitle: `${SITE.title} on StackOverflow`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:david@okun.io",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitch",
    href: "https://twitch.com/dokun24",
    linkTitle: `${SITE.title} on Twitch`,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@davidokun7585",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/17132403860",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: true,
  },
  {
    name: "CodePen",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
