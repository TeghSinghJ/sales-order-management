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
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  Flex,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";

const OrderModal = ({ isOpen, onClose, onSave, order, isEdit }) => {
  const initialRef = React.useRef();
  const [formData, setFormData] = useState({
    customer_id: "",
    items: [],
    paid: false,
    invoice_no: "",
    invoice_date: "",
  });

  const productSchemes = [
    {
      id: 209,
      display_id: 8,
      owner: 1079,
      name: "New Product",
      category: "The god of War",
      characteristics: "New Product Characteristics",
      features: "",
      brand: "New Product Brand",
      sku: [
        {
          id: 248,
          selling_price: 54,
          max_retail_price: 44,
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
          product: 209,
        },
        {
          id: 247,
          selling_price: 32,
          max_retail_price: 32,
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
          product: 209,
        },
        {
          id: 246,
          selling_price: 23,
          max_retail_price: 21,
          amount: 22,
          unit: "kg",
          quantity_in_inventory: 1,
          product: 209,
        },
      ],
      updated_on: "2024-05-24T12:46:41.995873Z",
      adding_date: "2024-05-24T12:46:41.995828Z",
    },
  ];

  const getProductById = (id) => {
    return productSchemes.find((product) => product.id === id);
  };

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({
        customer_id: "",
        items: [],
        paid: false,
        invoice_no: "",
        invoice_date: "",
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedProduct = getProductById(selectedId);
    if (
      selectedProduct &&
      !formData.items.some((item) => item.sku_id === selectedId)
    ) {
      const newItem = {
        sku_id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.selling_price,
        quantity: "",
        remaining: selectedProduct.quantity_in_inventory,
      };
      setFormData({ ...formData, items: [...formData.items, newItem] });
    }
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
    items[index] = { ...items[index], [name]: value };
    setFormData({ ...formData, items });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? "Edit" : "Create"} Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          
          <FormControl mt={4} isRequired>
            <FormLabel>
              Products <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Select placeholder="Select product" onChange={handleProductSelect}>
              {productSchemes.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
          </FormControl>
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
                  <Heading size="md">{item.name}</Heading>
                  <Button
                    size="sm"
                    colorScheme="gray"
                  >
                    Rate:{item.amount}
                  </Button>
                </Flex>
                <Text mt={2}>Remaining: {item.remaining}</Text>
                <Flex mt={2} justify="space-between" align="center">
                  <FormControl isRequired>
                    <FormLabel>
                      Selling Price <span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <Input
                      name="price"
                      placeholder="Selling Price"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </FormControl>
                  <FormControl isRequired ml={4}>
                    <FormLabel>
                      Total Items <span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <Input
                      name="quantity"
                      placeholder="Total Items"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </FormControl>
                </Flex>
                <Box mt={4}>
                  <Badge colorScheme="green">
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
