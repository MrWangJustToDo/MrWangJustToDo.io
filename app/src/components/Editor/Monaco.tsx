import { useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Button, Icon, Box, Divider, Wrap, WrapItem, Tooltip, Link } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { AiOutlineDown, AiOutlineFile } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

import { useEditor_v2 } from "@app/hooks/useEditor";
import { usePlayGround } from "@app/hooks/usePlayGround";
import { useDomSize } from "@app/hooks/useSize";
import { useType } from "@app/hooks/useType";
import { setMonacoTSXSupport } from "@app/utils/monaco";

import type monaco from "monaco-editor";

export const Monaco = () => {
  const { onClose } = usePlayGround();

  const boxRef = useRef<HTMLDivElement>();

  const type = useType((s) => s.type);

  const { height } = useDomSize({ ref: boxRef });

  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor>();

  const { file, files, setFile, setContent, reset } = useEditor_v2();

  const currentFile = files[file];

  const theme = useColorModeValue("vs-light", "vs-dark");

  return (
    <Box height="100%">
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
          <Tooltip
            label={
              <>
                goto @my-react main site to see more online example
              </>
            }
            placement="bottom-start"
          >
            <Button as={Link} className="tour_more" size="sm" variant="outline" href="https://mrwangjusttodo.github.io/MyReact/#next-section" target="_blank">
              More Example
            </Button>
          </Tooltip>
        </WrapItem>
      </Wrap>
      <Divider marginY="2" />
      <Box height={`calc(100% - ${height}px - 2px)`} width="100%" className="tour_playGround_editor">
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
