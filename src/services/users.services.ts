import {Id, Role, Status, UUID} from "../entities/entities";

export class User {
    id?: Id;
    uuid?: UUID;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    status?: Status;
    role?: Role;
    createdAt?: Date;
    deletedAt?: Date;
    version?: number;
    updatedAt?: Date;
}