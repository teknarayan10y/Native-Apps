import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkoutPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState('Workout Mix 1');

  const playlists = [
    {
      id: 1,
      name: 'Workout Mix 1',
      duration: '45 min',
      tracks: 12,
      image: 'https://example.com/playlist1.jpg',
    },
    {
      id: 2,
      name: 'Cardio Boost',
      duration: '30 min',
      tracks: 8,
      image: 'https://example.com/playlist2.jpg',
    },
    {
      id: 3,
      name: 'Power Hour',
      duration: '60 min',
      tracks: 15,
      image: 'https://example.com/playlist3.jpg',
    },
  ];

  const currentTrack = {
    title: 'Workout Motivation',
    artist: 'Fitness DJ',
    duration: '3:45',
    progress: 0.6,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Music</Text>
        <TouchableOpacity style={styles.playlistButton}>
          <Icon name="queue-music" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.playerCard}>
        <View style={styles.nowPlaying}>
          <Image
            source={{ uri: 'https://example.com/album-art.jpg' }}
            style={styles.albumArt}
          />
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{currentTrack.title}</Text>
            <Text style={styles.trackArtist}>{currentTrack.artist}</Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${currentTrack.progress * 100}%` }
            ]} 
          />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="skip-previous" size={32} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Icon 
              name={isPlaying ? 'pause' : 'play-arrow'} 
              size={40} 
              color="white" 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="skip-next" size={32} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.playlistsContainer}>
        <Text style={styles.sectionTitle}>Your Playlists</Text>
        {playlists.map((playlist) => (
          <TouchableOpacity 
            key={playlist.id} 
            style={[
              styles.playlistItem,
              currentPlaylist === playlist.name && styles.activePlaylist
            ]}
            onPress={() => setCurrentPlaylist(playlist.name)}
          >
            <View style={styles.playlistInfo}>
              <Text style={[
                styles.playlistName,
                currentPlaylist === playlist.name && styles.activeText
              ]}>
                {playlist.name}
              </Text>
              <Text style={styles.playlistMeta}>
                {playlist.tracks} tracks · {playlist.duration}
              </Text>
            </View>
            {currentPlaylist === playlist.name && (
              <Icon name="volume-up" size={20} color="#2196F3" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    padding: 15,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  playlistButton: {
    padding: 5,
  },
  playerCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  trackInfo: {
    marginLeft: 15,
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  playlistsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activePlaylist: {
    backgroundColor: '#E3F2FD',
  },
  playlistInfo: {
    flex: 1,
  },
  playlistName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  activeText: {
    color: '#2196F3',
  },
  playlistMeta: {
    fontSize: 12,
    color: '#666',
  },
});

export default WorkoutPlayer;
