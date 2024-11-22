import { Member } from "../../../models/Member";
import {
  CREATE_CHILD_FAILURE,
  CREATE_MEMBER_FAILURE,
  CREATE_CHILD_REQUEST,
  CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS,
  FETCH_MEMBERS_FAILURE,
  FETCH_MEMBERS_REQUEST,
  FETCH_MEMBERS_SUCCESS,
  UPDATE_MEMBER_SUCCESS,
  MembersActions,
  CREATE_CHILD_SUCCESS,
  SELECT_FAMILY_ID,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_FAILURE,
} from "./memberActions";

export interface MembersState {
  selectedFamilyId: string;
  members: { [familyId: string]: Member[] };
  isLoading: boolean;
  error: string | null;
}

export const intialMembersState: MembersState = {
  selectedFamilyId: "",
  members: {},
  isLoading: false,
  error: null,
};

function addChildrenToParent(
  members: Member[],
  parentId: string,
  child: Member,
): Member[] {
  return members.map((member) => {
    if (member.id === parentId) {
      return {
        ...member,
        children: [...member.children, child],
      };
    }
    return {
      ...member,
      children: addChildrenToParent(member.children, parentId, child),
    };
  });
}

function updateChild(members: Member[], updatedChild: Member): Member[] {
  return members.map((member) => {
    if (member.id === updatedChild.id) {
      console.log(member, updatedChild);
      return { ...member, name: updatedChild.name, age: updatedChild.age };
    }

    return { ...member, children: updateChild(member.children, updatedChild) };
  });
}

export function memberReducer(
  state = intialMembersState,
  action: MembersActions,
): MembersState {
  switch (action.type) {
    case SELECT_FAMILY_ID: {
      return {
        ...state,
        selectedFamilyId: action.payload.familyId,
      };
    }
    case FETCH_MEMBERS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case FETCH_MEMBERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        members: {
          ...state.members,
          [action.payload.familyId]: action.payload.props,
        },
        error: null,
      };
    }
    case FETCH_MEMBERS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case CREATE_MEMBER_REQUEST: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case CREATE_MEMBER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        members: {
          ...state.members,
          [action.payload.familyId]: [
            ...state.members[action.payload.familyId],
            action.payload.props,
          ],
        },
      };
    }
    case CREATE_MEMBER_FAILURE: {
      return state;
    }
    case CREATE_CHILD_REQUEST: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case CREATE_CHILD_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        error: null,
        members: {
          ...state.members,
          [action.payload.familyId]: addChildrenToParent(
            state.members[action.payload.familyId],
            action.payload.parentId,
            action.payload.props,
          ),
        },
      };
    }
    case CREATE_CHILD_FAILURE: {
      return state;
    }
    case UPDATE_MEMBER_REQUEST: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case UPDATE_MEMBER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        members: {
          ...state.members,
          [action.payload.familyId]: updateChild(
            state.members[action.payload.familyId],
            action.payload.props,
          ),
        },
      };
    }
    case UPDATE_MEMBER_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
