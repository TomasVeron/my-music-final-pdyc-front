import { Button, Card, Col, Modal, Table, Text, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import IconButton from "@/asset/IconButton";
import AddPlaylistIcon from "@/asset/AddPlaylistIcon";
import axiosInstance from "@/utils/AxiosInstance";

const ModalAddSongToPlaylist = ({ visible, closeHandler, user, song }) => {
  const [playlists, setPlaylists] = useState([]);
  const [notification, setNotification] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState();

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const deletePlaylist = (id) => {
    console.log(id);
    let playlistUpdate = playlists;
    return playlistUpdate.filter((playlist) => playlist.id !== id);
  };

  useEffect(() => {
    const action = async () => {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + user?.stsTokenManager?.accessToken;
      await axiosInstance
        .get("/ms-playlists/playlists")
        .then((response) => {
          setPlaylists(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    action();
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(undefined);
      }, [4000]);
    }
  }, [notification]);

  useEffect(() => {
    const action = async () => {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + user?.stsTokenManager?.accessToken;
      await axiosInstance
        .post(`/ms-playlists/playlists/${currentPlaylist.id}/songs/${song.id}`)
        .then((res) => {
          setPlaylists(deletePlaylist(res.data.id));
          setNotification({ status: "success", message: `Song added to ${currentPlaylist.name}` });
        })
        .catch((err) => setNotification({ status: "error", message: `something has gone wrong` }));
      setCurrentPlaylist(undefined);
    };
    if (currentPlaylist) {
      action();
    }
  }, [currentPlaylist]);

  return (
    <Modal closeButton width="800px" blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text b id="modal-title" size={20}>
          Add song to playlists
        </Text>
      </Modal.Header>
      <Modal.Body>
        {notification && notification.status === "success" && (
          <Card variant="flat" css={{ backgroundColor: "$success", padding: "$5" }}>
            {notification.message}
          </Card>
        )}
        {notification && notification.status === "error" && <Card css={{ backgroundColor: "$error", padding: "$5" }}>{notification.message}</Card>}
        <Table
          aria-label="Example table with custom cells"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          shadow={false}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.uid} hideHeader={column.uid === "actions"} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body>
            {playlists &&
              playlists.map((playlist) => (
                <Table.Row key={playlist.id}>
                  <Table.Cell>{playlist.name}</Table.Cell>
                  <Table.Cell>
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Delete user" color="error">
                        <IconButton onClick={() => setCurrentPlaylist(playlist)}>
                          <AddPlaylistIcon size={20} fill="#42ba96" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddSongToPlaylist;
