import { Table, Row, Col, Tooltip, User, Text, Modal, Checkbox, Button, Container, Spacer } from "@nextui-org/react";
import DeleteIcon from "@/asset/DeleteIcon";
import IconButton from "@/asset/IconButton";
import EyeIcon from "@/asset/EyeIcon";
import EditIcon from "@/asset/EditIcon";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import authenticateRoute from "@/utils/authenticateRoutes";
import { Field, Form } from "react-final-form";
import AppInput from "@/components/AppInput";
import { useRouter } from "next/router";
import ModalEditPlaylist from "@/components/modals/ModalEditPlaylist";
import ModalViewPlaylist from "@/components/modals/ModalViewPlaylist";
import ModalDeletePlaylist from "@/components/modals/ModalDeletePlaylist";
import ModalNewPlaylist from "@/components/modals/ModalNewPlaylist";
import PlaylistIcon from "@/asset/PlayIcon";

const Index = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [visibleModalView, setVisibleModalView] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [visibleModalNew, setVisibleModalNew] = useState(false);
  const [playlistSelect, setPlaylistSelect] = useState();

  const handlerModalView = (playlist) => {
    setVisibleModalView(true);
    setPlaylistSelect(playlist);
  };

  const handlerModalEdit = (playlist) => {
    setVisibleModalEdit(true);
    setPlaylistSelect(playlist);
  };

  const handlerModalDelete = (playlist) => {
    setVisibleModalDelete(true);
    setPlaylistSelect(playlist);
  };

  const handlerModalNew = () => {
    setVisibleModalNew(true);
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

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "COUNT", uid: "count" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (playlist, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User src="/images/playlist-icon.svg" name={playlist.name} css={{ p: 0 }}>
            {user?.email}
          </User>
        );
      case "count":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {playlist.songs.length}
              </Text>
            </Row>
          </Col>
        );
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details" color="success">
                <IconButton onClick={() => handlerModalView(playlist)}>
                  <EyeIcon size={20} fill="#40ffde" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit playlist" color="warning">
                <IconButton onClick={() => handlerModalEdit(playlist)}>
                  <EditIcon size={20} fill="#ffd240" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Delete playlist" color="error" onClick={() => console.log("Delete user", user.id)}>
                <IconButton onClick={() => handlerModalDelete(playlist)}>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Container lg>
      <Spacer y={1} />
      <Button css={{ marginLeft: "$5", zIndex: 100 }} size={"sm"} flat color="secondary" onClick={handlerModalNew}>
        + New Playlist
      </Button>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.uid} hideHeader={column.uid === "actions"} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={playlists}>
          {(item) => <Table.Row>{(columnKey) => <Table.Cell css={{ zIndex: 100 }}>{renderCell(item, columnKey)}</Table.Cell>}</Table.Row>}
        </Table.Body>
        <Table.Pagination shadow noMargin align="center" rowsPerPage={3} onPageChange={(page) => console.log({ page })} />
      </Table>
      <ModalEditPlaylist
        visible={visibleModalEdit}
        closeHandler={() => setVisibleModalEdit(false)}
        setPlaylists={setPlaylists}
        playlists={playlists}
        playlist={playlistSelect}
        user={user}
      ></ModalEditPlaylist>
      <ModalViewPlaylist
        visible={visibleModalView}
        closeHandler={() => setVisibleModalView(false)}
        setPlaylists={setPlaylists}
        playlists={playlists}
        playlist={playlistSelect}
        user={user}
      ></ModalViewPlaylist>
      <ModalDeletePlaylist
        visible={visibleModalDelete}
        closeHandler={() => setVisibleModalDelete(false)}
        setPlaylists={setPlaylists}
        playlists={playlists}
        playlist={playlistSelect}
        user={user}
      ></ModalDeletePlaylist>
      <ModalNewPlaylist
        visible={visibleModalNew}
        closeHandler={() => setVisibleModalNew(false)}
        setPlaylists={setPlaylists}
        user={user}
      ></ModalNewPlaylist>
    </Container>
  );
};

export default authenticateRoute(Index);
