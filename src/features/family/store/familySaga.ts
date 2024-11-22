import { call, put, takeEvery } from "redux-saga/effects";
import {
  createFamily,
  deleteFamily,
  fetchFamilies,
  updateFamily,
} from "../../../shared/api";
import {
  CREATE_FAMILY_REQUEST,
  createFamilyFailure,
  CreateFamilyRequestAction,
  createFamilySuccess,
  DELETE_FAMILY_REQUEST,
  deleteFamilyFailure,
  DeleteFamilyRequestAction,
  deleteFamilySuccess,
  FETCH_FAMILIES_REQUEST,
  fetchFamiliesFailure,
  fetchFamiliesSuccess,
  UPDATE_FAMILY_REQUEST,
  updateFamilyFailure,
  UpdateFamilyRequestAction,
  updateFamilySuccess,
} from "./familyActions";

function* fetchFamiliesEffect(): Generator {
  try {
    const response = yield call(fetchFamilies);
    yield put(fetchFamiliesSuccess(response));
  } catch {
    yield put(fetchFamiliesFailure("Something went wrong"));
  }
}

function* createFamilyEffect(action: CreateFamilyRequestAction): Generator {
  try {
    const response = yield call(createFamily, action.payload);
    yield put(createFamilySuccess(response));
  } catch {
    yield put(createFamilyFailure("Something went wrong"));
  }
}

function* updateFamilyEffect(action: UpdateFamilyRequestAction): Generator {
  try {
    const response = yield call(
      updateFamily,
      action.payload.familyId,
      action.payload.props,
    );
    yield put(updateFamilySuccess(response));
  } catch {
    yield put(updateFamilyFailure("Something went wrong"));
  }
}

function* deleteFamilyEffect(action: DeleteFamilyRequestAction): Generator {
  try {
    yield call(deleteFamily, action.payload.familyId);
    yield put(deleteFamilySuccess({ familyId: action.payload.familyId }));
  } catch {
    yield put(deleteFamilyFailure("Something went wrong"));
  }
}

export function* familiesSaga() {
  yield takeEvery(FETCH_FAMILIES_REQUEST, fetchFamiliesEffect);
  yield takeEvery(CREATE_FAMILY_REQUEST, createFamilyEffect);
  yield takeEvery(UPDATE_FAMILY_REQUEST, updateFamilyEffect);
  yield takeEvery(DELETE_FAMILY_REQUEST, deleteFamilyEffect);
}
