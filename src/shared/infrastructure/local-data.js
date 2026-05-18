const STORAGE_KEY = 'tw-square-local-db';

const DEFAULT_DB = {
  cellars: [
    { id: 1, name: 'Reds Cellar', wineType: 'reds', capacity: 500 },
    { id: 2, name: 'Whites Cellar', wineType: 'whites', capacity: 400 },
    { id: 3, name: 'Sparkling Cellar', wineType: 'sparkling', capacity: 300 },
    { id: 4, name: 'Rosé Cellar', wineType: 'rose', capacity: 250 },
    { id: 5, name: 'Dessert Cellar', wineType: 'dessert', capacity: 200 },
    { id: 6, name: 'Port Cellar', wineType: 'port', capacity: 180 }
  ],
  preservationItems: [
    { id: 1, cellarId: 1, wineType: 'reds', wineId: 1, wineName: 'Eszencia 1999', quantity: 42, registeredAt: '2026-05-10T14:30:00.000Z' },
    { id: 2, cellarId: 1, wineType: 'reds', wineId: 12, wineName: 'Vega Sicilia Único', quantity: 18, registeredAt: '2026-05-12T09:15:00.000Z' },
    { id: 3, cellarId: 2, wineType: 'whites', wineId: 101, wineName: 'Cloudy Bay Sauvignon Blanc', quantity: 35, registeredAt: '2026-05-13T16:45:00.000Z' },
    { id: 4, cellarId: 3, wineType: 'sparkling', wineId: 201, wineName: 'Moët & Chandon Impérial', quantity: 24, registeredAt: '2026-05-15T11:20:00.000Z' },
    { id: 5, cellarId: 4, wineType: 'rose', wineId: 301, wineName: 'Domaine Ott Rosé', quantity: 15, registeredAt: '2026-05-16T08:00:00.000Z' },
    { id: 6, cellarId: 5, wineType: 'dessert', wineId: 501, wineName: 'Château d\'Yquem 2015', quantity: 8, registeredAt: '2026-05-17T10:30:00.000Z' }
  ]
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const normalizeDbShape = (rawDb) => {
  const normalized = rawDb && typeof rawDb === 'object' ? { ...rawDb } : {};

  // Backward compatibility with older key names.
  if (!Array.isArray(normalized.preservationItems) && Array.isArray(normalized['preservation-items'])) {
    normalized.preservationItems = normalized['preservation-items'];
  }

  if (!Array.isArray(normalized.cellars)) normalized.cellars = [];
  if (!Array.isArray(normalized.preservationItems)) normalized.preservationItems = [];

  return normalized;
};

export const getLocalDb = () => {
  if (!isBrowser()) return clone(DEFAULT_DB);

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = clone(DEFAULT_DB);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed = JSON.parse(raw);
    const normalized = normalizeDbShape(parsed);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (error) {
    const fallback = clone(DEFAULT_DB);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
};

export const setLocalDb = (db) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const nextId = (items) => {
  if (!items.length) return 1;
  return Math.max(...items.map((item) => Number(item.id) || 0)) + 1;
};

