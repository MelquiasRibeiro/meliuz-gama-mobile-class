import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TextInput} from 'react-native';

import {IAuth} from '../../types';

interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const IsAuth: React.FC = () => {
  const globalState = useSelector((state: IAuth) => state.auth);
  const [password, setPassword] = useState<IPasswordChange>(
    {} as IPasswordChange,
  );

  return (
    <View>
      <Text>Está autenticado?{globalState ? 'sim' : 'não'}</Text>
      <Text>{globalState?.user.name}</Text>
      <TextInput
        placeholder="Old password"
        value={password.oldPassword}
        secureTextEntry={true}
        onChangeText={e => setPassword({...password, oldPassword: e})}
      />
      <TextInput
        placeholder="New password"
        value={password.newPassword}
        secureTextEntry={true}
        onChangeText={e => setPassword({...password, newPassword: e})}
      />
      <TextInput
        placeholder="Confirm new password"
        value={password.confirmPassword}
        secureTextEntry={true}
        onChangeText={e => setPassword({...password, confirmPassword: e})}
      />
    </View>
  );
};

export default IsAuth;
