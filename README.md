# ReactRepos

Поиск публичных репозиториев через GitHub Search API. Интерфейс переведён на **React 19, TypeScript, Vite и pnpm**. Дизайн сохранил исходную красную тему, но результаты доступны и на устройствах без hover.

## Требования

- Node.js >= 22.12
- pnpm 12 (рекомендуется Corepack)

```bash
corepack enable
corepack prepare pnpm@12.14.0 --activate
pnpm install
pnpm dev
```

После запуска откройте адрес, выведенный Vite (обычно http://localhost:5173).

## Команды

| Команда | Описание |
| --- | --- |
| `pnpm dev` | Сервер разработки / React Fast Refresh |
| `pnpm typecheck` | Строгая проверка TypeScript |
| `pnpm lint` | ESLint |
| `pnpm format:check` | Проверка форматирования Prettier |
| `pnpm test` | Unit и компонентные тесты Vitest |
| `pnpm build` | Проверка TS + production Vite build в `dist/` |
| `pnpm preview` | Локальный просмотр production-сборки |
| `pnpm deploy` | GitHub Pages в ветку `gh-pages` |

## Deploy на GitHub Pages

В репозитории `Coreytaz/Search-repos-react` соберите с префиксом репозитория:

```bash
GITHUB_PAGES=true pnpm deploy
```

`vite.config.ts` использует `base: '/Search-repos-react/'` при `GITHUB_PAGES=true` и `base: '/'` при обычном запуске. Для Windows PowerShell:

```powershell
$env:GITHUB_PAGES = 'true'; pnpm deploy; Remove-Item Env:GITHUB_PAGES
```

## Архитектура

- `src/services/github.ts` — GitHub API, обработка ошибок и проверка ответов;
- `src/hooks/useRepositorySearch.ts` — управление запросами, отмена и защита от гонок;
- `src/types/github.ts` — модели API;
- `src/components` — поиск и карточки результатов;
- `src/utils` — форматирование чисел.

Запрос отправляется через 500 мс после ввода или немедленно по Enter/кнопке. GitHub API доступен без токена, но применяет лимиты частоты запросов. Приложение не использует сервер и не хранит ключи доступа.

**Стили:** шапка, поле поиска, карточки репозиториев и состояния загрузки переработаны для маленьких экранов, планшетов и десктопов. Старые файлы CRA/JSX удалены, чтобы их не путали с актуальной реализацией. В проекте используется существующий `pnpm-lock.yaml` (исправлена ошибка с двойным YAML-документом). Для установки используйте `pnpm install --frozen-lockfile`.
