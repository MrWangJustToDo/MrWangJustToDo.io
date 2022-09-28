import { Footer } from "../Footer";
import { Head } from "../Head";
import { Header } from "../Header";
import { LockBody } from "../LockBody";
import { ModuleManager } from "../ModuleManager";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Head />
      <LockBody />
      <ModuleManager>
        <div id="page-header">
          <Header />
        </div>
        <div id="page-content">{children}</div>
        <div id="page-footer">
          <Footer />
        </div>
      </ModuleManager>
    </>
  );
};
