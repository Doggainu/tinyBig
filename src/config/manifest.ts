import {
  APP_NAME,
  FARCASTER_DESCRIPTION,
  FARCASTER_SUBTITLE,
} from "@/config/app";
import {
  CANONICAL_SITE_URL,
  getAppHeroUrl,
  getAppIconUrl,
  getAppImageUrl,
  getAppSplashUrl,
} from "@/config/appAssets";

/** Domain verified at https://tiny-big.vercel.app/.well-known/farcaster.json */
export const FARCASTER_ACCOUNT_ASSOCIATION: {
  header: string;
  payload: string;
  signature: string;
} = {
  header:
    "eyJmaWQiOjc3NzY4MywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEFiNGVlNzQ2Q0U1MGIwMzdGQWYwNWQ0MzE1YWZEMTM5ZTlFQmVCNDQifQ",
  payload: "eyJkb21haW4iOiJ0aW55LWJpZy52ZXJjZWwuYXBwIn0",
  signature:
    "cndOfBAWhpqZsDPp0Jf7aHjp9hzfSclXKmg01fyrr/dAUVyC0nkzqTGqJQvhk5pu618z4s66JSx/Vj7gjZ20tRw=",
};

export const FARCASTER_BUTTON_TITLE = "Open app";
export const FARCASTER_SPLASH_BACKGROUND_COLOR = "#0a0f08";

function buildMiniappMetadata(origin: string) {
  return {
    version: "1",
    name: APP_NAME,
    homeUrl: origin,
    iconUrl: getAppIconUrl(origin),
    imageUrl: getAppImageUrl(origin),
    heroImageUrl: getAppHeroUrl(origin),
    buttonTitle: FARCASTER_BUTTON_TITLE,
    splashImageUrl: getAppSplashUrl(origin),
    splashBackgroundColor: FARCASTER_SPLASH_BACKGROUND_COLOR,
    webhookUrl: `${origin}/api/webhook`,
    description: FARCASTER_DESCRIPTION,
    subtitle: FARCASTER_SUBTITLE,
    primaryCategory: "social",
    tags: ["base", "miniapp"],
    noindex: false,
  } as const;
}

export function buildFarcasterManifest() {
  const origin = CANONICAL_SITE_URL.replace(/\/$/, "");
  const metadata = buildMiniappMetadata(origin);

  return {
    accountAssociation: FARCASTER_ACCOUNT_ASSOCIATION,
    miniapp: metadata,
    frame: {
      version: metadata.version,
      name: metadata.name,
      iconUrl: metadata.iconUrl,
      homeUrl: metadata.homeUrl,
      imageUrl: metadata.imageUrl,
      buttonTitle: metadata.buttonTitle,
      splashImageUrl: metadata.splashImageUrl,
      splashBackgroundColor: metadata.splashBackgroundColor,
      webhookUrl: metadata.webhookUrl,
    },
  };
}
