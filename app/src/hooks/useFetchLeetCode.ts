import { useCallbackRef, useSafeLayoutEffect, useToast } from "@chakra-ui/react";
import { createRequest } from "project-tool/request";
import { useEffect, useRef, useState } from "react";

const request = createRequest({ baseURL: "https://raw.githubusercontent.com/MrWangJustToDo/leetcode/main", timeout: 5000 });

const allPath = ["/LeetCode1.html", "/LeetCode2.html", "/LeetCode3.html", "/LeetCode4.html", "/LeetCode5.html", "/LeetCode6.html", "/LeetCode7.html"];

export const useFetchLeetCode = () => {
  const [content, setContent] = useState<string[][]>(Array(allPath.length));
  const [loading, setLoading] = useState(false);
  const open = useToast();

  const domParseRef = useRef<DOMParser>(null);

  useSafeLayoutEffect(() => {
    domParseRef.current = new DOMParser();
  }, []);

  const fetchAll = useCallbackRef(async () => {
    setLoading(true);
    const all = await Promise.allSettled(
      allPath.map((path) =>
        request
          .get<string>(path)
          .then((r) => r.data)
          .then((r) => domParseRef.current.parseFromString(r, "text/html"))
          .then((d) => {
            const head = d.head;
            const allScripts = Array.from(head.querySelectorAll("script"));
            return allScripts.map((s) => s.textContent);
          }),
      ),
    );
    if (all.some((i) => i.status === "rejected")) {
      open({
        title: "fetch error",
        description: "can not fetch result",
        status: "error",
      });
    }
    setContent(all.map((i) => (i.status === "fulfilled" ? i.value : [])));
    setLoading(false);
  });

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { content, loading };
};
