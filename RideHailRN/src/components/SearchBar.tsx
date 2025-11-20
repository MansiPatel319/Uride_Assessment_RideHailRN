// components/SearchBar.tsx
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  placeholder: string;
  onSelectLocation: (location: string) => void;
}

const mockLocations = ['Toronto', 'Brampton', 'Mississauga', 'Oakville']; // placeholder

export default function SearchBar({ placeholder, onSelectLocation }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleChange = (text: string) => {
    setQuery(text);
    // Mock filter: in production, call Mapbox / Google API
    const filtered = mockLocations.filter(loc => loc.toLowerCase().includes(text.toLowerCase()));
    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={query}
        onChangeText={handleChange}
        style={styles.input}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { onSelectLocation(item); setQuery(item); setResults([]); }}>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 },
  item: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
