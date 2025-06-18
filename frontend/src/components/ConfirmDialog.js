import React from 'react';
import { Button, Text, Box, Heading } from '@chakra-ui/react';

function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <Box position="fixed" top={0} left={0} w="100vw" h="100vh" bg="blackAlpha.600" zIndex={1000} display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" borderRadius="md" boxShadow="lg" minW="350px" maxW="90vw" p={6} position="relative">
        <Button position="absolute" top={2} right={2} size="sm" onClick={onClose}>X</Button>
        {children}
      </Box>
    </Box>
  );
}

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', cancelText = 'Cancel' }) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Heading as="h3" size="md" mb={4}>{title}</Heading>
      <Text color="gray.600" lineHeight="tall" mb={6}>
        {message}
      </Text>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="ghost" mr={3} onClick={onClose}>
          {cancelText}
        </Button>
        <Button colorScheme="red" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Box>
    </Dialog>
  );
}

export default ConfirmDialog; 