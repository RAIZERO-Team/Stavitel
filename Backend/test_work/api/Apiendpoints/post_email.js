document.getElementById("sendcode").addEventListener("click", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;

    const formData = {
        email: email
    };

    fetch('send_email_forgetpass.php', {
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
                
                window.location.href="user_otp.html";
  
            } else {
                document.getElementById("lemailError").innerText = data.error || '';
            }
        })
        .catch(error => {
            //console.error('Error:', error)
        });
});
