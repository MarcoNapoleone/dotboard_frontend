import {Id, Role, Status, UUID} from "../entities/entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class Board {
  id?: Id;
  uuid?: UUID;
  name?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
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

export async function updateBoard(id: Id, board: Board): Promise<Board> {
  let data = {};
  await servicePath
      .put(`/boards/${board.id}`, board, {
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