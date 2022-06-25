import {
  styled,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Divider,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type monaco from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useEditor } from "hooks/useEditor";
import { useRef } from "react";
import { AiOutlineDown, AiOutlineFile } from "react-icons/ai";
import { setMonacoTSXSupport } from "utils/monaco";
import { useSize } from "hooks/useSize";
import { usePlayGround } from "hooks/usePlayGround";

const StyledMonaco = styled(Editor);

export const Monaco = () => {
  const { onClose } = usePlayGround();
  const boxRef = useRef<HTMLDivElement>();
  const { height } = useSize({ ref: boxRef });
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor>();
  const { file, files, setFile, setContent, reset } = useEditor();
  const currentFile = files[file];
  const theme = useColorModeValue("vs-light", "vs-dark");
  return (
    <>
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
                  <MenuItem key={key} value={key} onClick={() => setFile(key)}>
                    {files[key].name}
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
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </WrapItem>
        <Divider marginY="2" />
      </Wrap>
      <StyledMonaco
        width="100%"
        height={`calc(100% - ${height}px - 4px)`}
        className="playGround_editor"
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
