const postList = document.getElementById("postList");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");
const submitPostBtn = document.getElementById("submitPostBtn");
const fetchBtn = document.getElementById("fetchButton");
const fetchError = document.getElementById("error");

submitPostBtn.addEventListener("click", (e) => {
    e.preventDefault();

    formSuccess.innerHTML = "";
    formError.innerHTML = "";

    const newPostData = {
        userId: 1,
        id: 1,
        title: titleInput.value,
        body: bodyInput.value
    };

    submitPostBtn.disabled = true;
    submitPostBtn.textContent = "Submitting...";
    
    fetch("https://jsonplaceholder.typicode.com/posts", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newPostData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(newPosts => {
            formSuccess.innerHTML = "<p>Success! Your post was added.</p>"
            console.log("Success! Server returned:", newPosts);

            titleInput.textContent = "";
            bodyInput.textContent = "";
            
            submitPostBtn.disabled = false;
            submitPostBtn.textContent = "Submit Post";
        })
        .catch(error => {
            formError.innerHTML = "<p>Sorry, there was an error submitting your post.</p>"
            console.error("Failed to Post new entry:", error);
            
            submitPostBtn.disabled = false;
            submitPostBtn.textContent = "Submit Post";
        });

});

fetchBtn.addEventListener("click", () => {
    
    fetchError.innerHTML = "";

    fetchBtn.disabled = true;
    fetchBtn.textContent = "Loading..."

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            postList.innerHTML = "";
    
            if (posts.length === 0) {
               postList.innerHTML = "<p>No current posts available</p>"
            } 
    
            posts.forEach((post) => {
                postList.innerHTML += `
                    <li>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    </li>
                `
            })
            fetchBtn.disabled = false;
            fetchBtn.textContent = "Fetch Posts";
        })
        .catch(error => {
            fetchError.innerHTML = "<p>Sorry, we encountered an error fetching the posts.</p>"
            console.error("Failed to fetch posts:", error);
            
            fetchBtn.disabled = false;
            fetchBtn.textContent = "Fetch Posts";
        });
});