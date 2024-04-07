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
      <IconButton color="gray" variant="outline" aria-label="about me" title="about me" onClick={onOpen} icon={<Icon as={FaUserTie} fontSize="xl" />} />
      <Modal size={isMobile ? "full" : "4xl"} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Resume</Tab>
                <Tab>Github</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex alignItems="flex-start" justifyContent="space-around" flexDirection={{ base: "column", md: "row" }}>
                    <AspectRatio ratio={11 / 16} width={{ base: "95%", md: "45%" }} border="1px">
                      <Image src={resourceUri("./1.png")} width="100%" alt="about me" />
                    </AspectRatio>
                    <AspectRatio ratio={11 / 16} width={{ base: "95%", md: "45%" }} border="1px">
                      <Image src={resourceUri("./2.png")} width="100%" alt="about me" />
                    </AspectRatio>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Box marginTop="4em" />
                  <GitHubCalendar username="MrWangJustToDo" />
                  <Box marginBottom="4em" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
