import {Id, Role, Status, UUID} from "../entities/entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";
import axios, {AxiosResponse} from "axios";
import {BoardItemCategory} from "../entities/BoardItemCategory";

export class BoardItem {
  id?: Id;
  title?: string;
  subtitle?: string;
  caption?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  category?: BoardItemCategory;
  url?: string;
}


export const defaultBoardItems: BoardItem[] = [];
export const defaultBoardItem: BoardItem = {};


export async function getBoardItem(id: Id): Promise<BoardItem> {
  let data = {};
  await servicePath
    .get(`/BoardItems/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      data = res.data
    })
  return data;
}


export async function updateBoardItem(id: Id, BoardItem: BoardItem): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
    .put(`/boardItems/${id}`, BoardItem, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      response = res
    })
  return response;
}

export async function deleteBoardItem(id: Id): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
    .delete(`/boardItems/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      response = res
    })
    .catch(err => {
      return new Error(err.data["message"])
    })
  return response;
}