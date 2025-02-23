import React from "react";
import "./styles.css";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface EditorProps {
  setPlainText: (text: string) => void;
  setEditorState: (state: string | null) => void;
  initialContent?: string;
}

interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
}

export default function Editor({
  setPlainText,
  setEditorState,
  initialContent,
}: EditorProps) {
  const [text, setText] = React.useState(initialContent || "");
  const [textStyle, setTextStyle] = React.useState<TextStyle>({
    bold: false,
    italic: false,
    underline: false,
    fontSize: 16,
  });

  React.useEffect(() => {
    setText(initialContent || "");
  }, [initialContent]);

  const toggleStyle = (style: keyof TextStyle) => {
    setTextStyle((prev) => ({
      ...prev,
      [style]: !prev[style],
    }));
  };

  const adjustFontSize = (increase: boolean) => {
    setTextStyle((prev) => ({
      ...prev,
      fontSize: Math.max(
        12,
        Math.min(24, (prev.fontSize || 16) + (increase ? 2 : -2))
      ),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolbarButton, textStyle.bold && styles.activeButton]}
          onPress={() => toggleStyle("bold")}
        >
          <MaterialIcons
            name="format-bold"
            size={20}
            color={textStyle.bold ? "#0a7ea4" : "#666"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toolbarButton,
            textStyle.italic && styles.activeButton,
          ]}
          onPress={() => toggleStyle("italic")}
        >
          <MaterialIcons
            name="format-italic"
            size={20}
            color={textStyle.italic ? "#0a7ea4" : "#666"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toolbarButton,
            textStyle.underline && styles.activeButton,
          ]}
          onPress={() => toggleStyle("underline")}
        >
          <MaterialIcons
            name="format-underlined"
            size={20}
            color={textStyle.underline ? "#0a7ea4" : "#666"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => adjustFontSize(false)}
        >
          <MaterialIcons name="remove" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => adjustFontSize(true)}
        >
          <MaterialIcons name="add" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[
          styles.editor,
          {
            fontWeight: textStyle.bold ? "bold" : "normal",
            fontStyle: textStyle.italic ? "italic" : "normal",
            textDecorationLine: textStyle.underline ? "underline" : "none",
            fontSize: textStyle.fontSize,
          },
        ]}
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
  toolbar: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  toolbarButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  activeButton: {
    backgroundColor: "#e3f2fd",
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
