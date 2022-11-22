import { FC, PropsWithChildren, useCallback } from "react";
import { useObservablePickState, useSubscription } from "observable-hooks";

import { ComplexCommand, ComplexEvent, useComplexContext } from "./context";

export const RxJsComplex: FC<PropsWithChildren> = ({ children }) => {
  const { ctx, alert, clearItems } = useComplexContext();

  const { hasItems } = useObservablePickState(
    ctx.model,
    ctx.model.value,
    "hasItems"
  );

  useSubscription(ctx.onCommand, (cmd) => {
    if (cmd === ComplexCommand.ALERT) {
      console.log("RxJsComplex.ALERT", ctx.model.value);
    }
  });

  useSubscription(ctx.onEvent, (evt) => {
    switch (evt.event) {
      case ComplexEvent.ITEMS_CLEARED: {
        console.log("RxJsComplex.ITEMS_CLEARED");
        break;
      }
    }
  });

  const onAlert = useCallback(() => {
    alert();
  }, [alert]);

  const onClearItems = useCallback(() => {
    clearItems();
  }, [clearItems]);

  console.log("RxJsComplex.render");

  return (
    <div className="rxjs-complex">
      <button type="button" onClick={onAlert}>
        Alert
      </button>

      <button type="button" onClick={onClearItems}>
        Clear Items
      </button>

      {hasItems && children}
    </div>
  );
};
