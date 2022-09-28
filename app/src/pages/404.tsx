import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Index() {
  const { push } = useRouter();
  const open = useToast();

  useEffect(() => {
    open({
      title: "404",
      description: "not found page, redirect to home page",
      status: "error",
    });
    push({
      pathname: "/",
    });
  }, [open, push]);

  return <React.Fragment />;
}
