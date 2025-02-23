import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Editor from "@/components/dom-components/rich-text-field";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/Note";
import { useState, useRef } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NoteList } from "@/components/NoteList";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { notes, loading, addNote, updateNote } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editorState, setEditorState] = useState<string | null>(null);
  const [plainText, setPlainText] = useState("");
  const [title, setTitle] = useState("");
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const toggleSearch = () => {
    const toValue = isSearchVisible ? 0 : 1;
    Animated.spring(searchAnimation, {
      toValue,
      useNativeDriver: false,
    }).start();
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setSearchQuery("");
    }
  };
  const handleNoteSave = async () => {
    if (selectedNote) {
      await updateNote(selectedNote.id, title || selectedNote.title, plainText);
    } else {
      await addNote(title || "New Note", plainText);
    }
    setSelectedNote(null);
    setPlainText("");
    setEditorState(null);
    setTitle("");
    setIsEditorVisible(false);
  };
  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText>Loading notes...</ThemedText>
      </ThemedView>
    );
  }
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const searchWidth = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "85%"],
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {/* <MaterialIcons name="note" size={32} color="#0a7ea4" /> */}
          <ThemedText style={styles.appTitle}>Easy Note</ThemedText>
        </View>

        <View style={styles.searchContainer}>
          <Animated.View
            style={[styles.searchInputContainer, { width: searchWidth }]}
          >
            {isSearchVisible && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search notes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            )}
          </Animated.View>
          <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
            <MaterialIcons
              name={isSearchVisible ? "close" : "search"}
              size={24}
              color="#0a7ea4"
            />
          </TouchableOpacity>
        </View>
      </View>
      <NoteList
        onDeletePress={(noteId) => {
          // TODO: Implement delete functionality
          console.log("Delete note:", noteId);
        }}
        notes={filteredNotes}
        onNotePress={(note) => {
          setSelectedNote(note);
          setPlainText(note.content);
          setTitle(note.title);
          setIsEditorVisible(true);
        }}
      />
      <FloatingActionButton
        onPress={() => {
          setSelectedNote(null);
          setPlainText("");
          setEditorState(null);
          setTitle("");
          setIsEditorVisible(true);
        }}
      />
      <Modal
        visible={isEditorVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ThemedView style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedNote(null);
                  setPlainText("");
                  setEditorState(null);
                  setTitle("");
                  setIsEditorVisible(false);
                }}
              >
                <ThemedText type="link">Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNoteSave}>
                <ThemedText type="link">Save</ThemedText>
              </TouchableOpacity>
            </View>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Note Title"
              style={{
                fontSize: 20,
                fontWeight: "600",
                padding: 8,
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ flex: 1, padding: 16 }}>
            <Editor
              setPlainText={setPlainText}
              setEditorState={setEditorState}
              initialContent={selectedNote?.content}
            />
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0a7ea4",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInputContainer: {
    overflow: "hidden",
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    fontSize: 16,
    width: "100%",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInputStyle: {
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    fontSize: 16,
    width: "100%",
  },
});
