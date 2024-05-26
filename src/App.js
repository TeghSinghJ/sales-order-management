import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import OrderTable from './components/OrderTable';
import OrderModal from './components/OrderModal';
import ThemeToggle from './components/ThemeToggle';

function App() {
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

  const handleModalOpen = (order = null) => {
    setIsEdit(!!order);
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  const handleSaveOrder = () => {
    // Save the new or edited order
    setIsModalOpen(false);
  };

  return (
    <Box p={4}>
      <Stack direction="row" align="center" justify="space-between" mb={4}>
        <Heading>Sale Order Management</Heading>
        <ThemeToggle />
      </Stack>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OrderTable orders={activeOrders} onEdit={handleModalOpen} />
          </TabPanel>
          <TabPanel>
            <OrderTable orders={completedOrders} onEdit={handleModalOpen} isReadOnly />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={() => handleModalOpen()}
        mt={4}
      >
        + Sale Order
      </Button>
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveOrder}
        order={currentOrder}
        isEdit={isEdit}
      />
    </Box>
  );
}

// Sample Data for Active and Completed Orders
const sampleActiveOrders = [
  {
    id: 1,
    customer_name: 'Ram',
    invoice_no: 'Invoice - 1212121',
    invoice_date: '2024-05-07',
    items: [
      { sku_id: 220, price: 12, quantity: 12, name: "New Product" }
    ]
  }
];

const sampleCompletedOrders = [
  {
    id: 2,
    customer_name: 'Sita',
    invoice_no: 'Invoice - 343434',
    invoice_date: '2024-04-25',
    items: [
      { sku_id: 220, price: 15, quantity: 5, name: "Old Product" }
    ]
  }
];

export default App;
