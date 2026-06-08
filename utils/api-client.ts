import { APIRequestContext } from '@playwright/test';

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  thumbnail: string;
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  age: number;
}

export interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface CreateProductPayload {
  title: string;
  price: number;
  stock: number;
  description?: string;
}

export class DummyJsonClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl = 'https://dummyjson.com';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(username: string, password: string) {
    return this.request.post(`${this.baseUrl}/auth/login`, {
      data: { username, password, expiresInMins: 30 },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getProducts(params: { limit?: number; skip?: number } = {}) {
    const query = new URLSearchParams();
    if (params.limit !== undefined) query.set('limit', String(params.limit));
    if (params.skip !== undefined) query.set('skip', String(params.skip));
    const qs = query.toString();
    return this.request.get(`${this.baseUrl}/products${qs ? `?${qs}` : ''}`);
  }

  async getProduct(id: number) {
    return this.request.get(`${this.baseUrl}/products/${id}`);
  }

  async createProduct(payload: CreateProductPayload) {
    return this.request.post(`${this.baseUrl}/products/add`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async updateProduct(id: number, payload: Partial<DummyProduct>) {
    return this.request.put(`${this.baseUrl}/products/${id}`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async deleteProduct(id: number) {
    return this.request.delete(`${this.baseUrl}/products/${id}`);
  }

  async getUsers(params: { limit?: number; skip?: number } = {}) {
    const query = new URLSearchParams();
    if (params.limit !== undefined) query.set('limit', String(params.limit));
    if (params.skip !== undefined) query.set('skip', String(params.skip));
    const qs = query.toString();
    return this.request.get(`${this.baseUrl}/users${qs ? `?${qs}` : ''}`);
  }

  async getUser(id: number) {
    return this.request.get(`${this.baseUrl}/users/${id}`);
  }
}
