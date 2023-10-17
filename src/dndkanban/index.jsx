import React, { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import styles from "./styles.module.css";

export function KanbanDND() {
  const [items] = useState([1, 2, 3]);

  return (
    <DndContext>
      <div className={styles.dndContainer}>
        <SortableContext
          items={[
            ...items.map((item) => item + "one"),
            ...items.map((item) => item + "two"),
            ...items.map((item) => item + "three"),
          ]}
        >
          <SortableContext items={items.map((item) => item + "one")}>
            <div>
              {items.map((item) => (
                <SortableItem key={item + "one"} item={item + "one"} />
              ))}
            </div>
          </SortableContext>
          <SortableContext items={items.map((item) => item + "two")}>
            <div>
              {items.map((item) => (
                <SortableItem key={item + "two"} item={item + "two"} />
              ))}
            </div>
          </SortableContext>
          <SortableContext items={items.map((item) => item + "three")}>
            <div>
              {items.map((item) => (
                <SortableItem key={item + "three"} item={item + "three"} />
              ))}
            </div>
          </SortableContext>
        </SortableContext>
      </div>

      <DragOverlay>
        <SortableItem key={"overlay"} item={"overlay"} />
      </DragOverlay>
    </DndContext>
  );
}

function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      {...attributes}
      {...listeners}
      className={styles.item}
      style={style}
      ref={setNodeRef}
    >
      {item}
    </div>
  );
}
