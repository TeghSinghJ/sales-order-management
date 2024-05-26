import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const OrderTable = ({ orders, onEdit, isReadOnly }) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>Invoice No</Th>
        <Th>Customer</Th>
        <Th>Items</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {orders.map(order => (
        <Tr key={order.id}>
          <Td>{order.invoice_no}</Td>
          <Td>{order.customer_name}</Td>
          <Td>{order.items.map(item => item.name).join(', ')}</Td>
          <Td>
            <IconButton
              icon={<EditIcon />}
              onClick={() => onEdit(order)}
              isDisabled={isReadOnly}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default OrderTable;
