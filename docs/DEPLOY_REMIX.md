# Деплой tinyBig через Remix (Base Mainnet)

Пошаговая инструкция для новичка. Контракты уже лежат в папке `contracts/remix/` — их можно загрузить в Remix одним ZIP или по файлам.

---

## Что вы деплоите

| # | Контракт | Зачем |
|---|----------|--------|
| 1 | **Hub** | GM, Boost, Deploy, рефералы, очки |
| 2 | **BadgeNFT** | 24 NFT-бейджа (привязан к адресу Hub) |

**SimpleToken.sol** — не деплоится отдельно. Он создаётся автоматически внутри Hub при каждом deploy токена.

---

## Что подготовить заранее

1. **Кошелёк MetaMask** (или Rabby / Coinbase Wallet).
2. **ETH на Base Mainnet** — на газ (обычно хватает **~0.002–0.01 ETH**, лучше иметь **0.02 ETH** с запасом).
   - Купить/перевести ETH на сеть **Base** (chain id **8453**).
   - Проверка: в MetaMask сеть называется **Base**, не Ethereum mainnet.
3. **Второй адрес для rank-бейджей** (рекомендуется):
   - Создайте **второй кошелёк** (новый аккаунт в MetaMask) — это будет **Rank Signer**.
   - Его **приватный ключ** потом понадобится на Vercel как `BADGE_RANK_SIGNER_PRIVATE_KEY` (только сервер, не в Remix).
   - На деплой в Remix нужен только **публичный адрес** (0x…).
   - *Можно временно указать свой основной адрес, но для продакшена лучше отдельный ключ.*

Запишите на бумаге:

- [ ] Адрес основного кошелька (deployer)
- [ ] Адрес Rank Signer (0x…)
- [ ] Сколько ETH на Base

---

## Часть 1 — Remix и файлы

### 1. Откройте Remix

