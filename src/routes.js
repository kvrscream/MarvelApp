import React from 'react'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Total from './components/total'
import Lista from './components/todos'

const Routes = createBottomTabNavigator({
    Home: Total,
    Lista: Lista
})

export default createAppContainer(Routes)
