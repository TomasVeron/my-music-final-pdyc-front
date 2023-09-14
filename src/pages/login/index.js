import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import AppInput from "@/components/AppInput";
import { useAuth } from "../../hooks/useAuth";
import { default as NLink } from "next/link";
import { Button, Card, Checkbox, Container, Link, Row, Spacer, Text } from "@nextui-org/react";
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import { useRouter } from "next/router";
import publicRoute from "@/utils/publicRoutes";

const renderField = ({ input, label, meta: { touched, error, warning } }) => (
  <div>
    <AppInput input={input} label={label} error={error} touched={touched ? 1 : undefined} warning={warning} />
  </div>
);

const Index = () => {
  const { login } = useAuth();
  const [error, setError] = useState(undefined);
  const auth = getAuth();
  const router = useRouter();

  let onSubmit = async (data) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        router.push("/authenticated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  let handleResetPassword = async () => {
    router.push("/forgot-password")
  };

  useEffect(() => {
    const action = async () => {
      const firebaseui = await import("firebaseui");
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebase-auth-container", {
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
          },
        ],
        signInFlow:"popup",
        signInSuccessUrl: "/authenticated",
      });
    };
    action();
  }, []);

  return (
    <Container display="flex" justify="center" alignItems="center" css={{ w: "100%", h: "100vh" }}>
      <Card css={{ w: "30%" }}>
        <Card.Header>
          <Container display="flex" justify="center">
            <Text css={{ padding: "$5" }} size={18}>
              Welcome to{" "}
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
                <Container>
                  <Field name="email" type="text" render={renderField} label="Usuario" />
                  <Spacer y={1} />
                  <Field name="password" type="password" render={renderField} label="Contraseña" />
                  <Container display="flex" justify="space-between" alignItems="center">
                    <Checkbox>
                      <Text size={14}>Remember me</Text>
                    </Checkbox>
                    <Button css={{ display: "flex", alignItems: "center", justifyContent: "end" }} light onPress={handleResetPassword}>
                      Forgot password?
                    </Button>
                  </Container>
                  <Spacer y={2} />
                  <Container display="flex" justify="center" alignItems="center">
                    <Button type="submit" color="secondary" rounded xl>
                      Sign In
                    </Button>
                  </Container>
                </Container>
              </form>
            )}
          />
          <div id="firebase-auth-container"></div>
        </Card.Body>
        <Card.Footer>
          <Text css={{ textAlign: "center", w: "100%" }} weight={"@md"} size={10}>
            You do not have an account?
            <Link as={NLink} href="/signup">
              Sign up here
            </Link>
          </Text>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Index;
