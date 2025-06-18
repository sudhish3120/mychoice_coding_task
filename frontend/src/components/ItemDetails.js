import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';

const ItemDetails = ({ selectedItem }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!selectedItem) {
    return (
      <Box flex={1} pl={5}>
        <Heading size="lg" mb={6}>
          Item Details
        </Heading>
        <Box textAlign="center" py={10}>
          <Text color="gray.500" mb={6} fontStyle="italic">
            Select an item to view its details
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} pl={5}>
      <Heading size="lg" mb={6}>
        Item Details
      </Heading>
      
      <Box
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        p={6}
      >
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="semibold" color="gray.600">
              Name:
            </Text>
            <Text color="gray.800">
              {selectedItem.name}
            </Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text fontWeight="semibold" color="gray.600">
              Group:
            </Text>
            <Badge colorScheme={selectedItem.group === 'Primary' ? 'blue' : 'green'}>
              {selectedItem.group}
            </Badge>
          </HStack>
          
          <HStack justify="space-between">
            <Text fontWeight="semibold" color="gray.600">
              Created:
            </Text>
            <Text color="gray.800" fontSize="sm">
              {new Date(selectedItem.created_at).toLocaleString()}
            </Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text fontWeight="semibold" color="gray.600">
              Updated:
            </Text>
            <Text color="gray.800" fontSize="sm">
              {new Date(selectedItem.updated_at).toLocaleString()}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ItemDetails; 