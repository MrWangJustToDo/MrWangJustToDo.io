import {
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";

import { useGitHubCompareSource } from "@app/hooks/useGitHubCompareSource";

export const DiffLink = ({ url }: { url: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { owner, setOwner, repo, setRepo, sourceCommit, setSourceCommit, targetCommit, setTargetCommit, setDirty, restore } = useGitHubCompareSource();

  return (
    <Flex alignItems="center">
      <Tooltip label={url}>
        <Text width="360px" noOfLines={1}>
          {url ? url : <SkeletonText noOfLines={1} />}
        </Text>
      </Tooltip>
      <IconButton aria-label="edit url" icon={<Icon as={BiEdit} />} size="sm" onClick={onOpen} />
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
