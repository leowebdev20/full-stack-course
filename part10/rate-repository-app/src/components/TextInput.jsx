import {
  TextInput as NativeTextInput,
  StyleSheet,
  Platform,
  Text,
} from "react-native";

const styles = StyleSheet.create({
  text: {
    color: Platform.OS === "android" ? "green" : "darkred",
  },
});
const TextInput = () => {
  return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
};

export default TextInput;
