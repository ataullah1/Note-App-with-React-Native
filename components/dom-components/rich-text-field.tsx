import "./styles.css";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native";

interface EditorProps {
  setPlainText: (text: string) => void;
  setEditorState: (state: string | null) => void;
  initialContent?: string;
}

export default function Editor({
  setPlainText,
  setEditorState,
  initialContent,
}: EditorProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        value={initialContent}
        onChangeText={(text) => {
          setPlainText(text);
          setEditorState(text);
        }}
        placeholder="Start writing your note..."
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  editor: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
  },
});
