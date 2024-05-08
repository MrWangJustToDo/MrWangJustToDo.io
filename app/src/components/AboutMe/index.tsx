import {
  AspectRatio,
  Box,
  Flex,
  Icon,
  IconButton,
  Modal,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from "@chakra-ui/react";
import GitHubCalendar from "react-github-calendar";
import { FaUserTie } from "react-icons/fa";

import { useAboutMe } from "@app/hooks/useAboutMe";
import { useIsMobile } from "@app/hooks/useIsMobile";
import { resourceUri } from "@app/utils/resourceUri";

export const AboutMe = () => {
  const isMobile = useIsMobile();

  const { isOpen, onClose, onOpen } = useAboutMe();

  return (
    <>
      <Tooltip label="AboutMe">
        <IconButton
          color="gray"
          variant="outline"
          aria-label="AboutMe"
          title="AboutMe"
          size="sm"
          onClick={onOpen}
          icon={<Icon as={FaUserTie} fontSize="xl" />}
        />
      </Tooltip>
      <Modal size={isMobile ? "full" : "4xl"} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton zIndex="popover" />
          <ModalBody>
            <Tabs variant="enclosed">
              <TabList position="sticky" top="0" zIndex="sticky" backgroundColor="var(--modal-bg)">
                <Tab>Github</Tab>
                <Tab>Resume</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box marginTop="4em" />
                  <GitHubCalendar username="MrWangJustToDo" />
                  <Box marginBottom="4em" />
                </TabPanel>
                <TabPanel>
                  <Flex alignItems="flex-start" justifyContent="space-around" flexDirection={{ base: "column", md: "row" }} rowGap="1em">
                    <AspectRatio
                      ratio={11 / 16}
                      width={{ base: "95%", md: "45%" }}
                      marginX={{ base: "auto", md: undefined }}
                      border="1px"
                      borderColor="gray.400"
                      rounded="4px"
                      overflow="clip"
                    >
                      <Image src={resourceUri("./1.png")} width="100%" alt="about me" />
                    </AspectRatio>
                    <AspectRatio
                      ratio={11 / 16}
                      width={{ base: "95%", md: "45%" }}
                      marginX={{ base: "auto", md: undefined }}
                      border="1px"
                      borderColor="gray.400"
                      rounded="4px"
                      overflow="clip"
                    >
                      <Image src={resourceUri("./2.png")} width="100%" alt="about me" />
                    </AspectRatio>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
