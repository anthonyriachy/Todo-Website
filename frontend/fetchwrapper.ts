// fetchWrapper.ts
import { store } from './GlobalRedux/store';
import { refreshToken, clearTokens } from './GlobalRedux/Features/authSlice';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const state = store.getState();
  const accessToken  = state.auth.accessToken;
  
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (response.status === 403) {    
    // Refresh token and retry request
    const resultAction = await store.dispatch(refreshToken());

    if (refreshToken.fulfilled.match(resultAction)) {
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${resultAction.payload.accessToken}`,
        },
        credentials: 'include',
      });
      return retryResponse;
    } else {
      store.dispatch(clearTokens());
      // Handle refresh token failure ( redirect to login)
      return response;
    }
  }

  return response;
};

export default fetchWithAuth;
