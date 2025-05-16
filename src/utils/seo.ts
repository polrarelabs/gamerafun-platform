import { DOMAIN } from "constant/index";

const SEO_IMAGE = `${DOMAIN}/images/cover-seo.jpg`;

const TITLE = {
  template: "%s | Gamera",
  default: "Gamera",
};

export const GENERAL_CONFIG = {
  title: TITLE,
  description:
    "Noctra is a leading DeFAI platform on Aptos, empowering web3 users and creators with AI-driven market analysis, automated trading, and content generation. Unlock seamless financial intelligence with AI agents optimized for DeFi.",
};

export const OPEN_GRAPH_CONFIG = {
  title: TITLE,
  description: GENERAL_CONFIG.description,
  images: [SEO_IMAGE],
  emails: ["contact@noctra.ai"],
  type: "website",
  siteName: "Noctra AI",
};

export const TWITTER_CONFIG = {
  title: TITLE,
  description: GENERAL_CONFIG.description,
  card: "summary_large_image",
  images: [SEO_IMAGE],
  site: "@Noctra_AI",
  creator: "@Noctra_AI",
};

export const generateMetadata = (title: string, canonical: string) => {
  return {
    title,
    alternates: {
      canonical,
    },
    openGraph: {
      ...OPEN_GRAPH_CONFIG,
      url: `${DOMAIN}${canonical}`,
      title,
    },
    twitter: {
      ...TWITTER_CONFIG,
      title,
    },
  };
};

export const KEYWORDS_CONFIG = ["nextjs", "webapp", "noctra"];
