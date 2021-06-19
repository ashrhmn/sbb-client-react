export const apiURL = `http://localhost:8080/`
export const token = () => { return localStorage.getItem('JWToken') || '' }