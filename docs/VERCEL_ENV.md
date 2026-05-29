# Vercel Environment Variables — tinyBig

Add these in **Vercel → Project tiny-big → Settings → Environment Variables**.

Enable for: **Production**, **Preview**, and **Development** (or at least Production).

---

## Обязательные (без них что-то сломается)

| Name | Value | Зачем |
|------|--------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://tiny-big.vercel.app` | Манифест Farcaster, share-ссылки, OG, Base App |
| `BADGE_RANK_SIGNER_PRIVATE_KEY` | `0x` + 64 hex символа | Подпись rank-бейджей (топ-3). **Секрет!** Ключ кошелька `0xb7338bFb3A0654271B69e06C5CC972C1F956A8dB` (тот же, что в конструкторе BadgeNFT) |

---

## Сильно рекомендуется

| Name | Value | Зачем |
|------|--------|--------|
| `BASE_RPC_URL` | Alchemy или Infura URL для Base mainnet | Лидерборд и API `/api/leaderboard` без таймаутов публичного RPC |

Пример:
```
https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
```

---

## Опционально (уже есть в коде, можно не дублировать)

| Name | Value | Зачем |
|------|--------|--------|
| `NEXT_PUBLIC_BASE_BUILDER_CODE` | `bc_x2hvfh8r` | Уже в `src/config/app.ts` — дублировать только если хотите менять без деплоя |
| `HUB_DEPLOY_FROM_BLOCK` | `46607705` | Уже в `contract.ts` — ускоряет индекс лидерборда |

---

## Не нужны на Vercel для работы сайта

| Name | Когда нужен |
|------|-------------|
| `PRIVATE_KEY` | Только локальный deploy контрактов (`forge script`) |
| `ETHERSCAN_API_KEY` | Только `npm run verify:base` с машины |
| `BASE_SEPOLIA_RPC_URL` | Только тестнет |

---

## Что уже в коде (env не нужен)

- Hub / BadgeNFT адреса
- `BASE_APP_ID` = `6a18c4a9239048331aa5244b`
- `BASE_BUILDER_CODE` = `bc_x2hvfh8r`
- Farcaster `accountAssociation`
- Talent `talentapp:project_verification`

---

## После добавления

1. **Redeploy** (Deployments → … → Redeploy)
2. Проверки:
   - https://tiny-big.vercel.app — GM / Deploy
   - https://tiny-big.vercel.app/leaderboard — список очков
   - https://tiny-big.vercel.app/badges — rank badge для топ-3 (нужен `BADGE_RANK_SIGNER_PRIVATE_KEY`)
   - Share on X — ссылка `https://tiny-big.vercel.app/referral?code=...`
   - View source — meta `base:app_id`, `talentapp:project_verification`

---

## BADGE_RANK_SIGNER_PRIVATE_KEY — как получить

Это **приватный ключ** отдельного кошелька Rank Signer (не deployer).

- Создавали 2-й аккаунт в MetaMask при деплое BadgeNFT → Export Private Key
- Формат: `0x` + 64 hex (66 символов всего)
- **Никому не показывайте**, не коммитьте в git

Если ключ потерян — нужен новый rank signer и `setRankSigner` на контракте BadgeNFT (owner).
