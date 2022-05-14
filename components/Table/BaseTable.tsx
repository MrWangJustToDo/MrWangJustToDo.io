import { Table, TableProps } from "@chakra-ui/react";

export const BaseTable = ({ ...restProps }: TableProps) => (
  <Table
    variant="simple"
    fontSize={{ base: "12px", lg: "14px" }}
    {...restProps}
  />
);
