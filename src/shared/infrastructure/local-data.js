const STORAGE_KEY = 'yt-music-editorial-local-db';

const DEFAULT_DB = {
  tracks: [
    { id: 1, name: 'Shape of You', costPerHour: 50, impactInPlayback: 'NONE', defaultAction: 'REPROCESS' },
    { id: 2, name: 'Blinding Lights', costPerHour: 45, impactInPlayback: 'PARTIAL', defaultAction: 'REPLACE' },
    { id: 3, name: 'Anti-Hero', costPerHour: 55, impactInPlayback: 'TOTAL', defaultAction: 'REPROCESS' },
    { id: 4, name: 'As It Was', costPerHour: 48, impactInPlayback: 'NONE', defaultAction: 'REPLACE' },
    { id: 5, name: 'Heat Waves', costPerHour: 52, impactInPlayback: 'PARTIAL', defaultAction: 'REPROCESS' }
  ],
  editors: [
    { id: 1, trackId: 1, editorRole: 'METADATA_REVIEWER', registeredAt: '2026-05-15T08:00:00Z', status: 'AVAILABLE' },
    { id: 2, trackId: 2, editorRole: 'SYNC_SPECIALIST', registeredAt: '2026-05-14T10:30:00Z', status: 'AVAILABLE' },
    { id: 3, trackId: 3, editorRole: 'AUDIO_QUALITY_ANALYST', registeredAt: '2026-05-13T14:15:00Z', status: 'BUSY' },
    { id: 4, trackId: 1, editorRole: 'SYNC_SPECIALIST', registeredAt: '2026-05-12T09:00:00Z', status: 'AVAILABLE' },
    { id: 5, trackId: 4, editorRole: 'METADATA_REVIEWER', registeredAt: '2026-05-15T11:20:00Z', status: 'AVAILABLE' },
    { id: 6, trackId: 5, editorRole: 'AUDIO_QUALITY_ANALYST', registeredAt: '2026-05-15T16:45:00Z', status: 'AVAILABLE' },
    { id: 7, trackId: 2, editorRole: 'METADATA_REVIEWER', registeredAt: '2026-05-11T13:00:00Z', status: 'AVAILABLE' }
  ],
  serviceOrders: [
    { id: 1, trackId: 1, issueId: 'ISSUE_001', neededAction: 'REPROCESS', priority: 'HIGH', registeredAt: '2026-05-15T08:30:00Z' },
    { id: 2, trackId: 2, issueId: 'ISSUE_002', neededAction: 'REPLACE', priority: 'NORMAL', registeredAt: '2026-05-14T11:00:00Z' },
    { id: 3, trackId: 3, issueId: 'ISSUE_003', neededAction: 'REPROCESS', priority: 'HIGH', registeredAt: '2026-05-13T15:30:00Z' },
    { id: 4, trackId: 4, issueId: 'ISSUE_004', neededAction: 'REPLACE', priority: 'NORMAL', registeredAt: '2026-05-12T10:00:00Z' },
    { id: 5, trackId: 5, issueId: 'ISSUE_005', neededAction: 'REPROCESS', priority: 'NORMAL', registeredAt: '2026-05-11T16:00:00Z' }
  ]
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const normalizeDbShape = (rawDb) => {
  const normalized = rawDb && typeof rawDb === 'object' ? { ...rawDb } : {};

  // Backward compatibility with older key names.
  if (!Array.isArray(normalized.serviceOrders) && Array.isArray(normalized['service-orders'])) {
    normalized.serviceOrders = normalized['service-orders'];
  }

  if (!Array.isArray(normalized.tracks)) normalized.tracks = [];
  if (!Array.isArray(normalized.editors)) normalized.editors = [];
  if (!Array.isArray(normalized.serviceOrders)) normalized.serviceOrders = [];

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

