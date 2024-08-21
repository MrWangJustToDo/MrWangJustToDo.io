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
  Tag,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

import { useGitHubCompareSource, useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

useGitHubCompareSource.getLifeCycle().syncUpdateComponent = true;

export const DiffLink = ({ url }: { url: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { list, loading } = useGitHubCompareSourceList((s) => ({ list: s.list, loading: s.loading }));

  const { owner, setOwner, repo, setRepo, sourceCommit, setSourceCommit, targetCommit, setTargetCommit, setDirty, restore, refresh } = useGitHubCompareSource();

  return (
    <Flex alignItems="center">
      <Tooltip label={url}>
        <Text width="360px" noOfLines={1} as="div">
          {url ? url : <SkeletonText noOfLines={1} />}
        </Text>
      </Tooltip>
      <ButtonGroup gap="2" variant="outline">
        <IconButton aria-label="edit url" icon={<Icon as={BiEdit} />} size="sm" onClick={onOpen} />
        <IconButton aria-label="refresh" icon={<Icon as={AiOutlineReload} />} size="sm" onClick={refresh} />
      </ButtonGroup>
      {!loading && (
        <Text marginLeft="10">
          Total <Tag colorScheme="gray">{list.length}</Tag> files
        </Text>
      )}
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
                  <Input value={owner} onChange={(e) => setOwner(e.target.value)} size="sm" />
                </FormControl>
                <FormControl>
                  <FormLabel>Repo: </FormLabel>
                  <Input value={repo} onChange={(e) => setRepo(e.target.value)} size="sm" />
                </FormControl>
              </Flex>
              <Flex width="45%" flexDirection="column" rowGap="4">
                <FormControl>
                  <FormLabel>Source Commit: </FormLabel>
                  <Input value={sourceCommit} onChange={(e) => setSourceCommit(e.target.value)} size="sm" />
                </FormControl>
                <FormControl>
                  <FormLabel>Target Commit: </FormLabel>
                  <Input value={targetCommit} onChange={(e) => setTargetCommit(e.target.value)} size="sm" />
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
