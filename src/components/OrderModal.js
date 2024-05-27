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
  Box,
  Flex,
  Heading,
  Badge,
  Icon,
} from "@chakra-ui/react";
import Select from "react-select";
import { FaRupeeSign } from "react-icons/fa";

const OrderModal = ({ productSchemes, isOpen, onClose, onSave, order, isEdit }) => {
  const initialRef = React.useRef();
  const [formData, setFormData] = useState({
    id: null,
    customer_name: "",
    items: [],
    paid: false,
    invoice_no: "",
    invoice_date: "",
    price: 0,
    last_modified: new Date().toISOString().split('T')[0],
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({
        id: null,
        customer_name: "",
        items: [],
        paid: false,
        invoice_no: "",
        invoice_date: "",
        price: 0,
        last_modified: new Date().toISOString().split('T')[0],
      });
    }
  }, [order]);

  const getProductById = (id) => {
    return productSchemes.find((product) => product.id === id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    const selectedItems = selectedIds.flatMap((id) => {
      const product = getProductById(id);
      return product.sku.map((sku) => ({
        sku_id: sku.id,
        name: product.name,
        price: sku.selling_price,
        unit: sku.unit,
        quantity: "",
        remaining: sku.quantity_in_inventory,
      }));
    });
    setFormData({ ...formData, items: selectedItems });
  };

  const handleRemoveProduct = (sku_id) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.sku_id !== sku_id),
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    const quantity = parseInt(value, 10);

    if (name === "quantity") {
      const remaining = items[index].remaining - quantity;
      items[index] = {
        ...items[index],
        quantity: value,
        remaining: remaining < 0 ? 0 : remaining,
      };
    } else {
      items[index] = { ...items[index], [name]: value };
    }

    const totalPrice = items.reduce((total, item) => total + (item.price * (parseInt(item.quantity, 10) || 0)), 0);
    setFormData({ ...formData, items, price: totalPrice });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.customer_name.trim()) {
      errors.customer_name = "Customer Name is required";
    }
    if (formData.items.length === 0) {
      errors.items = "At least one product must be selected";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      setFormData({
        id: null,
        customer_name: "",
        items: [],
        paid: false,
        invoice_no: "",
        invoice_date: "",
        price: 0,
        last_modified: new Date().toISOString().split('T')[0],
      });
    }
  };


  const productOptions = productSchemes.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>All Products</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* {formData.id && ( */}
            <FormControl>
              <FormLabel>Order ID</FormLabel>
              <Input
                name="id"
                onChange={handleChange}
                value={formData.id}
                placeholder="Order ID"
              />
            </FormControl>
          {/* )} */}
          <FormControl isRequired mt={4}>
            <FormLabel>Customer Name</FormLabel>
            <Input
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Customer Name"
            />
            {formErrors.customer_name && (
              <Box color="red.500">{formErrors.customer_name}</Box>
            )}
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
          <FormControl mt={4}>
            <FormLabel>Products</FormLabel>
            <Select
              isMulti
              options={productOptions}
              onChange={handleProductSelect}
              placeholder="Select product"
            />
          </FormControl>
          {formErrors.items && (
            <Box color="red.500">{formErrors.items}</Box>
          )}
          <Box mt={4}>
            {formData.items.map((item, index) => (
              <Box
                key={item.sku_id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                mb={4}
              >
                <Flex justify="space-between" align="center">
                  <Heading size="sm">
                    {index + 1}. SKU {item.sku_id} ({item.unit})
                  </Heading>
                  <Button size="sm" colorScheme="gray">
                    Rate:
                    <Icon as={FaRupeeSign} /> {item.price}
                  </Button>
                </Flex>
                <Flex mt={2} justify="space-between" align="center">
                  <FormControl>
                    <FormLabel>Selling Price</FormLabel>
                    <Input
                      name="price"
                      placeholder="Selling Price"
                      value={item.price}
                      readOnly
                    />
                  </FormControl>
                  <FormControl ml={4}>
                    <FormLabel>Total Items</FormLabel>
                    <Input
                      name="quantity"
                      placeholder="Total Items"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                      isDisabled={item.remaining === 0}
                    />
                  </FormControl>
                </Flex>
                <Box mt={4}>
                  <Badge colorScheme={item.remaining === 0 ? "red" : "green"}>
                    {item.remaining} Item(s) remaining
                  </Badge>
                </Box>
              </Box>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
