import { View, Text, TextInput, StyleSheet } from "react-native";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { $getRoot } from "lexical";

const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
  isNativeApp: true,
  getSelection: () => ({
    anchor: { offset: 0, key: "" },
    focus: { offset: 0, key: "" },
    type: "text",
  }),
};

export default function Editor({
  setPlainText,
  setEditorState,
  initialContent,
}: {
  setPlainText: React.Dispatch<React.SetStateAction<string>>;
  setEditorState: React.Dispatch<React.SetStateAction<string | null>>;
  initialContent?: string;
}) {
  return (
    <View style={styles.container}>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editorState: initialContent,
        }}
      >
        <View style={styles.editorContainer}>
          <ToolbarPlugin />
          <View style={styles.editor}>
            <RichTextPlugin
              contentEditable={
                <TextInput
                  style={styles.input}
                  multiline
                  scrollEnabled
                  textAlignVertical="top"
                />
              }
              placeholder={
                <Text style={styles.placeholder}>{placeholder}</Text>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin
              onChange={(editorState) => {
                editorState.read(() => {
                  const root = $getRoot();
                  const textContent = root.getTextContent();
                  setPlainText(textContent);
                });
                setEditorState(JSON.stringify(editorState.toJSON()));
              }}
              ignoreHistoryMergeTagChange
              ignoreSelectionChange
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </View>
        </View>
      </LexicalComposer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editorContainer: {
    flex: 1,
  },
  editor: {
    flex: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#000",
    textAlignVertical: "top",
  },
  placeholder: {
    color: "#999",
    position: "absolute",
    top: 10,
    left: 10,
  },
});
