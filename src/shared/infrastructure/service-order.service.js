import { BASE_API_URL } from './base-endpoint.js';
import { getLocalDb, nextId, setLocalDb } from './local-data.js';

const SERVICE_ORDERS_ENDPOINT = `${BASE_API_URL}/service-orders`;

export const serviceOrderService = {
  /**
   * Obtiene todas las órdenes de servicio.
   */
  getAllServiceOrders: async () => {
    try {
      const response = await fetch(SERVICE_ORDERS_ENDPOINT);
      if (!response.ok) throw new Error('Failed to fetch service orders');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using local service orders data.');
      return getLocalDb().serviceOrders;
    }
  },

  /**
   * Obtiene la orden de servicio más antigua con prioridad HIGH.
   */
  getNextHighPriorityServiceOrder: async () => {
    try {
      const serviceOrders = await serviceOrderService.getAllServiceOrders();
      const highPriorityOrders = serviceOrders
        .filter(order => order.priority === 'HIGH')
        .sort((a, b) => new Date(a.registeredAt) - new Date(b.registeredAt));

      return highPriorityOrders.length > 0 ? highPriorityOrders[0] : null;
    } catch (error) {
      console.error('Error fetching next high priority service order:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva orden de servicio.
   */
  createServiceOrder: async (serviceOrderData) => {
    try {
      const response = await fetch(SERVICE_ORDERS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceOrderData)
      });
      if (!response.ok) throw new Error('Failed to create service order');
      return await response.json();
    } catch (error) {
      const db = getLocalDb();
      const created = { ...serviceOrderData, id: nextId(db.serviceOrders) };
      db.serviceOrders.push(created);
      setLocalDb(db);
      return created;
    }
  }
};

export default serviceOrderService;

