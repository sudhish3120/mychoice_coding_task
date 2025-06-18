import React, { useEffect, useState } from 'react';
import { ChakraProvider, defaultSystem, Box, Container, Heading, Flex, Button } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import ItemModal from './components/ItemDialog';
import ConfirmDialog from './components/ConfirmDialog';


const API_URL = 'http://127.0.0.1:8000/items/';


function App() {
  
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingItem, setEditingItem] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data);
    } catch (e) {
      setError('Failed to fetch items.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemSelect = (item) => {
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
    setError('');
  };

  const handleCreateClick = () => {
    setModalMode('create');
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setModalMode('edit');
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    setError('');
    try {
      const url = modalMode === 'create' ? API_URL : `${API_URL}${editingItem.id}/`;
      const method = modalMode === 'create' ? 'POST' : 'PATCH';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err?.non_field_errors?.[0] || err?.name?.[0] || `Error ${modalMode === 'create' ? 'creating' : 'updating'} item.`);
        return;
      }

      setIsModalOpen(false);
      setEditingItem(null);
      await fetchItems();

      if (modalMode === 'edit' && selectedItem?.id === editingItem.id) {
        const updatedItem = await res.json();
        setSelectedItem(updatedItem);
      }
    } catch {
      setError(`Error ${modalMode === 'create' ? 'creating' : 'updating'} item.`);
    }
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setError('');
    try {
      const res = await fetch(`${API_URL}${deletingItem.id}/`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err?.error || 'Error deleting item.');
        return;
      }

      setIsConfirmOpen(false);
      setDeletingItem(null);
      
      if (selectedItem?.id === deletingItem.id) {
        setSelectedItem(null);
      }
      
      await fetchItems();
    } catch {
      setError('Error deleting item.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setError('');
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
    setDeletingItem(null);
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Container maxW="1200px" py={8}>
        <Box textAlign="center" mb={8}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h1" size="2xl">
              Item Manager
            </Heading>
            <Button
              leftIcon={<MdAdd />}
              colorScheme="green"
              size="lg"
              onClick={handleCreateClick}
            >
              Create Item
            </Button>
          </Flex>
          {error && (
            <Box
              bg="red.50"
              color="red.800"
              border="1px solid"
              borderColor="red.200"
              borderRadius="md"
              px={4}
              py={3}
              mb={4}
              fontWeight="semibold"
              textAlign="center"
            >
              {error}
            </Box>
          )}
        </Box>
        
        <Flex gap={10} minH="500px">
          <ItemList
            items={items}
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
          
         <ItemDetails
            selectedItem={selectedItem}
          /> 
        </Flex>

        {/* Create/Edit Modal */}
        <ItemModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          item={editingItem}
          mode={modalMode}
        />

        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={handleConfirmClose}
          onConfirm={handleDeleteConfirm}
          title="Confirm Delete"
          message={`Are you sure you want to delete "${deletingItem?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </Container>
    </ChakraProvider>
  );
}

export default App;
