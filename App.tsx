/**
 *  React Native AI App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { useState } from 'react';

import {  StatusBar, StyleSheet, useColorScheme,Text, Button,View, ScrollView,ActivityIndicator,TextInput} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';


//From react-native-executorch documentation
import { initExecutorch } from 'react-native-executorch';
import { BareResourceFetcher } from 'react-native-executorch-bare-resource-fetcher';
initExecutorch({
  resourceFetcher: BareResourceFetcher,
});
import {  QWEN2_5_0_5B_QUANTIZED, useLLM} from 'react-native-executorch';

import { Message } from 'react-native-executorch';


//Outer app function handles app  (provider layer)
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* Main content of the app */}
      <AppContent />  
    </SafeAreaProvider>
  );
}

//Outer app function handles app  (UI/content layer)
const AppContent: React.FC = () => {
  
    const llm = useLLM({model: QWEN2_5_0_5B_QUANTIZED });

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {

      // Checks if the prompt is empty or only whitespace
      if (!prompt.trim()) return;

      setLoading(true);
      setResponse("");


    try {

      const chat: Message[] = [

        {
          role: 'system',
          content:
            'You are an offline AI assistant called AYUB, running on a mobile phone.',
        },

        {
          role: 'user',
          content: prompt,
        },

      ];


      const result = await llm.generate(chat);


      console.log("AI response SUCCESSFULLY RETURNED-:", result);

      setResponse(String(result));

    } catch (error) {

      console.log(error);
      setResponse("Error generating response.");

    }

    setLoading(false);

  };


  return (

    <SafeAreaView style={styles.container}>


      <ScrollView
        contentContainerStyle={styles.content}
      >

        <Text style={styles.title}> AYUB - AN EDGE AI APP </Text>


        <Text>
          Download:
          {String(llm.downloadProgress ?? "0%")}
        </Text>


        <Text>
          Ready:
          {String(llm.isReady ?? false)}
        </Text>



        <TextInput

          style={styles.input}

          placeholder="Ask your AYUB here.."

          value={prompt}

          onChangeText={setPrompt}

          multiline

        />



        <Button
          title="Generate"
          onPress={handleGenerate}
          disabled={!llm.isReady || loading}
        />



        {
          loading &&
          <ActivityIndicator />
        }



        <Text style={styles.response}>
          {response}
        </Text>



      </ScrollView>


    </SafeAreaView>

  );

};




const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#fff',
  },


  content:{
    padding:20,
    justifyContent:'center',
  },


  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:20,
  },


  input:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:10,
    padding:10,
    minHeight:100,
    marginVertical:20,
    textAlignVertical:'top',
  },


  response:{
    marginTop:20,
    fontSize:16,
  },


});

















export default App;


