import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import {
  DummyJsonClient,
  DummyProductsResponse,
  DummyProduct,
} from '../../utils/api-client';

test.describe('API - Products', () => {
  let client: DummyJsonClient;

  test.beforeEach(({ request }) => {
    client = new DummyJsonClient(request);
  });

  test('API-03: GET /products with pagination returns correct number of items', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Products');
    await allure.story('List products with pagination');
    await allure.severity('critical');

    let response: Awaited<ReturnType<DummyJsonClient['getProducts']>>;

    await allure.step('Send GET /products?limit=10&skip=0', async () => {
      response = await client.getProducts({ limit: 10, skip: 0 });
    });

    await allure.step('Verify status 200', async () => {
      expect(response!.status()).toBe(200);
    });

    await allure.step('Verify response returns exactly 10 products', async () => {
      const body: DummyProductsResponse = await response!.json();
      expect(body.products).toHaveLength(10);
      expect(body.limit).toBe(10);
      expect(body.skip).toBe(0);
      expect(body.total).toBeGreaterThan(10);
    });

    await allure.step('Verify each product has required fields', async () => {
      const body: DummyProductsResponse = await response!.json();
      for (const product of body.products) {
        expect(product.id).toBeGreaterThan(0);
        expect(product.title).toBeTruthy();
        expect(product.price).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test('API-05: POST /products/add creates a product and returns id with all fields', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Products');
    await allure.story('Create product');
    await allure.severity('normal');

    const payload = {
      title: 'VMetrix Test Product',
      price: 49.99,
      stock: 100,
      description: 'Created by automated test',
    };

    let response: Awaited<ReturnType<DummyJsonClient['createProduct']>>;

    await allure.step('Send POST /products/add with valid payload', async () => {
      response = await client.createProduct(payload);
    });

    await allure.step('Verify status 201', async () => {
      expect(response!.status()).toBe(201);
    });

    await allure.step('Verify response body contains new product id and submitted fields', async () => {
      const body: DummyProduct = await response!.json();
      expect(body.id).toBeGreaterThan(0);
      expect(body.title).toBe(payload.title);
      expect(body.price).toBe(payload.price);
      expect(body.stock).toBe(payload.stock);
    });
  });
});
