//interface that repersents my entity that will be stored on the database.
export interface event {
    id: string,
    name: string,
    date: string,
    capacity: number,
    registrationCount: number,
    status: string,
    category: string,
    createdAt: Date,
    updatedAt: Date,
}

//temp storage for eventData.
export const eventData: event[] = []