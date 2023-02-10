import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, FontAwesome5, FontAwesome   } from '@expo/vector-icons';
//Inicio
import {Timeline} from '../screens/timeline/Timeline';
// Usuario
import {ProfileUser} from '../screens/profile/ProfileUser';
// Mascota
import {Pet} from '../screens/petProfile/Pet';
import {Clinic} from '../screens/petProfile/Clinic';
import {Vaccine} from '../screens/petProfile/Vaccine';
import {Sterilization} from '../screens/petProfile/Sterilization';
import {Wormed} from '../screens/petProfile/Wormed';
import {UpdateVaccine} from '../screens/petProfile/UpdateVaccine';
//faq
import {Faq} from '../screens/faq/faq'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackTimeline(){
  return(
    <Stack.Navigator initialRouteName='Timeline'>
      <Stack.Screen name='Timeline' component={Timeline} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='Pet' component={Pet} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='Clinic' component={Clinic} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='Vaccine' component={Vaccine} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='Sterilization' component={Sterilization} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='Wormed' component={Wormed} options={{
        headerShown: false
      }}/>
      <Stack.Screen name='UpdateVaccine' component={UpdateVaccine} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
    
  );
};

function MyTabs(){
    return(
        <Tab.Navigator
        initialRouteName='Timeline'
        screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: '#FA8639',
              bottom: 8,
              left: 20,
              right: 20,
              elevation: 0,
              borderRadius: 15,
            }
        }}
        >
            <Tab.Screen 
            name='StackTimeline' 
            component={StackTimeline}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size})=>(
                <Ionicons name="home-outline" size={size} color={color} />
              )
            }}
             />

          <Tab.Screen 
            name='faq' 
            component={Faq}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size})=>(
                <FontAwesome name="question-circle-o" size={size} color={color} />
              )
            }}
             />



            <Tab.Screen 
            name='ProfileUser' 
            component={ProfileUser} 
            options={{
              headerShown: false,
              tabBarIcon: ({color, size})=>(
                <FontAwesome5 name="user-circle" size={size} color={color} />
              )
            }}
            />
        </Tab.Navigator>
    );
};

export const BarNavigation = () => {
  return (
    <MyTabs/>
  )
}
