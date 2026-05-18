import { BASE_API_URL } from './base-endpoint.js';

const CELLARS_ENDPOINT = `${BASE_API_URL}/cellars`;

const requestJson = async (url, fallbackMessage) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }
  return response.json();
};

export const cellarService = {
  getAllCellars: async () => requestJson(CELLARS_ENDPOINT, 'Failed to fetch cellars'),

  getCellarByWineType: async (wineType) => {
    const cellars = await cellarService.getAllCellars();
    return cellars.find((cellar) => cellar.wineType === wineType) ?? null;
  }
};

export default cellarService;

