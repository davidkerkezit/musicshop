import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";
import { ProductType, QuestionType, checkoutType } from "../types";

interface QuestionsState {
  selectedQuestionsCategory: QuestionType[];
  allQuestions: QuestionType[];
  readQuestions: QuestionType[];
  unreadQuestions: QuestionType[];
}

const initialState: QuestionsState = {
  selectedQuestionsCategory: [],
  allQuestions: [],
  readQuestions: [],
  unreadQuestions: [],
};
export const questionsSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    questionsUpdate: (
      state: QuestionsState,
      action: PayloadAction<{ questions: any[]; category: string } | null>
    ) => {
      if (action.payload) {
        const { questions, category } = action.payload;
        state.allQuestions = questions;
        state.unreadQuestions = questions.filter(
          (question: any) => !question.read
        );
        state.readQuestions = questions.filter(
          (question: any) => question.read
        );

        // Update selectedOrdersCategory based on the category
        switch (category) {
          case "all":
            state.selectedQuestionsCategory = state.allQuestions;
            break;
          case "unread":
            state.selectedQuestionsCategory = state.unreadQuestions;
            break;
          case "read":
            state.selectedQuestionsCategory = state.readQuestions;
            break;
          default:
            state.selectedQuestionsCategory = state.allQuestions;
            break;
        }
      }
    },
  },
});

export const { questionsUpdate } = questionsSlice.actions;
export default questionsSlice.reducer;
