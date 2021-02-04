import { useDispatch, useSelector } from "react-redux";

import { addData } from "../lib/slices/dataTestSlice";
import useForm from "../lib/useForm";
import { Form, Button } from "react-bootstrap";

const AddDataForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = useForm({
    albumId: "",
    id: "",
    title: "",
    url: "",
    thumbnailUrl: "",
  });

  return (
    <form onSubmit={handleSubmit((data) => dispatch(addData(data)))}>
      <h3 className="text-center">Create a Photo Data</h3>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Album Id</Form.Label>
        <Form.Control type="text" name="albumId" placeholder="Enter album id" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Photo Id</Form.Label>
        <Form.Control type="text" name="id" placeholder="Enter photo id" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter title" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Url</Form.Label>
        <Form.Control type="text" name="url" placeholder="Enter Url" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Thumbnail Url</Form.Label>
        <Form.Control
          type="text"
          name="thumbnailUrl"
          placeholder="Enter Thumbnail Url"
        />
      </Form.Group>
      <br />
      <Button variant="dark" type="submit">
        Add Photo
      </Button>
      <br />
    </form>
  );
};

export default AddDataForm;
