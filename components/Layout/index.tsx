import { Head } from "components/Head";
import { ModuleManager } from "components/ModuleManager";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Head />
      <ModuleManager>{children}</ModuleManager>
    </>
  );
};
