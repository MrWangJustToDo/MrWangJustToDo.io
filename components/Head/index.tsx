import OriginalHead from "next/head";

export const Head = () => {
  return (
    <OriginalHead>
      <title>Blog.</title>
      <link rel="icon" href="favicon.ico" />
    </OriginalHead>
  );
};
