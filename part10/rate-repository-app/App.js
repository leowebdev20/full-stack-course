import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import TextInput from "./src/components/TextInput";

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />

    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
