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
/* moment */
interface TimeToString {
  (props: Date | string): string;
}

export type { TimeToString };

/* dom */
type Arguments = string | string[] | (() => string)[] | (() => string) | (() => string[]);

interface TransformArray {
  (args: Arguments[]): string[];
}
interface GetClass {
  (...args: Arguments[]): string;
}

export type { TransformArray, GetClass };
