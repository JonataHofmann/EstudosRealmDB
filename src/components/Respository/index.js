import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Name,
  Description,
  Stat,
  Stats,
  StatCount,
  Refresh,
} from './styles';

const Respository = ({data, onRefresh}) => {
  return (
    <Container>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>
      <Stats>
        <Stat>
          <Icon name="star" size={16} color="#333" />
          <StatCount>{data.stars}</StatCount>
        </Stat>
        <Stat>
          <Icon name="code-fork" size={16} color="#333" />
          <StatCount>{data.forks}</StatCount>
        </Stat>
        <Refresh onPress={onRefresh}>
          <Icon name="refresh" size={16} color="#7159c1" />
        </Refresh>
      </Stats>
    </Container>
  );
};

export default Respository;
