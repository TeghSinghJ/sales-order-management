import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <Box w="250px" p="4" bg="gray.800" color="white">
    <Text fontSize="2xl" mb="4">My Dashboard</Text>
    <SidebarItem to="/dashboard" label="Dashboard" />
  </Box>
);

const SidebarItem = ({ to, label }) => (
  <Link to={to}>
    <Text py="2" px="4" borderRadius="md" _hover={{ bg: 'gray.700' }}>{label}</Text>
  </Link>
);

export default Sidebar;
