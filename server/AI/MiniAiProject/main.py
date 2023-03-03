import csv
import cv2
import os
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression, RidgeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import pickle
from tkinter import *
from tkinter import filedialog
import mediapipe as mp
from pathlib import Path



# creation of csv file for the landmarks cords
def create_landmarks_cords():
    num_cords = 543
    landmarks = ['action']
    for val in range(1, num_cords + 1):
        landmarks += ['x{}'.format(val), 'y{}'.format(val), 'z{}'.format(val), 'v{}'.format(val)]
        with open('pose.csv', mode='w', newline='') as f:
            csv_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            csv_writer.writerow(landmarks)

# put filename to be string and action name to be string too
def save_landmarks(filename, action_name,pose,face,hands):
    # putting the solutions into small variables to call them
    mp_drawing = mp.solutions.drawing_utils
    mp_holistic = mp.solutions.holistic

    # capturing the video applicable to change in the future
    cap = cv2.VideoCapture(filename)

    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Recolor Feed
            image = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)

            # make image not writeable for extra performance that doesn't exist ?
            image.flags.writeable = False

            # Make Detections
            results = holistic.process(image)
            if not os.path.isfile('D:\\Coding\\BodyLanguageDecoderV2\\pose.csv'):
                create_landmarks_cords()

            # make image writeable again
            image.flags.writeable = True

            # face_landmarks, pose_landmarks, left_hand_landmarks, right_hand_landmarks

            # Recolor image back to BGR for rendering
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            # 1. Draw face landmarks
            mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                                      mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                                      mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1)
                                      )

            # 2. Right hand
            mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(80, 22, 10), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(80, 44, 121), thickness=2, circle_radius=2)
                                      )

            # 3. Left Hand
            mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2)
                                      )

            # 4. Pose Detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                                      )
            # Export to CSV
            with open('pose.csv', mode='a', newline='') as f:
                csv_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                csv_writer.writerow(extract_landmarks(results, action_name,pose,face,hands))

            cv2.imshow('video', image)
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
    cap.release()
    cv2.destroyAllWindows()

