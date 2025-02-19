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
} from "@chakra-ui/react";
import { DiffModeEnum, type DiffFile } from "@git-diff-view/react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { GoChevronDown, GoPulse, GoLinkExternal, GoFold, GoUnfold } from "react-icons/go";

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
  const [expandAll, setExpandAll] = useState(() => diffFile?.hasExpandSplitAll);

  const [_expandAll, _setExpandAll] = useState(() => diffFile?.hasExpandUnifiedAll);

  const previousExpand = usePrevious(expandAll);

  const _previousExpand = usePrevious(_expandAll);

  const mode = useDiffViewConfig.useShallowStableSelector((s) => s.mode);

  const onToggle = useCallback(() => {
    scrollToCurrent().then(() => _onToggle());
  }, [_onToggle, scrollToCurrent]);

  const onExpandToggle = useCallback(() => {
    scrollToCurrent().then(() => {
      if (useDiffViewConfig.getReadonlyState().mode?.toString() === DiffModeEnum.Unified.toString()) {
        _setExpandAll((l) => !l);
      } else {
        setExpandAll((l) => !l);
      }
    });
  }, [scrollToCurrent]);

  useEffect(() => {
    if (mode?.toString() === DiffModeEnum.Unified.toString()) return;
    if (previousExpand !== expandAll && diffFile) {
      if (expandAll) {
        diffFile.onAllExpand("split");
      } else {
        diffFile.onAllCollapse("split");
      }
    }
  }, [previousExpand, expandAll, diffFile, mode]);

  useEffect(() => {
    if (mode?.toString() !== DiffModeEnum.Unified.toString()) return;
    if (_previousExpand !== _expandAll && diffFile) {
      if (_expandAll) {
        diffFile.onAllExpand("unified");
      } else {
        diffFile.onAllCollapse("unified");
      }
    }
  }, [_previousExpand, _expandAll, diffFile, mode]);

  const ForwardRefItem = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef<HTMLButtonElement, IconButtonProps & { needPopover?: boolean }>(({ needPopover, onClick, ...props }, ref) => {
        const finalExpandAll = mode?.toString() === DiffModeEnum.Unified.toString() ? _expandAll : expandAll;
        if (needPopover) {
          return (
            <PopoverTrigger>
              <IconButton
                aria-label="expand"
                ref={ref}
                icon={<Icon as={finalExpandAll ? GoFold : GoUnfold} color="lightTextColor" />}
                size="sm"
                isDisabled={diffFile?.fileLineLength > MaxFile}
                display={diffFile?.hasSomeLineCollapsed ? "flex" : "none"}
                onClick={onClick}
                {...props}
              />
            </PopoverTrigger>
          );
        } else {
          return (
            <IconButton
              aria-label="expand"
              ref={ref}
              icon={<Icon as={finalExpandAll ? GoFold : GoUnfold} color="lightTextColor" />}
              size="sm"
              display={diffFile?.hasSomeLineCollapsed ? "flex" : "none"}
              onClick={(e) => {
                onClick?.(e);
                onExpandToggle();
              }}
              {...props}
            />
          );
        }
      }),
    [diffFile?.fileLineLength, diffFile?.hasSomeLineCollapsed, expandAll, _expandAll, mode, onExpandToggle],
  );

  ForwardRefItem.displayName = "IconButtonWithRef";

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
                  <Tooltip label={!expandAll ? "Expand all diff" : "Collapse expanded lines"} closeOnScroll>
                    <ForwardRefItem aria-label="expand" needPopover={diffFile?.fileLineLength > LargerFile} />
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
                            {expandAll ? "Collapse" : "Expand"}
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
      <Text as="span" color="lightTextColor">
        {item.status === "renamed" ? `${item.previous_filename} -> ${item.filename}` : item.filename}
      </Text>
    </Flex>
  );
};
