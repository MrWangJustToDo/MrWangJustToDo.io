import {
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  // Portal,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

import type { FlexProps } from "@chakra-ui/react";

const { onToggleExt, onSearch } = useGitHubCompareSourceList.getActions();

const FilterIcon = (props) => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" {...props}>
      <path d="M15 2.75a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1 0-1.5h4a.75.75 0 0 1 .75.75Zm-8.5.75v1.25a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-1.5 0V2H1.75a.75.75 0 0 0 0 1.5H6.5Zm1.25 5.25a.75.75 0 0 0 0-1.5h-6a.75.75 0 0 0 0 1.5h6ZM15 8a.75.75 0 0 1-.75.75H11.5V10a.75.75 0 1 1-1.5 0V6a.75.75 0 0 1 1.5 0v1.25h2.75A.75.75 0 0 1 15 8Zm-9 5.25v-2a.75.75 0 0 0-1.5 0v1.25H1.75a.75.75 0 0 0 0 1.5H4.5v1.25a.75.75 0 0 0 1.5 0v-2Zm9 0a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1 0-1.5h6a.75.75 0 0 1 .75.75Z"></path>
    </svg>
  );
};

export const DiffAsideFilter = (props: FlexProps) => {
  const [value, setValue] = useState<string>();

  const { fileExt, loading } = useGitHubCompareSourceList((s) => ({ fileExt: s.fileExt, loading: s.filterLoading }));

  const selectedExt = Object.keys(fileExt).filter((ext) => fileExt[ext]);

  useEffect(() => {
    onSearch(value);
  }, [value]);

  return (
    <Flex {...props}>
      <InputGroup>
        <Input placeholder="Search" value={value} onChange={(e) => setValue(e.target.value)} />
        <InputRightElement>
          <Spinner size="sm" color="lightTextColor" visibility={loading ? "visible" : "hidden"} />
        </InputRightElement>
      </InputGroup>
      <Spacer mx="2" />
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} color="lightTextColor" as={IconButton} icon={<Icon as={FilterIcon} />} />
            {/* <Portal> */}
            <MenuList zIndex="toast" maxHeight="400" overflowY="auto">
              <MenuOptionGroup value={selectedExt} type="checkbox">
                {Object.keys(fileExt).map((ext) => {
                  return (
                    <MenuItemOption key={ext} value={ext} closeOnSelect={false} onClick={() => onToggleExt(ext, value)}>
                      {ext}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
            {/* </Portal> */}
          </>
        )}
      </Menu>
    </Flex>
  );
};
