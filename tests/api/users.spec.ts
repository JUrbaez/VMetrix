import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import {
  DummyJsonClient,
  DummyUsersResponse,
} from '../../utils/api-client';

test.describe('API - Usuarios', () => {
  let client: DummyJsonClient;

  test.beforeEach(({ request }) => {
    client = new DummyJsonClient(request);
  });

  test('API-08: GET /users con paginación retorna la lista correcta de usuarios', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Usuarios');
    await allure.story('Listar usuarios con paginación');
    await allure.severity('normal');

    let response: Awaited<ReturnType<DummyJsonClient['getUsers']>>;

    await allure.step('Enviar GET /users?limit=5&skip=0', async () => {
      response = await client.getUsers({ limit: 5, skip: 0 });
    });

    await allure.step('Verificar estado 200', async () => {
      expect(response!.status()).toBe(200);
    });

    await allure.step('Verificar que la respuesta retorna exactamente 5 usuarios', async () => {
      const body: DummyUsersResponse = await response!.json();
      expect(body.users).toHaveLength(5);
      expect(body.limit).toBe(5);
      expect(body.skip).toBe(0);
      expect(body.total).toBeGreaterThan(5);
    });

    await allure.step('Verificar que cada usuario tiene id, firstName, lastName y email', async () => {
      const body: DummyUsersResponse = await response!.json();
      for (const user of body.users) {
        expect(user.id).toBeGreaterThan(0);
        expect(user.firstName).toBeTruthy();
        expect(user.lastName).toBeTruthy();
        expect(user.email).toContain('@');
      }
    });

    await allure.step('Verificar que la paginación con skip desplaza los resultados', async () => {
      const secondPage = await client.getUsers({ limit: 5, skip: 5 });
      expect(secondPage.status()).toBe(200);
      const firstBody: DummyUsersResponse = await response!.json();
      const secondBody: DummyUsersResponse = await secondPage.json();
      const firstIds = firstBody.users.map((u) => u.id);
      const secondIds = secondBody.users.map((u) => u.id);
      const overlap = firstIds.filter((id) => secondIds.includes(id));
      expect(overlap).toHaveLength(0);
    });
  });
});
