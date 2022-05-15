import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { mark } from "utils/markdown";
import { BLOG_REPOSITORY, BLOG_REPOSITORY_OWNER } from "config/source";
import { GetSingleBlogDocument } from "graphql/generated";

export const DetailModal = ({ id }: { id: string }) => {
  const open = useToast();

  const { data, loading, error } = useQuery(GetSingleBlogDocument, {
    variables: {
      name: BLOG_REPOSITORY,
      owner: BLOG_REPOSITORY_OWNER,
      number: Number(id),
    },
    skip: id === undefined,
  });

  const rendered = useMemo(() => {
    if (data?.repository?.issue?.body) {
      return mark.render(data.repository.issue.body);
    } else {
      return "";
    }
  }, [data]);

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    open({
      title: "Get Detail Error",
      description: error.message,
      status: "error",
    });

    return <React.Fragment />;
  }

  return (
    <div
      className="typo"
      id="blog-content"
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};
