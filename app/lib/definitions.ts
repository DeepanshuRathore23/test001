export type Event = {
    id: number,
    title: string,
    description: string,
    images: string[],
    date: Date
};

export type Owner = {
    id: string,
    email: string,
    password: string
}