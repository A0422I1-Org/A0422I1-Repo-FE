import {MovieType} from "../model/movie-type";
import {Actor} from "../model/actor";
import {MovieStudio} from "../model/movie-studio";
import {Director} from "../model/director";

export interface MovieDetailDto {
  id: number;
  name: string;
  image: string;
  startDay: string;
  timeAmount: number;
  description: string;
  status: boolean;
  trailer: string;
  rating: number;
  language: string;
  isDelete: boolean;

  movieTypes: MovieType;
  actors: Actor;
  movieStudios: MovieStudio;
  directors: Director;
}
