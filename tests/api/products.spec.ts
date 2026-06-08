import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import {
  DummyJsonClient,
  DummyProductsResponse,
  DummyProduct,
} from '../../utils/api-client';

test.describe('API - Productos', () => {
  let client: DummyJsonClient;

  test.beforeEach(({ request }) => {
    client = new DummyJsonClient(request);
  });

  test('API-03: GET /products con paginación retorna la cantidad correcta de items', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Productos');
    await allure.story('Listar productos con paginación');
    await allure.severity('critical');

    let response: Awaited<ReturnType<DummyJsonClient['getProducts']>>;

    await allure.step('Enviar GET /products?limit=10&skip=0', async () => {
      response = await client.getProducts({ limit: 10, skip: 0 });
    });

    await allure.step('Verificar estado 200', async () => {
      expect(response!.status()).toBe(200);
    });

    await allure.step('Verificar que la respuesta retorna exactamente 10 productos', async () => {
      const body: DummyProductsResponse = await response!.json();
      expect(body.products).toHaveLength(10);
      expect(body.limit).toBe(10);
      expect(body.skip).toBe(0);
      expect(body.total).toBeGreaterThan(10);
    });

    await allure.step('Verificar que cada producto tiene los campos requeridos', async () => {
      const body: DummyProductsResponse = await response!.json();
      for (const product of body.products) {
        expect(product.id).toBeGreaterThan(0);
        expect(product.title).toBeTruthy();
        expect(product.price).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test('API-05: POST /products/add crea un producto y retorna id con todos los campos', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Productos');
    await allure.story('Crear producto');
    await allure.severity('normal');

    const payload = {
      title: 'Producto de prueba VMetrix',
      price: 49.99,
      stock: 100,
      description: 'Creado por prueba automatizada',
    };

    let response: Awaited<ReturnType<DummyJsonClient['createProduct']>>;

    await allure.step('Enviar POST /products/add con payload válido', async () => {
      response = await client.createProduct(payload);
    });

    await allure.step('Verificar estado 201', async () => {
      expect(response!.status()).toBe(201);
    });

    await allure.step('Verificar que el cuerpo contiene el id del producto y los campos enviados', async () => {
      const body: DummyProduct = await response!.json();
      expect(body.id).toBeGreaterThan(0);
      expect(body.title).toBe(payload.title);
      expect(body.price).toBe(payload.price);
      expect(body.stock).toBe(payload.stock);
    });
  });
});
