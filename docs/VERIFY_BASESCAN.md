# Верификация контрактов на Basescan

Деплой был через **Remix без optimizer** — для совпадения bytecode в `foundry.toml` стоит `optimizer = false`.

| Контракт | Адрес |
|----------|--------|
| Hub | `0x9Bf7f86889CfddEb13440b938f092D2F224Aa803` |
| BadgeNFT | `0xAC8FAb96243AF9B4953B3f3B07555964C656383c` |

---

## Способ A — Foundry (рекомендуется)

### 1. API-ключ Etherscan V2

Один ключ для всех сетей (включая Base):

1. [etherscan.io/myapikey](https://etherscan.io/myapikey) → Create API Key  
2. В терминале:

```bash
export ETHERSCAN_API_KEY=ваш_ключ
```

### 2. Запуск

```bash
cd /Users/kimba/Desktop/EIGHT
bash scripts/verify-base.sh
```

Скрипт верифицирует Hub и BadgeNFT с параметрами конструктора BadgeNFT.

### 3. Проверка

- [Hub на Basescan](https://basescan.org/address/0x9Bf7f86889CfddEb13440b938f092D2F224Aa803#code)
- [BadgeNFT на Basescan](https://basescan.org/address/0xAC8FAb96243AF9B4953B3f3B07555964C656383c#code)

Должна появиться зелёная галочка **Contract Source Code Verified**.

---

## Способ B — Basescan вручную (flattened)

Если Foundry выдаёт ошибку — верифицируйте через сайт.

### Hub

1. [basescan.org/verifyContract](https://basescan.org/verifyContract)
2. Address: `0x9Bf7f86889CfddEb13440b938f092D2F224Aa803`
3. Compiler: **Solidity (Single file)**
4. Version: **v0.8.24+commit.e11b9ed9** (или ближайший 0.8.24 в списке)
5. License: **MIT**
6. Optimization: **No**
7. Contract name: **Hub**
8. Вставьте содержимое файла `contracts/remix/Hub.flattened.sol`
9. Constructor arguments: **пусто**

### BadgeNFT

1. Address: `0xAC8FAb96243AF9B4953B3f3B07555964C656383c`
2. Те же настройки компилятора (0.8.24, **Optimization: No**)
3. Contract name: **BadgeNFT**
4. Source: `contracts/remix/BadgeNFT.sol` (один файл, без import)
5. **Constructor Arguments ABI-encoded** — вставьте hex (без `0x` на Basescan, если просит только hex):

```
0000000000000000000000009bf7f86889cfdddeb13440b938f092d2f224aa803000000000000000000000000b7338bfba0654271b69e06c5cc972c1f956a8db
```

Получить в терминале:

```bash
cast abi-encode "constructor(address,address)" \
  0x9Bf7f86889CfddEb13440b938f092D2F224Aa803 \
  0xb7338bFb3A0654271B69e06C5CC972C1F956A8dB
```

---

## Способ C — Standard JSON из Remix

Если деплоили из Remix и файлы не менялись:

1. Remix → **Solidity Compiler** → скомпилируйте Hub / BadgeNFT
2. Иконка **i** (Compilation Details) → **Download Standard JSON Input**
3. [basescan.org/verifyContract](https://basescan.org/verifyContract) → **Solidity (Standard JSON Input)**
4. Загрузите JSON + адрес контракта

Для BadgeNFT укажите constructor args (см. hex выше).

---

## Частые ошибки

| Ошибка | Решение |
|--------|---------|
| `Bytecode does not match` | Optimization = **No**, compiler **0.8.24** |
| Invalid API key | Ключ с **etherscan.io** (V2), не старый basescan-only |
| BadgeNFT revert on verify | Проверьте constructor args (hub + rankSigner) |
