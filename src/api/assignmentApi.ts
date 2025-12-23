import apiClient from "./apiClient";

// Get all assignments
export const getAssignments = async () => {
  const res = await apiClient.get("/assignments");
  return res.data;
};

// Create an assignment
export const createAssignment = async (assignmentData: any) => {
  const res = await apiClient.post("/assignments", assignmentData);
  return res.data;
};

// Update an assignment
export const updateAssignment = async (id: string, assignmentData: any) => {
  const res = await apiClient.put(`/assignments/${id}`, assignmentData);
  return res.data;
};

// Delete an assignment
export const deleteAssignment = async (id: string) => {
  const res = await apiClient.delete(`/assignments/${id}`);
  return res.data;
};

// Grade an assignment
export const gradeAssignment = async (id: string, gradeData: { studentId: string; grade: number; feedback?: string }) => {
  const res = await apiClient.post(`/assignments/${id}/grade`, gradeData);
  return res.data;
};
