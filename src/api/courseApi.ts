import apiClient from "./apiClient";

export const getCourses = async () => {
  const res = await apiClient.get("/courses");
  return res.data;
};

export const createCourse = async (courseData: any) => {
  const res = await apiClient.post("/courses", courseData);
  return res.data;
};

export const updateCourse = async (id: string, courseData: any) => {
  const res = await apiClient.put(`/courses/${id}`, courseData);
  return res.data;
};

export const deleteCourse = async (id: string) => {
  const res = await apiClient.delete(`/courses/${id}`);
  return res.data;
};
