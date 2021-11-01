import { LoginCredentialsI } from "../../interfaces/User";
import api from "./apiConfig";

export const apiLogin = async (loginCredentials: LoginCredentialsI) => {
    try {
        const user = await api().post('/user/login', loginCredentials);
        return user.data;
    } catch (err) {
        return false;
    }
}

export const apiGetProfile = async () => {
    try {
        const user = await api().get('/user/me');
        return user.data;
    } catch (err) {
        return false;
    }
}