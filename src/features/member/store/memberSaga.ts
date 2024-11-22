import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_CHILD_REQUEST,
  CREATE_MEMBER_REQUEST,
  createChildFailureAction,
  CreateChildRequestAction,
  createChildSuccessAction,
  createMemberFailureAction,
  CreateMemberRequestAction,
  createMemberSuccessAction,
  FETCH_MEMBERS_REQUEST,
  fetchMembersFailureAction,
  FetchMembersRequestAction,
  fetchMembersSuccessAction,
  UPDATE_MEMBER_REQUEST,
  updateMemberFailureAction,
  UpdateMemberRequest,
  updateMemberSuccessAction,
} from "./memberActions";
import {
  createChild,
  createMember,
  fetchMembers,
  updateMember,
} from "../../../shared/api";

function* fetchMembersEffect(action: FetchMembersRequestAction): Generator {
  try {
    const response = yield call(fetchMembers, action.payload.familyId);
    yield put(
      fetchMembersSuccessAction({
        familyId: action.payload.familyId,
        props: response,
      }),
    );
  } catch {
    yield put(fetchMembersFailureAction("Something went wrong"));
  }
}

function* createMemberEffect(action: CreateMemberRequestAction): Generator {
  try {
    const response = yield call(
      createMember,
      action.payload.familyId,
      action.payload.props,
    );
    yield put(
      createMemberSuccessAction({
        familyId: action.payload.familyId,
        props: response,
      }),
    );
  } catch {
    yield put(createMemberFailureAction("Something went wrong"));
  }
}

function* createChildEffect(action: CreateChildRequestAction): Generator {
  try {
    const response = yield call(
      createChild,
      action.payload.parentId,
      action.payload.props,
    );
    yield put(
      createChildSuccessAction({
        familyId: action.payload.familyId,
        parentId: action.payload.parentId,
        props: response,
      }),
    );
  } catch {
    yield put(createChildFailureAction("Something went wrong"));
  }
}

function* updateChildEffect(action: UpdateMemberRequest): Generator {
  try {
    const response = yield call(
      updateMember,
      action.payload.props.id as string,
      action.payload.props,
    );
    yield put(
      updateMemberSuccessAction({
        familyId: action.payload.familyId,
        props: response,
      }),
    );
  } catch (e) {
    yield put(updateMemberFailureAction("Something went wrong"));
  }
}

export function* membersSaga() {
  yield takeEvery(FETCH_MEMBERS_REQUEST, fetchMembersEffect);
  yield takeEvery(CREATE_MEMBER_REQUEST, createMemberEffect);
  yield takeEvery(CREATE_CHILD_REQUEST, createChildEffect);
  yield takeEvery(UPDATE_MEMBER_REQUEST, updateChildEffect);
}
