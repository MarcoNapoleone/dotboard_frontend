import {Id, UUID} from "../entities/entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class API {
  id?: Id;
  name?: string;
  url?: string;
  method?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultAPIs: API[] = [];
export const defaultAPI: API = {};


export async function getAllAPIs(): Promise<API[]> {
  let data = [];
  await servicePath
      .get('/apis', {
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

export async function getAPI(id: Id): Promise<API> {
  let data = {};
  await servicePath
      .get(`/apis/${id}`, {
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

export async function createAPI(api: API): Promise<API> {
  let data = {};
  await servicePath
      .post('/apis', api, {
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

export async function updateAPI(api: API): Promise<API> {
  let data = {};
  await servicePath
      .put(`/apis/${api.id}`, api, {
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