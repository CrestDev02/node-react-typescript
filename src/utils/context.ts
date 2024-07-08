import { createContext } from "react";
import { IContext } from "../types/context";

export const Context = createContext<IContext | {}>({})