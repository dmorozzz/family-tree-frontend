import { Action } from "@reduxjs/toolkit";
import {
  CreateFamilyProps,
  CreateFamilySuccessResponse,
  FetchFamiliesSuccessResponse,
  UpdateFamilyProps,
  UpdateFamilySuccessResponse,
} from "../../../shared/api";

export const FETCH_FAMILIES_REQUEST = "FETCH_FAMILIES_REQUEST";
export const FETCH_FAMILIES_SUCCESS = "FETCH_FAMILIES_SUCCESS";
export const FETCH_FAMILIES_FAILURE = "FETCH_FAMILIES_FAILURE";

export const CREATE_FAMILY_REQUEST = "CREATE_FAMILY_REQUEST";
export const CREATE_FAMILY_SUCCESS = "CREATE_FAMILY_SUCCESS";
export const CREATE_FAMILY_FAILURE = "CREATE_FAMILY_FAILURE";

export const UPDATE_FAMILY_REQUEST = "UPDATE_FAMILY_REQUEST";
export const UPDATE_FAMILY_SUCCESS = "UPDATE_FAMILY_SUCCESS";
export const UPDATE_FAMILY_FAILURE = "UPDATE_FAMILY_FAILURE";

export const DELETE_FAMILY_REQUEST = "DELETE_FAMILY_REQUEST";
export const DELETE_FAMILY_SUCCESS = "DELETE_FAMILY_SUCCESS";
export const DELETE_FAMILY_FAILURE = "DELETE_FAMILY_FAILURE";

export interface FetchFamiliesRequestAction
  extends Action<typeof FETCH_FAMILIES_REQUEST> {
  type: typeof FETCH_FAMILIES_REQUEST;
}

export interface FetchFamiliesSuccessAction
  extends Action<typeof FETCH_FAMILIES_SUCCESS> {
  type: typeof FETCH_FAMILIES_SUCCESS;
  payload: FetchFamiliesSuccessResponse;
}

export interface FetchFamiliesFailureAction
  extends Action<typeof FETCH_FAMILIES_FAILURE> {
  type: typeof FETCH_FAMILIES_FAILURE;
  payload: string;
}

export interface CreateFamilyRequestAction
  extends Action<typeof CREATE_FAMILY_REQUEST> {
  type: typeof CREATE_FAMILY_REQUEST;
  payload: CreateFamilyProps;
}

export interface CreateFamilySuccessAction
  extends Action<typeof CREATE_FAMILY_SUCCESS> {
  type: typeof CREATE_FAMILY_SUCCESS;
  payload: FetchFamiliesSuccessResponse;
}

export interface CreateFamilyFailureAction
  extends Action<typeof CREATE_FAMILY_FAILURE> {
  type: typeof CREATE_FAMILY_FAILURE;
  payload: string;
}

export interface UpdateFamilyRequestAction
  extends Action<typeof UPDATE_FAMILY_REQUEST> {
  type: typeof UPDATE_FAMILY_REQUEST;
  payload: { familyId: string; props: UpdateFamilyProps };
}

export interface UpdateFamilySuccessAction
  extends Action<typeof UPDATE_FAMILY_SUCCESS> {
  type: typeof UPDATE_FAMILY_SUCCESS;
  payload: UpdateFamilySuccessResponse;
}

export interface UpdateFamilyFailureAction
  extends Action<typeof UPDATE_FAMILY_FAILURE> {
  type: typeof UPDATE_FAMILY_FAILURE;
  payload: string;
}

export interface DeleteFamilyRequestAction
  extends Action<typeof DELETE_FAMILY_REQUEST> {
  type: typeof DELETE_FAMILY_REQUEST;
  payload: { familyId: string };
}

export interface DeleteFamilySuccessAction
  extends Action<typeof DELETE_FAMILY_SUCCESS> {
  type: typeof DELETE_FAMILY_SUCCESS;
  payload: { familyId: string };
}

export interface DeleteFamilyFailureAction
  extends Action<typeof DELETE_FAMILY_FAILURE> {
  type: typeof DELETE_FAMILY_FAILURE;
  payload: string;
}

export const fetchFamiliesRequest = () => {
  return {
    type: FETCH_FAMILIES_REQUEST,
  };
};

export const fetchFamiliesSuccess = (payload: FetchFamiliesSuccessResponse) => {
  return {
    type: FETCH_FAMILIES_SUCCESS,
    payload,
  };
};

export const fetchFamiliesFailure = (error: string) => {
  return {
    type: FETCH_FAMILIES_FAILURE,
    payload: error,
  };
};

export const createFamilyRequest = (payload: CreateFamilyProps) => {
  return {
    type: CREATE_FAMILY_REQUEST,
    payload,
  };
};

export const createFamilySuccess = (payload: CreateFamilySuccessResponse) => {
  return {
    type: CREATE_FAMILY_SUCCESS,
    payload,
  };
};

export const createFamilyFailure = (error: string) => {
  return {
    type: CREATE_FAMILY_FAILURE,
    payload: error,
  };
};

export const updateFamilyRequest = (payload: {
  familyId: string;
  props: UpdateFamilyProps;
}) => {
  return {
    type: UPDATE_FAMILY_REQUEST,
    payload,
  };
};

export const updateFamilySuccess = (payload: UpdateFamilySuccessResponse) => {
  return {
    type: UPDATE_FAMILY_SUCCESS,
    payload,
  };
};

export const updateFamilyFailure = (error: string) => {
  return {
    type: UPDATE_FAMILY_FAILURE,
    payload: error,
  };
};

export const deleteFamilyRequest = (payload: { familyId: string }) => {
  return {
    type: DELETE_FAMILY_REQUEST,
    payload,
  };
};

export const deleteFamilySuccess = (payload: { familyId: string }) => {
  return {
    type: DELETE_FAMILY_SUCCESS,
    payload,
  };
};

export const deleteFamilyFailure = (error: string) => {
  return {
    type: DELETE_FAMILY_FAILURE,
    payload: error,
  };
};

export type FamiliesActions =
  | FetchFamiliesRequestAction
  | FetchFamiliesSuccessAction
  | FetchFamiliesFailureAction
  | CreateFamilyRequestAction
  | CreateFamilySuccessAction
  | CreateFamilyFailureAction
  | UpdateFamilyRequestAction
  | UpdateFamilySuccessAction
  | UpdateFamilyFailureAction
  | DeleteFamilyRequestAction
  | DeleteFamilySuccessAction
  | DeleteFamilyFailureAction;
