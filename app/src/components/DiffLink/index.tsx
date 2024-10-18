import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
  Text,
  Tooltip,
  useCallbackRef,
  useDisclosure,
  useSafeLayoutEffect,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useState } from "react";
import { GoCopy, GoPencil, GoSync } from "react-icons/go";

import { useInIframe } from "@app/hooks/useExample";
import { useGitHubCompareSource } from "@app/hooks/useGitHubCompareSource";

import type { InputProps } from "@chakra-ui/react";

// useGitHubCompareSource.getLifeCycle().syncUpdateComponent = true;

const WrapperInput = ({ value, onValueChange, ...last }: { value: string; onValueChange: (v: string) => void } & InputProps) => {
  const [v, setV] = useState(() => value);

  const onValueChangeRef = useCallbackRef(onValueChange);

  const targetV = useDeferredValue(v);

  useEffect(() => {
    onValueChangeRef?.(targetV);
  }, [onValueChangeRef, targetV]);

  return (
    <Input
      value={v}
      onChange={(e) => {
        setV(e.target.value);
        last.onChange?.(e);
      }}
      {...last}
    />
  );
};

export const DiffLink = ({ url }: { url: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { query } = useRouter();

  const toast = useToast();

  const inIframe = useInIframe();

  const { owner, setOwner, repo, setRepo, sourceCommit, setSourceCommit, targetCommit, setTargetCommit, setDirty, restore, refresh, dirty } =
    useGitHubCompareSource();

  const ownerFromQuery = query.owner;

  const repoFromQuery = query.repo;

  const sourceCommitFromQuery = query.sourceCommit;

  const targetCommitFromQuery = query.targetCommit;

  useSafeLayoutEffect(() => {
    if (ownerFromQuery && repoFromQuery && sourceCommitFromQuery && targetCommitFromQuery) {
      setOwner(ownerFromQuery as string);
      setRepo(repoFromQuery as string);
      setSourceCommit(sourceCommitFromQuery as string);
      setTargetCommit(targetCommitFromQuery as string);
      setDirty(false);
    } else {
      restore();
    }
  }, [ownerFromQuery, repoFromQuery, setDirty, setOwner, setRepo, setSourceCommit, setTargetCommit, sourceCommitFromQuery, targetCommitFromQuery]);

  return (
    <Flex alignItems="center">
      <Tooltip label={url}>
        <Text width="360px" noOfLines={1} as="div">
          {url ? url : <SkeletonText noOfLines={1} />}
        </Text>
      </Tooltip>
      <ButtonGroup gap="2" variant="outline">
        <Tooltip label="Edit to show">
          <IconButton aria-label="edit url" icon={<Icon as={GoPencil} />} size="sm" onClick={onOpen} />
        </Tooltip>
        <Tooltip label="Refresh All Diff">
          <IconButton aria-label="refresh" icon={<Icon as={GoSync} />} size="sm" onClick={refresh} />
        </Tooltip>
        <Tooltip label="Share this link to preview">
          <IconButton
            aria-label="share"
            icon={<Icon as={GoCopy} />}
            disabled={dirty}
            display={inIframe ? "none" : "inline-flex"}
            size="sm"
            onClick={async () => {
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set("owner", owner);
              newUrl.searchParams.set("repo", repo);
              newUrl.searchParams.set("sourceCommit", sourceCommit);
              newUrl.searchParams.set("targetCommit", targetCommit);
              await navigator.clipboard.writeText(newUrl.toString());
              toast({ title: "Copied", status: "success" });
            }}
          />
        </Tooltip>
      </ButtonGroup>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside" onCloseComplete={restore}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalHeader>
            <Text>Edit GitHub Repo Compare URL</Text>
          </ModalHeader>
          <ModalBody>
            <Flex justifyContent="space-around">
              <Flex width="45%" flexDirection="column" rowGap="4">
                <FormControl>
                  <FormLabel>Owner: </FormLabel>
                  <WrapperInput value={owner} onValueChange={setOwner} size="sm" />
                </FormControl>
                <FormControl>
                  <FormLabel>Repo: </FormLabel>
                  <WrapperInput value={repo} onValueChange={setRepo} size="sm" />
                </FormControl>
              </Flex>
              <Flex width="45%" flexDirection="column" rowGap="4">
                <FormControl>
                  <FormLabel>Source Commit: </FormLabel>
                  <WrapperInput value={sourceCommit} onValueChange={setSourceCommit} size="sm" />
                </FormControl>
                <FormControl>
                  <FormLabel>Target Commit: </FormLabel>
                  <WrapperInput value={targetCommit} onValueChange={setTargetCommit} size="sm" />
                </FormControl>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setDirty(false);
                onClose();
              }}
            >
              Conform
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
