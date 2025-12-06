import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const USERS_API = `${HTTP_SERVER}api/users`;
const COURSES_API = `${HTTP_SERVER}api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}api/assignments`;

// --- Type Definitions ---

interface Course {
  _id?: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  credits?: number;
  description?: string;
  author?: string;
  image?: string;
}

interface Module {
  _id?: string;
  name: string;
  description?: string;
  course: string;
  lessons?: unknown[];
}

interface Assignment {
  _id?: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

// --- Course Functions ---

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: Partial<Course>) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// --- Module Functions ---

export const updateModule = async (courseId: string,module: Module) => {
  const { data } = await axios.put(`${COURSES_API}/${courseId}/modules/${module._id}`,module);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: Partial<Module>) => {
  const {data} = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

export const deleteModule = async (courseId: string,moduleId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

// --- Assignment Functions ---

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Partial<Assignment>
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    { ...assignment, course: courseId }
  );
  return data;
};

export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return data;
};

export const updateAssignment = async (courseId: string, assignment: Assignment) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};

// --- Enrollment Functions (FIXED) ---

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}api/kambaz/users/${userId}/enrollments`
  );
  return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${HTTP_SERVER}api/kambaz/users/${userId}/enrollments/courses/${courseId}`
  );
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${HTTP_SERVER}api/kambaz/users/${userId}/enrollments/courses/${courseId}`
  );
  return data;
};

export const findUsersInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}api/kambaz/courses/${courseId}/enrollments`
  );
  return data;
};