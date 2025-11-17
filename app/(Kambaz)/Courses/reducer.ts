import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database/page";
import { v4 as uuidv4 } from "uuid";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
  image: string;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload: courses }: { payload: Course[] }) => {
      state.courses = courses;
    },
    addNewCourse: (state, { payload: course }: { payload: Course }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }: { payload: string }) => {
      state.courses = state.courses.filter(
        (course) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }: { payload: Course }) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse,setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;