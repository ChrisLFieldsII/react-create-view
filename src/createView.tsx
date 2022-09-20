import React from 'react';

type DefaultModel = Record<string, unknown>;

/**
 * Generic type for different statuses a view can go through.
 */
export type ViewModelProps<
  SuccessModel extends DefaultModel = DefaultModel,
  FailureModel extends DefaultModel = DefaultModel,
  LoadingModel extends DefaultModel = DefaultModel,
  EmptyModel extends DefaultModel = DefaultModel
> =
  | {
      status: 'success';
      model?: SuccessModel;
    }
  | { status: 'loading'; model?: LoadingModel }
  | { status: 'error'; model?: FailureModel }
  | { status: 'empty'; model?: EmptyModel };

/**
 * Input type for `createView` utility.
 */
export type CreateViewInput<
  SuccessModel extends DefaultModel = DefaultModel,
  FailureModel extends DefaultModel = DefaultModel,
  LoadingModel extends DefaultModel = DefaultModel,
  EmptyModel extends DefaultModel = DefaultModel
> = {
  Success?: (props: SuccessModel) => JSX.Element;
  Loading?: (props: LoadingModel) => JSX.Element;
  Failure?: (props: FailureModel) => JSX.Element;
  Empty?: (props: EmptyModel) => JSX.Element;
};

const RenderNull = () => null;

/**
 * Create a `View` using components that represent different
 * states like `Success`, `Failure`, `Loading`, and `Empty`.
 *
 * Each state component is passed its own model according to `ViewModelProps` type.
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
    Success = RenderNull,
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
