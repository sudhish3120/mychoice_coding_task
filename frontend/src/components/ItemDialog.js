import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  VStack,
  Box,
  Heading,
  Stack,
  IconButton
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <Box position="fixed" top={0} left={0} w="100vw" h="100vh" bg="blackAlpha.600" zIndex={1000} display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" borderRadius="lg" boxShadow="2xl" w="100%" maxW="400px" p={8} position="relative">
        <IconButton
          icon={<MdClose />}
          aria-label="Close modal"
          position="absolute"
          top={4}
          right={4}
          size="sm"
          variant="ghost"
          onClick={onClose}
        />
        {children}
      </Box>
    </Box>
  );
}

function ItemModal({ isOpen, onClose, onSubmit, item = null, mode = 'create' }) {
  const [form, setForm] = useState({ name: '', group: 'Primary' });

  useEffect(() => {
    if (item && mode === 'edit') {
      setForm({ name: item.name, group: item.group });
    } else {
      setForm({ name: '', group: 'Primary' });
    }
  }, [item, mode, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          {mode === 'create' ? 'Create Item' : 'Edit Item'}
        </Heading>
        <VStack spacing={5} align="stretch">
          <FormControl isRequired>
            <FormLabel fontWeight="semibold">Name</FormLabel>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter item name"
              size="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="semibold">Group</FormLabel>
            <select
              name="group"
              value={form.group}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #CBD5E0',
                fontSize: '1rem',
              }}
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
            </select>
          </FormControl>
        </VStack>
        <Stack direction="row" spacing={4} mt={8} justify="flex-end">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit">
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default ItemModal;