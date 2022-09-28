import { RemoveScroll } from "react-remove-scroll";

import { useLockBodyCount } from "@app/hooks/useLockBodyScroll";

export const LockBody = () => {
  const count = useLockBodyCount();

  return (
    <RemoveScroll enabled={count > 0} className="placeholder" as="span">
      <></>
    </RemoveScroll>
  );
};
