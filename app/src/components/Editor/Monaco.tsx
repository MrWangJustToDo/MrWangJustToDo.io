import { useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Button, Icon, Box, Divider, Wrap, WrapItem, Tooltip, Link } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { AiOutlineDown, AiOutlineFile } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { TbPackage } from "react-icons/tb";

import { useEditor_v2 } from "@app/hooks/useEditor";
import { usePlayGround } from "@app/hooks/usePlayGround";
import { useDomSize } from "@app/hooks/useSize";
import { useType } from "@app/hooks/useType";
import { setMonacoTSXSupport } from "@app/utils/monaco";

import type monaco from "monaco-editor";

const InstallPackages = {
  MyReact: "MyReact",
  MyReactReactive: "MyReactReactive",
  MyReactDOM: "MyReactDOM",
  ReactWindow: "ReactWindow",
  ReactGridLayout: "ReactGridLayout",
  Antd: "Antd",
  dayjs: "dayjs",
};

export const Monaco = () => {
  const { onClose } = usePlayGround();

  const boxRef = useRef<HTMLDivElement>();

  const divideRef = useRef<HTMLHRElement>();

  const type = useType((s) => s.type);

  const { height } = useDomSize({ ref: boxRef });

  const { height: divideHeight } = useDomSize({ ref: divideRef });

  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor>();

  const { file, files, setFile, setContent, reset } = useEditor_v2();

  const currentFile = files[file];

  const theme = useColorModeValue("vs-light", "vs-dark");

  return (
    <Box height="100%" overflow="hidden">
      <Wrap paddingX="2" spacing="2" ref={boxRef}>
        <WrapItem>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant="outline"
              leftIcon={<Icon as={AiOutlineFile} fontSize="small" />}
              rightIcon={<Icon as={AiOutlineDown} fontSize="small" />}
            >
              {file}
            </MenuButton>
            <MenuList>
              {Object.keys(files).map((key) => {
                return (
                  <MenuItem key={key} value={key} onClick={() => setFile(key)} justifyContent="space-between">
                    {files[key].name} {currentFile.name === files[key]?.name && <Icon as={BsCheck} />}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </WrapItem>
        <WrapItem>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
        </WrapItem>
        <WrapItem>
          <Button className="tour_close" size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </WrapItem>
        <WrapItem>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant="outline"
              leftIcon={<Icon as={TbPackage} fontSize="small" />}
              rightIcon={<Icon as={AiOutlineDown} fontSize="small" />}
            >
              Packages
            </MenuButton>
            <MenuList>
              {Object.keys(InstallPackages).map((key) => {
                return (
                  <MenuItem key={key} value={InstallPackages[key]} justifyContent="space-between">
                    {InstallPackages[key]}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </WrapItem>
        <WrapItem>
          <Tooltip label={<>goto @my-react main site to see more online example</>} placement="bottom-start">
            <Button as={Link} className="tour_more" size="sm" variant="outline" href="https://mrwangjusttodo.github.io/MyReact/#next-section" target="_blank">
              More Example
            </Button>
          </Tooltip>
        </WrapItem>
      </Wrap>
      <Divider marginY="2" ref={divideRef} />
      <Box height={`calc(100% - ${height}px - ${divideHeight}px - 14px)`} width="100%" className="tour_playGround_editor">
        <Editor
          theme={theme}
          path={currentFile.name}
          defaultValue={currentFile.content}
          defaultLanguage={currentFile.language}
          onMount={(editor, monaco) => {
            setMonacoTSXSupport(editor, monaco, type).then(() => {
              monacoInstance.current = editor;
            });
          }}
          onChange={() => {
            setContent(monacoInstance.current?.getValue());
          }}
        />
      </Box>
    </Box>
  );
};
