# new model code
import csv
# import pandas as pd
import pickle

import cv2
import mediapipe as mp
import numpy as np


def test_model_new(path_with_file_extension, destination):
    res = path_with_file_extension.split('\\')
    x = res[-1]
    x = x[::-1].split('.', 1)[1][::-1]
    filename = x

    with open('action_detection.pkl', 'rb') as f:
        model = pickle.load(f)

    mp_holistic = mp.solutions.holistic

    # 1. declaration of variables
    sequence = []
    sentence = []
    predictions = []
    counter = [0]
    threshold = 0.6

    # read video frames
    cap = cv2.VideoCapture(path_with_file_extension)

    # getting the width, height, frame_no, framerate(fps) and the frame number of the video for the video writer
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    framcount = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    frame_no = 0

    # puting the video wirter into variable
    writer = cv2.VideoWriter(
        '{path}\\{filename}'.format(path=destination, filename=res[-1])
        , cv2.VideoWriter_fourcc(*'DIVX'), fps, (width, height)
    )

    # Set mediapipe model
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():

            # Read feed
            frame_exists, curr_frame = cap.read()
            if not frame_exists:
                break
            # Make detections
            image, results = mediapipe_detection(curr_frame, holistic)
            # frame with timestamp in seconds
            print("for frame : " + str(frame_no) + "   timestamp is: ", str((cap.get(cv2.CAP_PROP_POS_MSEC) / 1000)))

            print(results)

            # Draw landmarks
            draw_styled_landmarks(image, results)
            # 2. Prediction logic
            keypoints = extract_keypoints(results)
            #         sequence.insert(0,keypoints)
            #         sequence = sequence[:30]
            sequence.append(keypoints)
            sequence = sequence[-30:]
            if len(sequence) == 30:
                res = model.predict(sequence)[0]
                body_language_prob = model.predict_proba(sequence)[0]
                print(res)
                predictions.append(res)

                # if the last 10 predictions are the same
                if np.unique(predictions[-10:])[0] == res:
                    # if the prediction is higher than threshold
                    if body_language_prob[np.argmax(body_language_prob)] > threshold:
                        # if it is not the first prediction
                        if len(sentence) > 0:
                            # if the predictions is not equal to the last prediction
                            if res != sentence[-1]:
                                # end time
                                end = (cap.get(cv2.CAP_PROP_POS_MSEC) / 1000)

                                def f(x, decimals=3):
                                    r = str(round(x, decimals))  # round and convert to string
                                    r = r.split('.')[-1]  # split at the dot and keep the decimals
                                    return r

                                milliseconds_start = start2 % 1
                                seconds_start = int(start2) % 60
                                minutes_start = int(start2 / 60) % 60
                                hours_start = int(start2 / 3600)
                                print(
                                    f"{hours_start:02}:{minutes_start:02}:{seconds_start:02},{int(f(milliseconds_start)):03}")

                                print("start", start2)
                                print("end", end)

                                milliseconds_end = end % 1
                                seconds_end = int(end) % 60
                                minutes_end = int(end / 60) % 60
                                hours_end = int(end / 3600)
                                print(f"{hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}")

                                with open(f"{destination}\\{filename}.srt", "a") as srt_file:
                                    srt_file.write(
                                        f"{counter[-1]}\n{hours_start:02}:{minutes_start:02}:{seconds_start:02},{int(f(milliseconds_start)):03}"
                                        f" --> {hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}\n{sentence[-1]}\n\n")
                                meaning = meaning_action(sentence[-1])
                                print(meaning)
                                with open(f"{destination}\\{filename}_meaning.srt", "a") as srt_file:
                                    srt_file.write(
                                        f"{counter[-1]}\n{hours_start:02}:{minutes_start:02}:{seconds_start:02},{int(f(milliseconds_start)):03}"
                                        f" --> {hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}\n{meaning}\n\n")

                                # counter for the SRT file action
                                counter.append(counter[-1] + 1)
                                sentence.append(res)
                                print(sentence)

                                # start time again
                                start2 = (cap.get(cv2.CAP_PROP_POS_MSEC) / 1000)

                        # else of the first prediction
                        else:
                            # start time
                            start2 = (cap.get(cv2.CAP_PROP_POS_MSEC) / 1000)
                            # counter for the SRT file actions
                            counter.append(counter[-1] + 1)
                            sentence.append(res)

                if len(sentence) > 5:
                    sentence = sentence[-5:]

                # write the video frame to the device
                writer.write(image)

                # Get status box
                cv2.rectangle(image, (0, 0), (250, 60), (245, 117, 16), -1)
                cv2.putText(image, 'PROB'
                            , (15, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
                cv2.putText(image, str(round(body_language_prob[np.argmax(body_language_prob)], 2))
                            , (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                # Display Class
                cv2.putText(image, 'CLASS'
                            , (95, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
                cv2.putText(image, res.split(' ')[0]
                            , (90, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            # increment the frame by 1
            frame_no += 1

            # Show to screen
            cv2.imshow('OpenCV Feed', image)

            # Break by pressing Q
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        # this allows for the last action/prediction to be saved even if there is only one action (492->524)
        def f(x, decimals=3):
            r = str(round(x, decimals))  # round and convert to string
            r = r.split('.')[-1]  # split at the dot and keep the decimals
            return r

        milliseconds_start = start2 % 1
        seconds_start = int(start2) % 60
        minutes_start = int(start2 / 60) % 60
        hours_start = int(start2 / 3600)

        end = framcount / fps
        milliseconds_end = end % 1
        seconds_end = int(end) % 60
        minutes_end = int(end / 60) % 60
        hours_end = int(end / 3600)
        print(f"{hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}")

        with open(f"{destination}\\{filename}.srt", "a") as srt_file:
            srt_file.write(
                f"{counter[-1]}\n{hours_start:02}:{minutes_start:02}:{seconds_start:02},{int(f(milliseconds_start)):03}"
                f" --> {hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}\n{sentence[-1]}\n\n")
        meaning = meaning_action(sentence[-1])
        print(meaning)
        with open(f"{destination}\\{filename}_meaning.srt", "a") as srt_file:
            srt_file.write(
                f"{counter[-1]}\n{hours_start:02}:{minutes_start:02}:{seconds_start:02},{int(f(milliseconds_start)):03}"
                f" --> {hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}\n{meaning}\n\n")

        # counter for the SRT file action
        counter.append(counter[-1] + 1)
        cap.release()
        cv2.destroyAllWindows()


def draw_styled_landmarks(image, results):
    mp_drawing = mp.solutions.drawing_utils
    mp_holistic = mp.solutions.holistic
    # Draw face connections
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                              mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                              mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1)
                              )
    # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(80, 22, 10), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(80, 44, 121), thickness=2, circle_radius=2)
                              )
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2)
                              )
    # Draw right hand connections
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                              )


def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False  # Image is no longer writeable
    results = model.process(image)  # Make prediction
    image.flags.writeable = True  # Image is now writeable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # COLOR COVERSION RGB 2 BGR
    return image, results


def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                     results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)
    face = np.array([[res.x, res.y, res.z, res.visibility] for res in
                     results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468 * 4)
    lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                   results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 4)
    rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                   results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
        21 * 4)
    return np.concatenate([pose, face, lh, rh])


def meaning_action(action):
    csv_file = csv.reader(
        open('F:\\SWE PROGRAM\\Level 4\\First Semster\\Graduation project\\Backend\\APIs\\backend_GP\\DataSet.csv', 'r'))

    for row in csv_file:
        if action == row[0]:
            return row[2]