import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { DummyJsonClient, AuthResponse } from '../../utils/api-client';

test.describe('API - Authentication', () => {
  let client: DummyJsonClient;

  test.beforeEach(({ request }) => {
    client = new DummyJsonClient(request);
  });

  test('API-01: POST /auth/login with valid credentials returns token and user data', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Authentication');
    await allure.story('Valid login');
    await allure.severity('blocker');

    let response: Awaited<ReturnType<DummyJsonClient['login']>>;

    await allure.step('Send POST /auth/login with valid credentials', async () => {
      response = await client.login('emilys', 'emilyspass');
    });

    await allure.step('Verify response status is 200', async () => {
      expect(response!.status()).toBe(200);
    });

    await allure.step('Verify response body contains accessToken and user fields', async () => {
      const body: AuthResponse = await response!.json();
      expect(body.accessToken).toBeTruthy();
      expect(body.refreshToken).toBeTruthy();
      expect(body.username).toBe('emilys');
      expect(body.id).toBeGreaterThan(0);
    });
  });

  test('API-02: POST /auth/login with invalid credentials returns 400', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Authentication');
    await allure.story('Invalid login');
    await allure.severity('critical');

    let response: Awaited<ReturnType<DummyJsonClient['login']>>;

    await allure.step('Send POST /auth/login with wrong password', async () => {
      response = await client.login('emilys', 'wrongpassword');
    });

    await allure.step('Verify response status is 400', async () => {
      expect(response!.status()).toBe(400);
    });

    await allure.step('Verify error message in response body', async () => {
      const body = await response!.json();
      expect(body.message).toBeTruthy();
    });
  });
});
