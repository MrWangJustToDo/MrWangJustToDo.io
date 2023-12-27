import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Button, Tooltip } from "@chakra-ui/react";

export const MyReact = () => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: { owner: "mrwangjusttodo", name: "MyReact" } });

  if (!data)
    return (
      <Button
        as="a"
        size="sm"
        color="red.300"
        target="_blank"
        variant="outline"
        href="https://github.com/MrWangJustToDo/MyReact"
        title="https://github.com/MrWangJustToDo/MyReact"
      >
        @my-react
      </Button>
    );

  return (
    <Tooltip label={<div dangerouslySetInnerHTML={{ __html: data?.repository?.descriptionHTML }} />} placement="bottom-start">
      <Button
        as="a"
        size="sm"
        color="red.300"
        target="_blank"
        variant="outline"
        href="https://github.com/MrWangJustToDo/MyReact"
        title="https://github.com/MrWangJustToDo/MyReact"
      >
        @my-react
      </Button>
    </Tooltip>
  );
};

export const RStore = () => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: { owner: "mrwangjusttodo", name: "reactivity-store" } });

  if (!data)
    return (
      <Button
        as="a"
        size="sm"
        color="red.300"
        target="_blank"
        variant="outline"
        href="https://github.com/MrWangJustToDo/r-store"
        title="https://github.com/MrWangJustToDo/r-store"
      >
        RStore
      </Button>
    );

  return (
    <Tooltip label={<div dangerouslySetInnerHTML={{ __html: data?.repository?.descriptionHTML }} />}>
      <Button
        as="a"
        size="sm"
        color="red.300"
        target="_blank"
        variant="outline"
        href="https://github.com/MrWangJustToDo/r-store"
        title="https://github.com/MrWangJustToDo/r-store"
      >
        RStore
      </Button>
    </Tooltip>
  );
};

export const SSR = () => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: { owner: "mrwangjusttodo", name: "react-ssr-setup" } });

  if (!data)
    return (
      <Button
        as="a"
        size="sm"
        color="red.300"
        target="_blank"
        variant="outline"
        href="https://github.com/MrWangJustToDo/react-ssr-setup"
        title="https://github.com/MrWangJustToDo/react-ssr-setup"
      >
        SSR template
      </Button>
    );

  return (
    <Tooltip label={<div dangerouslySetInnerHTML={{ __html: data?.repository?.descriptionHTML }} />}>
      <Button
        as="a"
        size="sm"
        color="red.300"
        target="_blank"
        variant="outline"
        href="https://github.com/MrWangJustToDo/react-ssr-setup"
        title="https://github.com/MrWangJustToDo/react-ssr-setup"
      >
        SSR template
      </Button>
    </Tooltip>
  );
};
