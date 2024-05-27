import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import EditModal from "./EditModal";

const OrderTable = ({ orders, setActiveOrders, onSave, isReadOnly }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditOrder = (editedOrder) => {
    setActiveOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editedOrder.id ? editedOrder : order
      )
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.price}</Td>
              <Td>{order.last_modified || order.invoice_date}</Td>
              <Td>
                <IconButton
                  icon={<BiDotsHorizontalRounded />}
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                  isDisabled={isReadOnly}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        setActiveOrders={setActiveOrders}
        onSave={onSave} // Make sure to pass the correct function here
        />
    </>
  );
};

export default OrderTable;
