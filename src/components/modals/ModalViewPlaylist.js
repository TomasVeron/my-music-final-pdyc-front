import { Button, Col, Link, Modal, Table, Text, Tooltip } from "@nextui-org/react";
import DeleteIcon from "@/asset/DeleteIcon";
import IconButton from "@/asset/IconButton";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/AxiosInstance";
import PlayIcon from "@/asset/PlayIcon";
import ModalPlaySong from "./ModalPlaySong";

const ModalViewPlaylist = ({ visible, closeHandler, setPlaylists, playlists, playlist, user }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [selected, setSelected] = useState([]);
  const [modalPlaySong, setModalPlaySong] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const [songToDelete, setSongToDelete] = useState();
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "AUTHOR", uid: "author" },
    { name: "GENRE", uid: "genre" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handlerModalPlaySong = (song) => {
    setModalPlaySong(true);
    setCurrentSong(song);
  };

  useEffect(() => {
    if (selected) {
      console.log(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (playlist) {
      setCurrentPlaylist(playlist)
    }
  }, [playlist]);

  useEffect(() => {
    const action = async () => {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + user?.stsTokenManager?.accessToken;
      await axiosInstance
        .delete(`/ms-playlists/playlists/${playlist.id}/songs/${songToDelete.id}`)
        .then((res) => setCurrentPlaylist(res.data))
        .catch((err) => console.log(err));
      setSongToDelete(undefined);
      await axiosInstance
        .get(`/ms-playlists/playlists`)
        .then((res) => setPlaylists(res.data))
        .catch((err) => console.log(err));
    };
    if (songToDelete) {
      action();
    }
  }, [songToDelete]);
  return (
    <Modal closeButton width="800px" blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text b id="modal-title" size={20}>
          {playlist?.name}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Table
          aria-label="Example table with custom cells"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          shadow={false}
          onSelectionChange={(keys, a) => setSelected(Array.from(keys))}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.uid} hideHeader={column.uid === "actions"} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body>
            {currentPlaylist?.songs &&
              currentPlaylist?.songs?.map((song) => (
                <Table.Row key={song.id}>
                  <Table.Cell>{song.name}</Table.Cell>
                  <Table.Cell>{song.author}</Table.Cell>
                  <Table.Cell>{song.genre}</Table.Cell>
                  <Table.Cell>
                    <Col css={{ d: "flex", gap:"$10" }}>
                      <Tooltip content="Play song" color="error">
                        <IconButton onClick={() => handlerModalPlaySong(song)}>
                          <PlayIcon size={17} fill="#f00" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete user" color="error">
                        <IconButton onClick={() => setSongToDelete(song)}>
                          <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <ModalPlaySong visible={modalPlaySong} song={currentSong} closeHandler={() => setModalPlaySong(false)}/>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewPlaylist;
