/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import jwtDecode, {JwtPayload} from 'jwt-decode';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import api from '../../services';
import {getToken} from '../../store/modules/auth/action';

import {IUser} from '../../types';

// interface IToken {
//   token: string;
// }

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state: any) => state);
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigation: void | any = useNavigation();

  const handleLogin = () => {
    api
      .post('session', user, {
        headers: {
          ContentType: 'application/json',
        },
      })
      .then(res => {
        dispatch(getToken(res.data));
        console.log(res.data);
        setTimeout(() => {
          navigation.navigate('dash');
        }, 1500);
      })
      .catch(err => console.warn(err))
      .finally(() => {
        setUser({
          email: '',
          password: '',
        });
      });
  };

  const isAuth: any = () => {
    if (globalState?.token) {
      const tokenPayload: any = jwtDecode<JwtPayload>(globalState?.token);
      const expToken = tokenPayload.exp;
      const timeNow = Date.now() / 1000;

      return timeNow > expToken ? false : true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isAuth()) {
      navigation.navigate('dash');
    }
  }, [globalState]);

  const handleRegister = () => {
    navigation.navigate('Cadastre-se');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
          <TextInput
            placeholder="Informe seu e-mail"
            value={user.email}
            onChangeText={e => setUser({...user, email: e})}
            style={styles.input}
          />
          <TextInput
            placeholder="Informe sua senha"
            value={user.password}
            secureTextEntry={true}
            onChangeText={e => setUser({...user, password: e})}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Ainda não possui conta?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.textButtonLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
