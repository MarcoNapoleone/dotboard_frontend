import {Id, Role, Status, UUID} from "../entities/entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";
import axios, {AxiosResponse} from "axios";
import {BoardItem} from "./boardItems.services";

export class Board {
  id?: Id;
  uuid?: UUID;
  name?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
  publicLink?: string;
  description?: string;
  boardItems?: BoardItem[];
}


export const defaultBoards: Board[] = [];
export const defaultBoard: Board = {};

export async function getAllBoards(): Promise<Board[]> {
  let data = [];
  await servicePath
      .get('/boards', {
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

export async function getBoard(id: Id): Promise<Board> {
  let data = {};
  await servicePath
      .get(`/boards/${id}`, {
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

export async function createBoard(board: Board): Promise<Board> {
  let data = {};
  await servicePath
      .post('/boards', board, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`
        }
      })
      .then(res => {
        if (res.status !== 201) {
          return new Error(res.data["message"])
        }
        data = res.data
      })
  return data;
}

export async function updateBoard(id: Id, board: Board): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
      .put(`/boards/${id}`, board, {
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

export async function deleteBoard(id: Id): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
      .delete(`/boards/${id}`, {
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

export async function getBoardItems(id: Id): Promise<BoardItem[]> {
  let data = [];
  await servicePath
      .get(`/boards/${id}/boardItems`, {
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

export async function addBoardItem(id: Id, boardItem: BoardItem): Promise<BoardItem> {
  let data = {};
  await servicePath
      .post(`/boards/${id}/boardItems`, boardItem, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`
        }
      })
      .then(res => {
        if (res.status !== 201) {
          return new Error(res.data["message"])
        }
        data = res.data
      })
  return data;
}