import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import moment from 'moment';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import firestore from '@react-native-firebase/firestore';
import Bithday from './Bithday';
import { orderBy } from '@firebase/firestore';

//const usersCollection = firestore().collection('Users');

export default function ListBirthday(props) {//inicio
    const usersCollection = firestore().collection('Users');
    const {user} = props;
    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pasatBirthday, setPasatBirthday] = useState([]);

firestore()
  .collection(user.uid)
//  .orderBy("dateBirth", 'asc')
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
        formatData(querySnapshot)
  });
  
  const formatData = (items) => {
    const currentDate = moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        milliseconds: 0,
    });

    const birthdayTempArray = [];
    const pasatBirthdayTempArray=[];

    items.forEach((item) => {
        const dateBirth = new Date(items.dateBirth.second * 1000);
        const dateBirthday = moment(dateBirth);
        const currentYear = moment().get("year");
        dateBirthday.set({year: currentYear});

        const diffDate = currentDate.diff(dateBirthday, "days");
        const itemTemp = item;
        itemTemp.dateBirth = dateBirthday;
        itemTemp.days = diffDate;
        if(diffDate <= 0) {
            birthdayTempArray.push(itemTemp);
        }else{
            pasatBirthdayTempArray.push(itemTemp)
        }
        console.log();
        console.log();
        setBirthday(birthdayTempArray);
        setPasatBirthday(pasatBirthdayTempArray);
    });
  }

    return (
        <View style={styles.container}>
        {showList ? (
            <ScrollView style = {styles.scrollView}>
            {birthday.map((item,index) => (
                <Bithday key={index} birthday={item}/>
            ))}
            </ScrollView>
        ):(
            <AddBirthday user={user} setShowList = {setShowList}/>
        )}    

            <ActionBar showList={showList} setShowList={setShowList}/>
        </View>
    );
}//final

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        height:"100%"
    },
    scrollView:{
        marginBottom:50,
        width: "100%",
    }
});