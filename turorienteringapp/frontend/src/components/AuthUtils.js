// Importing the jwtDecode function from the jwt-decode library
import { jwtDecode } from 'jwt-decode'; 

// Decodes JWT token 
export function decodeToken(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}
