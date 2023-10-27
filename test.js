import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { TranscribeStreamingClient } from '@aws-sdk/client-transcribe-streaming';

const TranscribeComponent = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  const startTranscription = async () => {
    const client = new TranscribeStreamingClient();
    const session = await client.startStreamTranscription({
      MediaEncoding: 'pcm',
    });

    setIsTranscribing(true);

    const microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    microphoneStream.on('data', (audioChunk) => {
      session.sendAudioEvent({
        AudioEvent: {
          AudioChunk: audioChunk,
        },
      });
    });

    session.on('partialResults', (results) => {
      setTranscribedText(results.Alternatives[0].Transcript);
    });

    session.on('finalResults', (results) => {
      setTranscribedText(results.Alternatives[0].Transcript);
    });

    session.on('error', (error) => {
      console.error(error);
    });
  };

  const stopTranscription = async () => {
    const client = new TranscribeStreamingClient();
    await client.stopStreamTranscription({
      SessionId: 'YOUR_SESSION_ID',
    });

    setIsTranscribing(false);
  };

  return (
    <View>
      <Text>{transcribedText}</Text>
      <Button title="Start Transcription" onPress={startTranscription} disabled={isTranscribing} />
      <Button title="Stop Transcription" onPress={stopTranscription} disabled={!isTranscribing} />
    </View>
  );
};

export default TranscribeComponent;