import React, { useState } from "react";
import Nav from "../components/Nav";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Link,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormik } from "formik";

const Account = () => {
  return (
    <div>
      <Nav />
      <Heading size="xl" mb={4} textAlign="center">
        Log In
      </Heading>
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        mt={50}
        border="1px"
        borderColor="gray.400"
        borderRadius="10px"
        p="3rem"
      >
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {/* there are a bunch of props in the Formik component--> https://formik.org/docs/api/formik */}
          {(props) => (
            <Form>
              <Field name="name">
                {/* field and form are props of the Field component from formik */}
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="name"
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {/* field and form are props of the Field component from formik */}
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="email"
                      type="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {/* field and form are props of the Field component from formik */}
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="password"
                      type="password"
                    />
                    {/* <InputRightElement width="4.5rem">
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>  */}
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                w="100%"
                size="lg"
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Text>
          Need an account? <Link color="blue.400">Sign up</Link>
        </Text>
      </Container>
    </div>
  );
};

export default Account;
