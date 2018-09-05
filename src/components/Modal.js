import React, { Fragment } from 'react';

export const renderStartModal = () => {
	return (
		<Fragment>
			<h1>
				Welcome to the Active Learning Demo!
			</h1>
			<div className='modal__text'>
				<p>
					This demo has been made to help spread understanding of the machine learning topic <a href="https://en.wikipedia.org/wiki/Active_learning_(machine_learning)">Active Learning</a>.
					Active Learning is a form of <a href="https://en.wikipedia.org/wiki/Semi-supervised_learning">semi-supervised learning</a> where some of the data points are labeled and some are not.
					The problem active learning tries to solve is the following: if you had a lot of unlabeled data and could only label a set number
					of points, how would you choose the points to label?
				</p>
				<p>
					In this demo you will be doing exactly that-- choosing unlabeled points to label. You may choose unlabeled points by clicking on them
					on the plot. You may also click the Active Select button on the sidebar, which will use an active learning technique to choose the next
					points to be labeled. Once the alloted number of points have been labeled, an SVM with linear kernel will be trained with the labeled points
					and then be tested against a held out data set.
				</p>
				<p>
					This demo has been made with the famous <a href="https://en.wikipedia.org/wiki/Iris_flower_data_set">iris dataset</a>.
					The iris dataset has 4 features, and 3 classes. You can toggle which features appear on which axis in the sidebar, and you can determine the class of the
					labeled points from the legend on the plot.
				</p>
			</div>
		</Fragment>
	)
}

export const renderEndModal = (results) => {
	return (
		<Fragment>
			<h1>
				Thank you for completing the Active Learning Demo!
			</h1>
			<div className='modal__text'>
				<p>
					Take a look at your results. You may restart the demo by selecting Restart Demo from the sidebar, or refreshing the page.
				</p>
				<div className='modal__text-results'>
					{results}
				</div>
			</div>
		</Fragment>
	)
}
