#!/usr/bin/env python
# coding: utf-8

import albumentations as A
import numpy as np
import cv2

# Setup the distortion algorithm
PAD_SIZE = 50
padder = lambda _img : np.pad(_img, [(PAD_SIZE,PAD_SIZE),(PAD_SIZE,PAD_SIZE), (0,0)], mode='constant', constant_values=255) if len(_img.shape) == 3 else np.pad(_img, [(PAD_SIZE,PAD_SIZE),(PAD_SIZE,PAD_SIZE)], mode='constant', constant_values=0)
deformation = A.PiecewiseAffine(scale=(0.01, 0.013), mode='constant', cval=255, cval_mask=255, p=1)
deformer = lambda IMG : deformation(image=IMG)['image']


def __choose_colors__(img, comp_shape, thresh=.01, apply_dist=False):
	# Reduce the image to a compressed shape to find the optimal color division
	# while ignoring small details that can be ignored on the final image
	im = cv2.resize(img,comp_shape, interpolation=cv2.INTER_NEAREST)

	# Convert the reduced image to Z vector and to np.float32
	Z = im.reshape((-1,3))
	Z = np.float32(Z)

	# Setup the K-means clustering parameters
	criteria = (cv2.TERM_CRITERIA_EPS, 10, 1.0)

	# Initialize the loop for approximating the optimal value for K
	cur = cv2.kmeans(Z,1,None,criteria,10,cv2.KMEANS_PP_CENTERS)[0]

	prev = None
	diff = 0
	vals = []
	
	for K in range(2,21):
		# Compute the metric value for the current K
		prev = cur
		cur = cv2.kmeans(Z,K,None,criteria,10,cv2.KMEANS_PP_CENTERS)[0]

		# If the metric value is 0, optimal number of K has been found
		if cur == 0:
			break

		# Calculate how much better the metric is for the current K
		cur_diff = round(1-cur/prev,1)
		diff = cur_diff
		vals.append(prev-cur)
	
	# Apply a distortion for a more "hand-drawn" appearance
	if apply_dist:
		img = padder(img)
		img = deformer(img)

	# Convert the distorted to Z vector and to np.float32
	Z = img.reshape((-1,3))
	Z = np.float32(Z)

	# If the optimal K is not found, try to approximate it by the elbow method
	if cur != 0:
		# Normalize the differences and find the cutting point where the metric stops improving
		vals = [v/max(vals) for v in vals]
		K = [v>thresh for v in vals].index(False) +1## list starts at K==2

	# Calculate the color regions in the distorted image using the K-value chosen
	return cv2.kmeans(Z, K, None, criteria, 10, cv2.KMEANS_PP_CENTERS)


def get_region_masks(img, comp_shape=(64,64), thresh=.01, apply_dist=False):
	# Approximate the optimal color division
	ret,label,center = __choose_colors__(img, comp_shape, thresh, apply_dist)

	img_dims = img.shape[:2]
	if apply_dist:
		img_dims = (img_dims[0]+PAD_SIZE*2, img_dims[1]+PAD_SIZE*2)

	# Now convert back into uint8, and return the mask for each region
	colors = np.uint8(center)
	blank = np.ones(img_dims, dtype=np.uint8)*255
	lbl_mask = label.reshape(img_dims)

	# Iterate over each color id
	for color_id in np.unique(label):
		color = colors[color_id]
		
		# If the RGB is too high, assume as background
		if all(color > 250):
			continue
		
		# Create a mask for the regions occupied by the current color
		mask = blank.copy()
		mask[lbl_mask==color_id] = 0
		
		# Apply a morphological transformation to the mask to remove noise
		d = cv2.dilate(mask, None)
		mask = cv2.erode(d, None)
		mask = cv2.erode(mask, None)

		mask = cv2.bitwise_not(mask)
		yield color, mask



# Stylizing function
def stylize(img, comp_shape=(64,64), thresh=.01, apply_dist=True):
	img_dims = img.shape
	if apply_dist:
		img_dims = list(img_dims)
		img_dims[0] += PAD_SIZE*2
		img_dims[1] += PAD_SIZE*2
		img_dims = tuple(img_dims)

	blank = np.zeros(img_dims, dtype=np.uint8)
	full_mask = np.zeros(img_dims[:2], dtype=np.uint8)

	for color, mask in get_region_masks(img, comp_shape, thresh, apply_dist):
		# Draw the colored mask into the canvas
		blank[mask==255] = color

		# Save the original mask shape into a "global mask"
		full_mask = cv2.bitwise_or(full_mask, mask)

	# Use the global mask to decide the transparent region
	final = cv2.cvtColor(blank, cv2.COLOR_BGR2BGRA)
	final[...,3] = full_mask

	return final