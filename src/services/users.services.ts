import {Id, Role, Status, UUID} from "../entities/entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class User {
  id?: Id;
  uuid?: UUID;
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
  password?: string;
  status?: Status;
  role?: Role;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultUsers: User[] = [];
export const defaultUser: User = {};

export async function getUserByUsername(username: string): Promise<User> {
  let data = {};
  await servicePath.get(`/users/findByUsername/${username}`,{
    headers: {
      'Authorization': `Bearer ${getCookie('token')}`
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