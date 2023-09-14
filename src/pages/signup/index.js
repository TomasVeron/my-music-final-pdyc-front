import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import Axiosinstance from "../../utils/AxiosInstance";
import { useAuth } from "../../hooks/useAuth";
import Router, { useRouter } from "next/router";
import axiosInstance from "../../utils/AxiosInstance";
import publicRoute from "../../utils/publicRoutes";
import { default as NLink } from "next/link";
import { Button, Card, Container, Link, Spacer, Text } from "@nextui-org/react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";

const renderField = ({ input, label, meta: { touched, error, warning } }) => (
  <div>
    <AppInput input={input} label={label} error={error} touched={touched ? 1 : undefined} warning={warning} />
  </div>
);

const Index = () => {
  const { login } = useAuth();
  const [error, setError] = useState(undefined);
  const router = useRouter();

  let onSubmit = async (data) => {
    if (data && data.password !== data.confirmPassword) {
      setError("Passwords do not match");
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then( async (userCredential) => {
          await sendEmailVerification(userCredential.user);
          router.push("/email-verification-send")
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };
  return (
    <Container display="flex" justify="center" alignItems="center" css={{ w: "100%", h: "100vh" }}>
      <Card css={{ w: "30%" }}>
        <Card.Header>
          <Container display="flex" justify="center">
            <Text size={18}>
              Register in{" "}
              <Text
                h1
                size={20}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                MyMusic
              </Text>
            </Text>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container xl css={{ marginBottom: "$10" }}>
            {error && (
              <Card variant="flat" css={{ backgroundColor: "$error", padding: "$5", textAlign: "center" }}>
                {error}
              </Card>
            )}
          </Container>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="bg-white py-2 px-4 rounded shadow-lg">
                <Field name="email" type="text" render={renderField} label="Username" />
                <Spacer y={1} />
                <Field name="password" type="password" render={renderField} label="Password" />
                <Spacer y={1} />
                <Field name="confirmPassword" type="password" render={renderField} label="Repeat Password" />
                <Spacer y={2} />
                <Container display="flex" justify="center" alignItems="center">
                  <Button type="submit" color="secondary" rounded xl>
                    Sign Up
                  </Button>
                </Container>
              </form>
            )}
          />
        </Card.Body>
        <Card.Footer>
          <Text css={{ textAlign: "center", w: "100%" }} weight={"@md"} size={10}>
            Do you already have an account?
            <Link as={NLink} href="/login">
              Log in here
            </Link>
          </Text>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default publicRoute(Index, { pathAfterFailure: "/" });
