import React from "react";
import Note from "./Note";

function Title() {
  return (
    <>
      <Note contents="S" posX={0} posY={1} color={1}/>
      <Note contents="t" posX={20} posY={2} color={2}/>
      <Note contents="u" posX={40} posY={2} color={3}/>
      <Note contents="c" posX={60} posY={2} color={4}/>
      <Note contents="k" posX={80} posY={2} color={5}/>
      <Note contents="y" posX={2} posY={2} color={6}/>
      <Note contents="N" posX={2} posY={2} color={3}/>
      <Note contents="o" posX={2} posY={2} color={1}/>
      <Note contents="t" posX={2} posY={2} color={6}/>
      <Note contents="e" posX={2} posY={2} color={4}/>
      <Note contents="ssssss" posX={2} posY={2} color={2}/>
    </>
  );
}

export default Title;
