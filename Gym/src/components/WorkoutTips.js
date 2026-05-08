import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';

const WorkoutTips = () => {
  const [selectedTip, setSelectedTip] = useState(null);

  const tips = [
    {
      id: 1,
      title: 'Perfect Squat Form',
      category: 'Form',
      shortDesc: 'Master the basics of proper squat technique',
      content: 'Keep your chest up, back straight, and knees aligned with toes...',
      image: 'https://th.bing.com/th?id=OIP.bTNmQQPvHvbIXK1q9Jr_MwAAAA&w=181&h=181&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2',
      difficulty: 'Beginner',
    },
    {
      id: 2,
      title: 'Progressive Overload',
      category: 'Training',
      shortDesc: 'How to safely increase workout intensity',
      content: 'Gradually increase weight, frequency, or repetitions...',
      image: 'https://th.bing.com/th?id=OIP.MEv6pBlNz_UL7eOzUDFmBgAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2',
      difficulty: 'Intermediate',
    },
    {
      id: 3,
      title: 'Recovery Tips',
      category: 'Recovery',
      shortDesc: 'Optimize your post-workout recovery',
      content: 'Focus on proper sleep, nutrition, and stretching...',
      image: 'https://th.bing.com/th/id/OIP.gUXgKR7wHqK3GIWhJWUJmAHaHa?rs=1&pid=ImgDetMain',
      difficulty: 'All Levels',
    },
  ];

  const renderTipCard = (tip) => (
    <TouchableOpacity key={tip.id} style={styles.tipCard} onPress={() => setSelectedTip(tip)}>
      <Image source={{ uri: tip.image }} style={styles.tipImageSmall} />
      <View style={styles.tipInfo}>
        <Text style={styles.tipCategory}>{tip.category}</Text>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Text style={styles.tipDescription}>{tip.shortDesc}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Tips</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={{ uri: 'https://th.bing.com/th?id=OIP.G_qq2Zk0l8Y4a5fN5T6hEwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2' }} style={styles.filterImage} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.tipsList}>
        {tips.map(renderTipCard)}
      </ScrollView>

      <Modal visible={selectedTip !== null} animationType="slide" transparent={true}>
        {selectedTip && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedTip(null)}>
                  <Image source={{ uri: 'https://th.bing.com/th?id=OIP.G_qq2Zk0l8Y4a5fN5T6hEwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2' }} style={styles.closeImage} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedTip.title}</Text>
              </View>

              <ScrollView style={styles.modalBody}>
                <View style={styles.tipMetaDetail}>
                  <Image source={{ uri: 'https://th.bing.com/th/id/OIP.gUXgKR7wHqK3GIWhJWUJmAHaHa?rs=1&pid=ImgDetMain' }} style={styles.metaImage} />
                  <Text style={styles.metaText}>{selectedTip.category}</Text>

                  <Image source={{ uri: 'https://th.bing.com/th/id/OIP.gUXgKR7wHqK3GIWhJWUJmAHaHa?rs=1&pid=ImgDetMain' }} style={styles.metaImage} />
                  <Text style={styles.metaText}>{selectedTip.difficulty}</Text>
                </View>

                <Image source={{ uri: selectedTip.image }} style={styles.tipImage} resizeMode="cover" />
                <Text style={styles.tipContent}>{selectedTip.content}</Text>

                <TouchableOpacity style={styles.saveButton}>
                  <Image source={{ uri: 'https://www.bing.com/images/search?q=Save%20icon%20png&view=detailv2&FORM=IQFRBA&id=38515AEAF9A68F93C1DD046FC67E7C6C05EEF382&selectedindex=1&&expw=2000&exph=2000&ccid=5nVrLuWu&ck=9586F6FE1080A8780D2AC2DF29A2065A&simid=608030382161613965&thid=OIP.5nVrLuWuSJ2KAu6DXXtSyAHaHa&idpp=serp&idpbck=1' }} style={styles.saveImage} />
                  <Text style={styles.saveButtonText}>Save Tip</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        )}
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
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 5,
  },
  filterImage: {
    width: 24,
    height: 24,
  },
  tipsList: {
    maxHeight: 300,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  tipImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  tipInfo: {
    flex: 1,
  },
  tipCategory: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipDescription: {
    color: '#666',
    fontSize: 14,
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
    minHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    marginRight: 15,
  },
  closeImage: {
    width: 24,
    height: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  tipMetaDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginRight: 20,
  },
  tipImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  saveImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutTips;
