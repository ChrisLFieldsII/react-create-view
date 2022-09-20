import test from 'ava';
import React from 'react';
import { ViewModelProps, createView } from './src';
import TestRenderer from 'react-test-renderer';

type SuccessModel = {
  name: string;
};

type FailureModel = {
  error: Error;
};

type LoadingModel = {
  icon: string;
};

type EmptyModel = {
  msg: string;
};

type VMProps = ViewModelProps<
  SuccessModel,
  FailureModel,
  LoadingModel,
  EmptyModel
>;

const View = createView<SuccessModel, FailureModel, LoadingModel, EmptyModel>({
  Success({ name }) {
    return <h1>{name}</h1>;
  },
  Failure({ error }) {
    return <h1>{error.message}</h1>;
  },
  Loading({ icon }) {
    return <h1>{icon}</h1>;
  },
  Empty({ msg }) {
    return <h1>{msg}</h1>;
  },
});

test('success', (t) => {
  const useViewModel = (): VMProps => {
    return {
      status: 'success',
      model: {
        name: 'chris',
      },
    };
  };

  const Comp = () => {
    const vm = useViewModel();
    return <View {...vm} />;
  };

  const testRenderer = TestRenderer.create(<Comp />);
  const rootView = testRenderer.root.findByType(View);
  const props = rootView.props as VMProps;
  t.is(props.status, 'success');
  t.is((props.model as SuccessModel).name, 'chris');
});

test('failure', (t) => {
  const useViewModel = (): VMProps => {
    return {
      status: 'error',
      model: {
        error: new Error('uh oh'),
      },
    };
  };

  const Comp = () => {
    const vm = useViewModel();
    return <View {...vm} />;
  };

  const testRenderer = TestRenderer.create(<Comp />);
  const rootView = testRenderer.root.findByType(View);
  const props = rootView.props as VMProps;
  t.is(props.status, 'error');
  t.is((props.model as FailureModel).error.message, 'uh oh');
});

test('loading', (t) => {
  const useViewModel = (): VMProps => {
    return {
      status: 'loading',
      model: {
        icon: 'loadingIcon',
      },
    };
  };

  const Comp = () => {
    const vm = useViewModel();
    return <View {...vm} />;
  };

  const testRenderer = TestRenderer.create(<Comp />);
  const rootView = testRenderer.root.findByType(View);
  const props = rootView.props as VMProps;
  t.is(props.status, 'loading');
  t.is((props.model as LoadingModel).icon, 'loadingIcon');
});

test('empty', (t) => {
  const useViewModel = (): VMProps => {
    return {
      status: 'empty',
      model: {
        msg: 'No items',
      },
    };
  };

  const Comp = () => {
    const vm = useViewModel();
    return <View {...vm} />;
  };

  const testRenderer = TestRenderer.create(<Comp />);
  const rootView = testRenderer.root.findByType(View);
  const props = rootView.props as VMProps;
  t.is(props.status, 'empty');
  t.is((props.model as EmptyModel).msg, 'No items');
});
