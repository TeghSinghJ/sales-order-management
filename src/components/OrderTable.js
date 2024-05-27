// OrderTable.js
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

const OrderTable = ({ orders,setActiveOrders, onEdit, isReadOnly }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    console.log("Updated order data:", formData);
    setActiveOrders([...orders, formData]); 
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
              {console.log(order)}
              <Td>{order.id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.price}</Td>
              <Td>{order.last_modified||order.invoice_date}</Td>
              <Td>
                <IconButton
                  icon={<BiDotsHorizontalRounded />} // Render three dots icon
                  onClick={() => handleEdit(order)} // Trigger edit modal
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
        onSave={handleSave}
      />
    </>
  );
};

export default OrderTable;
