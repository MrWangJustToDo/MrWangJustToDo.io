import { useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

import { Footer } from "../Footer";
import { Head } from "../Head";
import { Header } from "../Header";
import { LockBody } from "../LockBody";
import { ModuleManager } from "../ModuleManager";

const Bg = memo(function Bg() {
  const bg = useColorModeValue("./bg-light.jpeg", "./bg.jpeg");
  return (
    <AnimatePresence>
      <motion.div
        key={bg}
        className="page-bg"
        style={{
          width: "100vw",
          height: "100%",
          position: "fixed",
          zIndex: "-1",
          top: "0",
          left: "0",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${bg})`,
        }}
        initial={{ y: 30, opacity: 0, scale: 1.15 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -30, opacity: 0, scale: 0.95, borderRadius: "16px" }}
        transition={{ duration: 0.26 }}
      />
    </AnimatePresence>
  );
});

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Head />
      <LockBody />
      <Bg />
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
