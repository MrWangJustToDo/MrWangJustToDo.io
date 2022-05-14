import { useRouter } from "next/router";

export const useGetListParams = () => {
  const { query = {} } = useRouter();
  const before = query.before as string;
  const after = query.after as string;

  return { before, after };
};
