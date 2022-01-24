import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import Button from "../Button";
import colors from "../../config/colors";
import Icon from "../Icon";
import TextInput from "../TextInput";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../Providers/userContext";
import { HeaderText, TitleText } from "../Text";

function MovieReviewModal({
  movieId,
  modalVisible,
  setModalVisible,
  movieReview,
}) {
  const [rating, setRating] = useState();
  const [description, setDescription] = useState();
  const { addReview, removeReview, updateReview } = useUser();
  useEffect(() => {
    resetValues();
    setRating((Math.round(6 * 10) / 10).toFixed(1));
    if (movieReview) {
      setRating(movieReview.review.rating);
      setDescription(movieReview.review.description);
    }
  }, []);

  const handleUpdate = () => {
    if (movieReview) {
      updateReview(movieReview.docId, rating, description);
    } else {
      addReview(movieId, rating, description);
    }
    setModalVisible(false);
  };
  const handleDelete = () => {
    Alert.alert(
      "Are you sure you want to delete this review?",
      "This information will be permenantly deleted.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK",
          onPress: () => {
            removeReview(movieReview.docId);
            setModalVisible(false);
            resetValues();
          },
        },
      ]
    );
  };
  const handleClose = () => {
    setModalVisible(false);
    if (movieReview) {
      setRating(movieReview.review.rating);
      setDescription(movieReview.review.description);
    } else {
      resetValues();
    }
  };

  const resetValues = () => {
    setRating((Math.round(6 * 10) / 10).toFixed(1));
    setDescription("");
  };
  return (
    <>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.container}>
          <LinearGradient
            style={styles.gradient}
            colors={colors.review_gradient}
          >
            <View style={styles.spaceBetween}>
              <TitleText style={styles.title}>Your review</TitleText>
              <TouchableWithoutFeedback onPress={handleClose}>
                <View>
                  <Icon name="close" size={50} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.form}>
              <HeaderText>Rating</HeaderText>
              <View style={styles.sliderContainer}>
                <TitleText style={{ width: 50, color: colors.white }}>
                  {rating}
                </TitleText>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={10}
                  step={0.1}
                  value={Math.floor(movieReview?.review?.rating || 6)}
                  onValueChange={(val) =>
                    val < 10
                      ? setRating((Math.round(val * 10) / 10).toFixed(1))
                      : setRating(Math.round(val * 10) / 10)
                  }
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
              </View>
              <HeaderText>Description</HeaderText>
              <TextInput
                placeholder="What did you think of the movie?"
                multiline
                secureTextEntry
                backgroundColor={colors.primary}
                shadow
                marginVertical={10}
                height={100}
                size={30}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View
              style={[
                styles.spaceBetween,
                !movieReview && { justifyContent: "center" },
              ]}
            >
              {movieReview && (
                <Button
                  style={styles.buttonDel}
                  color={"title"}
                  onPress={handleDelete}
                  title="Delete"
                />
              )}
              <Button
                style={styles.buttonAdd}
                color={"title"}
                onPress={handleUpdate}
                title={movieReview ? "Update" : "Add"}
              />
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
    marginTop: "auto",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.primary,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 30,
  },
  spaceBetween: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sliderContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  slider: {
    flex: 1,
  },

  buttonAdd: {
    flex: 0.7,
  },
  buttonDel: {
    flex: 0.2,
  },
});

export default MovieReviewModal;
