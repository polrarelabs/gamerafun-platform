import { DOMAIN } from "@constant";
import { HOME_PATH } from "@constant/paths";

const DATA = [
  {
    url: HOME_PATH,
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default function sitemap() {
  return DATA.map((item) => ({ ...item, url: `${DOMAIN}${item.url}` }));
}
