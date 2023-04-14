import {Movie} from "./movie";

export interface Showtime {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  movie: Movie;
  soldOut: boolean;
  isDelete: boolean;
}
