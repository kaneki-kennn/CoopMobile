import { View } from "react-native";
import Landing from './../components/Landing';
import React from "react";
import {supabase} from './supabase';




export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Landing />
    </View>
  );
} 