import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Landing() {
  return (
    <View style = {{flex:1,
        backgroundColor: '#373f41'
    }}>
        <Image source = { require ('./../assets/images/young-couple-paying-with-credit-card-online.jpg')}
            style = {{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0.5,
            }}/>
        <View>
            <Text style = {{
                fontSize: 32,
            }}>Welcome</Text>
        </View>
        <View>
            <Text>KA-</Text>
            {/* <Image source={require ('./../assets/images/COOP LOGO(1).png')}/> */}
            <Text>!</Text>
        </View>
        
    </View>
  )
}