Перейдите: [https://remix.ethereum.org](https://remix.ethereum.org)

### 2. Создайте папку проекта

В левой панели **File Explorer**:

1. Нажмите иконку **Create new folder** → имя: `tinybig`
2. Откройте папку `tinybig`

### 3. Загрузите контракты

С компьютера откройте папку проекта:

`EIGHT/contracts/remix/`

Загрузите **все 3 файла** в Remix (перетащите в `tinybig`):

- `Hub.sol`
- `BadgeNFT.sol`
- `SimpleToken.sol`

> Важно: все три файла в **одной папке**, иначе `import "./SimpleToken.sol"` не сработает.

### 4. Настройте компилятор

Вкладка **Solidity Compiler** (иконка с буквой S):

| Параметр | Значение |
|----------|----------|
| Compiler | **0.8.24** (или 0.8.24+commit…) |
| EVM Version | **default** или **paris** |
| Enable optimization | **Выключить** (если при деплое был OFF — иначе bytecode не совпадёт при верификации) |
| Runs | 200 (только если optimization включён) |

Нажмите **Compile Hub.sol** (или Compile all). Должно быть зелёное **✓** без ошибок.

---

## Часть 2 — Подключить Base и кошелёк

### 5. MetaMask → сеть Base

Если сети Base нет:

1. [https://chainlist.org](https://chainlist.org) → найдите **Base** → Connect wallet → Add to MetaMask.
2. Или вручную: RPC `https://mainnet.base.org`, Chain ID **8453**, symbol **ETH**.

Переключите MetaMask на **Base**.

### 6. Remix → Deploy

Вкладка **Deploy & Run Transactions** (иконка Ethereum):

| Поле | Значение |
|------|----------|
| Environment | **Injected Provider - MetaMask** (или WalletConnect) |
| Account | Ваш адрес с ETH на Base |
| Gas limit | Auto |

MetaMask попросит подключить сайт — **Connect** → выберите аккаунт deployer.

---

## Часть 3 — Деплой Hub (первый контракт)

### 7. Выберите контракт Hub

В списке **Contract** выберите:

`Hub - Hub.sol`

### 8. Deploy

- Поле **Deploy** — параметров **нет** (конструктор пустой).
- Нажмите оранжевую кнопку **Deploy**.
- MetaMask → **Confirm** транзакцию.
- Дождитесь статуса в Remix (зелёная галочка).

### 9. Сохраните адрес Hub

Внизу в **Deployed Contracts** появится `HUB AT 0x…`.

1. Нажмите иконку **копировать** рядом с адресом.
2. Вставьте в блокнот:

```
HUB=0x........................................
```

Этот адрес понадобится для BadgeNFT и для сайта.

### 10. (Опционально) Сменить treasury

По умолчанию `treasury` = ваш deployer-адрес. Если хотите другой кошелёк для комиссий (0.0001 ETH с GM/deploy/boost):

1. Раскройте деплойнутый **Hub** в Remix.
2. Функция **setTreasury** → вставьте адрес кошелька → **transact** → Confirm.

---

## Часть 4 — Деплой BadgeNFT (второй контракт)

### 11. Выберите BadgeNFT

В списке **Contract**:

`BadgeNFT - BadgeNFT.sol`

### 12. Параметры конструктора

Появятся **два поля** (порядок важен):

| # | Имя | Что вставить |
|---|-----|----------------|
| 1 | `hubAddress` | Адрес **Hub** из шага 9 (`0x…`) |
| 2 | `rankSignerAddress` | Публичный адрес **Rank Signer** (0x…) |

Пример (подставьте свои):

```
hubAddress:        0xYOUR_HUB_ADDRESS
rankSignerAddress: 0xYOUR_RANK_SIGNER_ADDRESS
```

### 13. Deploy BadgeNFT

- Нажмите **Deploy** (оранжевая кнопка).
- Confirm в MetaMask.
- Скопируйте адрес:

```
BADGE_NFT=0x........................................
```

---

## Часть 5 — Проверка на Basescan

### 14. Откройте контракты в эксплорере

- Hub: `https://basescan.org/address/ВАШ_HUB`
- Badge: `https://basescan.org/address/ВАШ_BADGE_NFT`

Убедитесь, что транзакции **Success** и контракт — **Contract** (есть bytecode).

### 15. Быстрый smoke-test (в Remix)

На деплойнутом **Hub** (read / write):

1. **gm** — transact, value **0** (первый GM бесплатный).
2. **boost** — transact, value **0** (первый boost бесплатный).
3. **points** — read, ваш адрес → должно быть **> 0**.

Если revert — проверьте сеть Base и баланс ETH.

---

## Часть 6 — Подключить адреса к сайту

После деплоя фронтенд не узнает адреса сам. Нужно вписать их в проект.

### 16. Файлы в репозитории

Откройте в редакторе:

**`src/config/contract.ts`**

```ts
export const HUB_CONTRACT_ADDRESS: `0x${string}` =
  "0xВАШ_HUB_ADDRESS";
```

**`src/config/badgeContract.ts`**

```ts
export const BADGE_NFT_ADDRESS: `0x${string}` =
  "0xВАШ_BADGE_NFT_ADDRESS";
```

**`src/lib/signRankBadge.ts`**

```ts
export const RANK_SIGNER_ADDRESS =
  "0xВАШ_RANK_SIGNER_ADDRESS" as const;
```

(тот же адрес, что в конструкторе BadgeNFT)

### 17. Deploy block (для лидерборда)

На Basescan откройте **первую** транзакцию создания Hub → номер блока **Block**.

В `contract.ts`:

```ts
export const HUB_DEPLOY_FROM_BLOCK = 12345678n; // ваш block
```

### 18. Пересоберите и задеплойте сайт

```bash
npm run build
```

Залейте на Vercel / хостинг. В переменных окружения Vercel:

- `BADGE_RANK_SIGNER_PRIVATE_KEY` — приватный ключ **Rank Signer** (0x + 64 hex)
- `BASE_RPC_URL` — Alchemy/Infura URL для Base (для лидерборда)
- `NEXT_PUBLIC_SITE_URL` — URL продакшен-сайта

### 19. Проверка в приложении

1. Откройте сайт, подключите кошелёк на **Base**.
2. Не должно быть «Hub not configured».
3. Пройдите: GM → Boost → Referral (activate code).

---

## Шпаргалка: порядок деплоя

```
1. MetaMask → Base Mainnet + ETH
2. Remix → загрузить Hub.sol, BadgeNFT.sol, SimpleToken.sol
3. Compile 0.8.24, optimizer ON
4. Deploy Hub (без аргументов)
5. Deploy BadgeNFT(hub, rankSigner)
6. Записать адреса → contract.ts, badgeContract.ts, signRankBadge.ts
7. HUB_DEPLOY_FROM_BLOCK → npm run build → Vercel
```

---

## Частые ошибки

| Проблема | Решение |
|----------|---------|
| «Hub not configured» на сайте | Адрес в `contract.ts` всё ещё `0x000…000` или не задеплоен фронт |
| MetaMask wrong network | Переключить на **Base** (8453) |
| Insufficient funds | Пополнить ETH на Base |
| BadgeNFT deploy revert | Неверный `hubAddress` или нулевой `rankSigner` |
| Rank badge не минтится | На Vercel нет `BADGE_RANK_SIGNER_PRIVATE_KEY` или адрес не совпадает с `RANK_SIGNER_ADDRESS` |
| Import SimpleToken not found | Все 3 `.sol` в одной папке Remix |

---

## Актуальные константы Hub (для справки)

| Действие | Очки / fee |
|----------|------------|
| Free GM | +10 (3/день) |
| Paid GM | +20, 0.0001 ETH |
| Boost | 2× GM & deploy, 1h, 1 free/день |
| Free deploy | +20 (1/день) |
| Paid deploy | +40, 0.0001 ETH |
| Referral redeem | **+200** обоим |

---

## Безопасность

- **Никому** не отправляйте seed phrase / private key.
- В Remix используйте только **Injected Provider** (свой MetaMask), не вставляйте ключ в Remix.
- Приватный ключ Rank Signer — только Vercel / `.env.local`, не в git.

---

Если после деплоя пришлёте адреса Hub и BadgeNFT (без ключей), можно проверить, что всё совпадает с конфигом фронтенда.
