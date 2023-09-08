import { Dispatch } from "redux";
import {
  feedBackDispatchType,
  FEEDBACK_SUCCESS,
  FEEDBACK_REQUEST,
  FEEDBACK_FAILURE,
  FEEDBACK_UPDATED,
} from "./types";
import fetcher, { METHOD } from "@/util/fecher";
import Cookies from "js-cookie";

export const getFeedbackList =
  (qnaId: number) => async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const response = await fetcher(METHOD.GET, `/board/feedback/${qnaId}`, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
      if (response) {
        dispatch({
          type: FEEDBACK_SUCCESS,
          payload: {
            list: response.data,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

type UpdateFeedback = {
  feedbackId: number;
  reviseContent: string;
};
export const updateFeedback =
  (updateData: UpdateFeedback) =>
  async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const request = await fetcher(
        METHOD.PATCH,
        "/board/feedback/revise",
        updateData,
        {
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
        },
      );
      if (request.status === 200) {
        dispatch({ type: FEEDBACK_UPDATED });
      }
    } catch (error: any) {
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: { error },
      });
    }
  };

type WirteFeedBack = {
  qnaId: number;
  feedbackTarget: string;
  feedbackContent: string;
};
export const writeFeedback =
  (wirteData: WirteFeedBack) =>
  async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const request = await fetcher(METHOD.POST, "/board/feedback", wirteData, {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      if (request.status === 200) {
        dispatch({ type: FEEDBACK_UPDATED });
      }
    } catch (error: any) {
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
