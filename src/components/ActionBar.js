import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {firebase} from '@react-native-firebase/auth';

export default function ActionBar(props) {
  //Inicio
  /*
  Este Scomponente tiene los estilos  de los botones su tamaño etc
   */
  console.log(props);
  const {showList, setShowList} = props;

  return (
    <>
      <View style={styles.viewFooter}>
        <View style={styles.viewClose}>
          <Text style={styles.text} onPress={() => firebase.auth().signOut()}>
            Cerrar Sesion
          </Text>
        </View>
        <View style={styles.viewAdd}>
          <Text style={styles.text} onPress={() => setShowList(!showList)}>
            {showList ? 'Nueva Fecha' : 'Cancelar Fecha'}
          </Text>
        </View>
      </View>
    </>
  );
} //final

const styles = StyleSheet.create({
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alingContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  viewClose: {
    backgroundColor: '#6576b4',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  viewAdd: {
    backgroundColor: '#00bd27',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
