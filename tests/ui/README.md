# Pruebas UI — SauceDemo

Pruebas automatizadas de la tienda [SauceDemo](https://www.saucedemo.com) con Playwright y TypeScript.

---

## Qué se prueba

| ID | Archivo | Qué valida |
|----|---------|------------|
| UI-01 | `product-detail.spec.ts` | Detalle de producto: nombre, descripción, precio, imagen y botón Add to cart |
| UI-03 | `inventory.spec.ts` | Remover productos del carrito desde la página de inventario |
| UI-05 | `checkout.spec.ts` | Flujo completo de checkout (happy path) |
| UI-06 | `inventory.spec.ts` | Ordenar productos de menor a mayor precio |
| UI-07 | `checkout.spec.ts` | Checkout sin datos del usuario (validación de error) |

---

## Cómo ejecutar

Desde la raíz del proyecto:

```bash
# Todas las pruebas UI
npm run test:ui

# Con navegador visible
npm run test:headed

# UI + reporte Allure
npm run test:ui:report

# Un archivo específico
npx playwright test tests/ui/checkout.spec.ts

# Una prueba por nombre
npx playwright test --grep "UI-05"
```

---

## Estructura

```
tests/ui/
├── inventory.spec.ts       # Inventario y carrito
├── product-detail.spec.ts  # Detalle de producto
└── checkout.spec.ts        # Checkout

pages/                      # Page Object Model
fixtures/saucedemo.ts       # Login automático antes de cada prueba
```

Las pruebas UI usan el fixture `saucedemo.ts`, que inicia sesión con `standard_user` antes de correr cada test. No hace falta hacer login manualmente en los specs.

---

## Credenciales

| Campo | Valor |
|-------|-------|
| Usuario | `standard_user` |
| Contraseña | `secret_sauce` |

---

## Reporte Allure

Después de ejecutar las pruebas:

```bash
npm run report
```

Los resultados se guardan en `allure-results/` y el reporte HTML en `allure-report/`.
