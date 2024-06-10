import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {getFirestore} from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');

/*
Este componente por medio del usuario agrega las fechas de cumpleaños del usuario
en firestore 
 */
export default function AddBirthday(props) {
  //inicio

  const {user, setShowList, setReloadData} = props;
  const [formData, setFormData] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formError, setFormError] = useState({});

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  //Inicializacion de dateBirth
  const handleConfirm = date => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({...formData, dateBirth});
    hideDatePicker();
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };
  //Inicializacion de firestore
  const onSubmit = () => {
    let errors = {};
    if (!formData.name || !formData.lastname || !formData.dateBirth) {
      if (!formData.name) errors.name = true;
      if (!formData.lastname) errors.lastname = true;
      if (!formData.dateBirth) errors.dateBirth = true;
    } else {
      const data = formData;
      data.dateBirth.setYear(0);
      firestore()
        .collection(user.uid)
        .add(data)
        .then(() => {
          setReloadData(true);
          setShowList(true);
        });
    }
    setFormError(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.name && {borderColor: '#940c0c'}]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={e => onChange(e, 'name')}
        />
        <TextInput
          style={[styles.input, formError.lastname && {borderColor: '#940c0c'}]}
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          onChange={e => onChange(e, 'lastname')}
        />
        <View
          style={[
            styles.input,
            styles.datepicker,
            formError.dateBirth && {borderColor: '#940c0c'},
          ]}>
          <Text
            style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 18,
            }}
            onPress={showDatePicker}>
            {formData.dateBirth
              ? moment(formData.dateBirth).format('LL')
              : 'Fecha de Nacimiento'}
          </Text>
        </View>

        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addButton}>Crear Cumpleaños</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
} //final

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  datepicker: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#fff',
  },
});
