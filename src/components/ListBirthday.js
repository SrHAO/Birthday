import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import moment from 'moment';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import firestore from '@react-native-firebase/firestore';
import Bithday from './Bithday';
import 'firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
/*
  Este componente Acomoda y revisa la base de datos de firebase de mandera asendente 
   */

const usersCollection = firestore().collection('Users');
export default function ListBirthday(props) {
  //Inicio
  const {user} = props;
  const [showList, setShowList] = useState(true);
  const [birthday, setBirthday] = useState([]);
  const [pasatBirthday, setPasatBirthday] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  /*Esta funcion revisa y acomoda la lista de firebase de manera asendente 
  y revisa si se han agregado mas cumpleañós
  */
  useEffect(() => {
    setBirthday([]);
    firestore()
      .collection(user.uid)
      .orderBy('dateBirth', 'asc')
      .get()
      .then(response => {
        const itemsArray = [];
        response.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        formatData(itemsArray);
      });
    setReloadData(false);
  }, [reloadData]);

  const formatData = items => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const birthdayTempArray = [];
    const pasatBirthdayTempArray = [];
    /*
esta funcion Revisa la base de datos y dependiendo si el cumpleañós ya paso o 
no los acomoda en difererentes posiciones 
*/
    items.forEach(item => {
      const dateBirth = new Date(item.dateBirth.seconds * 1000);
      const dateBirthday = moment(dateBirth);
      const currentYear = moment().get('year');
      dateBirthday.set({year: currentYear});

      const diffDate = currentDate.diff(dateBirthday, 'days');
      const itemTemp = item;
      itemTemp.dateBirth = dateBirthday;
      itemTemp.days = diffDate;
      if (diffDate <= 0) {
        birthdayTempArray.push(itemTemp);
      } else {
        pasatBirthdayTempArray.push(itemTemp);
      }
    });

    setBirthday(birthdayTempArray);
    setPasatBirthday(pasatBirthdayTempArray);
  };
  /*
Este componente elimina el cumpleaños seleccionado y todos sus datos  
*/
  const deleteBirthday = birthday => {
    Alert.alert(
      'Eliminar Cumpleañós',
      `¿Estas seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            firestore()
              .collection(user.uid)
              .doc(birthday.id)
              .delete()
              .then(() => {
                setReloadData();
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {birthday.map((item, index) => (
            <Bithday
              key={index}
              birthday={item}
              deleteBirthday={deleteBirthday}
            />
          ))}
          {pasatBirthday.map((item, index) => (
            <Bithday
              key={index}
              birthday={item}
              deleteBirthday={deleteBirthday}
            />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReloadData={setReloadData}
        />
      )}
      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
} //final

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    marginBottom: 50,
    width: '100%',
  },
});
