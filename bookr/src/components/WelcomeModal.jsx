import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const WelcomeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to Bookr</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This app interacts directly with your Google Books account. If you
            use Google Books to keep track of books, this app will manipulate
            your Google Books data. Please log in to explore the functionality!
            Otherwise, you can search for books in the Google Books database,
            but won't be able to add them to shelves.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Log in with Google
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Nvm, browse books
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WelcomeModal;
