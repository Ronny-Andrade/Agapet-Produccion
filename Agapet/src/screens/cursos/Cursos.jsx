import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Keyboard,
    Image,
    Dimensions,
    PixelRatio,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import { BottomNotification } from '../../screens/timeline/BottomNotification'
import Searchbar from '../../components/Searchbar'
import {AuthContext} from '../../context/AuthContext';
import {PetContext} from '../../context/PetContext';

const popupList = [
    {
        id: 1,
        name: 'Task'
    },
    {
        id: 2,
        name: 'Message'
    },
    {
        id: 3,
        name: 'Note'
    }
]

const { height, width } = Dimensions.get('window');

var FONT_BACK_LABEL = 18;

if (PixelRatio.get() <= 2) {
    FONT_BACK_LABEL = 14;
}

export const Cursos = () => {

    const {pet} = PetContext();
    const {userInfo} = useContext(AuthContext);
    const [dataUser, setDataUser] = useState([]);
    const [cursos, setCursos] = useState([]);
    const token = userInfo.access;
    const navigation = useNavigation();


    const [value, setValue] = useState()
    function updateSearch(value) {
        //do your search logic or anything
        console.log(value)
    }



    let popupRef7 = React.createRef()
    const onShowPopup7 = () => {
        popupRef7.show()
    }
    const onClosePopup7 = () => {
        popupRef7.close()
    }

    const getUser = (token) => {
        const url = 'https://agapet.pythonanywhere.com/user/data';
        axios.get(url,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          }).then(res => {
            let data = res.data
            setDataUser(data);
          }).catch(e => {
            console.log(`data error ${e}`);
          });
      };

      const getCursos = () => {
        const url = 'https://agapet.pythonanywhere.com/cursos/cursos';
        axios.get(url,
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(res => {
            let data = res.data
            setCursos(data);
          }).catch(e => {
            console.log(`data error ${e}`);
          });
      };


    useEffect(() => {
        getUser(token);
        getCursos();
      }, [])





    return (
        <View style={style.fondo}>

            <View style={style.fondo3}>
                <View style={style.contenedorCaract}>
                    <View style={style.caracte}>
                        <View style={style.iconCaracte}>
                            <Image style={style.imgIcon2}
                                source={{uri: `https://agapet.pythonanywhere.com/${pet.image}`}}
                            />

                        </View>
                        <View style={style.iconCaracte2}>
                            <Text style={{ fontWeight: "bold", fontSize: width * 0.045, color: 'white' }}> ¡Hola {pet.nombre}!</Text>
                            <View style={{ flexDirection: "row", marginLeft: '2%', marginTop: '2%' }}>
                                <Image style={style.imgIcon5}

                                    source={require('../../../assets/coin.png')}
                                />
                                <Text style={{ fontSize: width * 0.03, marginTop: '2%', marginBottom: '2%', color: 'yellow' }}> {dataUser.points} puntos</Text>
                            </View>
                        </View>
                        <View style={style.iconCaracte3}>
                            <StatusBar barStyle='dark-content'></StatusBar>
                            <SafeAreaView style={style.container2}>
                                <TouchableWithoutFeedback onPress={onShowPopup7}>

                                    <Image style={style.imgIcon6}

                                        source={require('../../../assets/notificacion.png')}
                                    />

                                </TouchableWithoutFeedback>
                            </SafeAreaView>
                            <BottomNotification
                                title='¡Felicitaciones!'
                                estado='No iniciado'
                                ref={(target) => popupRef7 = target}
                                onTouchOutside={onClosePopup7}
                                data={popupList}
                            />

                        </View>
                    </View>

                </View>
            </View>
            <Text style={{ fontSize: width * 0.065, margin: '2%', fontWeight: "bold" }}> Cursos</Text>
            {
                /*
                <View style={style.buscador}>
                    <Searchbar
                        value={value}
                        updateSearch={updateSearch}
                        />
                </View>
                */
            }

            <ScrollView style={style.scrollStyle} >
                {
                    cursos.map(cursos => {
                        return(
                            <TouchableWithoutFeedback 
                            key={cursos.idcurso}
                            onPress={() => navigation.navigate('InfoCurso',{Infocursos: cursos, usuario:dataUser, mascota:pet})}
                            >
                                <View style={style.fondo6}>
                                <View style={style.contenedorCaract}>
                                    <View style={style.caracte}>
                                        <View style={style.iconCaracte4}>
                                            <Image style={style.imgIcon2v}
                                                source={{uri: `https://agapet.pythonanywhere.com/${cursos.imagen}`}}
                                            />
                                        </View>
                                        <View style={style.iconCaracte5}>
                                            <Text style={{ fontWeight: "bold", fontSize: width * 0.036 }}> {cursos.titulo}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: '1%', marginBottom: '1%' }}>
                                                <Image style={style.imgIcon2v1}

                                                    source={require('../../../assets/icons8-clock-384.png')}
                                                />
                                                <Text style={{ fontSize: width * 0.03, width: '50%' }}>
                                                    {cursos.minutos} mins
                                                </Text>
                                                <Image style={style.imgIcon2v1}

                                                    source={require('../../../assets/coin.png')}
                                                />
                                                <Text style={{ fontSize: width * 0.03 }}>
                                                    {cursos.puntos} puntos
                                                </Text>
                                            </View>
                                            <Text style={{ fontSize: width * 0.03 }}>
                                                {cursos.descripcion}
                                            </Text>
                                            <View style={{ backgroundColor: '#f5f5f5', width: '100%', borderRadius: 10, height: width * 0.04, marginTop:'3%'}}>
                                                <View style={{ backgroundColor: '#5FAFB9', width: '50%', borderRadius: 10, height: width * 0.04, alignItems:'flex-end' }}>
                                                <Text style={{ color:'white', marginRight:'5%',justifyContent:'space-between', fontSize:width*0.025}}>
                                                {cursos.porcentaje}%
                                                </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }

            </ScrollView>

        </View>


    );
}

const style = StyleSheet.create({

    fondo: {
        backgroundColor: 'white'

    },

    fondo3: {
        width: width,
        height: width * 0.2,
        elevation: 10,
        backgroundColor: '#5FAFB9',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10
    },

    contenedorCaract: {
        flexDirection: 'row',
        margin: '3%'

    },



    caracte: {
        width: width * 0.35,
        height: width * 0.10,
        borderRadius: width * 0.25,
        flexDirection: "row"
    },
    iconCaracte: {
        //width: width * 0.10,
        //height: width * 0.15,
        width: width * 0.15,
        borderRadius: width * 0.5,
        //backgroundColor: 'red',
        marginTop: '8%',
        //borderRadius: width * 0.25,
        marginLeft: '10%',
        alignItems: 'center',
        justifyContent: 'center'

    },

    iconCaracte2: {
        height: '90%',
        //alignItems: 'left',
        marginLeft: '4%'

    },
    iconCaracte3: {
        width: '100%',
        //justifyContent: 'flex-end',
        //alignItems: 'flex-end',
        paddingLeft: '70%'
    },

    imgIcon2: {

        height: width * 0.15,
        width: width * 0.15,
        borderRadius: width * 0.5
    },

    imgIcon5: {
        height: width * 0.05,
        width: width * 0.05,
        alignSelf: 'flex-end'
    },
    imgIcon6: {

        height: width * 0.11,
        width: width * 0.11
    },
    imgIcon7Actual: {
        height: width * 0.15,
        width: width * 0.15,
        resizeMode: 'contain'
    },
    scrollStyle: {
        width: width,
        height: height * 0.9

    },

    iconCaracte5: {
        width: width * 0.55,
        //alignItems: 'left',
        marginLeft: '5%'

    },
    iconCaracte5v: {
        width: '100%',
        marginTop: '6%',
        alignItems: 'center',
        //marginLeft: '2%'

    },
    imgIcon4: {
        height: width * 0.03,
        width: width * 0.03,
        resizeMode: 'stretch'
    },
    iconCaracte4: {
        width: width * 0.25,
        //alignItems: 'center',
        //justifyContent: 'center',
        top: '3%',
    },
    imgIcon2v: {

        height: width * 0.25,
        width: width * 0.25,
        resizeMode: 'stretch',
        borderRadius: 10
    },
    imgIcon2v1: {

        height: width * 0.05,
        width: width * 0.05,
        resizeMode: 'stretch',
        marginRight: '3%'
    },
    fondo6: {
        position: 'relative',
        width: width * 0.9,
        height: height * 0.16,
        elevation: 5,
        marginTop: '5%',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignSelf: 'center',
        marginBottom: '1%'
    },
    buscador: {
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        margin: '2%',
        width: width * 0.9,
        height: width * 0.12,
        borderRadius: 10,
        borderColor: 'grey',
        paddingTop: '3%'
    }

});