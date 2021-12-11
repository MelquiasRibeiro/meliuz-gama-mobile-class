import React, {useState, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import api from '../../services';

const ChangePAssword: React.FC = () => {
  const [data, setData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = useCallback(() => {
    api
      .put('users', data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, [data]);
  return (
    <SafeAreaView>
      <View style={styles.default}>
        <View style={styles.card}>
          <Text style={styles.title}>Alterar senha</Text>
          <TextInput
            placeholder="Sua antiga senha"
            onChangeText={e => setData({...data, oldPassword: e})}
          />
          <TextInput
            placeholder="Sua nova senha"
            onChangeText={e => setData({...data, password: e})}
          />
          <TextInput
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            onChangeText={e => setData({...data, confirmPassword: e})}
          />
          <Button
            title="Salvar nova senha"
            onPress={handleRegister}
            color="#2a2a2a"
            accessibilityLabel="Realizar cadastro"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePAssword;

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  card: {
    backgroundColor: '#FECAD6',
    paddingHorizontal: 45,
    paddingVertical: 45,
    borderRadius: 12,
  },
  title: {
    alignContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});
