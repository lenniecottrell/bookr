import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text } from "@chakra-ui/react";

//reference: https://chakra-templates.dev/components/social-media-buttons
const GoogleButton = ({ onClick }) => {
  return (
    <Center>
      <Button variant={"outline"} leftIcon={<FcGoogle />} onClick={onClick}>
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
};

export default GoogleButton;
