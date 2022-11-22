import { FC, useCallback } from "react";
import { useObservablePickState, useSubscription } from "observable-hooks";

import { ComplexEvent, useComplexContext } from "../complex/context";

export const RxJsSimple: FC = () => {
  const { ctx, addItem } = useComplexContext();
  const { items } = useObservablePickState(ctx.model, ctx.model.value, "items");

  useSubscription(ctx.onEvent, (evt) => {
    switch (evt.event) {
      case ComplexEvent.ITEMS_CLEARED: {
        console.log("RxJsSimple.ITEMS_CLEARED");

        break;
      }
      case ComplexEvent.ITEM_ADDED: {
        console.log("RxJsSimple.ITEM_ADDED");
      }
    }
  });

  const onAddItem = useCallback(() => {
    addItem();
  }, [addItem]);

  console.log("RxJsSimple.render");

  return (
    <div className="rxjs-simple">
      <button type="button" onClick={onAddItem}>
        Add Item
      </button>
      {items.map((a) => (
        <div key={a.id}>{a.name}</div>
      ))}
    </div>
  );
};
