import React from "react";
import { Navbar, Button, Link, Text, Card, Radio, Dropdown, Avatar, Container } from "@nextui-org/react";
import { default as NLink } from "next/link";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

const NavBar = () => {
  const [variant, setVariant] = React.useState("floating");
  const { user } = useAuth();
  const router = useRouter();

  const collapseItems = [
    { name: "Songs", link: "/" },
    { name: "Playlists", link: "/playlists" },
  ];

  return (
    <Container css={{ boxSizing: "border-box", maxW: "100%" }}>
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
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
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight activeColor="secondary" hideIn="xs" variant="highlight-rounded">
          <Navbar.Link as={NLink} isActive={router.pathname === "/songs"} href="/songs">
            Songs
          </Navbar.Link>
          <Navbar.Link as={NLink} isActive={router.pathname === "/playlists"} href="/playlists">
            Playlists
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar squared  src={user?.photoURL} />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={(actionKey) => console.log({ actionKey })}>
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                <LogoutButton />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem activeColor="secondary" isActive={router.pathname === "/songs"}>
            <Link as={NLink} color="inherit" css={{ minWidth: "100%" }} href="/songs">
              Songs
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem activeColor="secondary" isActive={router.pathname === "/playlists"}>
            <Link as={NLink} color="inherit" css={{ minWidth: "100%" }} href="/playlists">
              Playlists
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem activeColor="secondary">
            <LogoutButton />
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
