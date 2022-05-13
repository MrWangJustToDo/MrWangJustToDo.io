import { Head } from "components/Head";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Head />
      {children}
    </>
  );
};
