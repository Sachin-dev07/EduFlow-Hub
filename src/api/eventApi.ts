import apiClient from "./apiClient";

export interface EventData {
    title: string;
    description: string;
    date: string;
    type: string;
}

export const getEvents = async () => {
    const response = await apiClient.get("/events");
    return response.data;
};

export const createEvent = async (eventData: EventData) => {
    const response = await apiClient.post("/events", eventData);
    return response.data;
};
