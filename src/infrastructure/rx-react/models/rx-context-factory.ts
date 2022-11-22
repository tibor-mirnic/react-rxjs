import { FC, PropsWithChildren } from "react";
import { BehaviorSubject, Subject } from "rxjs";

import { IContextEvent } from "./context-event";
import { EnumType } from "./enum";

export interface IRxContextValue<
  TModel,
  TEvent extends typeof EnumType,
  TCommand extends typeof EnumType
> {
  model: BehaviorSubject<TModel>;
  onEvent: Subject<IContextEvent<TModel, TEvent>>;
  onCommand: Subject<TCommand>;
  updateModel: (event: TEvent, update: (model: TModel) => void) => void;
  executeCommand: (command: TCommand) => void;
}

export interface IRxContextFactory<
  TModel,
  TEvent extends typeof EnumType,
  TCommand extends typeof EnumType
> {
  useRxContext: () => IRxContextValue<TModel, TEvent, TCommand>;
  RxContextProvider: FC<PropsWithChildren>;
}
