import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function Auth() {
  //Inicio

  const [isLogin, setIsLogin] = useState(true);

  //Cambio de Estado
  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      {isLogin ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegisterForm changeForm={changeForm} />
      )}
    </View>
  );
} //Final

const styles = StyleSheet.create({
  //Inicio, Son los estilos de el logo
  view: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 240,
    marginTop: 20,
    marginBottom: 40,
  },
}); //final
