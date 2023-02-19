import axios from "axios";
import { Note, NewNote } from "./types";

export const getAllNotes = () => {
  return axios
    .get<Note[]>("http://localhost:3001/notes")
    .then((response) => response.data);
};

export const createNote = (object: NewNote) => {
  return axios
    .post<Note>("http://localhost:3001/notes", object)
    .then((response) => response.data);
};
