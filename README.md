# Next.js Starter Kit

Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript starter kit.

## Setup

```bash
npm install
cp env.example .env.local
npm run dev
```

## Struktur

```
src/
├── app/              # Next.js app router
├── components/       # UI components (Button, Card, Input, dll)
├── hooks/            # Custom hooks (pakeFetch, pakeMutasi)
├── lib/              # API client & utils
├── services/         # API services (authService)
└── types/            # TypeScript types
```

## Cara Pakai

### API Client

```typescript
import { api } from "@/lib";

// GET
const data = await api.ambil("/users");

// POST
const result = await api.kirim("/users", { nama: "John" });

// PUT
await api.ubah("/users/1", { nama: "Jane" });

// DELETE
await api.hapus("/users/1");
```

### Hooks

```typescript
import { pakeFetch, pakeMutasi } from "@/hooks";

// Fetch data
const { data, loading, error, ulangi } = pakeFetch("/users");

// Mutasi
const { mutasi, loading, sukses } = pakeMutasi("/users", "POST");
await mutasi({ nama: "John" });
```

### Auth

```typescript
import { authService, simpanToken } from "@/lib";

const { user, token } = await authService.login({ email, password });
simpanToken(token);
```
