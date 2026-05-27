# tinyBig

Base mini app: GM, token deploy, referral points, and milestone badge NFTs.

GitHub: [Doggainu/tinyBig](https://github.com/Doggainu/tinyBig)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- **/** — GM + Deploy
- **/referral** — Referral link and points
- **/badges** — Mint milestone badge NFTs
- **/leaderboard** — Points ranking

## Contracts

```bash
npm run compile
npm run test:contracts
npm run deploy:sepolia   # Base Sepolia first
npm run deploy:base      # Base mainnet
```

After deploy, addresses sync into `src/config/contract.ts` and `src/config/badgeContract.ts`.

## Before production

1. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` / Vercel
2. Register Base mini app → `BASE_APP_ID` in `src/config/app.ts`
3. Farcaster domain verification → `FARCASTER_ACCOUNT_ASSOCIATION` in `src/config/manifest.ts`
4. Replace icons in `public/` (current files are placeholders from template)
