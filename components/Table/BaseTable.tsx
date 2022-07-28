import { Table } from "@chakra-ui/react";

import type { TableProps } from "@chakra-ui/react";

export const BaseTable = ({ ...restProps }: TableProps) => (
  <Table variant="simple" {...restProps} />
);
