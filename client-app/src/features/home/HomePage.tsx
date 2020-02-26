import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/RootStore";
import { LoginForm } from "../user/LoginForm";
import { RegisterForm } from "../user/RegisterForm";

export const HomePage = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Activités
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Hey ! Cela fait plaisir de vous voir, ${user.displayName} !`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Voir la liste des activités !
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Bienvenue !" />
            <Button as={Link} to="/login"
              onClick={() => openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Connexion
            </Button>
            <Button as={Link} to="/register"
              onClick={() => openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Inscription
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
