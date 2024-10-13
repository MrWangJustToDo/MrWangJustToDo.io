import {
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Spacer,
} from "@chakra-ui/react";
import { DiffModeEnum } from "@git-diff-view/react";
import { GoGear } from "react-icons/go";

import { DiffViewSize, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";

export const DiffViewSetting = () => {
  const { size, setMode, mode, setSize, wrap, setWrap, highlight, setHighlight } = useDiffViewConfig();

  return (
    <Popover trigger="click" placement="bottom-end">
      <PopoverTrigger>
        <IconButton icon={<GoGear />} fontSize="xl" color="lightTextColor" aria-label="diff ui setting" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody padding="5">
          <FormControl as="fieldset">
            <FormLabel as="legend">Font Size</FormLabel>
            <RadioGroup defaultValue={size} onChange={setSize}>
              <HStack spacing="24px">
                <Radio value={DiffViewSize.Small}>Small</Radio>
                <Radio value={DiffViewSize.Medium}>Medium</Radio>
                <Radio value={DiffViewSize.Large}>Large</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Spacer marginY="3" borderBottom="1px" borderColor="cardBorderColor" />
          <FormControl as="fieldset">
            <FormLabel as="legend">Diff Mode</FormLabel>
            <RadioGroup defaultValue={mode.toString()} onChange={(l) => setMode(l as unknown as DiffModeEnum)}>
              <HStack spacing="24px">
                <Radio value={DiffModeEnum.Split.toString()}>Split</Radio>
                <Radio value={DiffModeEnum.Unified.toString()}>Unified</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Spacer marginY="3" borderBottom="1px" borderColor="cardBorderColor" />
          <FormControl as="fieldset">
            <FormLabel as="legend">Line Mode</FormLabel>
            <RadioGroup defaultValue={String(wrap)} onChange={(l) => setWrap(l === "true" ? true : false)}>
              <HStack spacing="24px">
                <Radio value="true">Wrap</Radio>
                <Radio value="false">No Wrap</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Spacer marginY="3" borderBottom="1px" borderColor="cardBorderColor" />
          <FormControl as="fieldset">
            <FormLabel as="legend">Highlight Mode</FormLabel>
            <RadioGroup defaultValue={String(highlight)} onChange={(l) => setHighlight(l === "true" ? true : false)}>
              <HStack spacing="24px">
                <Radio value="true">Enable</Radio>
                <Radio value="false">Disable</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
