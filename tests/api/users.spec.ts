import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import {
  DummyJsonClient,
  DummyUsersResponse,
} from '../../utils/api-client';

test.describe('API - Users', () => {
  let client: DummyJsonClient;

  test.beforeEach(({ request }) => {
    client = new DummyJsonClient(request);
  });

  test('API-08: GET /users with pagination returns correct users list', async () => {
    await allure.epic('DummyJSON API');
    await allure.feature('Users');
    await allure.story('List users with pagination');
    await allure.severity('normal');

    let response: Awaited<ReturnType<DummyJsonClient['getUsers']>>;

    await allure.step('Send GET /users?limit=5&skip=0', async () => {
      response = await client.getUsers({ limit: 5, skip: 0 });
    });

    await allure.step('Verify status 200', async () => {
      expect(response!.status()).toBe(200);
    });

    await allure.step('Verify response returns exactly 5 users', async () => {
      const body: DummyUsersResponse = await response!.json();
      expect(body.users).toHaveLength(5);
      expect(body.limit).toBe(5);
      expect(body.skip).toBe(0);
      expect(body.total).toBeGreaterThan(5);
    });

    await allure.step('Verify each user has id, firstName, lastName and email', async () => {
      const body: DummyUsersResponse = await response!.json();
      for (const user of body.users) {
        expect(user.id).toBeGreaterThan(0);
        expect(user.firstName).toBeTruthy();
        expect(user.lastName).toBeTruthy();
        expect(user.email).toContain('@');
      }
    });

    await allure.step('Verify skip pagination shifts results', async () => {
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
