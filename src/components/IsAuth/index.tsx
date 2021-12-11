import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import api from '../../services';
import {IAuth} from '../../types';
import {logOut} from '../../store/modules/auth/action';
import {useNavigation} from '@react-navigation/native';

interface IPasswordChange {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const IsAuth: React.FC = () => {
  const globalState = useSelector((state: IAuth) => state.auth);
  const [password, setPassword] = useState<IPasswordChange>(
    {} as IPasswordChange,
  );
  const [sucess, setSucess] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function HandleChangePassword() {
    console.log(password);
    api
      .put('users', password, {
        headers: {
          Authorization: `Bearer ${globalState.token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setSucess(true);
      })
      .catch(err => console.error(err.message))
      .finally(() =>
        setPassword({oldPassword: '', password: '', confirmPassword: ''}),
      );
  }
  function HandleLogout() {
    dispatch(logOut());
    navigation.navigate('Entrar');
  }

  return (
    <View style={styles.container}>
      <Text>{globalState?.user.name}</Text>
      <TextInput
        placeholder="Old password"
        value={password.oldPassword}
        secureTextEntry={true}
        onChangeText={e => setPassword({...password, oldPassword: e})}
        style={styles.input}
      />
      <TextInput
        placeholder="New password"
        value={password.password}
        secureTextEntry={true}
        onChangeText={e => setPassword({...password, password: e})}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm new password"
        value={password.confirmPassword}
        secureTextEntry={true}
        onChangeText={e => setPassword({...password, confirmPassword: e})}
        style={styles.input}
      />
      {sucess ? (
        <View style={styles.sucessContainer}>
          <Text>Senha Alterada com sucesso</Text>
        </View>
      ) : (
        <View />
      )}
      <TouchableOpacity style={styles.button} onPress={HandleChangePassword}>
        <Text style={styles.textButton}>Mudar senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLink} onPress={HandleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IsAuth;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height / 3,
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
  sucessContainer: {
    backgroundColor: '#4BB543',
    padding: 4,
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
  },
  buttonLink: {
    marginHorizontal: 16,
  },
});
