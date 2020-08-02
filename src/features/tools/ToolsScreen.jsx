import React from 'react';
import ToolBar from './ToolBar';
import NavigationButton from '../navigation/NavigationButton';
import ContainerView from '../../components/ContainerView';

const ToolsScreen = () => {
  return (
    <ContainerView>
      <ToolBar />
      <NavigationButton text={'Close'} navigateTo={'Nodes'} />
    </ContainerView>
  );
};

export default ToolsScreen ;
