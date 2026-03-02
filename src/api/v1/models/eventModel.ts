//interface that repersents my entity that will be stored on the database.
export interface Event {
    id: string,
    name: string,
    date: string,
    capacity: number,
    registrationCount: number,
    status: string,
    category: string,
    createdAt: string,
    updatedAt: string,
}