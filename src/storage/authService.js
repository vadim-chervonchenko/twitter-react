export class AuthService {
    static setToken(tokenName, tokenValue) {
        localStorage.setItem(tokenName, tokenValue);
    }
    static unsetToken(tokenName) {
        localStorage.removeItem(tokenName);
    }
    static getToken(tokenName) {
        return localStorage.getItem(tokenName);
    }
}