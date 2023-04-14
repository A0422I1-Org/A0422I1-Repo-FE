import {Movie} from "./movie";
import {Director} from "./director";

export interface MovieDirector {
  id: number;
  movie: Movie;
  director: Director;
}
