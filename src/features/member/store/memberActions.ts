import { Action } from "@reduxjs/toolkit";
import {
  CreateMemberProps,
  CreateMemberSuccessResponse,
  FetchMembersSuccessResponse,
  UpdateMemberProps,
  UpdateMemberSuccessResponse,
} from "../../../shared/api";

export const SELECT_FAMILY_ID = "SELECT_FAMILY_ID";

export const FETCH_MEMBERS_REQUEST = "FETCH_MEMBERS_REQUEST";
export const FETCH_MEMBERS_SUCCESS = "FETCH_MEMBERS_SUCCESS";
export const FETCH_MEMBERS_FAILURE = "FETCH_MEMBERS_FAILURE";

export const CREATE_MEMBER_REQUEST = "CREATE_MEMBER_REQUEST";
export const CREATE_MEMBER_SUCCESS = "CREATE_MEMBER_SUCCESS";
export const CREATE_MEMBER_FAILURE = "CREATE_MEMBER_FAILURE";

export const CREATE_CHILD_REQUEST = "CREATE_CHILD_REQUEST";
export const CREATE_CHILD_SUCCESS = "CREATE_CHILD_SUCCESS";
export const CREATE_CHILD_FAILURE = "CREATE_CHILD_FAILURE";

export const UPDATE_MEMBER_REQUEST = "UPDATE_MEMBER_REQUEST";
export const UPDATE_MEMBER_SUCCESS = "UPDATE_MEMBER_SUCCESS";
export const UPDATE_MEMBER_FAILURE = "UPDATE_MEMBER_FAILURE";

export interface SelectFamilyIdAction extends Action<typeof SELECT_FAMILY_ID> {
  type: typeof SELECT_FAMILY_ID;
  payload: { familyId: string };
}

export interface FetchMembersRequestAction
  extends Action<typeof FETCH_MEMBERS_REQUEST> {
  type: typeof FETCH_MEMBERS_REQUEST;
  payload: { familyId: string };
}

export interface FetchMembersSuccessAction
  extends Action<typeof FETCH_MEMBERS_SUCCESS> {
  type: typeof FETCH_MEMBERS_SUCCESS;
  payload: { familyId: string; props: FetchMembersSuccessResponse };
}

export interface FetchMembersFailureAction
  extends Action<typeof FETCH_MEMBERS_FAILURE> {
  type: typeof FETCH_MEMBERS_FAILURE;
  payload: string;
}

export interface CreateMemberRequestAction
  extends Action<typeof CREATE_MEMBER_REQUEST> {
  type: typeof CREATE_MEMBER_REQUEST;
  payload: { familyId: string; props: CreateMemberProps };
}

export interface CreateMemberSuccessAction
  extends Action<typeof CREATE_MEMBER_SUCCESS> {
  type: typeof CREATE_MEMBER_SUCCESS;
  payload: { familyId: string; props: CreateMemberSuccessResponse };
}

export interface CreateMemberFailureAction
  extends Action<typeof CREATE_MEMBER_FAILURE> {
  type: typeof CREATE_MEMBER_FAILURE;
  payload: string;
}

export interface CreateChildRequestAction
  extends Action<typeof CREATE_CHILD_REQUEST> {
  type: typeof CREATE_CHILD_REQUEST;
  payload: { familyId: string; parentId: string; props: CreateMemberProps };
}

export interface CreateChildSuccessAction
  extends Action<typeof CREATE_CHILD_SUCCESS> {
  type: typeof CREATE_CHILD_SUCCESS;
  payload: {
    familyId: string;
    parentId: string;
    props: CreateMemberSuccessResponse;
  };
}

export interface CreateChildFailureAction
  extends Action<typeof CREATE_CHILD_FAILURE> {
  type: typeof CREATE_CHILD_FAILURE;
  payload: string;
}

export interface UpdateMemberRequest
  extends Action<typeof UPDATE_MEMBER_REQUEST> {
  type: typeof UPDATE_MEMBER_REQUEST;
  payload: { familyId: string; props: UpdateMemberProps };
}

export interface UpdateMemberSuccess
  extends Action<typeof UPDATE_MEMBER_SUCCESS> {
  type: typeof UPDATE_MEMBER_SUCCESS;
  payload: { familyId: string; props: UpdateMemberSuccessResponse };
}

export interface UpdateMemberFailure
  extends Action<typeof UPDATE_MEMBER_FAILURE> {
  type: typeof UPDATE_MEMBER_FAILURE;
  payload: string;
}

export const selectFamilyIdAction = (payload: { familyId: string }) => {
  return {
    type: SELECT_FAMILY_ID,
    payload,
  };
};

export const fetchMembersRequestAction = (payload: { familyId: string }) => {
  return {
    type: FETCH_MEMBERS_REQUEST,
    payload,
  };
};

export const fetchMembersSuccessAction = (payload: {
  familyId: string;
  props: FetchMembersSuccessResponse;
}) => {
  return {
    type: FETCH_MEMBERS_SUCCESS,
    payload: payload,
  };
};

export const fetchMembersFailureAction = (payload: string) => {
  return {
    type: FETCH_MEMBERS_FAILURE,
    payload: payload,
  };
};

export const createMemberRequestAction = (payload: {
  familyId: string;
  props: CreateMemberProps;
}) => {
  return {
    type: CREATE_MEMBER_REQUEST,
    payload,
  };
};

export const createMemberSuccessAction = (payload: {
  familyId: string;
  props: CreateMemberSuccessResponse;
}) => {
  return {
    type: CREATE_MEMBER_SUCCESS,
    payload,
  };
};

export const createMemberFailureAction = (payload: string) => {
  return {
    type: CREATE_MEMBER_FAILURE,
    payload,
  };
};

export const createChildRequestAction = (payload: {
  familyId: string;
  parentId: string;
  props: CreateMemberProps;
}) => {
  return {
    type: CREATE_CHILD_REQUEST,
    payload,
  };
};

export const createChildSuccessAction = (payload: {
  familyId: string;
  parentId: string;
  props: CreateMemberSuccessResponse;
}) => {
  return {
    type: CREATE_CHILD_SUCCESS,
    payload,
  };
};

export const createChildFailureAction = (payload: string) => {
  return {
    type: CREATE_CHILD_FAILURE,
    payload,
  };
};

export const updateMemberRequestAction = (payload: {
  familyId: string;
  props: UpdateMemberProps;
}) => {
  return {
    type: UPDATE_MEMBER_REQUEST,
    payload,
  };
};

export const updateMemberSuccessAction = (payload: {
  familyId: string;
  props: UpdateMemberSuccessResponse;
}) => {
  return {
    type: UPDATE_MEMBER_SUCCESS,
    payload,
  };
};

export const updateMemberFailureAction = (payload: string) => {
  return {
    type: UPDATE_MEMBER_FAILURE,
    payload,
  };
};

export type MembersActions =
  | SelectFamilyIdAction
  | FetchMembersRequestAction
  | FetchMembersSuccessAction
  | FetchMembersFailureAction
  | CreateMemberRequestAction
  | CreateMemberSuccessAction
  | CreateMemberFailureAction
  | CreateChildRequestAction
  | CreateChildSuccessAction
  | CreateChildFailureAction
  | UpdateMemberRequest
  | UpdateMemberSuccess
  | UpdateMemberFailure;
