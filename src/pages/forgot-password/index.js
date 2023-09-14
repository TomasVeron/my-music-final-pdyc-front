import { Button, Card, Container, Input, Text } from '@nextui-org/react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const index = () => {
    const [send, setSend] = useState(false);
    const [email, setEmail] = useState();
    const auth = getAuth();
    const router = useRouter();

    const handleSend = async ()=>{
        if(email){
            await sendPasswordResetEmail(auth, email);
            setSend(true);
        }
    }

    useEffect(()=>{
        let timerId;
        if(send){
            timerId = setTimeout(()=>{
                router.push("/login")
            },[2000])
        }
        return () => timerId && clearTimeout(timerId);
    },[send])
  return (
    <Container display="flex" justify="center" alignItems="center" css={{ h: "100vh" }}>
      <Card css={{ display: "flex", justifyContent: "center", alignItems: "center", w: "400px" }}>
        <Card.Header>
        <Container display="flex" justify="center">
            <Text
                size={20}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                MyMusic
              </Text>
          </Container>
        </Card.Header>
        <Card.Body>
            <Text size={30} css={{ fontWeight: "$bold", textAlign:"start" }}>
                Reset password
            </Text>
        </Card.Body>
        <Card.Footer css={{ display: "flex", flexDirection: "column" }}>
          {send ? (
            <Text size={20} color="$success" css={{ fontWeight: "$bold", border: "2px solid $success", padding: "$1 $10", borderRadius: "$md", marginBottom:"$10" }}>
              Email send correctly
            </Text>
          ) : (
            <Container display='flex' justify='center' alignItems='center'>
                <Input onChange={(ev)=>setEmail(ev.target.value)} bordered color="secondary" fullWidth clearable label="Email" />
                <Button color="secondary" onPress={handleSend} css={{ margin: "$10 0" }}>
                    Send reset password email
                </Button>
            </Container>
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
  )
}

export default index