import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import GoogleButton from "../components/GoogleAuth";

const AlertDialogComponent = ({ alertIsOpen }) => {
  const { onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        isOpen={alertIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Please sign in
            </AlertDialogHeader>

            <AlertDialogBody>
              You need to sign in to add books to your library
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Take me back
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDialogComponent;
