// features/clients/services/clientService.js
import BaseApiService from "../../../services/api/baseApiService";
import {
  transformClientFromApi,
  transformClientForApi,
} from "../utils/clientTransformers";

class ClientService extends BaseApiService {
  constructor() {
    super("clients", { requireVendorId: true });
  }

  // Fix getAll to handle new response format
  async getAll(params = {}) {
    const response = await super.getAll(params);

    // response.data is the array of clients
    // response.meta contains pagination info
    return {
      data: response.data.map(transformClientFromApi),
      pagination: {
        total: response.meta.total,
        perPage: response.meta.per_page,
        currentPage: response.meta.current_page,
        totalPages: response.meta.total_pages,
      },
    };
  }

  // Fix getById
  async getById(id) {
    const response = await super.getById(id);
    // response.data is the single client object
    return transformClientFromApi(response.data);
  }

  // Create remains the same
  async create(data) {
    const apiData = transformClientForApi(data);
    console.log("Sending to API:", apiData);
    const response = await super.create(apiData);
    return transformClientFromApi(response.data);
  }

  // Update remains the same
  async update(id, data) {
    const apiData = transformClientForApi(data);
    console.log("Updating with:", apiData);
    const response = await super.update(id, apiData);
    return transformClientFromApi(response.data);
  }
}

export default new ClientService();
