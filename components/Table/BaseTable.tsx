import { Table, TableProps } from "@chakra-ui/react";

export const BaseTable = ({ ...restProps }: TableProps) => (
  <Table variant="simple" {...restProps} />
);
