// App.js
import React, { useState } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Import images
import elephantImage from './assets/img/elephant.jpg';
import leopardImage from './assets/img/leopard.jpg';
import storkImage from './assets/img/rabbit.jpg';

const quizQuestions = [
  {
    question: "What animal is this?",
    imageUrl: elephantImage,
    options: ["Elephant", "Rhino", "Hippo"],
    correctAnswer: "Elephant",
  },
  {
    question: "What animal is this?",
    imageUrl: leopardImage,
    options: ["Cheetah", "Leopard", "Jaguar"],
    correctAnswer: "Leopard",
  },
  {
    question: "What animal is this?",
    imageUrl: storkImage,
    options: ["Eagle", "Rabbit", "Penguin"],
    correctAnswer: "Rabbit",
  },
];

export default function App() {
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));

  const handleAnswerChange = (answer, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    Alert.alert(`You have ${correctCount} correct answer(s)!`);
  };

  return (
      <ScrollView style={styles.container}>
        {quizQuestions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Image source={question.imageUrl} style={styles.image} />
              <Text style={styles.questionText}>{question.question}</Text>
              <Picker
                  selectedValue={answers[index]}
                  onValueChange={(value) => handleAnswerChange(value, index)}
                  style={styles.picker}
              >
                <Picker.Item label="Select an item..." value={null} />
                {question.options.map((option, i) => (
                    <Picker.Item label={option} value={option} key={i} />
                ))}
              </Picker>
            </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Submit Answers" onPress={handleSubmit} color="#2196F3" />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  questionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  buttonContainer: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '60%',
  },
});
