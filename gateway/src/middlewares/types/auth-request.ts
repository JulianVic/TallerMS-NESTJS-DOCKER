import { Request } from "express";

export type AuthRequestMiddleware = Request & {user?: { id: string, name: string, email: string}, token?: string}
export type AuthRequestController = Request & {user: { id: string, name: string, email: string}, token: string}