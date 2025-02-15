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
  Portal,
  Radio,
  RadioGroup,
  Spacer,
  Box,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { DiffModeEnum } from "@git-diff-view/react";
import { forwardRef } from "react";
import { GoGear } from "react-icons/go";

import { DiffViewSize, HighlightEngine, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { useInComparePage } from "@app/hooks/useExample";

import { ColorMode } from "../ColorMode";

import type { ButtonProps } from "@chakra-ui/react";

export const DiffViewSetting = () => {
  const { size, setMode, mode, setSize, wrap, setWrap, highlight, setHighlight, autoLoad, setAutoLoad, engine, setEngine } = useDiffViewConfig();

  const isInComparePage = useInComparePage();

  const ForwardRefButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <PopoverTrigger>
      <IconButton ref={ref} icon={<Icon as={GoGear} />} fontSize="xl" color="lightTextColor" aria-label="diff ui setting" {...props} />
    </PopoverTrigger>
  ));

  ForwardRefButton.displayName = "IconButtonWithRef";

  return (
    <Box display="inline-block">
      {!isInComparePage && <ColorMode fontSize="xl" color="lightTextColor" marginRight="3" variant={undefined} size={undefined} />}
      <Popover trigger="click" placement="bottom-end">
        <Tooltip label="Diff config" closeOnClick={false}>
          <ForwardRefButton />
        </Tooltip>
        <Portal appendToParentPortal={false}>
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
              <Spacer marginY="3" borderBottom="1px" borderColor="cardBorderColor" />
              <FormControl as="fieldset">
                <FormLabel as="legend">Highlight Engine (reload require)</FormLabel>
                <RadioGroup defaultValue={String(engine)} onChange={(l) => setEngine(l as HighlightEngine)}>
                  <HStack spacing="24px">
                    <Radio value={HighlightEngine.lowlight}>{HighlightEngine.lowlight}</Radio>
                    <Radio value={HighlightEngine.shiki}>{HighlightEngine.shiki}</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Spacer marginY="3" borderBottom="1px" borderColor="cardBorderColor" />
              <FormControl as="fieldset">
                <FormLabel as="legend">AutoLoad FullDiff</FormLabel>
                <RadioGroup defaultValue={String(autoLoad)} onChange={(l) => setAutoLoad(l === "true" ? true : false)}>
                  <HStack spacing="24px">
                    <Radio value="true">Enable</Radio>
                    <Radio value="false">Disable</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};
