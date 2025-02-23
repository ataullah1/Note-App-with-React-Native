import React from "react";
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
  const [text, setText] = React.useState(initialContent || "");

  React.useEffect(() => {
    setText(initialContent || "");
  }, [initialContent]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        value={text}
        onChangeText={(newText) => {
          setText(newText);
          setPlainText(newText);
          setEditorState(newText);
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
