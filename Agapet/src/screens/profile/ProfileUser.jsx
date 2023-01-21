import axios from 'axios';
import {useEffect, useState,useContext} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';

const width = Dimensions.get('window').width

export const ProfileUser = () => {

  const {userInfo,logout} = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const token = userInfo.access;

  // Imputs
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [direction, setDirection] = useState('');

 // Imagenes
  const [image, setImage] = useState('');

  const selectImage=async()=>{

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getUser = (token) =>{
    const url = 'https://agapet.pythonanywhere.com/user/data';
    axios.get(url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },   
    }).then(res => {
        setisLoading(false);
        let data = res.data
        console.log(data)
        setDataUser(data);
    }).catch(e => {
        console.log(`data error ${e}`);
        });
    };



  const update = (phone, direction,age, image) =>{
    const url = 'https://agapet.pythonanywhere.com/user/update';
    let bodyFormData = new FormData()
    if(phone.length > 0){
      bodyFormData.append('phone', phone)
    }
    if(direction.length > 0){
      bodyFormData.append('direction',direction)
    }
    if(age.length > 0){
      bodyFormData.append('age',age)
    }
    if(image.length>0){
      bodyFormData.append('imagen64',image)
    }
    
    axios({
      method: 'put',
      url: url,
      data: bodyFormData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
    }).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    alert('Datos actualizados');
  };

  useEffect(() => {
    // Datos de mi usuario
    getUser(token);
    // Seleccionar imagenes
    (async ()=>{
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        sethasGalleryPermission(galleryStatus.status === 'granted');

    })
  // Cierre de mi useEffect   
  },[])


  return (
        <ScrollView>
        <View style={style.fondo}>
          {
            // Inputs de edad
            dataUser.imagen64 ? 
            (
              <TouchableOpacity
              onPress={selectImage}>
                <Image style={style.image} source={{ uri:`${dataUser.imagen64}` }} />
              </TouchableOpacity>

            ):
            (
              <TouchableOpacity 
              onPress={selectImage}>
                <Image style={style.image} source={{ uri: image }}  />
              </TouchableOpacity>

            )
          }
            {/*<Spinner visible={isLoading} />*/}
            <View style={style.fondo2}>
                <View style={style.fondoPerfil}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, justifyContent: 'center' }}>
                        <Text style={style.sesion}>{dataUser.name}</Text>
                    </View>
                </View>
                <View style={style.fondo3}>
                    <View style={style.inputs}>

                        <TextInput
                        style={style.input}
                        //value={email}
                        placeholder={dataUser.email}
                        editable={false}
                        //onChangeText={text => setEmail(text)}
                        />

                        <TextInput
                          style={style.input}
                          //value={dataUser.phone}
                          placeholder={dataUser.phone}
                          onChangeText={text => setPhone(text)}
                        />

                        <TextInput
                          style={style.input}
                          value={direction}
                          placeholder={dataUser.direction}
                          onChangeText={text => setDirection(text)}
                        />

                    {
                      // Inputs de edad
                      dataUser.age ? 
                      (
                      <TextInput
                      style={style.input}
                      value={age}
                      placeholder={dataUser.age} 
                      onChangeText={text => setAge(text)}
                      />
                      ):
                      (
                      <TextInput
                      style={style.input}
                      value={age}
                      placeholder='Ingrese su edad'
                      onChangeText={text => setAge(text)}
                    />
                      )
                    }

                        
                    </View>
                    {/* Boton de guardar*/}
                    <View style={style.boton}>

                    <Button
                      color={"#5FAFB9"}
                      title="Guardar"
                      onPress={() => {
                        update(phone, direction,age,image)
                        //imageupdate(image)
                    }}
                    />
                    </View>
                    <TouchableOpacity onPress={logout}>
                      <Text style={{color: 'red'}}>Cerrar sesion</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
        </ScrollView>
  );
};


const style = StyleSheet.create({
  sesion: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 25
  },
  fondo: {
      backgroundColor: '#5FAFB9',
      justifyContent: 'center',
      alignItems: 'center'
  },
  fondo2: {
      backgroundColor: '#fff',
      width: '100%',
      height: '70%',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      overflow: "hidden",
      justifyContent: 'center'
  },
  fondo3: {
      marginTop: '10%',
      marginBottom: '1%'
  },
  fondoPerfil: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  image: {
      //width: '50%',
      //height: '30%',
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden",
      marginTop: '25%',
      marginBottom: '10%',
      backgroundColor: 'white',      
  },
  image2: {
      //width: '50%',
      //height: '30%',
      width: 200,
      height: 200,
      borderRadius: 100,
      marginTop: '2%',
      marginBottom: '2%'
  },
  input: {
      height: 45,
      margin: 10,
      marginLeft: '10%',
      marginRight: '10%',
      borderWidth: 1,
      fontSize: width * 0.05,
      borderRadius: 12,
      color: 'grey',
      borderColor: 'grey'
  },
  boton: {
      marginLeft: '10%',
      marginRight: '10%',
      padding: 20,
      borderRadius: 10,
      marginBottom: '5%',
      marginTop: '5%'
  },
  img: {
      width: '5%',
      height: '5%',
      overflow: "hidden"
  },
  contimg: {
      width: 50,
      height: 50
  },
  contimg2: {
      width: 50,
      height: 50,
      top: 100,
      left: 100
  },
  container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: '10%',
      marginTop: '10%'
  },
  tinyLogo: {
      width: 50,
      height: 50,
      marginLeft: '5%',
      marginRight: '5%',
      marginBottom: '3%',
      marginTop: '3%'
  },
  inputs: {
      marginBottom: '5%',
      marginTop: '5%'
  }
});