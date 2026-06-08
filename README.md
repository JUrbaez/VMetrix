# VMetrix QA Automation Challenge

Proyecto de automatización con Playwright + TypeScript que cubre pruebas UI en [SauceDemo](https://www.saucedemo.com) y pruebas API en [DummyJSON](https://dummyjson.com), usando Page Object Model y reportes Allure.

---

## Requisitos

- **Node.js** 18 o superior
- **npm** 9 o superior
- **Java** 8 o superior (requerido por Allure CLI para abrir reportes)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/JUrbaez/VMetrix.git
cd VMetrix

# 2. Instalar dependencias de Node
npm install

# 3. Instalar navegadores de Playwright
npx playwright install chromium
```

---

## Ejecutar pruebas

### Todas las pruebas (UI + API)
```bash
npm test
```

### Solo pruebas UI (SauceDemo)
```bash
npm run test:ui
```

### Solo pruebas API (DummyJSON)
```bash
npm run test:api
```

### Pruebas UI con navegador visible
```bash
npm run test:headed
```

### Pruebas UI con reporte Allure automático (recomendado)
```bash
npm run test; npm run report
```

### Ejecutar un archivo spec específico
```bash
npx playwright test tests/ui/checkout.spec.ts
```

### Ejecutar una prueba por nombre
```bash
npx playwright test --grep "UI-05"
```

---

## Generar el reporte Allure

Después de ejecutar las pruebas, los resultados se guardan en `allure-results/`.

### Generar y abrir reporte
```bash
npm run report
```

### Solo generar (sin abrir navegador)
```bash
npm run report:generate
```

> **Nota:** Allure CLI requiere Java instalado. Si `allure` no se encuentra, instálalo con:
> ```bash
> npm install -g allure-commandline
> # o via Homebrew (macOS):
> brew install allure
> ```

---

## Estructura del proyecto

```
VMetrix/
├── pages/                    # Clases Page Object Model
│   ├── LoginPage.ts          # Página de login (usada por fixtures)
│   ├── InventoryPage.ts      # Listado de productos, ordenamiento y carrito
│   ├── CartPage.ts           # Carrito de compras
│   ├── CheckoutPage.ts       # Pasos 1, 2 y confirmación del checkout
│   └── ProductDetailPage.ts  # Vista de detalle de producto
├── fixtures/
│   └── saucedemo.ts          # Fixtures personalizados de Playwright (sesión autenticada)
├── utils/
│   └── api-client.ts         # Cliente HTTP tipado para la API DummyJSON
├── tests/
│   ├── ui/
│   │   ├── inventory.spec.ts      # UI-03, UI-06
│   │   ├── product-detail.spec.ts # UI-01
│   │   └── checkout.spec.ts       # UI-05, UI-07
│   └── api/
│       ├── auth.spec.ts           # API-01, API-02
│       ├── products.spec.ts       # API-03, API-05
│       └── users.spec.ts          # API-08
├── test-cases/
│   └── test-cases.md         # 20 casos de prueba diseñados (UI + API)
├── bugs/
│   └── bugs-report.md        # 5 bugs encontrados y documentados
├── allure-results/           # Generado en ejecución (gitignored)
├── allure-report/            # Generado en ejecución (gitignored)
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Cobertura de pruebas

### Pruebas UI — SauceDemo

| ID    | Título                                                         | Tipo     | Automatizado |
|-------|----------------------------------------------------------------|----------|--------------|
| UI-01 | Verificar la página de detalle y que todos los campos se muestran | Positivo | Sí           |
| UI-02 | Filtrar productos por precio de mayor a menor                  | Positivo | No           |
| UI-03 | Remover productos del carrito desde la página de inventario    | Positivo | Sí           |
| UI-04 | Agregar un producto al carrito desde el inventario             | Positivo | No           |
| UI-05 | Verificar el flujo de checkout                                 | Positivo | Sí           |
| UI-06 | Ordenar productos de menor a mayor según su precio             | Positivo | Sí           |
| UI-07 | Finalizar checkout sin introducir datos del usuario            | Negativo | Sí           |
| UI-08 | Verificar carrito vacío                                        | Negativo | No           |
| UI-09 | Filtrar productos por nombre A a Z                             | Positivo | No           |
| UI-10 | Filtrar productos por nombre Z a A                             | Positivo | No           |

### Pruebas API — DummyJSON

| ID     | Endpoint                      | Descripción                                          | Tipo     | Automatizado |
|--------|-------------------------------|------------------------------------------------------|----------|--------------|
| API-01 | POST /auth/login              | Credenciales válidas retornan token y datos de usuario | Positivo | Sí           |
| API-02 | POST /auth/login              | Credenciales inválidas retornan 400                  | Negativo | Sí           |
| API-03 | GET /products?limit=10&skip=0 | Lista paginada retorna 10 items                      | Positivo | Sí           |
| API-04 | GET /products/:id             | Obtener producto específico por ID                   | Positivo | No           |
| API-05 | POST /products/add              | Crear producto retorna id y campos enviados          | Positivo | Sí           |
| API-06 | PUT /products/:id              | Actualizar producto retorna campos actualizados      | Positivo | No           |
| API-07 | DELETE /products/:id           | Eliminar producto retorna isDeleted: true            | Positivo | No           |
| API-08 | GET /users?limit=5&skip=0     | Lista paginada de usuarios sin solapamiento en página 2 | Positivo | Sí        |
| API-09 | GET /users/:id                | Obtener usuario específico retorna id correcto       | Positivo | No           |
| API-10 | GET /products/9999            | Producto inexistente retorna 404                     | Negativo | No           |

---

## Credenciales

### SauceDemo
| Usuario                   | Notas                              |
|---------------------------|------------------------------------|
| standard_user             | Usado en todas las pruebas automatizadas |
| locked_out_user           | Cuenta bloqueada — no puede iniciar sesión |
| problem_user              | Imágenes rotas (bug conocido)      |
| performance_glitch_user   | Login con respuesta lenta          |

Contraseña para todas las cuentas: `secret_sauce`

### DummyJSON
No requiere API key. Las pruebas de auth usan: `username: emilys`, `password: emilyspass`.

---

## Bugs encontrados

Ver [`bugs/bugs-report.md`](bugs/bugs-report.md) para la lista completa. Resumen:

| ID     | Descripción                                                        | Severidad |
|--------|--------------------------------------------------------------------|-----------|
| BUG-01 | El dropdown de ordenamiento muestra A→Z pero los productos no están ordenados | Media |
| BUG-02 | El badge del carrito persiste brevemente después de completar la orden | Baja |
| BUG-03 | Código postal acepta entrada no numérica sin validación              | Media     |
| BUG-04 | `problem_user`: todas las imágenes muestran la misma imagen incorrecta | Alta   |
| BUG-05 | Mensaje de error de `locked_out_user` no ofrece guía accionable      | Baja      |

---

## Stack tecnológico

| Herramienta        | Versión    | Propósito                        |
|--------------------|------------|----------------------------------|
| Playwright         | ^1.49.0    | Test runner + automatización UI  |
| TypeScript         | ^5.8.3     | Lenguaje                         |
| allure-playwright  | ^3.0.0     | Integración reporter Allure      |
| allure-commandline | ^2.30.0    | Generar y abrir reporte HTML     |
