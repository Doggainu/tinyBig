# Контракты для Remix

Скопируйте **все три файла** в одну папку в [Remix](https://remix.ethereum.org):

- `Hub.sol`
- `BadgeNFT.sol`
- `SimpleToken.sol`

Полная инструкция для новичка: **[docs/DEPLOY_REMIX.md](../../docs/DEPLOY_REMIX.md)**

## Порядок деплоя на Base

1. **Hub** — Deploy, без параметров  
2. **BadgeNFT** — Deploy с аргументами:
   - `_hubAddress` — адрес Hub
   - `_rankSignerAddress` — адрес кошелька для подписи rank-бейджей (0x…, не private key)

## Компилятор

- Solidity **0.8.24**
- Optimization: **ON**, runs **200**

Файлы синхронизированы с `contracts/src/`. При изменении исходников обновите копии здесь:

```bash
cp contracts/src/*.sol contracts/remix/
```
