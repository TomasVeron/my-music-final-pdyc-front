import { Button, Col, Container, Link, Modal, Table, Text, Tooltip } from "@nextui-org/react";
import ReactPlayer from "react-player";

const ModalPlaySong = ({ visible, closeHandler, song }) => {

  return (
    <Modal closeButton width="800px" blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text b id="modal-title" size={20}>
          {song?.name}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Container css={{ h:"600px"}}>
            <ReactPlayer
                url={song?.link}
                className='react-player'
                width='100%'
                height='100%'
                controls
            />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPlaySong;