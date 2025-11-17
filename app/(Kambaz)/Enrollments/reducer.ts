import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    
    addEnrollment: (state, { payload: newEnrollment }: PayloadAction<Enrollment>) => {
      state.enrollments.push(newEnrollment);
    },

    removeEnrollment: (state, { payload: courseId }: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter((e) => e.course !== courseId);
    },
  },
});

export const { setEnrollments, addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;