import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  Flex
} from '@chakra-ui/react';

const ItemList = ({ items, selectedItem, onItemSelect, onEdit, onDelete }) => {
  const handleEditClick = (e, item) => {
    e.stopPropagation();
    onEdit(item);
  };

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();
    onDelete(item);
  };

  return (
    <Box flex={1}>
      <Heading size="lg" mb={6}>
        All Items
      </Heading>
      
      {items.length === 0 ? (
        <Box textAlign="center" py={10} color="gray.500" fontStyle="italic">
          No items found. Create your first item!
        </Box>
      ) : (
        <VStack spacing={3} align="stretch">
          {items.map(item => (
            <Box
              key={item.id}
              p={4}
              bg={selectedItem?.id === item.id ? 'blue.50' : 'gray.50'}
              border="1px solid"
              borderColor={selectedItem?.id === item.id ? 'blue.200' : 'gray.200'}
              borderRadius="md"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                bg: selectedItem?.id === item.id ? 'blue.50' : 'gray.100',
                borderColor: 'gray.300'
              }}
              onClick={() => onItemSelect(item)}
              role="group"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="medium" color="gray.800">
                    {item.name}
                  </Text>
                  <Badge colorScheme={item.group === 'Primary' ? 'blue' : 'green'} size="sm">
                    {item.group}
                  </Badge>
                </Box>
                
                <HStack spacing={2}>
                  <IconButton
                    icon={null}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={(e) => handleEditClick(e, item)}
                    aria-label="Edit item"
                  >
                    Edit
                  </IconButton>
                  <IconButton
                    icon={null}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={(e) => handleDeleteClick(e, item)}
                    aria-label="Delete item"
                  >
                    Delete
                  </IconButton>
                </HStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ItemList;