import axios from "axios";
import { Family } from "../models/Family";
import { Member } from "../models/Member";

export type FetchFamilySuccessResponse = Family;
export type FetchFamiliesSuccessResponse = Family[];
export type FetchMembersSuccessResponse = Member[];

export type CreateFamilyProps = Pick<Family, "name">;
export type CreateMemberProps = Pick<Member, "name" | "age">;

export type CreateFamilySuccessResponse = Family;
export type CreateMemberSuccessResponse = Member;

export type UpdateFamilyProps = Partial<Family>;
export type UpdateMemberProps = Partial<Member>;

export type UpdateFamilySuccessResponse = Family;
export type UpdateMemberSuccessResponse = Member;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchFamily(
  familyId: string,
): Promise<FetchFamilySuccessResponse> {
  return api.get(`families/${familyId}`).then((response) => response.data);
}

export async function fetchFamilies(): Promise<FetchFamiliesSuccessResponse> {
  return api.get("families").then((response) => response.data);
}

export async function createFamily(
  props: CreateFamilyProps,
): Promise<CreateFamilySuccessResponse> {
  return api.post("families", props).then((response) => response.data);
}

export async function updateFamily(
  familyId: string,
  props: UpdateFamilyProps,
): Promise<UpdateFamilySuccessResponse> {
  return api
    .put(`families/${familyId}`, props)
    .then((response) => response.data);
}

export async function deleteFamily(familyId: string): Promise<void> {
  return api.delete(`families/${familyId}`).then((response) => response.data);
}

export async function fetchMembers(
  familyId: string,
): Promise<FetchMembersSuccessResponse> {
  return api
    .get(`families/${familyId}/members`)
    .then((response) => response.data);
}

export async function createMember(
  familyId: string,
  props: CreateMemberProps,
): Promise<CreateMemberSuccessResponse> {
  return api
    .post(`families/${familyId}/members`, props)
    .then((response) => response.data);
}

export async function createChild(
  parentId: string,
  props: CreateMemberProps,
): Promise<CreateMemberSuccessResponse> {
  return api
    .post(`members/${parentId}/children`, props)
    .then((response) => response.data);
}

export async function updateMember(
  memberId: string,
  props: UpdateMemberProps,
): Promise<UpdateMemberSuccessResponse> {
  return api
    .put(`members/${memberId}`, props)
    .then((response) => response.data);
}
