import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import { Note } from "@/types/Note";

interface NoteListProps {
  notes: Note[];
  onNotePress: (note: Note) => void;
  onDeletePress: (noteId: string) => void;
}

export function NoteList({ notes, onNotePress, onDeletePress }: NoteListProps) {
  const renderItem = ({ item }: { item: Note }) => (
    <ThemedView style={styles.noteItem}>
      <TouchableOpacity
        style={styles.noteContent}
        onPress={() => onNotePress(item)}
      >
        <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
        <ThemedText numberOfLines={2} style={styles.preview}>
          {item.content}
        </ThemedText>
        <View style={styles.footer}>
          <ThemedText style={styles.date}>
            {new Date(item.updatedAt).toLocaleString()}
          </ThemedText>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeletePress(item.id)}
          >
            <MaterialIcons name="delete" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  noteItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  noteContent: {
    flex: 1,
  },
  preview: {
    marginTop: 4,
    opacity: 0.7,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    opacity: 0.5,
  },
  deleteButton: {
    marginLeft: 12,
    padding: 4,
  },
});
