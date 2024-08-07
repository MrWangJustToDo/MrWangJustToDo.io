
import { useGitHubCompare } from "@app/hooks/useGitHubCompare";
import { usePlayGround } from "@app/hooks/usePlayGround";

import { GitHubCompareModal } from "../GitHubCompare";
import { PlayGroundModal } from "../PlayGround";

import type { ReactNode } from "react";

export const GlobalModal = ({ children }: { children: ReactNode }) => {
  const { isOpen: isOpen1 } = usePlayGround();
  const { isOpen: isOpen2 } = useGitHubCompare();
  return (
    <>
      {!isOpen1 && !isOpen2 && children}
      <GitHubCompareModal />
      <PlayGroundModal />
    </>
  );
};
