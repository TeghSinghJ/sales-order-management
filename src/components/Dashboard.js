// Dashboard.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import OrderTable from "./OrderTable";
import OrderModal from "./OrderModal";
import ThemeToggle from "./ThemeToggle";

function Dashboard() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    // Fetch active and completed orders from an API or static data
    setActiveOrders([...sampleActiveOrders]);
    setCompletedOrders([...sampleCompletedOrders]);
  }, []);

  const handleAddOrder = (newOrder) => {
    setActiveOrders((prevOrders) => [...prevOrders, newOrder]);
    setIsModalOpen(false);
  };

  const handleEditOrder = (editedOrder) => {
    setActiveOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editedOrder.id ? editedOrder : order
      )
    );
    setIsModalOpen(false);
  };

  const handleModalOpen = (order = null) => {
    setIsEdit(!!order);
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  return (
    <Box p={4}>
      <Tabs>
        <Flex justify="space-between" align="center" mb={4}>
          <TabList>
            <Tab>Active Sale Orders</Tab>
            <Tab>Completed Sale Orders</Tab>
          </TabList>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={() => handleModalOpen()}
          >
            Sale Order
          </Button>
        </Flex>
        <TabPanels>
          <TabPanel>
            <OrderTable
              orders={activeOrders}
              onEdit={handleModalOpen}
              onSave={handleEditOrder}
            />
          </TabPanel>
          <TabPanel>
            <OrderTable
              orders={completedOrders}
              setActiveOrders={setActiveOrders} // Pass setActiveOrders here
              onEdit={handleModalOpen}
              isReadOnly
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <OrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={isEdit ? handleEditOrder : handleAddOrder}
        order={currentOrder}
        isEdit={isEdit}
        productSchemes={productSchemes}
      />
    </Box>
  );
}


// Sample Data for Active and Completed Orders
const sampleActiveOrders = [
  {
    id: 1,
    customer_name: "Ram",
    invoice_no: "Invoice - 1212121",
    invoice_date: "2024-05-07",
    last_modified:"2024-05-27",
    price:300,
    items: [{ sku_id: 220, price: 12, quantity: 12, name: "New Product" }],
  },
];

const sampleCompletedOrders = [
  {
    id: 2,
    customer_name: "Sita",
    invoice_no: "Invoice - 343434",
    invoice_date: "2024-04-25",
    price:300,
    items: [{ sku_id: 220, price: 15, quantity: 5, name: "Old Product" }],
  },
];
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
  {
    id: 219,
    display_id: 11,
    owner: 1079,
    name: "New Product 1",
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
    updated_on: "2024-05-27T12:46:41.995873Z",
    adding_date: "2024-05-27T12:46:41.995828Z",
  },
  {
    id: 220,
    display_id: 12,
    owner: 1080,
    name: "Stocked Product 1",
    category: "Essential Items",
    characteristics: "High quality stocked product",
    features: "Long shelf life",
    brand: "Reliable Brand",
    sku: [
      {
        id: 249,
        selling_price: 60,
        max_retail_price: 70,
        amount: 40,
        unit: "kg",
        quantity_in_inventory: 5,
        product: 220,
      },
    ],
    updated_on: "2024-05-27T14:46:41.995873Z",
    adding_date: "2024-05-27T14:46:41.995828Z",
  },
  {
    id: 221,
    display_id: 13,
    owner: 1081,
    name: "Benoit Saint Denis",
    category: "Beverages",
    characteristics: "Exquisite French wine",
    features: "Aged 12 years",
    brand: "Benoit",
    sku: [
      {
        id: 250,
        selling_price: 150,
        max_retail_price: 200,
        amount: 75,
        unit: "L",
        quantity_in_inventory: 3,
        product: 221,
      },
    ],
    updated_on: "2024-05-27T15:46:41.995873Z",
    adding_date: "2024-05-27T15:46:41.995828Z",
  },
  {
    id: 222,
    display_id: 14,
    owner: 1082,
    name: "Anonymous Product",
    category: "Miscellaneous",
    characteristics: "Mysterious item",
    features: "Unknown origin",
    brand: "Unknown",
    sku: [
      {
        id: 251,
        selling_price: 10,
        max_retail_price: 15,
        amount: 10,
        unit: "piece",
        quantity_in_inventory: 50,
        product: 222,
      },
    ],
    updated_on: "2024-05-27T16:46:41.995873Z",
    adding_date: "2024-05-27T16:46:41.995828Z",
  },
  {
    id: 223,
    display_id: 15,
    owner: 1083,
    name: "Stocked Tea I",
    category: "Beverages",
    characteristics: "Green Tea",
    features: "Organic, Fresh",
    brand: "Tea Brand A",
    sku: [
      {
        id: 252,
        selling_price: 20,
        max_retail_price: 25,
        amount: 100,
        unit: "g",
        quantity_in_inventory: 200,
        product: 223,
      },
    ],
    updated_on: "2024-05-27T17:46:41.995873Z",
    adding_date: "2024-05-27T17:46:41.995828Z",
  },
  {
    id: 224,
    display_id: 16,
    owner: 1084,
    name: "Stocked Tea II",
    category: "Beverages",
    characteristics: "Black Tea",
    features: "Rich flavor",
    brand: "Tea Brand B",
    sku: [
      {
        id: 253,
        selling_price: 22,
        max_retail_price: 28,
        amount: 100,
        unit: "g",
        quantity_in_inventory: 180,
        product: 224,
      },
    ],
    updated_on: "2024-05-27T18:46:41.995873Z",
    adding_date: "2024-05-27T18:46:41.995828Z",
  },
];


export default Dashboard;
