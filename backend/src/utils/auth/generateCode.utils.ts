// genera un token de 6 digitos
export function generateToken() {
    return Math.floor(100000 + Math.random() * 900000);
}
