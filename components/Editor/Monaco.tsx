import {
  styled,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Box,
  Divider,
} from "@chakra-ui/react";
import type monaco from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useEditor } from "hooks/useEditor";
import { useRef } from "react";
import { AiOutlineDown, AiOutlineFile } from "react-icons/ai";
import { setMonacoTSXSupport } from "utils/monaco";
import { useSize } from "hooks/useSize";

const StyledMonaco = styled(Editor);

export const Monaco = () => {
  const boxRef = useRef<HTMLDivElement>();
  const { height } = useSize({ ref: boxRef });
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor>();
  const { file, files, setFile, setContent } = useEditor();
  const currentFile = files[file];
  const theme = useColorModeValue("vs-light", "vs-dark");
  return (
    <>
      <Box margin="2" ref={boxRef}>
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
                <MenuItem key={key} value={key} onClick={() => setFile(key)}>
                  {files[key].name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <Divider marginY="2" />
      </Box>
      <StyledMonaco
        width="100%"
        height={`calc(100% - ${height}px - 4px)`}
        theme={theme}
        path={currentFile.name}
        defaultValue={currentFile.content}
        defaultLanguage={currentFile.language}
        onMount={(editor, monaco) => {
          monacoInstance.current = editor;
          setMonacoTSXSupport(editor, monaco);
        }}
        onChange={() => {
          setContent(monacoInstance.current?.getValue());
        }}
      />
    </>
  );
};
