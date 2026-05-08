import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChallengeCard = ({ challenge }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const getProgressColor = (progress) => {
    if (progress < 30) return '#FF5252';
    if (progress < 70) return '#FFC107';
    return '#4CAF50';
  };

  const formatTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Ending soon';
  };

  return (
    <View style={styles.container}>
      {/* Challenge Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Icon name={challenge.icon} size={24} color="#2196F3" />
          <Text style={styles.title}>{challenge.title}</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.joinButton,
            isJoined && styles.joinedButton
          ]}
          onPress={() => setIsJoined(!isJoined)}
        >
          <Text style={[
            styles.joinButtonText,
            isJoined && styles.joinedButtonText
          ]}>
            {isJoined ? 'Joined' : 'Join'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Challenge Info */}
      <Text style={styles.description}>{challenge.description}</Text>

      {/* Challenge Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {challenge.participants} participants
          </Text>
          <Text style={styles.timeLeft}>
            {formatTimeLeft(challenge.endDate)}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${challenge.progress}%`,
                backgroundColor: getProgressColor(challenge.progress)
              }
            ]} 
          />
        </View>
      </View>

      {/* Challenge Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Icon name="emoji-events" size={20} color="#FFC107" />
          <Text style={styles.statValue}>{challenge.reward}</Text>
          <Text style={styles.statLabel}>Reward</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="group" size={20} color="#2196F3" />
          <Text style={styles.statValue}>{challenge.leaderCount}</Text>
          <Text style={styles.statLabel}>Leaders</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="trending-up" size={20} color="#4CAF50" />
          <Text style={styles.statValue}>{challenge.progress}%</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
      </View>

      {/* View Details Button */}
      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={() => setShowDetails(true)}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
        <Icon name="chevron-right" size={20} color="#2196F3" />
      </TouchableOpacity>

      {/* Details Modal */}
      <Modal
        visible={showDetails}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{challenge.title}</Text>
              <TouchableOpacity onPress={() => setShowDetails(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {/* Challenge Image */}
              <Image
                source={{ uri: challenge.image }}
                style={styles.challengeImage}
                resizeMode="cover"
              />

              {/* Challenge Details */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.detailText}>
                  {challenge.description}
                </Text>
              </View>

              {/* Rules */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Rules</Text>
                {challenge.rules.map((rule, index) => (
                  <View key={index} style={styles.ruleItem}>
                    <Icon name="check-circle" size={16} color="#4CAF50" />
                    <Text style={styles.ruleText}>{rule}</Text>
                  </View>
                ))}
              </View>

              {/* Leaderboard Preview */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Top Performers</Text>
                {challenge.leaders.slice(0, 3).map((leader, index) => (
                  <View key={index} style={styles.leaderItem}>
                    <Text style={styles.leaderRank}>#{index + 1}</Text>
                    <Image
                      source={{ uri: leader.avatar }}
                      style={styles.leaderAvatar}
                    />
                    <Text style={styles.leaderName}>{leader.name}</Text>
                    <Text style={styles.leaderScore}>{leader.score}</Text>
                  </View>
                ))}
              </View>

              {/* Join Challenge Button */}
              <TouchableOpacity 
                style={[
                  styles.joinChallengeButton,
                  isJoined && styles.leaveChallengeButton
                ]}
                onPress={() => setIsJoined(!isJoined)}
              >
                <Text style={[
                  styles.joinChallengeText,
                  isJoined && styles.leaveChallengeText
                ]}>
                  {isJoined ? 'Leave Challenge' : 'Join Challenge'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  joinButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinedButton: {
    backgroundColor: '#2196F3',
  },
  joinButtonText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  joinedButtonText: {
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  timeLeft: {
    fontSize: 12,
    color: '#FF5252',
    fontWeight: '500',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  detailsButtonText: {
    color: '#2196F3',
    fontWeight: '500',
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  challengeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  leaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaderRank: {
    width: 30,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  leaderAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  leaderName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  leaderScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  joinChallengeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  leaveChallengeButton: {
    backgroundColor: '#FF5252',
  },
  joinChallengeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaveChallengeText: {
    color: 'white',
  },
});

export default ChallengeCard;
