import React ,{useState,useEffect}from 'react'
import { SafeAreaView , Text, View, StyleSheet, Button } from 'react-native'
import auth from '@react-native-firebase/auth';
import Auth from './src/components/Auth';

export default function App() {//inicio

   // Inicializacion de Fire Base
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
 
   // Funcion de Cambio de Estado
   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) setInitializing(false);
   }
     useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);

   if (!user) {
     return (
      <>
        <SafeAreaView style={styles.background}>
        { user ? <Logout/> : <Auth/>} 
        </SafeAreaView>
      </>
     );
   }
};// final

function Logout(){
  return(
    <View>
      <Text>Estas Logeado</Text>
      <Button title="Cerrar sesion "/>
    </View>
  )
}

const styles = StyleSheet.create({//inicio
  background:{
    backgroundColor:"#15212b",
    height:"100%"
  },  
})//final