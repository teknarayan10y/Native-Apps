import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CommunityPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now - postDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: post.userAvatar }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.timestamp}>{formatTimeAgo(post.timestamp)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-vert" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.content}>
        <Text style={styles.text}>{post.content}</Text>
        {post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        {post.workout && (
          <View style={styles.workoutCard}>
            <Icon name="fitness-center" size={20} color="#2196F3" />
            <Text style={styles.workoutText}>
              Completed {post.workout.name}
            </Text>
            <Text style={styles.workoutMeta}>
              {post.workout.duration} • {post.workout.calories} cal
            </Text>
          </View>
        )}
      </View>

      {/* Post Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Icon name="favorite" size={16} color="#FF4081" />
          <Text style={styles.statText}>{likeCount}</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="chat-bubble-outline" size={16} color="#666" />
          <Text style={styles.statText}>{post.comments.length}</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="share" size={16} color="#666" />
          <Text style={styles.statText}>{post.shares}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Icon 
            name={isLiked ? "favorite" : "favorite-border"} 
            size={24} 
            color={isLiked ? "#FF4081" : "#666"} 
          />
          <Text style={[
            styles.actionText,
            isLiked && styles.likedText
          ]}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowComments(true)}
        >
          <Icon name="chat-bubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={24} color="#666" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity onPress={() => setShowComments(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {post.comments.map((comment, index) => (
              <View key={index} style={styles.comment}>
                <Image
                  source={{ uri: comment.userAvatar }}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUsername}>
                    {comment.username}
                  </Text>
                  <Text style={styles.commentText}>
                    {comment.text}
                  </Text>
                  <Text style={styles.commentTime}>
                    {formatTimeAgo(comment.timestamp)}
                  </Text>
                </View>
              </View>
            ))}
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
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  moreButton: {
    padding: 5,
  },
  content: {
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
  },
  workoutText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3',
  },
  workoutMeta: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#FF4081',
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
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default CommunityPost;
