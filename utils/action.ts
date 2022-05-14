export function actionHandler<T, K>(
  state: T | void | null | undefined,
  action: (props: T) => K
): K | Promise<void>;
export function actionHandler<T, K, V>(
  state: T | void | null | undefined,
  action: (props: T) => K,
  otherAction: () => V
): K | V;
export function actionHandler<T, K, V>(
  state: T | void | null | undefined,
  action: (props: T) => K,
  otherAction?: () => V
) {
  if (state) {
    return action(state);
  } else if (otherAction) {
    return otherAction();
  } else {
    return Promise.resolve();
  }
}
