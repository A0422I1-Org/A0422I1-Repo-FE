import {Room} from "./room";
import {Chair} from "./chair";

export interface ChairRoom {
  id: number;
  room: Room;
  chair: Chair;
  status: boolean;
  isDelete: boolean;
}
