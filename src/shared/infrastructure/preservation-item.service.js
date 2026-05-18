import { BASE_API_URL } from './base-endpoint.js';
const ENDPOINT = `${BASE_API_URL}/preservation-items`;
async function requestJson(url, options = {}, message = 'Request failed') {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(message);
  return response.json();
}
export const preservationItemService = {
  getAllPreservationItems: () => requestJson(ENDPOINT, {}, 'Failed to fetch preservation items'),
  getPreservationItemsByCellarId: async (cellarId) => (await preservationItemService.getAllPreservationItems()).filter((item) => item.cellarId === Number(cellarId)),
  createPreservationItem: (itemData) => requestJson(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData)
  }, 'Failed to create preservation item')
};
export default preservationItemService;