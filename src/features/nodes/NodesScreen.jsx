import React from 'react';
import NodesGrid from './NodesGrid';
import OperationsPanel from '../tools/OperationsPanel';
import NavigationButton from '../navigation/NavigationButton';
import ContainerView from '../../components/ContainerView';

const NodesScreen = () => {
  return (
    <ContainerView>
      <NodesGrid />
      <OperationsPanel />
      <NavigationButton text={'Tools'} navigateTo={'Tools'} />
    </ContainerView>
  );
};

export default NodesScreen;
