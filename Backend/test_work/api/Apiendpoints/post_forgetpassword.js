document.getElementById("change_password").addEventListener("click", function (event) {
    event.preventDefault(); // منع التصرف الافتراضي لزر التسجيل

    // جمع قيم الحقول
    let password = document.getElementById("pass").value;
    let confpassword = document.getElementById("confpass").value;

    // إنشاء كائن يحتوي على بيانات النموذج
    const formData = {
        password: password,
        confpassword: confpassword
    };

    // إرسال بيانات النموذج إلى ملف PHP باستخدام fetch()
    fetch('changepassword.php', {
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
            if (data.success) {
                // إذا نجح التغيير، عرض رسالة النجاح للمستخدم
           
            } else if (data.error) {
                // إذا فشل التغيير، عرض رسالة الخطأ للمستخدم تحت الحقول المناسبة
                document.getElementById("passerror").innerText = data.error && data.error.password ? data.error.password : '';

                document.getElementById("confpasserror").innerText =  data.error && data.error.confpasserror ? data.error.confpasserror :'';

            }
        })
        .catch(error => {
            // التعامل مع الأخطاء هنا
            console.error('Error:', error);
            // يمكنك عرض رسالة خطأ عامة للمستخدم هنا
        });
});
