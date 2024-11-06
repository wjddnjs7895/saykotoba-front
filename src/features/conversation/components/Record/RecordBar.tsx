import { View, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";
import { usePostAudioForResponse } from "../../api/postAudioForResponse";

const RecordBar = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const postAudioForResponseMutation = usePostAudioForResponse();

  const recordingOptions: Audio.RecordingOptions = {
    android: {
      extension: ".wav",
      outputFormat: Audio.AndroidOutputFormat.THREE_GPP,
      audioEncoder: Audio.AndroidAudioEncoder.AAC,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsFloat: false,
      linearPCMIsBigEndian: false,
      outputFormat: Audio.IOSOutputFormat.LINEARPCM,
    },
    web: {
      mimeType: "audio/wav",
      bitsPerSecond: 128000,
    },
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  async function startRecording() {
    try {
      console.log("권한 요청 중...");
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        console.error("오디오 권한이 거부되었습니다.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("녹음 시작 중...");
      const { recording } = await Audio.Recording.createAsync(recordingOptions);

      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("녹음 시작 실패:", err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setIsRecording(false);

      const formData = new FormData();
      formData.append("conversationId", "1");
      formData.append("audio", {
        uri: uri,
        name: "audio.wav",
        type: "audio/wav",
        mimeType: "audio/wave",
      } as any);

      postAudioForResponseMutation.mutate({ formData });
    } catch (err) {
      console.error("녹음 중지 실패:", err);
    }
  }

  async function playSound(uri: string) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      await newSound.playAsync();
      setIsPlaying(true);
    } catch (err) {
      console.error("재생 실패:", err);
    }
  }

  async function stopSound() {
    if (!sound) return;

    try {
      await sound.stopAsync();
      setIsPlaying(false);
    } catch (err) {
      console.error("재생 중지 실패:", err);
    }
  }

  return (
    <View className="bg-gray-200 rounded-lg p-2 w-full h-20 flex-row items-center justify-center gap-4">
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        className="bg-red-500 p-4 rounded-full"
      >
        <Text className="text-white">
          {isRecording ? "녹음 중지" : "녹음 시작"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          isPlaying ? stopSound() : playSound(recording?.getURI()!)
        }
        className="bg-blue-500 p-4 rounded-full"
      >
        <Text className="text-white">{isPlaying ? "재생 중지" : "재생"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordBar;
