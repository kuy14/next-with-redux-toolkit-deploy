import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDataForm from "../../components/add-data";
import { Container, Row, Col, Card } from "react-bootstrap";
import requiredAuth from "../../components/requiredAuth/requiredAuth";
import {
  getDataTest,
  getPhotos,
  selectPhotos,
} from "../../lib/slices/dataTestSlice";

const PhotoPage = () => {
  const router = useRouter();
  const albumId = router.query.id;
  const dispatch = useDispatch();
  const { photos } = useSelector(selectPhotos);
  useEffect(() => {
    async function dispatchLoadData() {
      await dispatch(getPhotos(albumId));
    }
    dispatchLoadData();
  }, [dispatch && albumId !== undefined]);

  const renderPhoto = (photo) => (
    <Card
      style={{ width: "16rem", display: "inline-block" }}
      key={photo.id}
      className="mr-2 mb-2"
    >
      <Card.Img variant="top" src={photo.url} />
      <Card.Body>
        <Card.Title style={{ fontSize: "14px" }} className="text-truncate">
          {photo.title}
        </Card.Title>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <Head>
        <title>Data Photo</title>
      </Head>
      <Container>
        <Row>
          <Col md={10}>
            <AddDataForm />
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        <Row>
          <Col md={10}>
            <h3>All Photos</h3>
          </Col>
          <Col md={12}>{photos.map(renderPhoto)}</Col>
        </Row>
      </Container>
    </>
  );
};

export default requiredAuth(PhotoPage);
