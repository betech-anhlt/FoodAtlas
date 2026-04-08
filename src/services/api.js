import { API_URL } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UNAUTHENTICATED_PATTERNS = [
  'unauthenticated',
  'unauthorized',
  'jwt',
  'missing token',
];

let unauthenticatedHandler = null;

export const setUnauthenticatedHandler = handler => {
  unauthenticatedHandler = handler;
};

export const notifyUnauthenticated = message => {
  if (typeof unauthenticatedHandler === 'function') {
    unauthenticatedHandler(message);
  }
};

const isUnauthenticatedMessage = message => {
  if (!message) return false;
  const lower = String(message).toLowerCase();
  return UNAUTHENTICATED_PATTERNS.some(pattern => lower.includes(pattern));
};

async function apiClient(query, variables = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  let resolvedToken = token;
  if (!resolvedToken) {
    try {
      resolvedToken = await AsyncStorage.getItem('token');
    } catch (e) {
      // ignore
    }
  }

  if (resolvedToken) {
    headers['Authorization'] = `Bearer ${resolvedToken}`;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.errors?.map(error => error.message).join('\\n') || 'An error occurred';
    if (isUnauthenticatedMessage(errorMessage)) {
      notifyUnauthenticated(errorMessage);
    }
    throw new Error(errorMessage);
  }

  const json = await response.json();

  if (json?.errors) {
    const errorMessage = json.errors.map(error => error.message).join('\\n');
    if (isUnauthenticatedMessage(errorMessage)) {
      notifyUnauthenticated(errorMessage);
    }
    throw new Error(errorMessage);
  }

  return json;
}

export default apiClient;
