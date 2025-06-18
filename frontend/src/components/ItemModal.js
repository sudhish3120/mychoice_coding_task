import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack
} from '@chakra-ui/react';

const ItemModal = ({ isOpen, onClose, onSubmit, item = null, mode = 'create' }) => {
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {mode === 'create' ? 'Create Item' : 'Edit Item'}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter item name"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Group</FormLabel>
                <Select
                  name="group"
                  value={form.group}
                  onChange={handleChange}
                >
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal; 