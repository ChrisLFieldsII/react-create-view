import React from 'react';

export type DefaultModel = Record<string, unknown>;

export type ViewModelProps<
  SuccessModel extends DefaultModel = DefaultModel,
  FailureModel extends DefaultModel = DefaultModel,
  LoadingModel extends DefaultModel = DefaultModel,
  EmptyModel extends DefaultModel = DefaultModel
> =
  | {
      status: 'success';
      model: SuccessModel;
    }
  | { status: 'loading'; model?: LoadingModel }
  | { status: 'error'; model?: FailureModel }
  | { status: 'empty'; model?: EmptyModel };

export type CreateViewInput<
  SuccessModel extends DefaultModel = DefaultModel,
  FailureModel extends DefaultModel = DefaultModel,
  LoadingModel extends DefaultModel = DefaultModel,
  EmptyModel extends DefaultModel = DefaultModel
> = {
  Success: (props: SuccessModel) => JSX.Element;
  Loading?: (props: LoadingModel) => JSX.Element;
  Failure?: (props: FailureModel) => JSX.Element;
  Empty?: (props: EmptyModel) => JSX.Element;
};

export const RenderNull = () => null;

/**
 * Create a UI `View` given a `ViewModel` and components that represent different
 * states like `Success`, `Loading`, `Empty`, `Failure`.
 */
export const createView = <
  SuccessModel extends DefaultModel = DefaultModel,
  FailureModel extends DefaultModel = DefaultModel,
  LoadingModel extends DefaultModel = DefaultModel,
  EmptyModel extends DefaultModel = DefaultModel
>(
  input: CreateViewInput<SuccessModel, FailureModel, LoadingModel, EmptyModel>
): React.FC<
  ViewModelProps<SuccessModel, FailureModel, LoadingModel, EmptyModel>
> => {
  const {
    Success,
    Failure = RenderNull,
    Loading = RenderNull,
    Empty = RenderNull,
  } = input;

  return (props) => {
    const { status } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model: any = props?.model || {};

    if (status === 'error') {
      return <Failure {...model} />;
    }

    if (status === 'loading') {
      return <Loading {...model} />;
    }

    if (status === 'empty') {
      return <Empty {...model} />;
    }

    if (status === 'success') {
      return <Success {...model} />;
    }

    return null;
  };
};
