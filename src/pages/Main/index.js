import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Keyboard from 'react-native';
import {Container, Title, Form, Input, Submit, List} from './styles';
import Repository from '~/components/Respository';

import api from '~/services/api';
import getRealm from '~/services/realm';

const Main = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRealm();

      const data = realm.objects('Repository').sorted('stars', true);
      setRepositories(data);
    }
    loadRepositories();
  }, []);

  async function saveRepository(repository) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullname: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });
  }

  async function handleAddRepository() {
    try {
      const reponse = await api.get(`/repos/${input}`);
      await saveRepository(reponse.data);
      setInput('');
      setError(false);
      // Keyboard.dismiss();
    } catch (error) {
      setError(true);
      // setInput('Erro:' + error);
    }
  }

  async function handleRefreshRepository(repository) {
    const reponse = await api.get(`/repos/${repository.fullname}`);
    await saveRepository(reponse.data);

    setRepositories(
      repositories.map((repo) => (repo.id == data.id ? data : repo)),
    );
  }

  return (
    <Container>
      <Title>Respositórios</Title>
      <Form>
        <Input
          value={input}
          error={error}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar repositório..."
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps="handle"
        data={repositories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <Repository
            data={item}
            onRefresh={() => handleRefreshRepository(item)}
          />
        )}
      />
    </Container>
  );
};

export default Main;
