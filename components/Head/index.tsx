import OriginalHead from "next/head";

export const Head = () => {
  return (
    <OriginalHead>
      <title>Hello Blog</title>
      <link rel="icon" href="/favicon.ico" />
    </OriginalHead>
  );
};
