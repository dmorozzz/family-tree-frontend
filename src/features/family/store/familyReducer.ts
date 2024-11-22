import { Family } from "../../../models/Family";
import {
  CREATE_FAMILY_FAILURE,
  CREATE_FAMILY_SUCCESS,
  DELETE_FAMILY_FAILURE,
  DELETE_FAMILY_REQUEST,
  DELETE_FAMILY_SUCCESS,
  FamiliesActions,
  FETCH_FAMILIES_FAILURE,
  FETCH_FAMILIES_REQUEST,
  FETCH_FAMILIES_SUCCESS,
  UPDATE_FAMILY_FAILURE,
  UPDATE_FAMILY_REQUEST,
  UPDATE_FAMILY_SUCCESS,
} from "./familyActions";

export interface FamilyState {
  families: Family[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FamilyState = {
  families: [],
  isLoading: false,
  error: null,
};

export function familyReducer(
  state: FamilyState = initialState,
  action: FamiliesActions,
) {
  switch (action.type) {
    case FETCH_FAMILIES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_FAMILIES_SUCCESS:
      return {
        ...state,
        families: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_FAMILIES_FAILURE:
      return {
        ...state,
        families: [],
        isLoading: false,
        error: action.payload,
      };
    case CREATE_FAMILY_SUCCESS:
      return {
        ...state,
        families: [...state.families, action.payload as unknown as Family],
        isLoading: false,
        error: null,
      };
    case CREATE_FAMILY_FAILURE:
      return state;
    case UPDATE_FAMILY_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case UPDATE_FAMILY_SUCCESS:
      return {
        ...state,
        families: state.families.map((family) => {
          if (family.id !== action.payload.id) {
            return family;
          }

          return action.payload;
        }),
        isLoading: false,
        error: null,
      };
    case UPDATE_FAMILY_FAILURE:
      return state;
    case DELETE_FAMILY_REQUEST:
      return { ...state, isLoading: false, error: null };
    case DELETE_FAMILY_SUCCESS:
      return {
        ...state,
        families: state.families.filter(
          (family) => family.id !== action.payload.familyId,
        ),
        isLoading: false,
        error: null,
      };
    case DELETE_FAMILY_FAILURE:
      return state;
    default:
      return state;
  }
}
