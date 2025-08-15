import {
  Flex,
  ButtonGroup,
  IconButton,
  Icon,
  Popover,
  Tooltip,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Button,
  Text,
  PopoverTrigger,
  Box,
} from "@chakra-ui/react";
import { DiffModeEnum, type DiffFile } from "@git-diff-view/react";
import {
  LoaderCircleIcon as AiOutlineLoading,
  ChevronDownIcon as GoChevronDown,
  ActivityIcon as GoPulse,
  SquareArrowOutUpRightIcon as GoLinkExternal,
  FoldVerticalIcon as GoFold,
  UnfoldVerticalIcon as GoUnfold,
} from "lucide-react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";

import { useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { usePrevious } from "@app/hooks/usePrevious";

import type { GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import type { IconButtonProps } from "@chakra-ui/react";

const LargerFile = 1000;

const MaxFile = 10000;

export const DiffItemHeader = ({
  isOpen,
  item,
  diffFile,
  loading,
  autoLoad,
  content,
  link,
  _onToggle,
  loadFullContentDiff,
  scrollToCurrent,
}: {
  isOpen: boolean;
  item: GitHubCompareFileListType;
  diffFile: DiffFile;
  loading: boolean;
  autoLoad: boolean;
  content?: string;
  link?: string;
  _onToggle: () => void;
  loadFullContentDiff: () => void;
  scrollToCurrent: () => Promise<void>;
}) => {
  const [splitExpandAll, setSplitExpandAll] = useState(() => diffFile?.hasExpandSplitAll);

  const [unifiedExpandAll, setUnifiedExpandAll] = useState(() => diffFile?.hasExpandUnifiedAll);

  const previousSplitExpand = usePrevious(splitExpandAll);

  const previousUnifiedExpand = usePrevious(unifiedExpandAll);

  const mode = useDiffViewConfig.useShallowStableSelector((s) => s.mode);

  const onToggle = useCallback(() => {
    scrollToCurrent().then(() => _onToggle());
  }, [_onToggle, scrollToCurrent]);

  const onExpandToggle = useCallback(() => {
    scrollToCurrent().then(() => {
      if (useDiffViewConfig.getReadonlyState().mode?.toString() === DiffModeEnum.Unified.toString()) {
        setUnifiedExpandAll((l) => !l);
      } else {
        setSplitExpandAll((l) => !l);
      }
    });
  }, [scrollToCurrent]);

  useEffect(() => {
    if (mode?.toString() === DiffModeEnum.Unified.toString()) return;
    if (previousSplitExpand !== splitExpandAll && diffFile) {
      if (splitExpandAll) {
        diffFile.onAllExpand("split");
      } else {
        diffFile.onAllCollapse("split");
      }
    }
  }, [previousSplitExpand, splitExpandAll, diffFile, mode]);

  useEffect(() => {
    if (mode?.toString() !== DiffModeEnum.Unified.toString()) return;
    if (previousUnifiedExpand !== unifiedExpandAll && diffFile) {
      if (unifiedExpandAll) {
        diffFile.onAllExpand("unified");
      } else {
        diffFile.onAllCollapse("unified");
      }
    }
  }, [previousUnifiedExpand, unifiedExpandAll, diffFile, mode]);

  const finalExpandAll = mode?.toString() === DiffModeEnum.Unified.toString() ? unifiedExpandAll : splitExpandAll;

  const ForwardRefItem = useMemo(() => {
    const IconButtonWithRef = forwardRef<HTMLButtonElement, IconButtonProps & { needPopover?: boolean }>(({ needPopover, onClick, ...props }, ref) => {
      if (needPopover) {
        return (
          <PopoverTrigger>
            <IconButton aria-label="expand" ref={ref} size="sm" onClick={onClick} {...props} />
          </PopoverTrigger>
        );
      } else {
        return (
          <IconButton
            aria-label="expand"
            ref={ref}
            size="sm"
            onClick={(e) => {
              onClick?.(e);
              onExpandToggle();
            }}
            {...props}
          />
        );
      }
    });

    IconButtonWithRef.displayName = "IconButtonWithRef";

    return IconButtonWithRef;
  }, [onExpandToggle]);

  ForwardRefItem.displayName = "MemoIconButtonWithRef";

  return (
    <Flex
      paddingX="4"
      paddingY="1"
      borderTopRadius="md"
      borderRadius={isOpen ? undefined : "md"}
      overflow="hidden"
      alignItems="center"
      border="1px"
      position="relative"
      zIndex="1"
      borderColor="cardBorderColor"
      backgroundColor="mobileCardBackgroundColor"
    >
      <ButtonGroup variant="ghost" marginRight="3" spacing="1">
        <IconButton
          aria-label="open"
          icon={
            <Icon
              as={GoChevronDown}
              color="lightTextColor"
              transformOrigin="center"
              transition="transform 0.2s ease-in-out"
              transform={isOpen ? "rotate(0deg)" : "rotate(-90deg)"}
            />
          }
          fontSize="larger"
          size="sm"
          onClick={onToggle}
        />
        {item.patch ? (
          loading ? (
            <IconButton
              icon={<Icon as={AiOutlineLoading} color="lightTextColor" animation="1s linear 0s infinite loading" />}
              aria-label="loading"
              as="div"
              size="sm"
            />
          ) : (
            <Popover isLazy>
              {({ onClose }) => (
                <>
                  <Tooltip label={!finalExpandAll ? "Expand all diff" : "Collapse expanded lines"} closeOnScroll>
                    <ForwardRefItem
                      aria-label="expand"
                      needPopover={diffFile?.fileLineLength > LargerFile}
                      isDisabled={diffFile?.fileLineLength > MaxFile}
                      icon={<Icon as={finalExpandAll ? GoFold : GoUnfold} color="lightTextColor" />}
                      display={diffFile?.hasSomeLineCollapsed ? "flex" : "none"}
                    />
                  </Tooltip>
                  <Portal appendToParentPortal={false}>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Note</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Text fontSize="sm">This file is too large, it may take a long time to expand / collapse all.</Text>
                      </PopoverBody>
                      <PopoverFooter textAlign="right">
                        <ButtonGroup variant="outline" spacing="6" size="sm">
                          <Button onClick={onClose}>Cancel</Button>
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              onExpandToggle();
                              onClose();
                            }}
                          >
                            {finalExpandAll ? "Collapse" : "Expand"}
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          )
        ) : null}
        {!autoLoad && !content && !loading && item.contents_url && (
          <Tooltip label="Load full diff">
            <IconButton aria-label="load" icon={<Icon as={GoPulse} color="lightTextColor" />} size="sm" onClick={loadFullContentDiff} />
          </Tooltip>
        )}
        {link && (
          <Tooltip label="Goto github link">
            <IconButton aria-label="open" icon={<Icon as={GoLinkExternal} color="lightTextColor" />} size="sm" onClick={() => window.open(link, "_blank")} />
          </Tooltip>
        )}
      </ButtonGroup>
      <Text as="span" color="lightTextColor" width="90%" display="inline-block">
        {item.status === "renamed" ? `${item.previous_filename} -> ${item.filename}` : item.filename}
      </Text>
      <Box display="inline-flex" columnGap="2" border="1px" borderColor="cardBorderColor" borderRadius="md" paddingX="2" marginLeft="auto">
        <Text fontSize="12px" as="span" color="green.400">
          +{diffFile?.additionLength}
        </Text>
        <Text fontSize="12px" as="span" color="red.400">
          -{diffFile?.deletionLength}
        </Text>
      </Box>
    </Flex>
  );
};
