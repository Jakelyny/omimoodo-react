import jwt_decode from "jwt-decode";

const NOMEAPP = 'omimoodo';

export const getToken = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;
    if (autenticacao === null) {
        return null;
    }
    if (autenticacao.auth === false) {
        return null;
    } else {
        var decoded = jwt_decode(autenticacao.token);
        
        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            console.log('Token expirado');
            logout();
            throw "Token expirado";
        } else {
            return autenticacao.token;
        }
    }
}

export const getUsuario = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;
    if (autenticacao === null) {
        return null;
    }
    if (autenticacao.auth === false) {
        return null;
    } else {
        var decoded = jwt_decode(autenticacao.token);
        // verificando se o token não expirou
        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            console.log('Token expirado');
            logout();
            throw "Token expirado";
        } else {
            return decoded.usuario;
        }
    }
}

export const gravaAutenticacao = (json) => {
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify(json));
}

export const logout = () => {
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify({ "auth": false, "token": "" }));
}