import OriginalHead from "next/head";

export const Head = () => {
  return (
    <OriginalHead>
      <title>Blog.</title>
      {__DEV__ ? <base href="/" /> : <base href="/MrWangJustToDo.io/" />}
      <link rel="icon" href="./favicon.ico" />
    </OriginalHead>
  );
};
