import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import GoogleButton from "react-google-button";

const WelcomeModal = ({ isOpen, onClose, getAccessToken }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to Bookr</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This app interacts directly with your Google Books account. If you
            use Google Books to keep track of books, this app will manipulate
            your Google Books data. Please log in to explore the functionality.
            Otherwise, you can search for books in the Google Books database,
            but won't be able to add them to shelves.
          </ModalBody>

          <ModalFooter flexDirection="column">
            <GoogleButton onClick={() => getAccessToken()} />

            <Button variant="outline" onClick={onClose} size="sm" mt={3}>
              Nvm, browse books
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WelcomeModal;
