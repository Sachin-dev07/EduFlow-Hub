import apiClient from "./apiClient";

export interface StudentData {
    name: string;
    email: string;
    password?: string;
    grade?: string;
}

export const getStudents = async () => {
    const response = await apiClient.get("/users/students");
    return response.data;
};

export const createStudent = async (studentData: StudentData) => {
    const response = await apiClient.post("/users/students", studentData);
    return response.data;
};

export const getTeachers = async () => {
    const response = await apiClient.get("/users/teachers");
    return response.data;
};


export const createTeacher = async (teacherData: any) => {
    const response = await apiClient.post("/users/teachers", teacherData);
    return response.data;
};

export const updateUser = async (id: string, userData: any) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
};
