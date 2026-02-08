# Simple Auth + Role Test API (4 Roles)

## Setup
```bash
npm install
```

## Run
```bash
npm run dev
```

## Env
Create `.env` (already provided):
```
PORT=4000
JWT_SECRET=party-management-secret-2026
JWT_EXPIRE=24h
```

## Test
Use `test.http` (VSCode REST Client) or Postman.

Users (password: `123456`):
- Admin: `ADMIN001`
- BT (Bí thư): `00040280`
- PBT (Phó Bí thư): `00040300`
- CU (Chi ủy): `00050593`
- CU (Chi ủy): `00049118`
