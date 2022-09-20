# react-create-view

A utility to standardize creating views that go through different states like `loading`, `success`, `empty`, `error`.

Inspired by redwoodjs `Cells` which you can peep [here](https://redwoodjs.com/docs/cells)

## Example

There is an example of how to use the `createView` utility in [example/src/App.tsx](example/src/App.tsx).

You can also check out `test.tsx` [here](test.tsx)

```typescript
import { createView, ViewModelProps } from 'react-create-view';

// note: models can contain callbacks, etc!
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

const useViewModel = (): VMProps => {
  // note: this is just for demo purposes. not a full example. use react-query!
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [name, setName] = useState('Chris Fields');

  if (isError) {
    return {
      status: 'error',
      model: {
        error: new Error('Failed to get data'),
      },
    };
  }

  if (isLoading) {
    return {
      status: 'loading',
      model: {
        icon: 'loadingIcon',
      },
    };
  }

  if (isEmpty) {
    return {
      status: 'empty',
      model: {
        msg: 'No items',
      },
    };
  }

  return {
    status: 'success',
    model: {
      name: 'chris',
    },
  };
};

const MyView = createView<SuccessModel, FailureModel, LoadingModel, EmptyModel>(
  {
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
  }
);

const MyComponent = () => {
  const vm = useViewModel();
  return <MyView {...vm} />;
};

// use <MyComponent /> anywhere!
```
