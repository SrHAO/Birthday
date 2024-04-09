import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';

export default function LoginForm(props){//inicio`
    const {changeForm} = props;
    return (
        <>
            <Text>LoginForm</Text>
            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>
        </>
    )
}//final

const styles = StyleSheet.create({
    btnText:{
        color:"#fff",
        fontSize:18,
   },
})
