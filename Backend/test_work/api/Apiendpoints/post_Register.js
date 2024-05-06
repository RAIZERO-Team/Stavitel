function generateToken(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset.charAt(randomIndex);
    }

    return token;
}








document.getElementById("Register").addEventListener("click", function (event) {
    event.preventDefault(); // منع التصرف الافتراضي لزر التسجيل

    // جمع قيم الحقول
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let token = generateToken(32);
    // إنشاء كائن يحتوي على بيانات النموذج
    const formData = {
        username: username,
        email: email,
        password: password,
        token:token
    };

    // إرسال بيانات النموذج إلى ملف PHP باستخدام fetch()
    fetch('register.php', {
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
            // التعامل مع الاستجابة بنجاح هنا
            if (!data.error) {
                // إذا لم تكن هناك أخطاء، قم بتوجيه المستخدم إلى الصفحة الجديدة
                window.location.href = 'send_varified_email.html'; // تحديد عنوان URL للصفحة الجديدة
            } else {
                // إذا كان هناك أخطاء، قم بعرضها للمستخدم
                document.getElementById("usernameError").innerText = data.error.username || '';
                document.getElementById("emailError").innerText = data.error.email || '';
                document.getElementById("passwordError").innerText = data.error.password || '';
            }
        })

        .catch(error => {
            console.error('Error:', error);
            // التعامل مع الأخطاء هنا
        });
});
