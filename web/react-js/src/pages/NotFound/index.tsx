import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const NotFound: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/todos');
  }, [history]);

  return <div />;
};

export { NotFound };
