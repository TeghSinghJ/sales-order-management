import React from 'react';
import { Flex, Text, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justify="space-between" align="center" p={4} bg="gray.100">
      <Text fontSize="xl">Sale Order Management</Text>
      <IconButton
        aria-label="Toggle Dark Mode"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
