import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { DummyJsonClient, AuthResponse } from '../../utils/api-client';

test.describe('API - Autenticación', () => {
  let client: DummyJsonClient;

  test.beforeEach(({ request }) => {
    client = new DummyJsonClient(request);
  });

  test('API-01: POST /auth/login con credenciales válidas retorna token y datos del usuario', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Autenticación');
    await allure.story('Login válido');
    await allure.severity('blocker');

    let response: Awaited<ReturnType<DummyJsonClient['login']>>;

    await allure.step('Enviar POST /auth/login con credenciales válidas', async () => {
      response = await client.login('emilys', 'emilyspass');
    });

    await allure.step('Verificar que el estado de la respuesta es 200', async () => {
      expect(response!.status()).toBe(200);
    });

    await allure.step('Verificar que el cuerpo contiene accessToken y campos del usuario', async () => {
      const body: AuthResponse = await response!.json();
      expect(body.accessToken).toBeTruthy();
      expect(body.refreshToken).toBeTruthy();
      expect(body.username).toBe('emilys');
      expect(body.id).toBeGreaterThan(0);
    });
  });

  test('API-02: POST /auth/login con credenciales inválidas retorna 400', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Autenticación');
    await allure.story('Login inválido');
    await allure.severity('critical');

    let response: Awaited<ReturnType<DummyJsonClient['login']>>;

    await allure.step('Enviar POST /auth/login con contraseña incorrecta', async () => {
      response = await client.login('emilys', 'wrongpassword');
    });

    await allure.step('Verificar que el estado de la respuesta es 400', async () => {
      expect(response!.status()).toBe(400);
    });

    await allure.step('Verificar que el cuerpo contiene un mensaje de error', async () => {
      const body = await response!.json();
      expect(body.message).toBeTruthy();
    });
  });
});
