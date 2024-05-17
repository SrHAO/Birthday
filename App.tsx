import React ,{useState,useEffect}from 'react';
import { SafeAreaView , StyleSheet, StatusBar, } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';
import {decode, encode} from "base-64";

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;


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

     return (
      <>
        <SafeAreaView style={styles.background}>
        { user ? <ListBirthday user={user} /> : <Auth/>} 
        </SafeAreaView>
      </>
     );
   }//final

const styles = StyleSheet.create({//inicio
  background:{
    backgroundColor:"#15212b",
    height:"100%"
  },  
})//final