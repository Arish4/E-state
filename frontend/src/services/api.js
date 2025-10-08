// API service for backend communication
const API_BASE_URL = 'https://estate1-j8ba9vvz.b4a.run';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get headers with auth token
  getHeaders(includeAuth = true) {
    const headers = {};
    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    return headers;
  }

  // Helper method to handle responses
  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
    }
    return data;
  }

  // User API methods
  async login(email, password, role) {
    const response = await fetch(`${this.baseURL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    return this.handleResponse(response);
  }

  async register(name, email, password, role) {
    const response = await fetch(`${this.baseURL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    return this.handleResponse(response);
  }

  // Estate API methods
  async getAllEstates() {
    const response = await fetch(`${this.baseURL}/estates/all`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getMyEstates() {
    const response = await fetch(`${this.baseURL}/estates/my`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async searchEstates(query) {
    const response = await fetch(
      `${this.baseURL}/estates/search?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: this.getHeaders(),
      }
    );
    return this.handleResponse(response);
  }

  // Upload single estate image
  async uploadEstate(estateData, imageFile) {
    const formData = new FormData();
    formData.append('name', estateData.name);
    formData.append('price', estateData.price);
    formData.append('location', estateData.location);
    formData.append('description', estateData.description);
    formData.append('image', imageFile); // single image

    const response = await fetch(`${this.baseURL}/estates/upload`, {
      method: 'POST',
      headers: this.getHeaders(), // do not set Content-Type manually
      body: formData,
    });
    return this.handleResponse(response);
  }

  // Update estate with optional single image
  async updateEstate(id, estateData, imageFile = null) {
    const formData = new FormData();
    formData.append('name', estateData.name);
    formData.append('price', estateData.price);
    formData.append('location', estateData.location);
    formData.append('description', estateData.description);
    if (estateData.status) formData.append('status', estateData.status);
    if (imageFile) formData.append('image', imageFile); // optional single image

    const response = await fetch(`${this.baseURL}/estates/update/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: formData,
    });
    return this.handleResponse(response);
  }
}

export default new ApiService();
