import { IncomingHttpHeaders } from "http";
import { AxiosRequestConfig, Method } from "axios";

/* delay */
interface Cancel {
  (key: string): void;
}
interface Delay {
  <T>(time: number, action?: () => T, key?: string): Promise<T | void>;
}
interface TimeoutMap {
  [props: string]: Array<NodeJS.Timeout | void>;
}
interface RejectMap {
  [props: string]: Array<(() => void) | void>;
}
interface KeyMap {
  [props: string]: number;
}

export type { Cancel, Delay, TimeoutMap, RejectMap, KeyMap };
