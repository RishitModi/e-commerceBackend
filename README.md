# e-commerceBackend Monorepo

This repository contains two separate applications:

- `backend/` - Spring Boot e-commerce backend (existing application).
- `frontend/` - React + TypeScript + Vite frontend scaffold.

## Project Layout

```text
e-commerceBackend/
├── backend/
└── frontend/
```

## Backend

The backend remains its own Spring Boot project under `backend/`.

Use the backend-specific documentation at:

- `backend/README.md`

## Frontend

The frontend is an independent Vite project under `frontend/`.

Run locally:

```sh
cd frontend
npm install
npm run dev
```

Build:

```sh
cd frontend
npm run build
```
