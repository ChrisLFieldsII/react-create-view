import React, { useState } from 'react';
import './App.css';

import { createView, ViewModelProps } from 'react-create-view';
import { faker } from '@faker-js/faker';

type HomeModel = {
  name: string;
  getName: () => Promise<void>;
};

type FailureModel = {
  error: Error;
  onRetry?: () => void;
};

type HomeViewModelProps = ViewModelProps<HomeModel, FailureModel>;

const useHomeView = (): HomeViewModelProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('Chris Fields');
  const [numClicks, setNumClicks] = useState(1);

  const getName = async () => {
    setIsLoading(true);
    setNumClicks((prev) => prev + 1);
    return new Promise<void>((res) => {
      setTimeout(() => {
        setName(faker.name.fullName());
        setIsLoading(false);
        res(undefined);
      }, 1000 * 1);
    });
  };

  const shouldError = numClicks % 3 === 0;
  if (shouldError) {
    return {
      status: 'error',
      model: {
        error: new Error('Failed to get a name'),
        onRetry: getName,
      },
    };
  }

  if (isLoading) {
    return {
      status: 'loading',
    };
  }

  return {
    status: 'success',
    model: {
      name,
      getName,
    },
  };
};

const HomeView = createView<HomeModel, FailureModel>({
  Success({ name, getName }) {
    return (
      <div>
        <h1>{name}</h1>

        <button onClick={getName}>Change Name</button>
      </div>
    );
  },
  Loading() {
    return <h1>Loading...</h1>;
  },
  Failure({ error, onRetry }) {
    return (
      <div>
        <h1 style={{ color: 'red' }}>{error.message}</h1>

        <button onClick={onRetry}>Change Name</button>
      </div>
    );
  },
});

function App() {
  const viewModel = useHomeView();

  return (
    <div className="App">
      <HomeView {...viewModel} />
    </div>
  );
}

export default App;
