import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import pastel from '../assets/pastel';

export default function Bithday(props) {
  /* 
Este componente  lo que haces es revisar si el cumpleañó¥s ya paso,
si el cumpleaños aun no llega pone en un recuadro de cuantos dias faltan,
si el cumpleaños  es de ese dia se pone al inicio y nota Es tu Cumpleañós 
*/
  const {birthday, deleteBirthday} = props;
  const pasat = birthday.days > 0 ? true : false;
  const infoDay = () => {
    if (birthday.days === 0) {
      return (
        <>
          <Text style={{color: '#fff'}}>¡¡Feliz Cumpleañós!!</Text>
          <SvgXml xml={pastel} width={35} height={35} />
        </>
      );
    } else {
      const days = -birthday.days;
      return (
        <View style={styles.textCurrent}>
          <Text>Faltan {days} </Text>
          <Text>{days === 1 ? 'Día' : 'Dias'}</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        pasat
          ? styles.pasat
          : birthday.days === 0
          ? styles.actual
          : styles.current,
      ]}
      onPress={() => deleteBirthday(birthday)}>
      <View>
        <Text style={styles.userName}>
          {birthday.name} {birthday.lastname}
        </Text>
      </View>
      {pasat ? (
        <Text style={{color: '#fff'}}> Ya Paso este cumpleños </Text>
      ) : (
        infoDay()
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 10,
  },
  actual: {
    backgroundColor: '#cda434',
  },
  current: {
    backgroundColor: '#b4b6b9',
  },
  pasat: {
    backgroundColor: '#907f63',
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  textCurrent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
