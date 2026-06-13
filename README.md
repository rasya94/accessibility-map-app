# Easy Route (Expo + pnpm)

A feature-organized Expo Router recreation of the provided accessibility map design.

## Run

```bash
pnpm install
pnpm start
```

## Structure

- `src/app` → Expo Router entry and navigation
- `src/components` → shared UI pieces
- `src/constants` → colors, theme, mock data
- `src/features/*/views` → screen-level UI
- `src/features/*/styles.ts` → feature-local styles
- `src/hooks`, `src/lib`, `src/providers`, `src/services`, `src/stores` → reserved for scale-up
