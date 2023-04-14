import {Movie} from "./movie";
import {MovieStudio} from "./movie-studio";

export interface MovieAndStudio {
  id: number;
  movie: Movie;
  movieStudio: MovieStudio;
}
