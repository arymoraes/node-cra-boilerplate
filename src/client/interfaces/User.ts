export interface UserRawI {
    username: string,
    password: string,
    email: string,
}

export interface LoginCredentialsI {
    username: string,
    password: string,
}

export interface UserI extends LoginCredentialsI {
    id: number,
    role: string,
}