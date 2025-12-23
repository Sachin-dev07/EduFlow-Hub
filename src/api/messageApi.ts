import apiClient from "./apiClient";

export interface MessageData {
    content: string;
    receiverId?: string;
    isGroup?: boolean;
    groupName?: string;
}

export const getMessages = async () => {
    const response = await apiClient.get("/messages");
    return response.data;
};

export const sendMessage = async (messageData: MessageData) => {
    const response = await apiClient.post("/messages", messageData);
    return response.data;
};
