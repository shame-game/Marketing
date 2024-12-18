const serverCache = new Map();

export default async function fetchApi(endpoint, options = {}) {
  const isServer = typeof window === 'undefined';
  const url = `${process.env.API}/api${endpoint}`;
  const cacheKey = JSON.stringify({ endpoint, options });

  // Kiểm tra cache phía server
  if (isServer && serverCache.has(cacheKey)) { return serverCache.get(cacheKey) }
  let token = null;

  if (isServer) {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = cookies();
      token = cookieStore.get('airobotic')?.value || null;
    } catch (error) { console.warn('Không thể lấy cookies trên server:', error) }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...({ 'Authorization': `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const defaultOptions = {
    headers,
    cache: 'no-store',
    ...options,
  };

  if (defaultOptions.body && typeof defaultOptions.body === 'object') {
    defaultOptions.body = JSON.stringify(defaultOptions.body);
  }

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching ${endpoint}: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log(data);
    
    if (isServer) {
      serverCache.set(cacheKey, data.data);
    }

    return data
  } catch (error) {
    console.error(`Fetch API error: ${error.message}`);
    throw error;
  }
}
