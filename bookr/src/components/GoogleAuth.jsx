import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text } from "@chakra-ui/react";

export default function GoogleButton({ onClick }) {
  return (
    <Center>
      <Button variant={"outline"} leftIcon={<FcGoogle />} onClick={onClick}>
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}
