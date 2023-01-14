import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

export class VaultManagementApi {

    public static readonly HOME: string = `${API_URL}/`;

    public static readonly SIGNIN: string = `${API_URL}/api/auth/signin`;
    public static readonly SIGNUP: string = `${API_URL}/api/auth/signup`;
    public static readonly SIGNOUT: string = `${API_URL}/api/auth/signout`;
}
