import { useCallback } from "react";
import { rxContextFactory } from "src/infrastructure/rx-react";

interface IComplexModel {
  hasItems: boolean;
  items: {
    id: string;
    name: string;
  }[];
}

export enum ComplexCommand {
  ALERT = "ALERT",
}

export enum ComplexEvent {
  ITEMS_CLEARED = "ITEMS_CLEARED",
  ITEM_ADDED = "ITEM_ADDED",
}

const { useRxContext, RxContextProvider } = rxContextFactory<
  IComplexModel,
  ComplexEvent,
  ComplexCommand
>({
  hasItems: true,
  items: [
    {
      id: "one",
      name: "One",
    },
    {
      id: "two",
      name: "Two",
    },
  ],
});

export const ComplexContextProvider = RxContextProvider;

export const useComplexContext = () => {
  const ctx = useRxContext();

  const addItem = useCallback(() => {
    ctx.updateModel(ComplexEvent.ITEM_ADDED, (model) => {
      const key = Math.round(Math.random() * 10000);
      model.items.push({ id: `${key}`, name: `Item-${key}` });
    });
  }, [ctx]);

  const alert = useCallback(() => {
    ctx.executeCommand(ComplexCommand.ALERT);
  }, [ctx]);

  const clearItems = useCallback(() => {
    ctx.updateModel(ComplexEvent.ITEMS_CLEARED, (model) => {
      model.hasItems = false;
      model.items = [];
    });
  }, [ctx]);

  return {
    ctx,
    addItem,
    clearItems,
    alert,
  };
};
