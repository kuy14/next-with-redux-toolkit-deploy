import Head from "next/head";
import LoginForm from "../../components/login-form";
import { useSelector } from "react-redux";
import Router from "next/router";
import { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const LoginPage = () => {
  const userState = useSelector((state) => state.users.user);

  useEffect(() => {
    console.log(userState);
    if (userState.length !== 0) {
      return Router.push("/album");
    }
  });

  return (
    <>
      {userState.length === 0 ? (
        <>
          <Head>
            <title>Login | Photo Album</title>
          </Head>
          <LoginForm />
          <hr />
        </>
      ) : (
        <>
          <Container>
            <Row className="justify-content-center">
              <Col md={10}>
                <Spinner animation="grow" />
                <h4 className="text-center">Logging In ...</h4>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default LoginPage;
