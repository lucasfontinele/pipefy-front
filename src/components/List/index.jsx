import React from "react";

import { MdAdd } from "react-icons/md";
import { Container } from "./styles";

import Card from "../Card/index";

export default function ({ data, index: listIndex }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable === true && (
          <button type="button">
            <MdAdd size={24} color="#FFFFFF"/>
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => <Card key={card.id} index={index} listIndex={listIndex} data={card} />)}
      </ul>
    </Container>
  )
}
