document.getElementById("checkcode").addEventListener("click", function (event) {
    event.preventDefault(); // منع التصرف الافتراضي لزر التسجيل

    // جمع قيم الحقول

    let code = document.getElementById("code").value;
   
    // إنشاء كائن يحتوي على بيانات النموذج
    const formData = {

        code:code
    };

    // إرسال بيانات النموذج إلى ملف PHP باستخدام fetch()
    fetch('user_otp.php', {
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
                window.location.href = 'changpass.html'; // تحديد عنوان URL للصفحة الجديدة
            }
            if (data.error) {
                // إذا كانت هناك أخطاء، عرضها تحت الحقول المناسبة

                document.getElementById("otpError").innerText = data.error|| '';
                
            }
        })
        .catch(error => {
            //console.error('Error:', error);
            // التعامل مع الأخطاء هنا
        });
});