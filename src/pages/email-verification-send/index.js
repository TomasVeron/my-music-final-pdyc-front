import { Button, Card, Container, Text } from "@nextui-org/react";
import { getAuth, sendEmailVerification } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const auth = getAuth();
  const [send, setSend] = useState(false);
  const router = useRouter();

  const handleSend = () => {
    setSend(true);
  };

  const sendEmail = async () => {
    await sendEmailVerification(auth.currentUser);
  };

  useEffect(() => {
    if (send) {
      sendEmail();
    }
  }, [send]);

  useEffect(()=>{
    if(auth.currentUser?.emailVerified==true){
      router.push("/login");
  }
  },[])

  return (
    <Container display="flex" justify="center" alignItems="center" css={{ h: "100vh" }}>
      <Card css={{ display: "flex", justifyContent: "center", alignItems: "center", w: "400px" }}>
        <Card.Body>
          <Image src="/images/email-send.svg" width={250} height={250} />
        </Card.Body>
        <Card.Footer css={{ display: "flex", flexDirection: "column" }}>
          <Text size={30} css={{ fontWeight: "$bold" }}>
            Please verify account.
          </Text>
          <Text css={{ textAlign: "center", margin: "$10 0" }}>An email has been sent to your mailbox to verify your account.</Text>
          {send ? (
            <Text size={20} color="$success" css={{ fontWeight: "$bold", border: "2px solid $success", padding: "$1 $10", borderRadius: "$md", marginBottom:"$10" }}>
              Verification email sent correctly
            </Text>
          ) : (
            <Button onPress={handleSend} css={{ margin: "$10 0" }}>
              Resend email verification
            </Button>
          )}
          <Container>
            <Text css={{ textAlign: "center" }}>
              If you already verified your account.
              <Link href="/login">Sign In</Link>
            </Text>
          </Container>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default index;
