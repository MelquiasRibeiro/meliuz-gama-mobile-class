import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import IsAuth from '../../components/IsAuth';

import api from '../../services';
import {IUser} from '../../types/index';

const SignUp: React.FC = () => {
  const navigation: void | any = useNavigation();

  const [data, setData] = useState<IUser>({} as IUser);

  const handleLogin = () => {
    navigation.navigate('Entrar');
  };

  const handleRegister = useCallback(() => {
    api
      .post('users', data)
      .then(() => {
        navigation.navigate('Entrar');
        setData({
          name: '',
          email: '',
          password: '',
        });
      })
      .catch(() => console.warn())
      .finally(() => {
        setData({
          name: '',
          email: '',
          password: '',
        });
      });
  }, [data, navigation]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar</Text>
        <TextInput
          placeholder="Informe seu nome"
          onChangeText={e => setData({...data, name: e})}
          style={styles.input}
        />
        <TextInput
          placeholder="Informe seu email"
          onChangeText={e => setData({...data, email: e})}
          style={styles.input}
        />
        <TextInput
          placeholder="Informe sua senha"
          secureTextEntry={true}
          onChangeText={e => setData({...data, password: e})}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.textButton}>cadastrar</Text>
        </TouchableOpacity>
        <View>
          <Text>Já possui cadastro?</Text>
          <TouchableOpacity style={styles.buttonLink} onPress={handleLogin}>
            <Text style={styles.textButtonLink}>Logar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height / 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#000',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },

  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonLink: {
    marginVertical: 16,
  },
  textButtonLink: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: '#000',
    textAlign: 'center',
    marginTop: 8,
  },
});
