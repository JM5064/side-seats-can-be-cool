import cv2
import numpy as np


image = cv2.imread("examples/ex.JPG")
# image = cv2.resize(image, (800, 600))

height, width, _ = image.shape

print(width, height)

source_points = np.float32([[10, 150], [790, -100], [790, 530], [10, 470]]) * 5
dest_points = np.float32([[0, 0], [width+1000, 0], [width+1000, height], [0, height]])

circle_image = image.copy()
for pt in source_points:
    circle_image = cv2.circle(circle_image, (int(pt[0]), int(pt[1])), 50, (0, 0, 255), -1)

H = cv2.getPerspectiveTransform(source_points, dest_points)

transformed_image = cv2.warpPerspective(image, H, (width+1000, height))

cv2.imshow("image", circle_image)
cv2.waitKey(0)

cv2.imshow("image2", transformed_image)
cv2.waitKey(0)