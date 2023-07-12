import Image from "next/image";
import { Inter } from "next/font/google";
import authenticateRoute from "@/utils/authenticateRoutes";
import { Button, Col, Container, Input, Table, Tooltip } from "@nextui-org/react";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import IconButton from "@/asset/IconButton";
import AddPlaylistIcon from "@/asset/AddPlaylistIcon";
import SearchIcon from "@/asset/SearchIcon";
import ModalAddSongToPlaylist from "@/components/modals/ModalAddSongToPlaylist";
import { useRouter } from "next/router";
import axios from "axios";
import ModalPlaySong from "@/components/modals/ModalPlaySong";
import PlayIcon from "@/asset/PlayIcon";

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalPlaySong, setModalPlaySong] = useState(false);
  const [authorSearch, setAuthorSearch] = useState();
  const [genreSearch, setGenreSearch] = useState();

  const router = useRouter();

  const handlerModal = (song) => {
    setVisible(true);
    setCurrentSong(song);
  };

  
  const handlerModalPlaySong = (song) => {
    setModalPlaySong(true);
    setCurrentSong(song);
  };

  const handleSearch = () => {
    console.log("handleSearch");
    if (authorSearch || genreSearch){
      console.log("entre");
      if(authorSearch){
        router.query.author = authorSearch
      }
      if(genreSearch) {
        router.query.genre = genreSearch
      }
      router.push(router)
    }else{
        router.push(router.pathname);
    }
  };

  useEffect(() => {
    const action = async () => {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + user?.stsTokenManager?.accessToken;
      await axiosInstance
        .get(`/ms-playlists/songs`)
        .then((response) => {
          setSongs(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    action();
  }, []);

  useEffect(() => {
    const action = async () => {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + user?.stsTokenManager?.accessToken;
      if(router.query.author && !router.query.genre){
        await axiosInstance
        .get(`/ms-playlists/songs?author=${router.query.author}`)
        .then((response) => {
          setSongs(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }else if(!router.query.author && router.query.genre){
        await axiosInstance
        .get(`/ms-playlists/songs?genre=${router.query.genre}`)
        .then((response) => {
          setSongs(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }else if(router.query.author && router.query.genre){
        await axiosInstance
        .get(`/ms-playlists/songs?author=${router.query.author}&&genre=${router.query.genre}`)
        .then((response) => {
          setSongs(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        await axiosInstance
        .get(`/ms-playlists/songs`)
        .then((response) => {
          setSongs(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
    };
    action();
  }, [router.query]);

  return (
    <Container lg>
      <Container display="flex" alignItems="" gap={1} css={{ margin: "$15 0", gap: "$10" }}>
        <Input type="text" clearable labelPlaceholder="Author" name="author" onChange={(ev)=>setAuthorSearch(ev.target.value)} />
        <Input type="text" clearable labelPlaceholder="Genre" name="genre"  onChange={(ev)=>setGenreSearch(ev.target.value)} />
        <IconButton onClick={()=>handleSearch()}>
          <SearchIcon size={20} fill="#0072f5" />
        </IconButton>
      </Container>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Author</Table.Column>
          <Table.Column>Genre</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {songs &&
            songs?.map((song) => (
              <Table.Row key={song.id}>
                <Table.Cell css={{ zIndex: 100 }}>{song.name}</Table.Cell>
                <Table.Cell css={{ zIndex: 100 }}>{song.author}</Table.Cell>
                <Table.Cell css={{ zIndex: 100 }}>{song.genre}</Table.Cell>
                <Table.Cell css={{ zIndex: 100 }}>
                  <Col css={{ d: "flex", alignItems:"center", gap:"$10" }}>
                    <Tooltip content="Play song" color="error">
                      <IconButton onClick={() => handlerModalPlaySong(song)}>
                        <PlayIcon size={17} fill="#f00" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit playlist" color="success">
                      <IconButton onClick={() => handlerModal(song)}>
                        <AddPlaylistIcon size={20} fill="#40ffde" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Pagination shadow noMargin align="center" rowsPerPage={5} onPageChange={(page) => console.log({ page })} />
      </Table>
      <ModalAddSongToPlaylist visible={visible} song={currentSong} closeHandler={() => setVisible(false)} user={user}></ModalAddSongToPlaylist>
      <ModalPlaySong visible={modalPlaySong} song={currentSong} closeHandler={() => setModalPlaySong(false)}/>
    </Container>
  );
};
export default authenticateRoute(Index, {
  pathAfterFailure: "/login",
});