# extract the landmarks and put zero if didn't detect the landmark
def extract_landmarks(results, action_name,pose,face,hands):
    if pose and not face and not hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                         results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)
        savedface = np.zeros(468 * 4)
        lh = np.zeros(21 * 4)
        rh = np.zeros(21 * 4)
    elif not pose and face and not hands:
        savedpose = np.zeros(33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                         results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468 * 4)
        lh = np.zeros(21 * 4)
        rh = np.zeros(21 * 4)
    elif not pose and not face and hands:
        savedpose = np.zeros(33 * 4)
        savedface = np.zeros(468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    elif pose and face and not hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(
            33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(
            468 * 4)
        lh = np.zeros(21 * 4)
        rh = np.zeros(21 * 4)
    elif pose and not face and hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(
            33 * 4)
        savedface = np.zeros(468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    elif not pose and face and hands:
        savedpose = np.zeros(33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(
            468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    elif pose and face and hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(
            33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(
            468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    else:
        print("No boolean values set to True")
    row = list(np.concatenate([savedpose,savedface, lh, rh]))
    # Append action name
    row.insert(0, action_name)
    return row

# extract the landmarks and put zero if didn't detect the landmark
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                     results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)

    face = np.array([[res.x, res.y, res.z, res.visibility] for res in
                    results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468 * 4)

    lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                   results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 4)

    rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                   results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21 * 4)

    return np.concatenate([pose,face,lh, rh])

# training of the four classification models with the coords file
def train_model():
    df = pd.read_csv('pose.csv')

    X = df.drop('action', axis=1)  # features
    y = df['action']  # target value

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1234)

    pipelines = {
        'rf': make_pipeline(StandardScaler(), RandomForestClassifier()),
        'lr':make_pipeline(StandardScaler(), LogisticRegression()),
        'dt': make_pipeline(StandardScaler(), DecisionTreeClassifier()),
        'gb':make_pipeline(StandardScaler(), GradientBoostingClassifier()),
    }

    fit_models = {}
    for algo, pipeline in pipelines.items():
        model = pipeline.fit(X_train, y_train)
        fit_models[algo] = model

    for algo, model in fit_models.items():
        yhat = model.predict(X_test)
        print(algo, accuracy_score(y_test, yhat))

    with open('pose_rf.pkl', 'wb') as f:
        pickle.dump(fit_models['rf'], f)
    with open('pose_lr.pkl', 'wb') as f:
        pickle.dump(fit_models['lr'], f)
    with open('pose_dt.pkl', 'wb') as f:
        pickle.dump(fit_models['dt'], f)
    with open('pose_gb.pkl', 'wb') as f:
        pickle.dump(fit_models['gb'], f)

# old model
def test_model():
    with open('body_language.pkl', 'rb') as f:
        model = pickle.load(f)

    mp_drawing = mp.solutions.drawing_utils
    mp_holistic = mp.solutions.holistic

    cap = cv2.VideoCapture("D:/Coding/BodyLanguageDecoderV2/Studio Project — Kapwing.mp4")
    # Initiate holistic model
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:

        while cap.isOpened():
            ret, frame = cap.read()

            # Recolor Feed
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False

            # Make Detections
            results = holistic.process(image)
            # print(results.face_landmarks)

            # face_landmarks, pose_landmarks, left_hand_landmarks, right_hand_landmarks

            # Recolor image back to BGR for rendering
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # 1. Draw face landmarks
            mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                                      mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                                      mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1)
                                      )

            # 2. Right hand
            mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(80, 22, 10), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(80, 44, 121), thickness=2, circle_radius=2)
                                      )

            # 3. Left Hand
            mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2)
                                      )

            # 4. Pose Detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                                      )
            # Export coordinates
            try:
                row = extract_keypoints(results)

                #             # Append class name
                #             row.insert(0, class_name)

                #             # Export to CSV
                #             with open('coords.csv', mode='a', newline='') as f:
                #                 csv_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                #                 csv_writer.writerow(row)

                # Make Detections
                X = pd.DataFrame([row])
                body_language_class = model.predict(X)[0]
                body_language_prob = model.predict_proba(X)[0]
                print(body_language_class, body_language_prob)

                # Grab ear coords
                coords = tuple(np.multiply(
                    np.array(
                        (results.pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_EAR].x,
                         results.pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_EAR].y))
                    , [640, 480]).astype(int))

                cv2.rectangle(image,
                              (coords[0], coords[1] + 5),
                              (coords[0] + len(body_language_class) * 20, coords[1] - 30),
                              (245, 117, 16), -1)
                cv2.putText(image, body_language_class, coords,
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                # Get status box
                cv2.rectangle(image, (0, 0), (250, 60), (245, 117, 16), -1)

                # Display Class
                cv2.putText(image, 'CLASS'
                            , (95, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
                cv2.putText(image, body_language_class.split(' ')[0]
                            , (90, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                # Display Probability
                cv2.putText(image, 'PROB'
                            , (15, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
                cv2.putText(image, str(round(body_language_prob[np.argmax(body_language_prob)], 2))
                            , (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

            except:
                pass

            cv2.imshow('Raw Webcam Feed', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()


# new model code
def test_model_new():
    path_with_file_extension = filedialog.askopenfilename(initialdir="/",
                                                          title="Select a File",
                                                          filetypes=[
                                                              ("video", ".mp4"),
                                                              ("video", ".MP4"),
                                                              ("video", ".avi"),
                                                              ("video", ".AVI"),
                                                              ("video", ".mov"),
                                                              ("video", ".MOV"),
                                                          ])

    res = path_with_file_extension.split('/')
    x = res[-1]
    x = x[::-1].split('.', 1)[1][::-1]
    filename = x
    destination = 'video landmark +SRT'
    if not os.path.exists(destination):
        os.mkdir(destination)

    with open('pose_lr.pkl', 'rb') as f:
        model = pickle.load(f)

    mp_holistic = mp.solutions.holistic

    # 1. declaration of variables
    sequence = []
    sentence = []
    predictions = []
    counter = [0]
    threshold = 0.95

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

                                with open(f"{destination}\\{filename}_meaning.srt", "a") as srt_file:
                                    srt_file.write(
                                        f"{counter[-1]}\n{hours_start:02}:{minutes_start:02}:{seconds_start:02},{int(f(milliseconds_start)):03}"
                                        f" --> {hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}\n{meaning_action(sentence[-1])}\n\n")

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
        try:
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

            with open(f"{destination}\\{filename}_meaning.srt", "a") as srt_file:
                srt_file.write(
                    f"{counter[-1]}\n{hours_start:02}:{minutes_start:02}:{seconds_start:02},{int(f(milliseconds_start)):03}"
                    f" --> {hours_end:02}:{minutes_end:02}:{seconds_end:02},{int(f(milliseconds_end)):03}\n{meaning_action(sentence[-1])}\n\n")

            # counter for the SRT file action
            counter.append(counter[-1] + 1)
        except:
            pass
        cap.release()
        cv2.destroyAllWindows()

#this code allows for the landmarks to be drawn on the body
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

#the detection of the landmarks on the body
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False  # Image is no longer writeable
    results = model.process(image)  # Make prediction
    image.flags.writeable = True  # Image is now writeable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # COLOR COVERSION RGB 2 BGR
    return image, results

#this is used to get the action meaning from the dataset.csv
def meaning_action(action):
    csv_file = csv.reader(open(
        'D:\\Coding\\BodyLanguageDecoderV2\\DataSet.csv',
        'r'
    ))

    for row in csv_file:
        if action == row[0]:
            return row[2]

# DataSet extract keypoints folder loop
def loop():
    # assign directory
    directory = 'Dataset Videos\\'
    if not os.path.exists(directory):
        os.mkdir(directory)
    folders = Path(directory).glob('*')
    x = []
    y = []
    for folder in folders:
        i = str(folder).split('\\')
        y.append(i[1])
        foldernames = np.array(y)
        files = Path(f"{directory}{i[1]}").glob('*')
        for file in files:
            j = str(file).split('\\')
            x.append(j[2])
            videos = np.array(x)
            save_landmarks(f'D:\\Coding\\BodyLanguageDecoderV2\\Dataset Videos\\{foldernames[0]}\\{videos[0]}'
                           , f'{foldernames[0]}',1 ,0 ,1)
            x.pop(0)
        y.pop(0)

window = Tk()

# Set window title
window.title('File Explorer')

# Set window background color
window.config(background="white")

# Create a File Explorer label
label_file_explorer = Label(window,
                            text="File Explorer using Tkinter",
                            fg="blue")
label_file_explorer.pack()

button_explore = Button(window,
                        text="Train Model",
                        command=train_model)
button_explore.pack()

button_test = Button(window,
                     text="Test Model",
                     command=test_model_new)
button_test.pack()

button_loop = Button(window,
                     text="file loop",
                     command=loop)
button_loop.pack()

button_exit = Button(window,
                     text="Exit",
                     command=window.destroy)
button_exit.pack()

window.mainloop()

#to be determined
'''
#don't use the uploadanddownlad function
def UploadAndDownloadVideoLandmarks(filename):
    landmarks=[]
    destination_path ="C:/Users/amr12/PycharmProjects/MiniAiProject/"
    source_path ="C:/Users/amr12/OneDrive/Desktop/amr videos/"
    # putting the solutions into small variables to call them
    mp_drawing = mp.solutions.drawing_utils
    mp_holistic = mp.solutions.holistic
    # capturing the video applicable to change in the future
    cap = cv2.VideoCapture(source_path+filename)
    # getting the width and the height of the video for the viedo writer
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    # puting the video wirter into variable
    writer = cv2.VideoWriter(
        '{path}{filename}'.format(path=destination_path, filename=filename)
        , cv2.VideoWriter_fourcc(*'mp4v'), 20, (width, height)
    )
    # Initiate holistic model
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            # Recolor Feed
            image = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)
            # make image not writeable for extra performance that doesn't exist ?
            image.flags.writeable = False
            # Make Detections
            results = holistic.process(image)
            #print(results.face_landmarks)
            landmarks.append(results.face_landmarks.landmark)
            # make image writeable again
            image.flags.writeable = True
            # face_landmarks, pose_landmarks, left_hand_landmarks, right_hand_landmarks
            # Recolor image back to BGR for rendering
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            # 1. Draw face landmarks
            mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                                      mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                                      mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1)
                                      )
            # 2. Right hand
            mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(80, 22, 10), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(80, 44, 121), thickness=2, circle_radius=2)
                                      )
            # 3. Left Hand
            mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2)
                                      )
            # 4. Pose Detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                                      )
            # write on disk the video with holistics
            writer.write(image)
            cv2.imshow('video', image)
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
    cap.release()
    writer.release()
    cv2.destroyAllWindows()
    print('length is ',len(landmarks))
    return landmarks
#UploadAndDownloadVideoLandmarks("arms 1.mp4")
#print('land marks are ',UploadAndDownloadVideoLandmarks("arms 1.mp4"))
'''


'''
#multi threading code for future improvement of the model
from threading import Thread
import cv2, time
class ThreadedCamera(object):
    def __init__(self, src=0):
        self.capture = cv2.VideoCapture(src)
        self.capture.set(cv2.CAP_PROP_BUFFERSIZE, 2)
        # FPS = 1/X
        # X = desired FPS
        self.FPS = 1/30
        self.FPS_MS = int(self.FPS * 1000)
        # Start frame retrieval thread
        self.thread = Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()
    def update(self):
        while True:
            if self.capture.isOpened():
                (self.status, self.frame) = self.capture.read()
            time.sleep(self.FPS)
    def show_frame(self):
        cv2.imshow('frame', self.frame)
        cv2.waitKey(self.FPS_MS)
if __name__ == '__main__':
    src = 'C:/Users/Asus/Documents/Studio Project — Kapwing.mp4'
    threaded_camera = ThreadedCamera(src)
    while True:
        try:
            threaded_camera.show_frame()
        except AttributeError:
            pass
'''
