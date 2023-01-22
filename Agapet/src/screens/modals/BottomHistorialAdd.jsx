import React from "react";
import {
    Modal,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    StatusBar,
    TextInput,
    SafeAreaView,
    Button

} from 'react-native'


const deviceHeight = Dimensions.get('window').height
const width = Dimensions.get('window').width

let popupRef7 = React.createRef()
const onShowPopup7 = () => {
    popupRef7.show()
}
const onClosePopup7 = () => {
    popupRef7.close()
}
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

export class BottomHistorialAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({ show: true })
    }

    close = () => {
        this.setState({ show: false })
    }


    renderOutsideTouchable(onTouch) {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const { title } = this.props
        return (
            <View style={{ background: '#5FAFB9', alignItems: 'center' }}>
                <Text style={{
                    color: 'black',
                    fontSize: 25,
                    fontWeight: '500',
                    marginTop: 15,
                    marginBottom: 30
                }}>
                    {title}
                </Text>
            </View>
        )
    }


    renderContent = () => {
        const { data } = this.props
        const { estado } = this.props
        const { title } = this.props
        const { src } = this.props
        const { verficado } = this.props
        return (
            <View style={style.fondo6}>
                <View style={style.contenedorCaract}>
                    <View style={style.caracte}>
                        <View style={style.iconCaracte4}>
                            <Image style={style.imgIcon2}

                                source={src}
                            />
                        </View>
                        <View style={style.iconCaracte5}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontWeight: "bold", fontSize: width * 0.045 }}> {title}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flexDirection: "row", marginLeft: '5%', marginBottom: '2%' }}>
                    <Text style={{ fontSize: width * 0.035, paddingRight: 25 }}> Fecha:</Text>
                    <TextInput
                        style={style.input}
                    />
                </View>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flexDirection: "row", marginLeft: '5%', marginBottom: '2%' }}>
                    <Text style={{ fontSize: width * 0.035, paddingRight: 27 }}> Lugar:</Text>
                    <TextInput
                        style={style.input}
                    />
                </View>
                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flexDirection: "row", marginLeft: '5%', marginBottom: '2%' }}>
                    <Text style={{ fontSize: width * 0.035, paddingRight: 10 }}> Descripción:</Text>
                    <TextInput
                        multiline
                        style={style.input2}
                    />
                </View>
                <View style={{ margin: '5%', flexDirection: "row" }}>
                    <Text style={{ fontSize: width * 0.035, paddingRight: 10 }}> Evidencia:</Text>
                    <View style={style.iconCaracte7}>
                        <Image style={style.imgIcon2}

                            source={require('../assets/camara-fotografica.png')}
                        />
                    </View>
                </View>

                <View style={style.boton}>
                        <Button
                            color={"#5FAFB9"}
                            margin={'2%'}
                            title="Guardar"
                        />
                    </View>

            </View>
        )
    }

    renderItem = ({ item }) => {
        return (
            <View
                style={{
                    height: 50,
                    flex: 1, alignItems: 'flex-start',
                    justifyContent: 'center', marginLeft: 20
                }}
            >
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'normal', color: '#182E44'
                }}>
                    {item.name}
                </Text>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    opacity: 0.1,
                    backgroundColor: '#182E44',
                    height: 1
                }}
            >

            </View>
        )
    }


    render() {
        let { show } = this.state
        let { onTouchOutside, title, estado, verificado } = this.props
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{ flex: 1, backgroundColor: '#000000AA', height: '50%' }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        alignSelf: 'center'
                    }}>
                        {/*this.renderTitle()*/}
                        {this.renderContent()}
                    </View>
                    {this.renderOutsideTouchable(onTouchOutside)}
                </View>

            </Modal>
        )
    }
}
const style = StyleSheet.create({
    imgIcon7: {
        height: width * 0.15,
        width: width * 0.15,
        resizeMode: 'contain'
    },
    fondo3: {
        width: width * 0.85,
        height: width * 0.15,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignSelf: 'center'
    },
    contenedorCaract: {
        flexDirection: 'row',
        margin: '3%',
        height: '18%'

    },
    caracte: {
        //width: width * 0.5,
        height: width * 0.10,
        flexDirection: "row"
    },
    iconCaracte: {
        width: width * 0.10,
        backgroundColor: 'red',
        borderRadius: width * 0.25,
        alignItems: 'center',
        justifyContent: 'center'

    },
    imgIcon2: {
        padding: 10,
        height: width * 0.09,
        width: width * 0.09,
        resizeMode: 'stretch'
    },
    iconCaracte2: {
        width: '90%',
        height: '50%',
        //alignItems: 'left',
        marginLeft: '4%'

    },
    iconCaracte3: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    iconCaracte4: {
        backgroundColor: '#5FAFB9',
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.30,
        alignItems: 'center',
        justifyContent: 'center',
        top: '5%'
    },
    iconCaracte5: {
        //height: '50%',
        //alignItems: 'left',
        //marginLeft: '2%',
        marginTop: '13%',
        marginLeft:'5%',
        height: '70%'

    },
    iconCaracte6: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        top: '45%'
    },
    iconCaracte7: {
        backgroundColor: '#5FAFB9',
        width: width * 0.12,
        height: width * 0.1,
        borderRadius: width * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    imgIcon4: {
        height: width * 0.03,
        width: width * 0.03,
        resizeMode: 'stretch'
    },
    fondo6: {
        width: '100%',
        elevation: 5,
        marginTop: '5%',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignSelf: 'center'
    },
    input: {
        borderBottomColor: 'grey',
        borderWidth: 1,
        width: '70%',
        borderColor: 'grey',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    input2: {
        borderBottomColor: 'grey',
        borderWidth: 1,
        width: '63.7%',
        borderColor: 'grey',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    boton: {
        marginLeft: '10%',
        marginRight: '10%',
        padding: 20,
        borderRadius: 10,
        marginBottom: '5%',
        marginTop: '5%'
    }

});
