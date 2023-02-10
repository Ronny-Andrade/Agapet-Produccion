import React, { Component, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    FlatList,
    Image,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native';
import AccordionItem from '../../components/AccordionItem'
import Searchbar from '../../components/Searchbar.js'

const { height, width } = Dimensions.get('window');


export const Faq = () => {

    const [faq, setFaq] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [value, setValue] = useState()
    function updateSearch(value) {
        //do your search logic or anything
        console.log(value)
    }

    //solo poner los datos en data y se generan solo los contenedores de las preguntas
    const data = [
        {
            id: 0,
            title: 'Pregunta',
            body: 'Respuesta de laa pregunta'
        },
        {
            id: 1,
            title: 'Pregunta 1',
            body: 'Respuesta de laa pregunta 1'
        },
        {
            id: 2,
            title: '¿ADJKSFKSAFNDSJFNJDSNFJDNFKJSDNF KSFNJKJSJNFKER?',
            body: 'Respuesta de laa pregunta 2'
        }
    ];

    const getFaq = () => {
        const url = 'https://agapet.pythonanywhere.com/faq/faq/tema';
        axios.get(url,
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(res => {
            setisLoading(false);
            let data = res.data
            setFaq(data);
          }).catch(e => {
            console.log(`data error ${e}`);
          });
      };

    renderTitle = () => {
        return (
            <View><Text style={style.titulo}>Top Questions</Text></View>
        )
    }

    useEffect(() => {
        getFaq(); 
      }, [])

    let Allcategory = ['All',...new Set(faq.map(c => c.temaid))]
    let Information  = [...new Set(faq.map(c => c))]
    const [question, setQuestion] = useState(Information);

    return (
        <View style={style.fondo}>

            <ImageBackground style={style.imgFondo} source={require('../../../assets/faq.jpg')} >


            </ImageBackground>
            <View style={{ marginTop: width * 0.05, marginBottom: width * 0.06, width: width * 0.75, height: width * 0.12, borderRadius: 10, borderColor: 'grey', borderWidth: 1 }}>
                <Image
                    source={require('../../../assets/ic_back.png')} />
                <Searchbar
                    value={value}
                    updateSearch={updateSearch}
                />
            </View>
            <Text style={style.titulo}>Top Questions</Text>
            <View style={{
                flexDirection: "row", marginTop: width * 0.045, marginBottom: width * 0.045
            }}>
                {
                    Allcategory.map(c => (
                       <TouchableOpacity
                       key={c}
                       >
                            <Text style={style.titulo3}>{c}</Text>
                       </TouchableOpacity>
                    ))
                }
            </View>


            <View style={style.backgroundContainer}>
                <SafeAreaView>
                    <View>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <AccordionItem title={item.title} bodyText={item.body} />
                            )}
                        />
                    </View>

                </SafeAreaView>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    titulo: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.045,
        alignSelf: 'flex-start',
        marginLeft: '4%'
    },
    titulo2: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.035,
        alignSelf: 'flex-start',
        marginLeft: '4%',
        backgroundColor: '#F7E6D5',
        borderRadius:width * 0.03,
    },
    titulo3: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.035,
        alignSelf: 'flex-start',
        marginLeft: '4%',
        backgroundColor: '#B900FF',
        borderRadius:width * 0.03
    },
    fondo: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: height
    },
    backgroundContainer: {

        bottom: 0,
        left: 0,
        right: 0
    },
    imgFondo: {
        width: width,
        height: height * 0.25
    }
});


