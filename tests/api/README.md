# Pruebas API — DummyJSON

Pruebas automatizadas de la API [DummyJSON](https://dummyjson.com) con Playwright y TypeScript.

---

## Qué se prueba

| ID | Archivo | Endpoint | Qué valida |
|----|---------|----------|------------|
| API-01 | `auth.spec.ts` | POST /auth/login | Login con credenciales válidas retorna token y datos del usuario |
| API-02 | `auth.spec.ts` | POST /auth/login | Login con credenciales inválidas retorna 400 |
| API-03 | `products.spec.ts` | GET /products | Paginación retorna 10 productos con campos requeridos |
| API-05 | `products.spec.ts` | POST /products/add | Crear producto retorna id y campos enviados |
| API-08 | `users.spec.ts` | GET /users | Paginación retorna 5 usuarios y la página 2 no repite ids |

---

## Cómo ejecutar

Desde la raíz del proyecto:

```bash
# Todas las pruebas API
npm run test:api

# Un archivo específico
npx playwright test tests/api/auth.spec.ts

# Una prueba por nombre
npx playwright test --grep "API-01"
```

---

## Estructura

```
tests/api/
├── auth.spec.ts       # Autenticación
├── products.spec.ts   # Productos
└── users.spec.ts      # Usuarios

utils/api-client.ts    # Cliente HTTP con métodos tipados
```

Las pruebas API usan el cliente `DummyJsonClient` de `utils/api-client.ts`. No necesitan navegador ni login previo.

---

## Credenciales

No se requiere API key. Para las pruebas de login:

| Campo | Valor |
|-------|-------|
| Usuario | `emilys` |
| Contraseña | `emilyspass` |

---

## Reporte Allure

Después de ejecutar las pruebas:

```bash
npm run report
```

Para correr todas las pruebas (UI + API) y abrir el reporte de una vez:

```bash
npm run test:report
```

Los resultados se guardan en `allure-results/` y el reporte HTML en `allure-report/`.
