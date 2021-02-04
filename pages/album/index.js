import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums, selectAlbums } from "../../lib/slices/dataTestSlice";
import requiredAuth from "../../components/requiredAuth/requiredAuth";
import { Container, Row, Col, Card } from "react-bootstrap";
import { doLogout } from "../../lib/slices/dataTestSlice";

const AlbumPage = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector(selectAlbums);
  useEffect(() => {
    async function dispatchLoadData() {
      await dispatch(getAlbums());
    }
    dispatchLoadData();
  }, [dispatch]);

  const renderAlbum = (album) => (
    <Card
      style={{ width: "16rem", display: "inline-block" }}
      key={album.id}
      className="mr-2 mb-2"
    >
      <Link href={`/photo/${album.id}`}>
        <Card.Body>
          <Card.Title style={{ fontSize: "14px" }} className="text-truncate">
            {album.title}
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );

  return (
    <>
      <Head>
        <title>Data Album</title>
      </Head>
      <hr />
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <h3 className="text-center">All Albums</h3>
            <button
              onClick={() => {
                dispatch(doLogout());
              }}
            >
              Logout
            </button>
          </Col>
          <Col md={10}>{albums.map(renderAlbum)}</Col>
        </Row>
      </Container>
    </>
  );
};

export default requiredAuth(AlbumPage);
