import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityPost from '../components/CommunityPost.js';
import ChallengeCard from '../components/ChallengeCard.js';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const posts = [
    {
      id: 1,
      username: 'JohnFit',
      userAvatar: 'https://example.com/avatar1.jpg',
      timestamp: '2024-01-15T10:30:00',
      content: 'Just crushed my morning workout! 💪 New personal best on deadlifts.',
      image: 'https://example.com/workout1.jpg',
      workout: {
        name: 'Back & Biceps',
        duration: '45 min',
        calories: '320',
      },
      likes: 24,
      comments: [
        {
          username: 'SarahStrong',
          userAvatar: 'https://example.com/avatar2.jpg',
          text: 'Amazing progress! Keep it up! 🔥',
          timestamp: '2024-01-15T10:35:00',
        },
      ],
      shares: 3,
    },
    {
      id: 2,
      username: 'FitnessPro',
      userAvatar: 'https://example.com/avatar3.jpg',
      timestamp: '2024-01-15T09:15:00',
      content: 'Here\'s a quick tip for better squats: Keep your core tight and chest up! Check out my form video.',
      image: 'https://example.com/squat-form.jpg',
      likes: 45,
      comments: [
        {
          username: 'GymNewbie',
          userAvatar: 'https://example.com/avatar4.jpg',
          text: 'Thanks for the tip! Really helpful.',
          timestamp: '2024-01-15T09:20:00',
        },
      ],
      shares: 12,
    },
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day Push-Up Challenge',
      icon: 'fitness-center',
      description: 'Complete 100 push-ups every day for 30 days. Track your progress and compete with others!',
      participants: 156,
      progress: 45,
      endDate: '2024-02-15T00:00:00',
      reward: '500 pts',
      leaderCount: 10,
      image: 'https://example.com/pushup-challenge.jpg',
      rules: [
        'Must complete all reps daily',
        'Record video proof weekly',
        'Rest days on Sunday',
      ],
      leaders: [
        { name: 'Mike Strong', avatar: 'https://example.com/mike.jpg', score: '2800 reps' },
        { name: 'Lisa Fit', avatar: 'https://example.com/lisa.jpg', score: '2750 reps' },
        { name: 'Tom Power', avatar: 'https://example.com/tom.jpg', score: '2600 reps' },
      ],
    },
    {
      id: 2,
      title: 'Weight Loss Warriors',
      icon: 'trending-down',
      description: 'Join others in a 12-week weight loss journey. Support, motivate, and achieve together!',
      participants: 234,
      progress: 75,
      endDate: '2024-03-30T00:00:00',
      reward: '1000 pts',
      leaderCount: 15,
      image: 'https://example.com/weight-loss.jpg',
      rules: [
        'Weekly weigh-ins required',
        'Share meal plans',
        'Attend virtual meetups',
      ],
      leaders: [
        { name: 'Sarah Slim', avatar: 'https://example.com/sarah.jpg', score: '-15 lbs' },
        { name: 'David Lean', avatar: 'https://example.com/david.jpg', score: '-12 lbs' },
        { name: 'Emma Health', avatar: 'https://example.com/emma.jpg', score: '-10 lbs' },
      ],
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <View>
            {posts.map((post) => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </View>
        );
      case 'challenges':
        return (
          <View>
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        );
      case 'leaderboard':
        return (
          <View style={styles.leaderboard}>
            <View style={styles.leaderboardHeader}>
              <Text style={styles.leaderboardTitle}>Global Rankings</Text>
              <TouchableOpacity style={styles.filterButton}>
                <Icon name="filter-list" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {/* Add leaderboard content here */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="white" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Icon
            name="dynamic-feed"
            size={24}
            color={activeTab === 'feed' ? '#2196F3' : '#666'}
          />
          <Text style={[
            styles.tabText,
            activeTab === 'feed' && styles.activeTabText
          ]}>Feed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'challenges' && styles.activeTab]}
          onPress={() => setActiveTab('challenges')}
        >
          <Icon
            name="emoji-events"
            size={24}
            color={activeTab === 'challenges' ? '#2196F3' : '#666'}
          />
          <Text style={[
            styles.tabText,
            activeTab === 'challenges' && styles.activeTabText
          ]}>Challenges</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Icon
            name="leaderboard"
            size={24}
            color={activeTab === 'leaderboard' ? '#2196F3' : '#666'}
          />
          <Text style={[
            styles.tabText,
            activeTab === 'leaderboard' && styles.activeTabText
          ]}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>

      {/* Create Post Button */}
      <TouchableOpacity style={styles.createButton}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationButton: {
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  createButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  leaderboard: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    padding: 15,
    elevation: 2,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 5,
  },
});

export default CommunityScreen;
