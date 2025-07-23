import { Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";

import { useDiffViewLoading } from "@app/hooks/useDiffViewDiffFile";
import { useDiffViewSearch } from "@app/hooks/useDiffViewSearch";

export const DiffViewSearch = () => {
  const loading = useDiffViewLoading();

  const { searchValue: value, setSearchValue: setValue } = useDiffViewSearch();

  return (
    <InputGroup width="20em" marginRight="3">
      <Input placeholder="Search in the diff" disabled={loading} value={value} onChange={(e) => setValue(e.target.value)} />
      <InputRightElement>
        <Spinner size="sm" color="lightTextColor" visibility={loading ? "visible" : "hidden"} />
      </InputRightElement>
    </InputGroup>
  );
};
