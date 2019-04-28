import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native'
import md5 from 'react-native-md5'

export default class Todos extends Component{
    state = {
        heros: [],
        index: 0,
        total: 0,
    }

    nextData = async () => {
        let position = ''
        if(this.state.index == 0){
            position = 1
        } else {
            position = this.state.index
        }

        const privateKey ='d3c431c9986abeba4d52e5243ddeafbed1344a4e';
        const publicKey = '9dd6620dbac417d4b44acb4c86c13e6b';
        const ts = Number(new Date());
        const hash = md5.hex_md5(ts + privateKey + publicKey);
        
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=100&apikey=${publicKey}&hash=${hash}&offset=${position}`)
        const responseJson = await response.json();
        const indexCount = this.state.index + 100;
        

        this.setState({total: responseJson.data.total})
        this.setState({index: indexCount})
        
        this.setState({heros: responseJson.data.results}) 
        
    }


    async componentDidMount(){
        Alert.alert("Aguarde...", "Leva algum tempo para mostrar os heróis com mais quadrinhos. Grandes porderes, muitos dados.");

        let position = ''
        if(this.state.index == 0){
            position = 1
        } else {
            position = this.state.index
        }

        const privateKey ='d3c431c9986abeba4d52e5243ddeafbed1344a4e';
        const publicKey = '9dd6620dbac417d4b44acb4c86c13e6b';
        const ts = Number(new Date());
        const hash = md5.hex_md5(ts + privateKey + publicKey);
        
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=100&apikey=${publicKey}&hash=${hash}&offset=${position}`)
        const responseJson = await response.json();
        const indexCount = this.state.index + 100;
        

        this.setState({total: responseJson.data.total})
        this.setState({index: indexCount})
        
        this.setState({heros: responseJson.data.results}) 
        
        
    }


    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.info}>Heróis com mais quadrinhos</Text>
                <ScrollView>
                    {
                        this.state.heros.map((row) => {
                            return(
                                <View key={row.id}>
                                    <Text style={styles.textList}> {`Name:${row.name} Comics:${row.comics.available} `} </Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity onPress={this.nextData} style={styles.botao}>
                    <Text style={styles.info}>Carregar mais</Text>
                </TouchableOpacity>
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
        fontSize: 20
    },
    textList: {
        fontSize:14,
    },
    botao:{
        backgroundColor: '#3498db',
        color: "#fff",
        padding: 10,
        borderRadius: 4
    }
})