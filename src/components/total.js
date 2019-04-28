import React, {Component} from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import md5 from 'react-native-md5'


export default class Total extends Component{

    state = {
        totalHeroes: 'Aguarde...'
    }


    async componentDidMount() {
        
        const privateKey ='d3c431c9986abeba4d52e5243ddeafbed1344a4e';
        const publicKey = '9dd6620dbac417d4b44acb4c86c13e6b';
        const ts = Number(new Date());
        const hash = md5.hex_md5(ts + privateKey + publicKey);
        
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=1&apikey=${publicKey}&hash=${hash}`)
        const responseJson = await response.json();


        this.setState({totalHeroes: responseJson.data.total})

    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.info}>Total de Heróis da Marvel</Text>
                <Text style={styles.valor}>{this.state.totalHeroes}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },  
    info:{
        fontSize: 20,
        marginTop: 50
    },
    valor:{
        fontSize:35,
        color:'#e74c3c',
        marginTop: 100
    }
})