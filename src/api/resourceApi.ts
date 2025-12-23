import apiClient from "./apiClient";

export interface ResourceData {
    title: string;
    description: string;
    url: string;
    type: string;
    courseId?: string;
}

export const getResources = async () => {
    const response = await apiClient.get("/resources");
    return response.data;
};

export const createResource = async (resourceData: ResourceData) => {
    const response = await apiClient.post("/resources", resourceData);
    return response.data;
};
