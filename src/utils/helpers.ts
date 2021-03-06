import jwtDecode from 'jwt-decode';

/**
 * helper method to validate  user token
 *
 * @param {*} token
 * @returns {boolean}
 */
export const validateToken = (token: any): boolean => {
  if (!token) {
    console.error('login token not found');
    return false;
  }
  try {
    const decodedJwt = jwtDecode<{ exp: number }>(token);
    return decodedJwt.exp >= Date.now() / 1000;
  } catch (e) {
    console.error(e);
    return false;
  }
};
