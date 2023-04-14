import {Movie} from "./movie";
import {MovieType} from "./movie-type";

export interface MovieAndType {
  id: number;
  movie: Movie;
  movieType: MovieType;
}
