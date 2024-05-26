import React, { useState, useEffect } from 'react';
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
  Box,
} from '@chakra-ui/react';

const OrderModal = ({ isOpen, onClose, onSave, order, isEdit }) => {
  const initialRef = React.useRef();
  const [formData, setFormData] = useState({
    customer_id: '',
    items: [{ sku_id: '', price: '', quantity: '' }],
    paid: false,
    invoice_no: '',
    invoice_date: '',
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({
        customer_id: '',
        items: [{ sku_id: '', price: '', quantity: '' }],
        paid: false,
        invoice_no: '',
        invoice_date: '',
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index] = { ...items[index], [name]: value };
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { sku_id: '', price: '', quantity: '' }],
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? 'Edit' : 'Create'} Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Customer ID</FormLabel>
            <Input
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              readOnly={isEdit}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Invoice No</FormLabel>
            <Input
              name="invoice_no"
              value={formData.invoice_no}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Invoice Date</FormLabel>
            <Input
              name="invoice_date"
              type="date"
              value={formData.invoice_date}
              onChange={handleChange}
            />
          </FormControl>
          {formData.items.map((item, index) => (
            <Box key={index} mt={4}>
              <FormLabel>Item {index + 1}</FormLabel>
              <Input
                name="sku_id"
                placeholder="SKU ID"
                value={item.sku_id}
                onChange={(e) => handleItemChange(index, e)}
              />
              <Input
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
                mt={2}
              />
              <Input
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                mt={2}
              />
            </Box>
          ))}
          <Button onClick={addItem} mt={4}>
            Add Item
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
