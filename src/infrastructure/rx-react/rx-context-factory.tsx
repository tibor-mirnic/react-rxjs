import {
  createContext,
  FC,
  PropsWithChildren,
  Context as ReactContext,
  useContext,
  useMemo,
  useCallback,
} from "react";

import { BehaviorSubject, Subject } from "rxjs";
import produce from "immer";

import {
  EnumType,
  IContextEvent,
  IRxContextFactory,
  IRxContextValue,
} from "./models";

export const rxContextFactory = <
  TModel,
  TEvent extends typeof EnumType,
  TCommand extends typeof EnumType
>(
  initial: TModel
): IRxContextFactory<TModel, TEvent, TCommand> => {
  const RxJsContext = createContext<IRxContextValue<
    TModel,
    TEvent,
    TCommand
  > | null>(null);

  const RxContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const model = useMemo(() => new BehaviorSubject<TModel>(initial), []);
    const onEvent = useMemo(
      () => new Subject<IContextEvent<TModel, TEvent>>(),
      []
    );
    const onCommand = useMemo(() => new Subject<TCommand>(), []);

    const publishEvent = useCallback(
      (event: TEvent) => {
        onEvent.next({
          model: model.getValue(),
          event,
        });
      },
      [model, onEvent]
    );

    const updateModel = useCallback(
      (event: TEvent, update: (model: TModel) => void) => {
        model.next(produce(model.getValue(), update));
        publishEvent(event);
      },
      [model, publishEvent]
    );

    const executeCommand = useCallback(
      (command: TCommand) => {
        onCommand.next(command);
      },
      [onCommand]
    );

    const value = useMemo(
      () => ({
        model,
        onEvent,
        onCommand,
        updateModel,
        executeCommand,
      }),
      [executeCommand, model, onCommand, onEvent, updateModel]
    );

    return (
      <RxJsContext.Provider value={value}>{children}</RxJsContext.Provider>
    );
  };

  const useRxContext = (): IRxContextValue<TModel, TEvent, TCommand> => {
    return useContext<IRxContextValue<TModel, TEvent, TCommand>>(
      RxJsContext as ReactContext<IRxContextValue<TModel, TEvent, TCommand>>
    );
  };

  return {
    useRxContext,
    RxContextProvider,
  };
};
