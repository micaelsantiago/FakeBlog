async function readPosts() {
	let postArea = document.querySelector('.postArea');
	postArea.innerHTML = `Loading...`;

	let response = await fetch('https://jsonplaceholder.typicode.com/posts/')
	let json = await response.json();

	if (json.length == 0) {
		postArea.innerHTML = `There are no posts at the moment! :(`;
		return;
	}

	postArea.innerHTML = '';

	for (let post in json) {
		let postHTML = `
			<div class="card w-75">
			  <div class="card-body">
			    <h5 class="card-title">${json[post].title}</h5>
			    <p class="card-text">${json[post].body}</p>
			  </div>
			</div>
		`;

		postArea.innerHTML += postHTML;
	}
}

function addPostVerify() {
	let title = document.querySelector('#titleField').value;
	let body = document.querySelector('#bodyField').value;

	if (title === '' || body === '') {
		let error = document.querySelector('#warningMessage');

		error.innerHTML = `
			<div class="alert alert-danger d-flex align-items-center" role="alert">
				Empty field(s)!
			</div>
		`;

		setTimeout(() => {
			error.innerHTML = '';
		}, 2000)

		return;
	}

	addNewPost(title, body);
}

async function addNewPost(title, body) {
	await fetch('https://jsonplaceholder.typicode.com/posts/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title: title,
			body: body
		})
	});	

	document.querySelector('#titleField').value = '';
	document.querySelector('#bodyField').value = '';

	readPosts();

	let success = document.querySelector('#warningMessage');

	success.innerHTML = `
		<div class="alert alert-success d-flex align-items-center" role="alert">
		  New post successfully added!
		</div>
	`;

	setTimeout(() => {
		success.innerHTML = '';
	}, 2000)
}

readPosts();

document.querySelector('#insertButton').addEventListener('click', addPostVerify);