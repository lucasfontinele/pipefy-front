import React, { useRef, useContext } from "react";

import { Container, Label } from "./styles";
import { useDrag, useDrop } from "react-dnd";

import BoardContext from "../Board/context";

export default function ({ data, index }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", id: data.id, index, content: data.content },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      // const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if ((draggedIndex < targetIndex && draggedTop < targetCenter) || (draggedIndex > targetIndex && draggedTop > targetCenter)) {
        return;
      }

      move(draggedListIndex, draggedIndex, targetIndex)
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container isDragging={isDragging} ref={dragRef}>
      <header>
        {data.labels.map(label => <Label key={label} color={label}/>)}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar"/>}
    </Container>
  )
}
