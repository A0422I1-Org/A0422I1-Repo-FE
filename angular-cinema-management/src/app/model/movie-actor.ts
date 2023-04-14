import {Movie} from "./movie";
import {Actor} from "./actor";

export interface MovieActor {
  id: number;
  movie: Movie;
  actor: Actor;
}
