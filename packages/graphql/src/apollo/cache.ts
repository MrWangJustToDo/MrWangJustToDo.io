import { InMemoryCache } from "@apollo/client";

export const autoMergeCache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        issues: {
          keyArgs: false,
          merge(existing = { nodes: [] }, incoming) {
            return {
              ...existing,
              ...incoming,
              nodes: [...existing.nodes, ...incoming.nodes],
            };
          },
        },
      },
    },
    Issue: {
      fields: {
        comments: {
          keyArgs: false,
          merge(existing = { nodes: [] }, incoming) {
            const isList = !!incoming.nodes;
            if (isList) {
              const addedNodes = incoming.nodes.filter((node: Record<string, unknown>) =>
                existing.nodes.every((_node: Record<string, unknown>) => _node.__ref !== node.__ref),
              );
              return {
                ...existing,
                ...incoming,
                nodes: [...existing.nodes, ...addedNodes],
              };
            } else {
              return existing;
            }
          },
        },
      },
    },
  },
});

export const plainCache = new InMemoryCache();
