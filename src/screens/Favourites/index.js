import React, { Fragment } from "react";
import Screen from "./screen";
import { Header } from "../../components";

function Index(props) {
  return (
    <Fragment>
      <Header showSearch text="Favourites" />
      <Screen {...props} />
    </Fragment>
  );
}

export default Index;
