export interface GameRawI {
    name: string,
    url: string,
    img: string,
};

export interface GameI extends GameRawI {
    id: number,
    created_at: string,
    updated_at: string,
}