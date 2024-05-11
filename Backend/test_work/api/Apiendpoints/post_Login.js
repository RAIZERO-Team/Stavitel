// Function to generate a random token
function generateToken(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset.charAt(randomIndex);
    }

    return token;
}

// Event listener for login button
document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve input values
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Generate a token
    let token = generateToken(32);

    // Form data to be sent to the server
    const formData = {
        email: email,
        password: password,
        token: token
    };

    // Send form data to login.php using fetch
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        if (!data.error) {
            // Redirect user to index.php upon successful login
            window.location.href = 'index.php';
        } else {
            // Display error messages
            document.getElementById("lemailError").innerText = data.error.email || '';
            document.getElementById("lpasswordError").innerText = data.error.password || '';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
    });
});
