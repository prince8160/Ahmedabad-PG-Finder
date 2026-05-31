export interface FirestoreErrorInfo {
  code: string;
  message: string;
  details?: any;
}

export function handleFirestoreError(error: any): never {
  const errorInfo: FirestoreErrorInfo = {
    code: error.code || 'unknown',
    message: error.message || 'An unknown error occurred.',
    details: error.details || null,
  };

  // Throw a stringified JSON schema
  throw new Error(JSON.stringify(errorInfo));
}
