$(document).ready(function () {
    $('#upload_submit').click(function () {
        const files = $('#choose_file')?.[0]?.files;
        if (files?.length > 0) {
            $('#uploading').show();
            $(this).prop('disabled', true);
            const formData = new FormData();
            formData.append('image', files[0]);
            const options = {
                maxSize: 1024*800,
            };
            formData.append('options', JSON.stringify(options));

            $.ajax({
                url: '/upload',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                method: 'post',
                type: 'post',
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(`${textStatus} ${errorThrown}: ${xhr.responseText}`);
                },
                complete: function () {
                    $("#uploading").hide();
                    $('#upload_submit').prop('disabled', false);
                },
            });
        }
    });
});