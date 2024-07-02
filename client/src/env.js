export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : 'https://www.spuditions.com'
export const useSockets = false
