import { Footer } from "components/Footer";
import { Head } from "components/Head";
import { Header } from "components/Header";
import { ModuleManager } from "components/ModuleManager";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Head />
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
