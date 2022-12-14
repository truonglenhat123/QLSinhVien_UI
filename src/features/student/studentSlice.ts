import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create, getAll, getById, remove, update } from "../../api/studentClient";
import { AppThunk, RootState } from "../../app/store";
import { studentField } from "../../utils/types/studentEntities";
// import { selectStudent } from "../student/studentSlice";

export const getStudents = createAsyncThunk("student/getAll", async () => {
  const response = await getAll();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const getStudentsById = createAsyncThunk("student/getById", async (id:number) => {
  const response = await getById(id);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const createStudent = createAsyncThunk("student/createStudent", async (data:any) => {
  const response = await create(data);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const deleteStudent = createAsyncThunk("student/deleteStudent", async (id:number) => {
  const response = await remove(id);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const updateStudent = createAsyncThunk("student/updateStudent", async (payload:{id:number,data:any}) => {
  const response = await update(payload.id,payload.data);
  // The value we return becomes the `fulfilled` action payload
  return response;
});


export interface StudentState {
    listStudent: any[];
    student: studentField|null,
    loading: boolean,
    error: string,
    edit: boolean
  }
  const initialState: StudentState = {
    listStudent: [],
    student: null,
    loading: false,
    error: "",
    edit: false,


  };
export const studentSlice = createSlice({
  name: "student",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addStudent: (state, action) => {
    },
    updateStudents: (state, action) => {
    }
    // deleteStudent: (state, action) => {
    //   state.listStudent = state.listStudent.filter((listStudents) => listStudents.id !==  action.payload.id);
    // }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.listStudent=action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = "call api error";
      })
      .addCase(getStudentsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsById.fulfilled, (state, action) => {
        // debugger
        state.loading = false;
        state.student=action.payload;
      })
      .addCase(getStudentsById.rejected, (state) => {
        state.loading = false;
        state.error = "call api error";
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createStudent.rejected, (state) => {
        state.loading = false;
        state.error = "create student error";
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(updateStudent.rejected, (state) => {
        state.loading = false;
        state.error = "create student error";
      })
    
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
      state.loading = false;
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.loading = false;
        state.error = "delete student error";
      })
      
  },
});
// export const { incrementStudent } = studentSlice.actions;
export const listStudents = (state: RootState) => state.student.listStudent;
export const studentData = (state: RootState) => state.student.student;
export const loadingStudent = (state: RootState) => state.student.loading;
export const { reducer: studentReducer } = studentSlice;
export default studentSlice.reducer;
export const {addStudent} = studentSlice.actions;
