/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const LowPriority = 1;

function Divider() {
  return (
    <View
      style={{
        width: 1,
        height: 24,
        backgroundColor: "#e0e0e0",
        marginHorizontal: 8,
      }}
    />
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <View style={styles.toolbar}>
      <TouchableOpacity
        disabled={!canUndo}
        onPress={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        style={[styles.button, !canUndo && styles.buttonDisabled]}
      >
        <MaterialIcons
          name="undo"
          size={20}
          color={canUndo ? "#000" : "#ccc"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!canRedo}
        onPress={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        style={[styles.button, !canRedo && styles.buttonDisabled]}
      >
        <MaterialIcons
          name="redo"
          size={20}
          color={canRedo ? "#000" : "#ccc"}
        />
      </TouchableOpacity>

      <Divider />

      <TouchableOpacity
        onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        style={[styles.button, isBold && styles.buttonActive]}
      >
        <MaterialIcons
          name="format-bold"
          size={20}
          color={isBold ? "#0a7ea4" : "#000"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        style={[styles.button, isItalic && styles.buttonActive]}
      >
        <MaterialIcons
          name="format-italic"
          size={20}
          color={isItalic ? "#0a7ea4" : "#000"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        style={[styles.button, isUnderline && styles.buttonActive]}
      >
        <MaterialIcons
          name="format-underlined"
          size={20}
          color={isUnderline ? "#0a7ea4" : "#000"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        style={[styles.button, isStrikethrough && styles.buttonActive]}
      >
        <MaterialIcons
          name="format-strikethrough"
          size={20}
          color={isStrikethrough ? "#0a7ea4" : "#000"}
        />
      </TouchableOpacity>

      <Divider />

      <TouchableOpacity
        onPress={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        style={styles.button}
      >
        <MaterialIcons name="format-align-left" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        style={styles.button}
      >
        <MaterialIcons name="format-align-center" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        style={styles.button}
      >
        <MaterialIcons name="format-align-right" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
        style={styles.button}
      >
        <MaterialIcons name="format-align-justify" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  button: {
    padding: 8,
    borderRadius: 4,
  },
  buttonActive: {
    backgroundColor: "#f0f9ff",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
