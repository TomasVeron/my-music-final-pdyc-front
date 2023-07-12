import React from 'react'
import AppInput from '../AppInput';
import { Button, Modal,Container,  Spacer, Text } from '@nextui-org/react';
import { Field, Form } from 'react-final-form';
import axiosInstance from '../../utils/AxiosInstance';


const renderField = ({ input, label, meta: { touched, error, warning } }) => (
    <div>
      <AppInput input={input} label={label} error={error} touched={touched ? 1 : undefined} warning={warning} />
    </div>
  );

const ModalNewPlaylist = ({ visible, closeHandler,setPlaylists,  playlists, user }) => {
    let onSubmit = async (data) => {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + user?.stsTokenManager?.accessToken;
        await axiosInstance
          .post(`/ms-playlists/playlists`, data)
          .then((res) => {
            closeHandler();
          })
          .catch((error) => {
            console.log(error);
          });
          await axiosInstance
          .get(`/ms-playlists/playlists`)
          .then((res) => setPlaylists(res.data))
          .catch((err) => console.log(err));
      };

  return  (
    <Modal closeButton width="600px" blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="bg-white py-2 px-4 rounded shadow-lg">
            <Modal.Header>
              <Text b id="modal-title" size={20}>
                Create new playlist
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Container display="flex" direction="column" justify="center" fluid>
                <Field name="name" type="text" render={renderField} label="Add new name" />
                <Spacer y={1} />
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler}>
                Close
              </Button>
              <Button auto flat type="submit" ms onClick={closeHandler}>
                create
              </Button>
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  );
}

export default ModalNewPlaylist