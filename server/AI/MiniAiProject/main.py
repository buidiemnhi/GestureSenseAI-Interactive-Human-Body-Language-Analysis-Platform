import csv
import cv2
import os
import mediapipe as mp
import numpy as np

#creation of csv file for the landmarks cords
def create_landmarks_cords ():
    num_cords = 543
    landmarks = ['action']
    for val in range(1, num_cords + 1):
        landmarks += ['x{}'.format(val), 'y{}'.format(val), 'z{}'.format(val), 'v{}'.format(val)]
        with open('cords.csv', mode='w', newline='') as f:
            csv_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            csv_writer.writerow(landmarks)

#put filename to be string and action name to be string too
def save_landmarks(filename,action_name):
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
            if not os.path.isfile('C:/Users/amr12/PycharmProjects/MiniAiProject/cords.csv'):
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
            with open('cords.csv', mode='a', newline='') as f:
                csv_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                csv_writer.writerow(extract_landmarks(results,action_name))



            cv2.imshow('video', image)
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()

#extract the landmarks and put zero if didn't detect the landmark
def extract_landmarks(results,action_name):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                     results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)
    face = np.array([[res.x, res.y, res.z,res.visibility] for res in
                     results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468 * 4)
    lh = np.array([[res.x, res.y, res.z,res.visibility] for res in
                   results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 4)
    rh = np.array([[res.x, res.y, res.z,res.visibility] for res in
                   results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21 * 4)
    row = list(np.concatenate([pose, face, lh, rh]))
    # Append action name
    row.insert(0, action_name)
    return row


save_landmarks('C:/Users/amr12/OneDrive/Desktop/amr videos/arms 2.mp4','arms 2')


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
