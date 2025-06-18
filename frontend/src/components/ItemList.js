import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  Badge,
  Flex
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ItemList = ({ items, selectedItem, onItemSelect, onEdit, onDelete }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const selectedBgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const selectedBorderColor = useColorModeValue('blue.200', 'blue.400');

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
              bg={selectedItem?.id === item.id ? selectedBgColor : bgColor}
              border="1px solid"
              borderColor={selectedItem?.id === item.id ? selectedBorderColor : borderColor}
              borderRadius="md"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                bg: selectedItem?.id === item.id ? selectedBgColor : 'gray.100',
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
                
                <HStack spacing={2} opacity={0} _groupHover={{ opacity: 1 }}>
                  <IconButton
                    icon={<EditIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={(e) => handleEditClick(e, item)}
                    aria-label="Edit item"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={(e) => handleDeleteClick(e, item)}
                    aria-label="Delete item"
                  />
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