import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const EditModal = ({ isOpen, onClose, order, onSave }) => {
  const [formData, setFormData] = useState({
    id: order?.id || "",
    customer_name: order?.customer_name || "",
    price: order?.price || "",
    invoice_date: order?.invoice_date || "",
  });

  useEffect(() => {
    setFormData({
      id: order?.id || "",
      customer_name: order?.customer_name || "",
      price: order?.price || "",
      invoice_date: order?.invoice_date || "",
    });
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Order ID: {formData.id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Customer Name</FormLabel>
            <Input
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Invoice Date</FormLabel>
            <Input
              type="date"
              name="invoice_date"
              value={formData.invoice_date}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
