import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
} as const;

const requiredKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
] as const;

const missingKeys = requiredKeys.filter((k) => !firebaseConfig[k]);
if (missingKeys.length > 0) {
  const message = `Missing Firebase env config: ${missingKeys.join(', ')}. Check frontend/.env and restart the dev server.`;
  if (import.meta.env.DEV) {
    // Fail fast in dev so misconfiguration is obvious.
    throw new Error(message);
  } else {
    // Avoid white-screening production; still log for diagnostics.
    // eslint-disable-next-line no-console
    console.error(message);
  }
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
