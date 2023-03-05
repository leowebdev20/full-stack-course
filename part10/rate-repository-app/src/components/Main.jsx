import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import FlexboxExample from "./Flexbox";
import Text from "./Text";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <>
      <View style={styles.container}>
        {/* <Routes> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes> */}
        <Text>Simple text</Text>
        <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
        <Text fontWeight="bold" fontSize="subheading">
          Bold subheading
        </Text>
        <Text color="textSecondary">Text with secondary color</Text>
        {/* <FlexboxExample />{" "} */}
        {/* <TextInput /> */}
        <RepositoryList/>
      </View>
    </>
  );
};

export default Main;
